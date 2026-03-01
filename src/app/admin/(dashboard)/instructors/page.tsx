"use client";

import Link from "next/link";

const METRICS = [
  { label: "Active Instructors", value: "42", icon: "people", change: "+4", color: "blue" },
  { label: "Total Courses", value: "18", icon: "school", change: "+2", color: "green" },
  { label: "Avg. Rating", value: "4.8/5", icon: "star", change: "+0.2", color: "amber" },
  { label: "Pending Reviews", value: "5", icon: "rate_review", change: "−1", color: "purple" },
];

const INSTRUCTORS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Lead Developer Accelerator",
    avatar: "SJ",
    avatarColor: "bg-violet-500",
    rating: 4.9,
    reviews: 128,
    programs: [
      { name: "Full Stack Dev", color: "bg-violet-100 text-violet-700 dark:bg-violet-400/10 dark:text-violet-400" },
      { name: "React Advanced", color: "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400" },
    ],
  },
  {
    id: 2,
    name: "David Chen",
    title: "Senior Data Scientist",
    avatar: "DC",
    avatarColor: "bg-blue-500",
    rating: 4.8,
    reviews: 95,
    programs: [
      { name: "Data Science", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400" },
      { name: "AI & ML", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400" },
    ],
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Head of Design",
    avatar: "ER",
    avatarColor: "bg-pink-500",
    rating: 4.7,
    reviews: 84,
    programs: [
      { name: "UI/UX Design", color: "bg-pink-100 text-pink-700 dark:bg-pink-400/10 dark:text-pink-400" },
      { name: "Figma Pro", color: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400" },
    ],
  },
  {
    id: 4,
    name: "Marcus Johnson",
    title: "Cybersecurity Expert",
    avatar: "MJ",
    avatarColor: "bg-red-500",
    rating: 4.9,
    reviews: 112,
    programs: [
      { name: "Cybersecurity", color: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400" },
      { name: "Network Sec.", color: "bg-orange-100 text-orange-700 dark:bg-orange-400/10 dark:text-orange-400" },
    ],
  },
  {
    id: 5,
    name: "Priya Patel",
    title: "Cloud Architect",
    avatar: "PP",
    avatarColor: "bg-amber-500",
    rating: 4.6,
    reviews: 67,
    programs: [
      { name: "Cloud Computing", color: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400" },
      { name: "DevOps", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400" },
    ],
  },
  {
    id: 6,
    name: "Alex Thompson",
    title: "Mobile Dev Lead",
    avatar: "AT",
    avatarColor: "bg-teal-500",
    rating: 4.8,
    reviews: 91,
    programs: [
      { name: "Mobile Dev", color: "bg-teal-100 text-teal-700 dark:bg-teal-400/10 dark:text-teal-400" },
      { name: "React Native", color: "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400" },
    ],
  },
];

function MetricBg(color: string) {
  const map: Record<string, { bg: string; icon: string }> = {
    blue: { bg: "bg-blue-50 dark:bg-blue-900/30", icon: "text-blue-600" },
    green: { bg: "bg-green-50 dark:bg-green-900/30", icon: "text-green-600" },
    amber: { bg: "bg-amber-50 dark:bg-amber-900/30", icon: "text-amber-600" },
    purple: { bg: "bg-purple-50 dark:bg-purple-900/30", icon: "text-purple-600" },
  };
  return map[color] || map.blue;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-base ${
            i < full ? "text-amber-400" : i === full && hasHalf ? "text-amber-400" : "text-slate-300 dark:text-slate-600"
          }`}
          style={i < full ? { fontVariationSettings: "'FILL' 1" } : i === full && hasHalf ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {i < full ? "star" : i === full && hasHalf ? "star_half" : "star"}
        </span>
      ))}
    </div>
  );
}

export default function InstructorsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Instructors Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage instructor profiles, assignments and communications.</p>
        </div>
        <Link
          href="/admin/instructors/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all self-start"
        >
          <span className="material-symbols-outlined text-lg">person_add</span>
          Add Instructor
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((m) => {
          const c = MetricBg(m.color);
          return (
            <div key={m.label} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${c.bg}`}>
                  <span className={`material-symbols-outlined text-xl ${c.icon}`}>{m.icon}</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-400/10 px-2 py-0.5 rounded-full">{m.change}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{m.value}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Instructors</h2>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 border border-transparent focus-within:ring-2 focus-within:ring-primary w-64">
          <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
          <input type="text" placeholder="Search instructors..." className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 dark:text-white placeholder:text-slate-400 w-full" />
        </div>
      </div>

      {/* Instructor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSTRUCTORS.map((inst) => (
          <div key={inst.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-6">
            {/* Top - Avatar + Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className={`flex size-14 items-center justify-center rounded-full text-white text-lg font-bold shrink-0 ${inst.avatarColor}`}>
                {inst.avatar}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{inst.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{inst.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating rating={inst.rating} />
                  <span className="text-xs text-slate-400 dark:text-slate-500">({inst.reviews})</span>
                </div>
              </div>
            </div>

            {/* Assigned Programs pills */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Assigned Programs</p>
              <div className="flex flex-wrap gap-1.5">
                {inst.programs.map((prog) => (
                  <span key={prog.name} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${prog.color}`}>
                    {prog.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
                Edit Profile
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-base">mail</span>
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
