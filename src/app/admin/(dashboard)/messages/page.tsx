"use client";

import { useState } from "react";

/* ─── Mock Data ───────────────────────────────────────────────── */
interface Message {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  category: string;
  status: "New" | "Resolved" | null;
  preview: string;
  timestamp: string;
  email: string;
  phone: string;
  role: string;
  program: string;
  source: string;
  ticketNumber: string;
  date: string;
  subject: string;
  body: string;
}

const MESSAGES: Message[] = [
  {
    id: "1",
    initials: "JS",
    avatarColor: "bg-primary",
    name: "Jessica Stone",
    category: "Data Science Inquiry",
    status: "New",
    preview:
      "Hi, I'm interested in the upcoming Data Science Fundamentals cohort. Do you offer any...",
    timestamp: "10 mins ago",
    email: "jessica.stone@example.com",
    phone: "+1 (555) 123-4567",
    role: "Prospective Student",
    program: "Data Science",
    source: "Source: Contact Form",
    ticketNumber: "TICKET #4923",
    date: "Oct 24, 2023 at 10:42 AM",
    subject: "Data Science Inquiry - Scholarship Options",
    body: `Hi TechEdu Team,

I've been following your academy for a while and I'm very interested in enrolling in the upcoming Data Science Fundamentals cohort starting next month. The curriculum looks exactly like what I've been looking for to pivot my career.

However, I wanted to inquire if you offer any scholarships for women in tech or if there are flexible payment plans available? I am currently transitioning from a different field and would appreciate any financial flexibility you could offer.

Also, are the classes recorded in case I miss a live session due to work commitments? I want to make sure I can keep up with the material even if I can't attend every session live.

Looking forward to hearing from you.

Best regards,
Jessica Stone`,
  },
  {
    id: "2",
    initials: "MR",
    avatarColor: "bg-emerald-600",
    name: "Michael Ross",
    category: "Course Syllabus",
    status: null,
    preview:
      "Could you please send me the detailed syllabus for the Full Stack Development program? I...",
    timestamp: "2h ago",
    email: "michael.ross@techmail.com",
    phone: "+1 (555) 987-6543",
    role: "Enrolled Student",
    program: "Full Stack Development",
    source: "Source: Student Portal",
    ticketNumber: "TICKET #4921",
    date: "Oct 24, 2023 at 9:15 AM",
    subject: "Request for Course Syllabus - Full Stack Development",
    body: `Hello,

Could you please send me the detailed syllabus for the Full Stack Development program? I've reviewed the overview on the website, but I'd like more specifics about the weekly breakdown and the technologies covered in each module.

I'm particularly interested in the backend portion - does the course cover both Node.js and Python/Django, or do students choose one track?

Thank you,
Michael Ross`,
  },
  {
    id: "3",
    initials: "AL",
    avatarColor: "bg-amber-700",
    name: "Anita Lee",
    category: "Enrollment Issues",
    status: null,
    preview:
      "I'm trying to register for the evening UX/UI class but the form keeps giving me an error o...",
    timestamp: "Yesterday",
    email: "anita.lee@design.co",
    phone: "+1 (555) 456-7890",
    role: "Prospective Student",
    program: "UX/UI Design",
    source: "Source: Contact Form",
    ticketNumber: "TICKET #4918",
    date: "Oct 23, 2023 at 4:30 PM",
    subject: "Registration Form Error - Evening UX/UI Class",
    body: `Hi Support Team,

I'm trying to register for the evening UX/UI class but the form keeps giving me an error on the payment step. I've tried multiple browsers and different cards, but the issue persists.

Could you help me complete the registration manually or fix the issue? I don't want to miss the enrollment deadline.

Thanks,
Anita Lee`,
  },
  {
    id: "4",
    initials: "DK",
    avatarColor: "bg-slate-700",
    name: "David Kim",
    category: "Enterprise Training",
    status: "Resolved",
    preview:
      "Thank you for the quote. We will proceed with the training for our 10 employees next month.",
    timestamp: "",
    email: "david.kim@enterprise.io",
    phone: "+1 (555) 321-0987",
    role: "Corporate Client",
    program: "Enterprise Training",
    source: "Source: Email",
    ticketNumber: "TICKET #4910",
    date: "Oct 22, 2023 at 11:00 AM",
    subject: "Enterprise Training Quote Acceptance",
    body: `Dear TechEdu Team,

Thank you for the quote. We will proceed with the training for our 10 employees next month. Please send us the service agreement and payment details.

We would prefer to have the sessions on weekday mornings if possible.

Best regards,
David Kim
VP of Engineering, TechCorp`,
  },
  {
    id: "5",
    initials: "SP",
    avatarColor: "bg-orange-500",
    name: "Sarah Parker",
    category: "Prerequisites",
    status: null,
    preview:
      "I have a background in graphic design but no coding experience. Would the Intro to Web De...",
    timestamp: "2 days ago",
    email: "sarah.parker@mail.com",
    phone: "+1 (555) 654-3210",
    role: "Prospective Student",
    program: "Web Development",
    source: "Source: Contact Form",
    ticketNumber: "TICKET #4905",
    date: "Oct 21, 2023 at 2:15 PM",
    subject: "Prerequisites for Intro to Web Development",
    body: `Hello,

I have a background in graphic design but no coding experience. Would the Intro to Web Development course be suitable for a complete beginner like me?

Also, are there any pre-course materials I should study before the cohort starts?

Thanks!
Sarah Parker`,
  },
];

/* ─── Status Pill Component ───────────────────────────────────── */
function StatusPill({ status }: { status: "New" | "Resolved" }) {
  const classes =
    status === "New"
      ? "bg-primary/10 text-primary ring-primary/20"
      : "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${classes}`}
    >
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
  return (
    <button
      id={`message-card-${message.id}`}
      onClick={onClick}
      className={`w-full text-left p-4 border-l-[3px] transition-all duration-200 group cursor-pointer ${
        isActive
          ? "bg-primary/5 border-l-primary"
          : "bg-white border-l-transparent hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${message.avatarColor}`}
        >
          {message.initials}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 truncate">
              {message.name}
            </h4>
            {message.status ? (
              <StatusPill status={message.status} />
            ) : (
              <span className="text-[11px] text-slate-400 whitespace-nowrap">
                {message.timestamp}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 mt-0.5">{message.category}</p>

          <p className="text-[13px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {message.preview}
          </p>

          {/* Bottom row: timestamp (for items with status pill) + arrow */}
          <div className="flex items-center justify-between mt-2">
            {message.status === "New" ? (
              <span className="text-[11px] text-slate-400">
                {message.timestamp}
              </span>
            ) : (
              <span />
            )}
            {isActive && (
              <span className="material-symbols-outlined text-primary text-base">
                arrow_forward
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── Message Detail Component ────────────────────────────────── */
function MessageDetail({ message }: { message: Message }) {
  const [isResolved, setIsResolved] = useState(
    message.status === "Resolved"
  );
  const [replyText, setReplyText] = useState("");
  const [sendCopy, setSendCopy] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* ── Top Action Bar ── */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-200 bg-white">
        <button
          id="message-delete-btn"
          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
        <button
          id="message-flag-btn"
          className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
          title="Flag"
        >
          <span className="material-symbols-outlined text-xl">flag</span>
        </button>

        <span className="mx-2 h-5 w-px bg-slate-200" />

        <span className="text-xs font-bold text-primary tracking-wide uppercase">
          {message.ticketNumber}
        </span>

        <span className="text-xs text-slate-400 ml-2">{message.date}</span>

        <div className="ml-auto">
          <button
            id="mark-resolved-toggle"
            onClick={() => setIsResolved(!isResolved)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ring-1 ring-inset ${
              isResolved
                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                : "bg-slate-100 text-slate-500 ring-slate-300"
            }`}
          >
            <span
              className={`flex size-4 items-center justify-center rounded-full ${
                isResolved ? "bg-emerald-500" : "bg-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-white text-[10px]">
                check
              </span>
            </span>
            Mark Resolved
          </button>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Sender Info Card */}
        <div className="mx-6 mt-6 p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-start gap-4">
            <div
              className={`flex size-14 shrink-0 items-center justify-center rounded-full text-white text-lg font-bold ${message.avatarColor}`}
            >
              {message.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {message.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {message.role}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {message.program}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {message.source}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 mt-3">
                <a
                  href={`mailto:${message.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-slate-400">
                    mail
                  </span>
                  {message.email}
                </a>
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                  <span className="material-symbols-outlined text-base text-slate-400">
                    call
                  </span>
                  {message.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div className="mx-6 mt-5 mb-4">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            Subject: {message.subject}
          </h3>
          <div className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-line">
            {message.body}
          </div>
        </div>
      </div>

      {/* ── Quick Reply Box ── */}
      <div className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-900">Quick Reply</h4>
          <button
            id="insert-template-btn"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Insert Template
          </button>
        </div>

        <div className="relative">
          <textarea
            id="quick-reply-textarea"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your response here..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-lg">
                attach_file
              </span>
            </button>
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-lg">
                mood
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <label
            htmlFor="send-copy-checkbox"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              id="send-copy-checkbox"
              checked={sendCopy}
              onChange={(e) => setSendCopy(e.target.checked)}
              className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-slate-500">
              Send copy to my email
            </span>
          </label>

          <button
            id="send-reply-btn"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-200 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─────────────────────────────────────────────── */
function EmptyDetailState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="flex size-20 items-center justify-center rounded-2xl bg-slate-100 mb-5">
        <span className="material-symbols-outlined text-4xl text-slate-400">
          mail
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900">
        Select a message
      </h3>
      <p className="text-sm text-slate-500 mt-1.5 max-w-xs">
        Choose a conversation from the list to view the message details and
        reply.
      </p>
    </div>
  );
}

/* ─── Main Page Component ─────────────────────────────────────── */
export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const selectedMessage = MESSAGES.find((m) => m.id === selectedId);

  const filteredMessages = MESSAGES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="-m-8 flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* ─── Left Pane: Message List ─── */}
      <div className="w-[380px] shrink-0 border-r border-slate-200 bg-white flex flex-col">
        {/* List Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Messages</h2>
          <div className="flex items-center gap-1">
            <button
              id="filter-messages-btn"
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              title="Filter"
            >
              <span className="material-symbols-outlined text-xl">
                filter_list
              </span>
            </button>
            <button
              id="refresh-messages-btn"
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              title="Refresh"
            >
              <span className="material-symbols-outlined text-xl">
                refresh
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-slate-400 text-lg mr-2">
              search
            </span>
            <input
              type="text"
              id="messages-search-input"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
            />
          </div>
        </div>

        {/* Message Cards */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                isActive={selectedId === message.id}
                onClick={() => setSelectedId(message.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-2">
                search_off
              </span>
              <p className="text-sm text-slate-400">No messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Right Pane: Message Detail ─── */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        {selectedMessage ? (
          <MessageDetail message={selectedMessage} />
        ) : (
          <EmptyDetailState />
        )}
      </div>
    </div>
  );
}
