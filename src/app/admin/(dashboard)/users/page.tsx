"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { TableSkeleton, ErrorBanner, EmptyState } from "@/components/admin/DataStates";

/* ─── Types ───────────────────────────────────────────────────── */
interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  lastLoginAt?: string;
  avatarUrl?: string;
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function getInitials(first: string, last: string): string {
  return `${first[0] || ""}${last[0] || ""}`.toUpperCase();
}

const AVATAR_COLORS = [
  "bg-primary",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-slate-700",
  "bg-cyan-600",
  "bg-orange-600",
  "bg-pink-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-lime-700",
];

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatLastLogin(iso?: string): string {
  if (!iso) return "Never";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const ROWS_PER_PAGE = 8;

/* ─── Role Pill ───────────────────────────────────────────────── */
function RolePill({ role }: { role: string }) {
  const classes: Record<string, string> = {
    "Super Admin":
      "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
    Registrar:
      "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
    "Program Manager":
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
    Instructor:
      "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-400 dark:ring-cyan-400/30",
    Editor:
      "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/30",
    Support:
      "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[role] || "bg-slate-100 text-slate-600 ring-slate-400/20"}`}>
      {role}
    </span>
  );
}

/* ─── Status Pill ─────────────────────────────────────────────── */
function StatusPill({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Active:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30",
    Inactive:
      "bg-slate-100 text-slate-500 ring-slate-400/20 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/30",
    Suspended:
      "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30",
    Pending:
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
  };

  const dotColor: Record<string, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    Suspended: "bg-red-500",
    Pending: "bg-amber-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[status] || "bg-slate-100 text-slate-600 ring-slate-400/20"}`}>
      <span className={`inline-block size-1.5 rounded-full ${dotColor[status] || "bg-slate-400"}`} />
      {status}
    </span>
  );
}

/* ─── Actions Menu ────────────────────────────────────────────── */
function ActionsMenu({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        id={`actions-btn-${userId}`}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span className="material-symbols-outlined text-xl">more_vert</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-base text-slate-400">visibility</span>
            View Profile
          </button>
          <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-base text-slate-400">edit</span>
            Edit User
          </button>
          <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-base text-slate-400">key</span>
            Reset Password
          </button>
          <hr className="my-1.5 border-slate-100 dark:border-slate-800" />
          <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <span className="material-symbols-outlined text-base">delete</span>
            Remove User
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function AdminUsersPage() {
  const { data: users, loading, error, refetch } = useFetch<AdminUser>("/api/admins");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);

  /* Filter */
  const filtered = users.filter((u) => {
    return roleFilter === "All Roles" || u.role === roleFilter;
  });

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ROWS_PER_PAGE);
  const showingFrom = filtered.length > 0 ? startIndex + 1 : 0;
  const showingTo = Math.min(startIndex + ROWS_PER_PAGE, filtered.length);

  /* Reset page when filter changes */
  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Users</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage administrator accounts, roles, and permissions.
          </p>
        </div>
        <Link
          id="add-new-admin-btn"
          href="/admin/users/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Admin
        </Link>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3">
        <select
          id="role-filter-select"
          value={roleFilter}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary transition-all cursor-pointer"
        >
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Registrar</option>
          <option>Program Manager</option>
          <option>Instructor</option>
          <option>Editor</option>
          <option>Support</option>
        </select>

        <button
          id="refresh-users-btn"
          onClick={refetch}
          className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:border-slate-300 transition-all"
          title="Refresh"
        >
          <span className="material-symbols-outlined text-xl">refresh</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton rows={6} cols={4} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={refetch} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                    <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                    <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                    <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Login</th>
                    <th className="text-right px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginated.map((user) => {
                    const initials = getInitials(user.firstName, user.lastName);
                    const avatarColor = getAvatarColor(user._id);
                    return (
                      <tr key={user._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} className="size-10 rounded-full object-cover shrink-0" />
                            ) : (
                              <div className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${avatarColor}`}>
                                {initials}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <RolePill role={user.role} />
                        </td>
                        <td className="px-6 py-4">
                          <StatusPill status={user.status} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatLastLogin(user.lastLoginAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end">
                            <ActionsMenu userId={user._id} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">group_off</span>
                        <p className="text-sm text-slate-400">No users found matching the selected filter.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-white">{showingFrom}</span>{" "}
                to{" "}
                <span className="font-semibold text-slate-700 dark:text-white">{showingTo}</span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700 dark:text-white">{filtered.length}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <button
                  id="pagination-prev-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    id={`pagination-page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                      currentPage === page
                        ? "bg-primary text-white shadow-sm"
                        : "border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  id="pagination-next-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
