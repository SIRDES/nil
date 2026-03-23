"use client";

import { useState } from "react";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { CardGridSkeleton, ErrorBanner, EmptyState } from "@/components/admin/DataStates";
import toast from "react-hot-toast";

/* ─── Types ───────────────────────────────────────────────────── */
interface Instructor {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    title?: string;
    bio?: string;
    specializations: string[];
    availabilityStatus: string;
    assignedPrograms: { _id: string; name: string }[] | string[];
    avatarUrl?: string;
}

/* ─── Avatar Colors ───────────────────────────────────────────── */
const AVATAR_COLORS = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-amber-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-emerald-500",
];

const PROGRAM_PILL_COLORS = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-cyan-100 text-cyan-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
    "bg-red-100 text-red-700",
    "bg-teal-100 text-teal-700",
];

function getInitials(first: string, last: string) {
    return `${first[0] || ""}${last[0] || ""}`.toUpperCase();
}

function getColorByIndex(i: number, palette: string[]) {
    return palette[i % palette.length];
}

/* ─── Status Pill ─────────────────────────────────────────────── */
function AvailabilityPill({ status }: { status: string }) {
    const classes: Record<string, string> = {
        "full-time": "bg-green-50 text-green-700 ring-green-600/20",
        "part-time": "bg-amber-50 text-amber-700 ring-amber-600/20",
        "contract": "bg-red-50 text-red-700 ring-red-600/20",
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${classes[status] || "bg-slate-100 text-slate-600 ring-slate-400/20"}`}>
            {status?.toUpperCase()}
        </span>
    );
}

/* ─── Metric Cards ────────────────────────────────────────────── */
function MetricBg(color: string) {
    const map: Record<string, { bg: string; icon: string }> = {
        blue: { bg: "bg-blue-50", icon: "text-blue-600" },
        green: { bg: "bg-green-50", icon: "text-green-600" },
        amber: { bg: "bg-amber-50", icon: "text-amber-600" },
        purple: { bg: "bg-purple-50", icon: "text-purple-600" },
    };
    return map[color] || map.blue;
}

/* ─── Page Component ──────────────────────────────────────────── */
export default function InstructorsPage() {
    const { data: instructors, loading, error, refetch } = useFetch<Instructor>("/api/instructors");
    const [searchQuery, setSearchQuery] = useState("");

    const available = instructors.filter((i) => i.availabilityStatus === "Available").length;

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete instructor ${name}?`)) return;

        try {
            const res = await fetch(`/api/instructors/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete instructor");
            toast.success("Instructor deleted successfully");
            refetch();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Error deleting instructor");
        }
    };

    const metrics = [
        { label: "Active Instructors", value: String(available), icon: "people", color: "blue" },
        { label: "Total Instructors", value: String(instructors.length), icon: "school", color: "green" },
        { label: "On Leave", value: String(instructors.filter((i) => i.availabilityStatus === "On Leave").length), icon: "event_busy", color: "amber" },
        { label: "Unavailable", value: String(instructors.filter((i) => i.availabilityStatus === "Unavailable").length), icon: "person_off", color: "purple" },
    ];

    const filtered = instructors.filter(
        (inst) =>
            `${inst.firstName} ${inst.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inst.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Instructors Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage instructor profiles, assignments and communications.</p>
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
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m) => {
                        const c = MetricBg(m.color);
                        return (
                            <div key={m.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${c.bg}`}>
                                        <span className={`material-symbols-outlined text-xl ${c.icon}`}>{m.icon}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 ">{m.value}</h3>
                                <p className="text-sm text-slate-500 mt-0.5">{m.label}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">All Instructors</h2>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2 border border-transparent focus-within:ring-2 focus-within:ring-primary w-64">
                        <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
                        <input
                            type="text"
                            placeholder="Search instructors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
                        />
                    </div>
                    <button onClick={refetch} className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 transition-all" title="Refresh">
                        <span className="material-symbols-outlined text-lg">refresh</span>
                    </button>
                </div>
            </div>

            {/* Instructor Cards Grid */}
            {loading ? (
                <CardGridSkeleton count={6} />
            ) : error ? (
                <ErrorBanner message={error} onRetry={refetch} />
            ) : filtered.length === 0 ? (
                <EmptyState icon="person_off" title="No instructors found" subtitle="Add your first instructor to get started." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((inst, idx) => {
                        const fullName = `${inst.firstName} ${inst.lastName}`;
                        const initials = getInitials(inst.firstName, inst.lastName);
                        const avatarColor = getColorByIndex(idx, AVATAR_COLORS);

                        return (
                            <div key={inst._id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6">
                                {/* Top — Avatar + Info */}
                                <div className="flex items-start gap-4 mb-4">
                                    {inst.avatarUrl ? (
                                        <img src={inst.avatarUrl} alt={fullName} className="size-14 rounded-full object-cover shrink-0" />
                                    ) : (
                                        <div className={`flex size-14 items-center justify-center rounded-full text-white text-lg font-bold shrink-0 ${avatarColor}`}>
                                            {initials}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-slate-900 truncate">{fullName}</h3>
                                        <p className="text-sm text-slate-500 truncate">{inst.title || inst.email}</p>
                                        <div className="mt-1.5">
                                            <AvailabilityPill status={inst.availabilityStatus} />
                                        </div>
                                    </div>
                                </div>

                                {/* Assigned Programs pills */}
                                <div className="mb-5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Assigned Programs</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {inst.assignedPrograms.length > 0 ? (
                                            inst.assignedPrograms.map((prog, pIdx) => {
                                                const progName = typeof prog === "object" ? prog.name : prog;
                                                return (
                                                    <span
                                                        key={typeof prog === "object" ? prog._id : pIdx}
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getColorByIndex(pIdx, PROGRAM_PILL_COLORS)}`}
                                                    >
                                                        {progName}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No programs assigned</span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                    <Link
                                        href={`/admin/instructors/${inst._id}`}
                                        className="flex text-xs items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">visibility</span>

                                    </Link>
                                    <Link
                                        href={`/admin/instructors/${inst._id}/edit`}
                                        className="flex-1 text-xs flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(inst._id, fullName)}
                                        className="flex text-xs items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">delete</span>

                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
