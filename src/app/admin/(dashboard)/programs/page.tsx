"use client";

import { useState } from "react";
import Link from "next/link";

const PROGRAMS = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Master front-end and back-end technologies including React, Node.js, and SQL.",
    category: "Bootcamp",
    categoryColor: "purple",
    icon: "code",
    gradient: "from-violet-500 to-purple-600",
    duration: "4 months",
    students: 128,
    price: "$5,000",
    status: "Active",
  },
  {
    id: "ai-emerging",
    title: "AI & Emerging Tech",
    description: "Introduction to Artificial Intelligence, Machine Learning concepts and Ethics.",
    category: "Advanced",
    categoryColor: "blue",
    icon: "psychology",
    gradient: "from-blue-500 to-cyan-500",
    duration: "6 months",
    students: 85,
    price: "$8,500",
    status: "Active",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    description: "Learn network security, threat detection, and risk mitigation strategies.",
    category: "Professional",
    categoryColor: "red",
    icon: "security",
    gradient: "from-red-500 to-orange-500",
    duration: "5 months",
    students: 64,
    price: "$7,200",
    status: "Active",
  },
  {
    id: "uiux",
    title: "UI/UX Design Master",
    description: "Design intuitive user interfaces and seamless user experiences from scratch.",
    category: "Creative",
    categoryColor: "pink",
    icon: "palette",
    gradient: "from-pink-500 to-rose-500",
    duration: "3 months",
    students: 96,
    price: "$4,500",
    status: "Active",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    description: "AWS and Azure certification preparation with hands-on labs.",
    category: "Infrastructure",
    categoryColor: "amber",
    icon: "cloud",
    gradient: "from-amber-400 to-orange-500",
    duration: "4 months",
    students: 52,
    price: "$6,000",
    status: "Active",
  },
  {
    id: "data-science",
    title: "Data Science Bootcamp",
    description: "From Python basics to complex data modeling and visualization.",
    category: "Bootcamp",
    categoryColor: "green",
    icon: "insights",
    gradient: "from-emerald-500 to-teal-500",
    duration: "5 months",
    students: 73,
    price: "$7,800",
    status: "Archived",
  },
];

const TABS = ["All", "Active", "Archived"];

const PILL_COLORS: Record<string, string> = {
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400",
  red: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-400/10 dark:text-pink-400",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
};

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filtered = PROGRAMS.filter((p) => {
    if (activeTab === "All") return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Programs Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your course catalog and curriculum content.</p>
        </div>
        <Link
          href="/admin/programs/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all self-start"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Program
        </Link>
      </div>

      {/* Tabs + Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-white focus:ring-2 focus:ring-primary"
          >
            <option>Newest</option>
            <option>Most Students</option>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prog) => (
          <div
            key={prog.id}
            className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {/* Colorful Top Half */}
            <div className={`relative h-36 bg-gradient-to-br ${prog.gradient} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-white/90 text-6xl group-hover:scale-110 transition-transform">
                {prog.icon}
              </span>
              <div className="absolute top-3 right-3">
                <button className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
              <div className="mb-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PILL_COLORS[prog.categoryColor]}`}>
                  {prog.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{prog.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{prog.description}</p>

              {/* Bottom Stats */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Duration</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{prog.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Students</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{prog.students}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Price</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{prog.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create New Program Card */}
        <Link
          href="/admin/programs/new"
          className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all min-h-[320px] cursor-pointer"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Create New Program</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add a new course to the catalog</p>
        </Link>
      </div>
    </div>
  );
}
