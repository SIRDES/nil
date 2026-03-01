"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────── */
type Role = "Super Admin" | "Registrar" | "Program Manager" | "Instructor" | "Support";
type Status = "Active" | "Inactive" | "Pending";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  role: Role;
  status: Status;
  lastLogin: string;
}

/* ─── Mock Data ───────────────────────────────────────────────── */
const ALL_USERS: AdminUser[] = [
  { id: 1, name: "Alex Morgan", email: "alex.morgan@techschool.io", initials: "AM", avatarColor: "bg-primary", role: "Super Admin", status: "Active", lastLogin: "Mar 1, 2024 — 10:42 AM" },
  { id: 2, name: "Sarah Chen", email: "sarah.chen@techschool.io", initials: "SC", avatarColor: "bg-emerald-600", role: "Registrar", status: "Active", lastLogin: "Mar 1, 2024 — 9:15 AM" },
  { id: 3, name: "Michael Ross", email: "michael.ross@techschool.io", initials: "MR", avatarColor: "bg-amber-600", role: "Program Manager", status: "Active", lastLogin: "Feb 28, 2024 — 4:30 PM" },
  { id: 4, name: "Emily Davis", email: "emily.davis@techschool.io", initials: "ED", avatarColor: "bg-violet-600", role: "Instructor", status: "Inactive", lastLogin: "Feb 15, 2024 — 2:00 PM" },
  { id: 5, name: "Chris Wilson", email: "chris.wilson@techschool.io", initials: "CW", avatarColor: "bg-rose-600", role: "Support", status: "Active", lastLogin: "Feb 28, 2024 — 11:20 AM" },
  { id: 6, name: "David Kim", email: "david.kim@techschool.io", initials: "DK", avatarColor: "bg-slate-700", role: "Registrar", status: "Pending", lastLogin: "Never" },
  { id: 7, name: "Lisa Park", email: "lisa.park@techschool.io", initials: "LP", avatarColor: "bg-cyan-600", role: "Program Manager", status: "Active", lastLogin: "Mar 1, 2024 — 8:05 AM" },
  { id: 8, name: "James Taylor", email: "james.taylor@techschool.io", initials: "JT", avatarColor: "bg-orange-600", role: "Instructor", status: "Active", lastLogin: "Feb 27, 2024 — 3:45 PM" },
  { id: 9, name: "Karen White", email: "karen.white@techschool.io", initials: "KW", avatarColor: "bg-pink-600", role: "Super Admin", status: "Active", lastLogin: "Mar 1, 2024 — 10:00 AM" },
  { id: 10, name: "Tom Harris", email: "tom.harris@techschool.io", initials: "TH", avatarColor: "bg-teal-600", role: "Support", status: "Inactive", lastLogin: "Jan 20, 2024 — 1:10 PM" },
  { id: 11, name: "Nina Patel", email: "nina.patel@techschool.io", initials: "NP", avatarColor: "bg-indigo-600", role: "Registrar", status: "Pending", lastLogin: "Never" },
  { id: 12, name: "Ryan Brooks", email: "ryan.brooks@techschool.io", initials: "RB", avatarColor: "bg-lime-700", role: "Instructor", status: "Active", lastLogin: "Feb 26, 2024 — 9:30 AM" },
];

const ROWS_PER_PAGE = 8;

/* ─── Role Pill ───────────────────────────────────────────────── */
function RolePill({ role }: { role: Role }) {
  const classes: Record<Role, string> = {
    "Super Admin":
      "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
    Registrar:
      "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
    "Program Manager":
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
    Instructor:
      "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-400 dark:ring-cyan-400/30",
    Support:
      "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[role]}`}
    >
      {role}
    </span>
  );
}

/* ─── Status Pill ─────────────────────────────────────────────── */
function StatusPill({ status }: { status: Status }) {
  const classes: Record<Status, string> = {
    Active:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30",
    Inactive:
      "bg-slate-100 text-slate-500 ring-slate-400/20 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/30",
    Pending:
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
  };

  const dotColor: Record<Status, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    Pending: "bg-amber-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[status]}`}
    >
      <span className={`inline-block size-1.5 rounded-full ${dotColor[status]}`} />
      {status}
    </span>
  );
}

/* ─── Actions Menu ────────────────────────────────────────────── */
function ActionsMenu({ userId }: { userId: number }) {
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
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);

  /* Filter */
  const filtered = ALL_USERS.filter((u) => {
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
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Admin Users
          </h1>
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

      {/* ── Filters Row ── */}
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
          <option>Support</option>
        </select>

        <button
          id="refresh-users-btn"
          className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:border-slate-300 transition-all"
          title="Refresh"
        >
          <span className="material-symbols-outlined text-xl">refresh</span>
        </button>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Last Login
                </th>
                <th className="text-right px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginated.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  {/* User Column — Avatar + Name + Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${user.avatarColor}`}
                      >
                        {user.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <RolePill role={user.role} />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusPill status={user.status} />
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {user.lastLogin}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <ActionsMenu userId={user.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 block">
                      group_off
                    </span>
                    <p className="text-sm text-slate-400">
                      No users found matching the selected filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-white">
              {showingFrom}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-slate-700 dark:text-white">
              {showingTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700 dark:text-white">
              {filtered.length}
            </span>{" "}
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
      </div>
    </div>
  );
}
