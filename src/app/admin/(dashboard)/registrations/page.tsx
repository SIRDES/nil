"use client";

import { useState } from "react";
import AddRegistrationModal from "@/components/admin/AddRegistrationModal";
import useFetch from "@/hooks/useFetch";
import { TableSkeleton, ErrorBanner, EmptyState } from "@/components/admin/DataStates";

/* ─── Types ───────────────────────────────────────────────────── */
interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  programId: { _id: string; name: string; price: number } | string;
  status: string;
  paymentReceived: boolean;
  createdAt: string;
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function getProgramName(reg: Registration): string {
  if (typeof reg.programId === "object" && reg.programId !== null) return reg.programId.name;
  return String(reg.programId);
}

function getProgramPrice(reg: Registration): string {
  if (typeof reg.programId === "object" && reg.programId !== null)
    return `$${reg.programId.price.toLocaleString()}`;
  return "--";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Status Pill ─────────────────────────────────────────────── */
function StatusPill({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Enrolled:
      "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30",
    Pending:
      "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
    Waitlisted:
      "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
    Cancelled:
      "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30",
    Completed:
      "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        classes[status] || "bg-slate-100 text-slate-600 ring-slate-400/20"
      }`}
    >
      {status}
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function RegistrationsPage() {
  const { data: registrations, loading, error, refetch } = useFetch<Registration>("/api/register");
  const [showModal, setShowModal] = useState(false);
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // Derive unique program names from data
  const programNames = Array.from(new Set(registrations.map(getProgramName))).sort();

  const filtered = registrations.filter((r) => {
    const matchProgram = programFilter === "All Programs" || getProgramName(r) === programFilter;
    const matchStatus = statusFilter === "All Statuses" || r.status === statusFilter;
    return matchProgram && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Registrations</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage all student registrations and enrollment records.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Registration
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary"
        >
          <option>All Programs</option>
          {programNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary"
        >
          <option>All Statuses</option>
          <option>Enrolled</option>
          <option>Pending</option>
          <option>Waitlisted</option>
          <option>Cancelled</option>
          <option>Completed</option>
        </select>
        <button
          onClick={refetch}
          className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 transition-all"
          title="Refresh"
        >
          <span className="material-symbols-outlined text-xl">refresh</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={refetch} />
        ) : filtered.length === 0 ? (
          <EmptyState icon="how_to_reg" title="No registrations found" subtitle="Try changing your filters or add a new registration." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Program</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Payment</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {r.firstName} {r.lastName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{r.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{getProgramName(r)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{formatDate(r.createdAt)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{getProgramPrice(r)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          r.paymentReceived ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${r.paymentReceived ? "bg-green-500" : "bg-amber-500"}`} />
                        {r.paymentReceived ? "Received" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filtered.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-700 dark:text-white">{filtered.length}</span> results
            </p>
          </div>
        )}
      </div>

      {showModal && <AddRegistrationModal onClose={() => { setShowModal(false); refetch(); }} />}
    </div>
  );
}
