"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────── */
interface Program {
    _id: string;
    name: string;
    description: string;
    category?: string;
    duration: string;
    difficultyLevel?: string;
    price: number;
    bannerUrl?: string;
    isPubliclyVisible: boolean;
    isRegistrationOpen: boolean;
}

/* ─── Difficulty Level Badge Colors ───────────────────────────── */
function getBadgeClasses(level?: string): string {
    switch (level) {
        case "Beginner":
            return "bg-blue-50 text-blue-700 ring-blue-700/10";
        case "Intermediate":
            return "bg-purple-50 text-purple-700 ring-purple-700/10";
        case "Advanced":
            return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
        default:
            return "bg-emerald-50 text-emerald-700 ring-emerald-700/10";
    }
}

/* ─── Fallback thumbnail based on category ────────────────────── */
function getFallbackIcon(category?: string): string {
    if (category?.toLowerCase().includes("junior") || category?.toLowerCase().includes("beginner"))
        return "child_care";
    if (category?.toLowerCase().includes("ai") || category?.toLowerCase().includes("advanced"))
        return "smart_toy";
    if (category?.toLowerCase().includes("adult") || category?.toLowerCase().includes("education"))
        return "school";
    return "code";
}

/* ─── Skeleton Loader ─────────────────────────────────────────── */
function ProgramCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 animate-pulse">
            <div className="aspect-video w-full bg-slate-200" />
            <div className="p-6 space-y-3">
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-6 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-4 w-16 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

/* ─── Program Card ────────────────────────────────────────────── */
function ProgramCard({ program }: { program: Program }) {
    const slug = program._id;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-slate-100">
            {/* Thumbnail */}
            <div className="aspect-video w-full overflow-hidden bg-slate-200 relative">
                {program.bannerUrl ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url("${program.bannerUrl}")` }}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="material-symbols-outlined text-6xl text-primary/40">
                            {getFallbackIcon(program.category || program.name)}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center gap-2 flex-wrap">
                    <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getBadgeClasses(
                            program.difficultyLevel
                        )}`}
                    >
                        {program.difficultyLevel || program.category || "Program"}
                    </span>
                    {!program.isRegistrationOpen && (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                            Closed
                        </span>
                    )}
                </div>

                <h4 className="text-xl font-bold text-slate-900">
                    {program.name?.toUpperCase()}
                </h4>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {program.description}
                </p>

                {/* Duration & Tuition */}
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base text-primary">
                            schedule
                        </span>
                        {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base text-primary">
                            payments
                        </span>
                        GHS {program.price.toLocaleString()}
                    </span>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link
                        href={`/programs/${slug}`}
                        className="flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                        Learn More
                        <span className="material-symbols-outlined ml-1 text-sm">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function ProgramsGrid() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const res = await fetch("/api/programs");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                // Only show publicly visible programs
                setPrograms(data.filter((p: Program) => p.isPubliclyVisible));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPrograms();
    }, []);

    /* Loading State */
    if (loading) {
        return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProgramCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    /* Error State */
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">
                    error_outline
                </span>
                <p className="text-slate-500">
                    Unable to load programs. Please try again later.
                </p>
            </div>
        );
    }

    /* Empty State */
    if (programs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">
                    local_library
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No programs available at this time
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                    We&apos;re preparing exciting new programs. Check back soon or contact us for updates.
                </p>
            </div>
        );
    }

    /* Programs Grid */
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
                <ProgramCard key={program._id} program={program} />
            ))}
        </div>
    );
}
