"use client";

import { useState } from "react";
import AddRegistrationModal from "@/components/admin/AddRegistrationModal";

const ALL_REGISTRATIONS = [
  { id: 1, name: "John Doe", email: "john.d@example.com", phone: "+1 555-111-2222", program: "Developer Accelerator", date: "Mar 1, 2024", amount: "$5,000", status: "Enrolled", studentId: "STU-001" },
  { id: 2, name: "Jane Smith", email: "jane.smith@web.com", phone: "+1 555-222-3333", program: "AI & Emerging Tech", date: "Feb 28, 2024", amount: "$8,500", status: "Pending", studentId: "STU-002" },
  { id: 3, name: "Michael Brown", email: "m.brown99@tech.net", phone: "+1 555-333-4444", program: "Junior Coders", date: "Feb 27, 2024", amount: "$2,500", status: "Enrolled", studentId: "STU-003" },
  { id: 4, name: "Emily Davis", email: "emily.d@design.io", phone: "+1 555-444-5555", program: "Adult Education", date: "Feb 26, 2024", amount: "$1,800", status: "Waitlist", studentId: "STU-004" },
  { id: 5, name: "Chris Wilson", email: "cw.cloud@server.com", phone: "+1 555-555-6666", program: "Developer Accelerator", date: "Feb 25, 2024", amount: "$5,000", status: "Pending", studentId: "STU-005" },
  { id: 6, name: "Sarah Chen", email: "s.chen@lab.co", phone: "+1 555-666-7777", program: "AI & Emerging Tech", date: "Feb 24, 2024", amount: "$8,500", status: "Enrolled", studentId: "STU-006" },
  { id: 7, name: "David Kim", email: "d.kim@dev.io", phone: "+1 555-777-8888", program: "Developer Accelerator", date: "Feb 23, 2024", amount: "$5,000", status: "Enrolled", studentId: "STU-007" },
  { id: 8, name: "Lisa Park", email: "l.park@edu.net", phone: "+1 555-888-9999", program: "Junior Coders", date: "Feb 22, 2024", amount: "$2,500", status: "Pending", studentId: "STU-008" },
];

function StatusPill({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Enrolled: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30",
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
    Waitlist: "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[status] || ""}`}>
      {status}
    </span>
  );
}

export default function RegistrationsPage() {
  const [showModal, setShowModal] = useState(false);
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filtered = ALL_REGISTRATIONS.filter((r) => {
    const matchProgram = programFilter === "All Programs" || r.program === programFilter;
    const matchStatus = statusFilter === "All Statuses" || r.status === statusFilter;
    return matchProgram && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Registrations</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage all student registrations and enrollment records.</p>
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
          <option>Developer Accelerator</option>
          <option>AI & Emerging Tech</option>
          <option>Junior Coders</option>
          <option>Adult Education</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary"
        >
          <option>All Statuses</option>
          <option>Enrolled</option>
          <option>Pending</option>
          <option>Waitlist</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student ID</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Program</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{r.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">{r.studentId}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{r.program}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{r.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{r.amount}</td>
                  <td className="px-6 py-4"><StatusPill status={r.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                      <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-700 dark:text-white">1-{filtered.length}</span> of <span className="font-semibold text-slate-700 dark:text-white">{filtered.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-bold">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {showModal && <AddRegistrationModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
