"use client";

import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { EmptyState } from "@/components/admin/DataStates";

/* ─── Types ───────────────────────────────────────────────────── */
interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  messageBody: string;
  status: string;
  source?: string;
  ticketNumber?: string;
  createdAt: string;
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] || "?").toUpperCase();
}

const AVATAR_COLORS = [
  "bg-primary",
  "bg-emerald-600",
  "bg-amber-700",
  "bg-slate-700",
  "bg-orange-500",
  "bg-violet-600",
  "bg-pink-500",
  "bg-teal-600",
];

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ─── Status Pill Component ───────────────────────────────────── */
function StatusPill({ status }: { status: string }) {
  const classes: Record<string, string> = {
    New: "bg-primary/10 text-primary ring-primary/20",
    Read: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400",
    Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Archived: "bg-slate-100 text-slate-500 ring-slate-400/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${classes[status] || "bg-slate-100 text-slate-600 ring-slate-400/20"}`}>
      {status}
    </span>
  );
}

/* ─── Message Card Component ──────────────────────────────────── */
function MessageCard({
  message,
  isActive,
  onClick,
}: {
  message: Message;
  isActive: boolean;
  onClick: () => void;
}) {
  const initials = getInitials(message.name);
  const avatarColor = getAvatarColor(message._id);

  return (
    <button
      id={`message-card-${message._id}`}
      onClick={onClick}
      className={`w-full text-left p-4 border-l-[3px] transition-all duration-200 group cursor-pointer ${
        isActive
          ? "bg-primary/5 border-l-primary"
          : "bg-white border-l-transparent hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${avatarColor}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 truncate">{message.name}</h4>
            {message.status === "New" ? (
              <StatusPill status={message.status} />
            ) : (
              <span className="text-[11px] text-slate-400 whitespace-nowrap">{timeAgo(message.createdAt)}</span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{message.subject}</p>
          <p className="text-[13px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{message.messageBody}</p>
          <div className="flex items-center justify-between mt-2">
            {message.status === "New" ? (
              <span className="text-[11px] text-slate-400">{timeAgo(message.createdAt)}</span>
            ) : (
              <span />
            )}
            {isActive && (
              <span className="material-symbols-outlined text-primary text-base">arrow_forward</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── Message Detail Component ────────────────────────────────── */
function MessageDetail({ message, onStatusChange }: { message: Message; onStatusChange: () => void }) {
  const [isResolved, setIsResolved] = useState(message.status === "Resolved");
  // const [replyText, setReplyText] = useState("");
  // const [sendCopy, setSendCopy] = useState(false);
  const initials = getInitials(message.name);
  const avatarColor = getAvatarColor(message._id);

  useEffect(() => {
    setIsResolved(message.status === "Resolved");
  }, [message]);

  const toggleResolved = async () => {
    const newStatus = isResolved ? "New" : "Resolved";
    try {
      await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setIsResolved(!isResolved);
      onStatusChange();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Action Bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-200 bg-white">
        <button className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
        <button className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors" title="Flag">
          <span className="material-symbols-outlined text-xl">flag</span>
        </button>
        <span className="mx-2 h-5 w-px bg-slate-200" />
        {message.ticketNumber && (
          <span className="text-xs font-bold text-primary tracking-wide uppercase">{message.ticketNumber}</span>
        )}
        <span className="text-xs text-slate-400 ml-2">{formatDate(message.createdAt)}</span>
        <div className="ml-auto">
          <button
            onClick={toggleResolved}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ring-1 ring-inset cursor-pointer ${
              isResolved
                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                : "bg-slate-100 text-slate-500 ring-slate-300"
            }`}
          >
            <span className={`flex size-4 items-center justify-center rounded-full ${isResolved ? "bg-emerald-500" : "bg-slate-400"}`}>
              <span className="material-symbols-outlined text-white text-[10px]">check</span>
            </span>
            {isResolved ? "Mark as New" : "Mark as Resolved"}
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Sender Info Card */}
        <div className="mx-6 mt-6 p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-start gap-4">
            <div className={`flex size-14 shrink-0 items-center justify-center rounded-full text-white text-lg font-bold ${avatarColor}`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{message.name}</h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {message.subject}
                  </span>
                  {message.source && (
                    <p className="text-[11px] text-slate-400 mt-1">Source: {message.source}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5 mt-3">
                <a href={`mailto:${message.email}`} className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-base text-slate-400">mail</span>
                  {message.email}
                </a>
                {message.phone && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                    <span className="material-symbols-outlined text-base text-slate-400">call</span>
                    {message.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="mx-6 mt-5 mb-4">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Subject: {message.subject}</h3>
          <div className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">{message.messageBody}</div>
        </div>
      </div>

      {/* Quick Reply Box */}
      {/* <div className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-900">Quick Reply</h4>
          <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
            Insert Template
          </button>
        </div>
        <div className="relative">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your response here..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-lg">attach_file</span>
            </button>
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-lg">mood</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <label htmlFor="send-copy-checkbox" className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="send-copy-checkbox"
              checked={sendCopy}
              onChange={(e) => setSendCopy(e.target.checked)}
              className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-500">Send copy to my email</span>
          </label>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-200 active:scale-[0.98]">
            <span className="material-symbols-outlined text-lg">send</span>
            Send Reply
          </button>
        </div>
      </div> */}
    </div>
  );
}

/* ─── Empty State ─────────────────────────────────────────────── */
function EmptyDetailState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-slate-100 mb-5">
        <span className="material-symbols-outlined text-4xl text-slate-400">mail</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">Select a message</h3>
      <p className="text-sm text-slate-500 mt-1.5 max-w-xs">
        Choose a conversation from the list to view the message details and reply.
      </p>
    </div>
  );
}

/* ─── Loading Skeleton ────────────────────────────────────────── */
function MessageListSkeleton() {
  return (
    <div className="animate-pulse divide-y divide-slate-100">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 flex items-start gap-3">
          <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function MessagesPage() {
  const { data: messages, loading, error, refetch } = useFetch<Message>("/api/messages");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-select first message when data loads
  useEffect(() => {
    if (messages.length > 0 && !selectedId) {
      setSelectedId(messages[0]._id);
    }
  }, [messages, selectedId]);

  const selectedMessage = messages.find((m) => m._id === selectedId);

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.messageBody.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="-m-8 flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Pane: Message List */}
      <div className="w-[380px] shrink-0 border-r border-slate-200 bg-white flex flex-col">
        {/* List Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Messages</h2>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Filter">
              <span className="material-symbols-outlined text-xl">filter_list</span>
            </button>
            <button onClick={refetch} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Refresh">
              <span className="material-symbols-outlined text-xl">refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
            />
          </div>
        </div>

        {/* Message Cards */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {loading ? (
            <MessageListSkeleton />
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-sm text-red-500 mb-2">{error}</p>
              <button onClick={refetch} className="text-sm text-primary hover:underline">Retry</button>
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                isActive={selectedId === message._id}
                onClick={() => setSelectedId(message._id)}
              />
            ))
          ) : (
            <EmptyState icon="search_off" title="No messages found" subtitle="Try a different search term." />
          )}
        </div>
      </div>

      {/* Right Pane: Message Detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {selectedMessage ? (
          <MessageDetail message={selectedMessage} onStatusChange={refetch} />
        ) : (
          <EmptyDetailState />
        )}
      </div>
    </div>
  );
}
