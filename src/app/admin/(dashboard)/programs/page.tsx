"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { CardGridSkeleton, ErrorBanner, EmptyState } from "@/components/admin/DataStates";
import { IProgram } from "@/models/Program";
import { getImageUrl } from "@/lib/cloudinary-utils";

/* ─── Types ───────────────────────────────────────────────────── */
interface Program {
    _id: string;
    name: string;
    description: string;
    category?: string;
    duration: string;
    difficultyLevel?: string;
    price: number;
    isPubliclyVisible: boolean;
    isRegistrationOpen: boolean;
    activeStudents: number;
    bannerUrl?: string;
}

/* ─── Gradient & Icon by category ─────────────────────────────── */
function getCategoryStyle(cat?: string): { gradient: string; icon: string; pillColor: string } {
    const lower = (cat || "").toLowerCase();
    if (lower.includes("bootcamp") || lower.includes("developer")) return { gradient: "from-violet-500 to-purple-600", icon: "code", pillColor: "bg-purple-100 text-purple-700" };
    if (lower.includes("advanced") || lower.includes("ai")) return { gradient: "from-blue-500 to-cyan-500", icon: "psychology", pillColor: "bg-blue-100 text-blue-700" };
    if (lower.includes("security")) return { gradient: "from-red-500 to-orange-500", icon: "security", pillColor: "bg-red-100 text-red-700" };
    if (lower.includes("design") || lower.includes("creative")) return { gradient: "from-pink-500 to-rose-500", icon: "palette", pillColor: "bg-pink-100 text-pink-700" };
    if (lower.includes("cloud") || lower.includes("infrastructure")) return { gradient: "from-amber-400 to-orange-500", icon: "cloud", pillColor: "bg-amber-100 text-amber-700" };
    if (lower.includes("data")) return { gradient: "from-emerald-500 to-teal-500", icon: "insights", pillColor: "bg-emerald-100 text-emerald-700" };
    if (lower.includes("adult") || lower.includes("education")) return { gradient: "from-indigo-500 to-blue-600", icon: "school", pillColor: "bg-indigo-100 text-indigo-700" };
    if (lower.includes("junior") || lower.includes("beginner")) return { gradient: "from-sky-400 to-blue-500", icon: "child_care", pillColor: "bg-sky-100 text-sky-700" };
    return { gradient: "from-slate-500 to-slate-600", icon: "menu_book", pillColor: "bg-slate-100 text-slate-700 " };
}

const TABS = ["All", "Active", "Archived"];

export default function ProgramsPage() {
    const { data: programs, loading, error, refetch } = useFetch<IProgram>("/api/programs");
    console.log("programs", programs)
    const [activeTab, setActiveTab] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = programs.filter((p) => {
        if (activeTab === "All") return true;
        if (activeTab === "Active") return p.isPubliclyVisible;
        if (activeTab === "Archived") return !p.isPubliclyVisible;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "Most Students") return b.activeStudents - a.activeStudents;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Price: Low to High") return a.price - b.price;
        return 0; // Newest — already sorted by createdAt desc from API
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 ">Programs Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your course catalog and curriculum content.</p>
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
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === tab
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 ">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:ring-2 focus:ring-primary"
                    >
                        <option>Newest</option>
                        <option>Most Students</option>
                        <option>Price: High to Low</option>
                        <option>Price: Low to High</option>
                    </select>
                    <button onClick={refetch} className="h-9 px-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 transition-all" title="Refresh">
                        <span className="material-symbols-outlined text-lg">refresh</span>
                    </button>
                </div>
            </div>

            {/* Cards Grid */}
            {loading ? (
                <CardGridSkeleton count={6} />
            ) : error ? (
                <ErrorBanner message={error} onRetry={refetch} />
            ) : sorted.length === 0 ? (
                <EmptyState icon="school" title="No programs found" subtitle="Create your first program to get started." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sorted.map((prog) => {
                        const style = getCategoryStyle(prog.category || prog.name);
                        return (
                            <div
                                key={prog._id?.toString()}
                                className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                {/* Colorful Top Half */}
                                <div className={`relative h-46 bg-gradient-to-br ${style.gradient} flex items-center justify-center overflow-hidden`}>
                                    {prog.bannerPublicId ? (
                                        <img
                                            src={getImageUrl(prog.bannerPublicId)}
                                            // src={prog.bannerUrl}
                                            alt={prog.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-white/90 text-6xl group-hover:scale-110 transition-transform">
                                            {style.icon}
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                    {!prog.isPubliclyVisible && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                                                Archived
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3" ref={openMenuId === prog._id?.toString() ? menuRef : null}>
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === prog._id?.toString() ? null : prog._id?.toString())}
                                            className="p-1.5 rounded-lg bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">more_vert</span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {openMenuId === prog._id?.toString() && (
                                            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-100 py-2 z-20 overflow-hidden text-left">
                                                <Link
                                                    href={`/admin/programs/${prog._id?.toString()}/edit`}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 /50 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    Edit Program
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setOpenMenuId(null);
                                                        alert("Delete program functionality coming soon");
                                                    }}
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    Delete Program
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <div className="mb-3">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.pillColor}`}>
                                            {prog.category || prog.difficultyLevel || "Program"}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{prog.name}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{prog.description}</p>

                                    {/* Bottom Stats */}
                                    <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Duration</p>
                                            <p className="text-sm font-bold text-slate-900 mt-0.5">{prog.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Students</p>
                                            <p className="text-sm font-bold text-slate-900 mt-0.5">{prog.activeStudents}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">Price</p>
                                            <p className="text-sm font-bold text-slate-900 mt-0.5">GHS {prog.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Create New Program Card */}
                    <Link
                        href="/admin/programs/new"
                        className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5 transition-all min-h-[320px] cursor-pointer"
                    >
                        <div className="flex size-14 items-center justify-center rounded-full bg-slate-200 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <p className="text-base font-bold text-slate-500 group-hover:text-primary transition-colors">Create New Program</p>
                        <p className="text-xs text-slate-400 mt-1">Add a new course to the catalog</p>
                    </Link>
                </div>
            )}
        </div>
    );
}
