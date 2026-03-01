const METRICS = [
  { label: "Total Registrations", value: "1,245", icon: "assignment", change: "+12%", color: "blue" },
  { label: "Active Visitors", value: "342", icon: "visibility", change: "+8%", color: "green" },
  { label: "New Leads", value: "89", icon: "person_add", change: "+23%", color: "purple" },
  { label: "Completion Rate", value: "94%", icon: "trending_up", change: "+3%", color: "amber" },
];

const RECENT_SIGNUPS = [
  { name: "John Doe", email: "john.d@example.com", program: "Developer Accelerator", date: "Mar 1, 2024", amount: "$5,000", status: "Enrolled" },
  { name: "Jane Smith", email: "jane.smith@web.com", program: "AI & Emerging Tech", date: "Feb 28, 2024", amount: "$8,500", status: "Pending" },
  { name: "Michael Brown", email: "m.brown99@tech.net", program: "Junior Coders", date: "Feb 27, 2024", amount: "$2,500", status: "Enrolled" },
  { name: "Emily Davis", email: "emily.d@design.io", program: "Adult Education", date: "Feb 26, 2024", amount: "$1,800", status: "Waitlist" },
  { name: "Chris Wilson", email: "cw.cloud@server.com", program: "Developer Accelerator", date: "Feb 25, 2024", amount: "$5,000", status: "Pending" },
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

function MetricColorClasses(color: string) {
  const map: Record<string, { bg: string; icon: string }> = {
    blue: { bg: "bg-blue-50 dark:bg-blue-900/30", icon: "text-primary" },
    green: { bg: "bg-green-50 dark:bg-green-900/30", icon: "text-green-600" },
    purple: { bg: "bg-purple-50 dark:bg-purple-900/30", icon: "text-purple-600" },
    amber: { bg: "bg-amber-50 dark:bg-amber-900/30", icon: "text-amber-600" },
  };
  return map[color] || map.blue;
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((m) => {
          const c = MetricColorClasses(m.color);
          return (
            <div key={m.label} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${c.bg}`}>
                  <span className={`material-symbols-outlined text-2xl ${c.icon}`}>{m.icon}</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-400/10 px-2 py-1 rounded-full">{m.change}</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{m.value}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Sign-ups Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Sign-ups</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage new student registrations and enrollment status.</p>
          </div>
          <a href="/admin/registrations" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Student Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Program</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {RECENT_SIGNUPS.map((s) => (
                <tr key={s.email} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{s.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{s.program}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{s.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">{s.amount}</td>
                  <td className="px-6 py-4"><StatusPill status={s.status} /></td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-primary-dark text-sm font-medium hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
