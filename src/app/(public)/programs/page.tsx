"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/cloudinary-client";

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
    bannerPublicId?: string;
    isPubliclyVisible: boolean;
    isRegistrationOpen: boolean;
    activeStudents: number;
    isFinancialAidEligible: boolean;
    curriculumHighlights: string[];
}

/* ─── Category tabs ───────────────────────────────────────────── */
const TABS = ["All Programs", "Beginner", "Intermediate", "Advanced"] as const;
type Tab = (typeof TABS)[number];

/* ─── Badge colours by difficulty ─────────────────────────────── */
function getBadgeClasses(level?: string) {
    switch (level) {
        case "Beginner":
            return "bg-blue-100 text-blue-800";
        case "Intermediate":
            return "bg-emerald-100 text-emerald-800";
        case "Advanced":
            return "bg-purple-100 text-purple-800";
        default:
            return "bg-orange-100 text-orange-800";
    }
}

/* ─── Fallback icon ───────────────────────────────────────────── */
function getFallbackIcon(name: string): string {
    const lower = name.toLowerCase();
    if (lower.includes("junior") || lower.includes("kid") || lower.includes("beginner"))
        return "child_care";
    if (lower.includes("ai") || lower.includes("machine") || lower.includes("data"))
        return "smart_toy";
    if (lower.includes("adult") || lower.includes("education"))
        return "school";
    if (lower.includes("web") || lower.includes("full") || lower.includes("developer"))
        return "code";
    if (lower.includes("cloud") || lower.includes("devops"))
        return "cloud";
    return "terminal";
}

/* ─── Skeleton Card ───────────────────────────────────────────── */
function ProgramCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-border-light animate-pulse">
            <div className="h-56 w-full bg-slate-200" />
            <div className="p-8 space-y-4">
                <div className="flex justify-between">
                    <div className="h-6 w-2/3 rounded bg-slate-200" />
                    <div className="h-6 w-16 rounded-full bg-slate-200" />
                </div>
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
                <div className="h-4 w-4/6 rounded bg-slate-200" />
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-4 w-20 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}

/* ─── Program Card ────────────────────────────────────────────── */
function ProgramCard({ program }: { program: Program }) {
    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-border-light hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="h-56 w-full overflow-hidden relative">
                {program.bannerPublicId ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url("${getImageUrl(program.bannerPublicId)}")` }}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="material-symbols-outlined text-7xl text-primary/30">
                            {getFallbackIcon(program.category || program.name)}
                        </span>
                    </div>
                )}
                {/* Overlay that fades on hover */}
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900">{program.name}</h3>
                    <p
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getBadgeClasses(
                            program.difficultyLevel
                        )}`}
                    >
                        {program.duration}
                    </p>
                </div>

                <p className="text-text-secondary mb-8 flex-1 leading-relaxed line-clamp-3">
                    {program.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        {program.activeStudents > 0 && (
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-primary">group</span>
                                {program.activeStudents} enrolled
                            </span>
                        )}
                        {program.isFinancialAidEligible && (
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
                                Aid Available
                            </span>
                        )}
                        {!program.isRegistrationOpen && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-200">
                                Closed
                            </span>
                        )}
                    </div>
                    <Link
                        href={`/programs/${program._id}`}
                        className="flex items-center gap-2 text-primary font-bold text-sm group/btn"
                    >
                        <span>Learn More</span>
                        <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ─── Page Component ──────────────────────────────────────────── */
export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("All Programs");

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const res = await fetch("/api/programs");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setPrograms(data.filter((p: Program) => p.isPubliclyVisible));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPrograms();
    }, []);

    /* Filtered programs based on active tab */
    const filtered = useMemo(() => {
        if (activeTab === "All Programs") return programs;
        return programs.filter((p) => p.difficultyLevel === activeTab);
    }, [programs, activeTab]);

    return (
        <div className="flex flex-col flex-1">
            {/* ─── Page Header ─────────────────────────────────────────── */}
            <section className="px-4 md:px-10 lg:px-20 pt-10 md:pt-16 pb-4">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                        <div className="max-w-2xl">
                            <h1 className="text-text-main text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                                Our Training Programs
                            </h1>
                            <p className="text-text-secondary text-lg font-normal leading-relaxed">
                                Master the most in-demand tech skills with our expert-led tracks
                                designed for every stage of your career.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-bold text-sm hover:bg-primary/20 transition-colors whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-xl">calendar_month</span>
                            <span>View Academic Schedule</span>
                        </Link>
                    </div>

                    {/* ─── Tab Navigation ──────────────────────────────────── */}
                    <div className="mb-8 overflow-x-auto">
                        <div className="flex border-b border-border-light gap-8 min-w-max">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex flex-col items-center justify-center border-b-2 pb-4 px-2 transition-colors text-sm font-bold tracking-wide cursor-pointer ${activeTab === tab
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-primary"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Programs Grid ───────────────────────────────────────── */}
            <section className="px-4 md:px-10 lg:px-20 pb-16">
                <div className="max-w-7xl mx-auto w-full">
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <ProgramCardSkeleton key={i} />
                            ))}
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                                error_outline
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                Unable to load programs
                            </h3>
                            <p className="text-text-secondary max-w-md">
                                Something went wrong while fetching the programs. Please try again later.
                            </p>
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                                local_library
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {activeTab === "All Programs"
                                    ? "No programs available at this time"
                                    : `No ${activeTab} programs available`}
                            </h3>
                            <p className="text-sm text-text-secondary max-w-md">
                                We&apos;re preparing exciting new programs. Check back soon or contact us for updates.
                            </p>
                        </div>
                    )}

                    {!loading && !error && filtered.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filtered.map((program) => (
                                <ProgramCard key={program._id} program={program} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ─── CTA Banner ──────────────────────────────────────────── */}
            <section className="px-4 md:px-10 lg:px-20 pb-16 md:pb-24">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900" />
                        <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 md:py-20 max-w-3xl mx-auto">
                            <h2 className="text-white text-3xl md:text-4xl font-black mb-6 leading-tight">
                                Not sure which track is right for you?
                            </h2>
                            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                                Take our personalized career assessment or speak with an
                                admissions advisor today to find your perfect path in tech.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                {/* <Link
                                    href="/register"
                                    className="flex items-center justify-center gap-2 min-w-[200px] h-14 bg-white text-primary rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
                                >
                                    <span className="material-symbols-outlined">quiz</span>
                                    Take Assessment
                                </Link> */}
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center gap-2 min-w-[200px] h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold transition-transform hover:scale-105 active:scale-95"
                                >
                                    <span className="material-symbols-outlined">support_agent</span>
                                    Contact Advisor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
