"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────── */
interface Program {
  _id: string;
  name: string;
  description: string;
  category?: string;
  duration: string;
  difficultyLevel?: string;
  curriculumHighlights: string[];
  price: number;
  isFinancialAidEligible: boolean;
  isRegistrationOpen: boolean;
  bannerUrl?: string;
  activeStudents: number;
}

/* ─── Skeleton ────────────────────────────────────────────────── */
function DetailSkeleton() {
  return (
    <div className="flex-grow animate-pulse">
      <section className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col gap-6 max-w-2xl flex-1">
              <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-12 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-20 w-full rounded bg-slate-200 dark:bg-slate-700" />
              <div className="flex gap-4">
                <div className="h-10 w-36 rounded-lg bg-slate-200 dark:bg-slate-700" />
                <div className="h-10 w-36 rounded-lg bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
            <div className="h-48 w-full md:w-80 rounded-xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function ProgramDetail() {
  const params = useParams();
  const id = params.id as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProgram() {
      try {
        const res = await fetch(`/api/programs/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProgram(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProgram();
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error || !program) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-32 text-center">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
          search_off
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Program Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          The program you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/#programs"
          className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-all"
        >
          Browse All Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent dark:from-primary/20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-6 max-w-2xl">
              {program.isRegistrationOpen && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                  Accepting Applications
                </div>
              )}
              {!program.isRegistrationOpen && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-400/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="size-2 rounded-full bg-red-500"></span>
                  Registration Closed
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-white leading-tight tracking-tight">
                {program.name}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary dark:text-gray-400 max-w-xl leading-relaxed">
                {program.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span className="text-sm font-semibold text-text-main dark:text-white">{program.duration}</span>
                </div>
                {program.difficultyLevel && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                    <span className="material-symbols-outlined text-primary">signal_cellular_alt</span>
                    <span className="text-sm font-semibold text-text-main dark:text-white">{program.difficultyLevel}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-background-dark rounded-lg border border-border-light dark:border-border-dark">
                  <span className="material-symbols-outlined text-primary">workspace_premium</span>
                  <span className="text-sm font-semibold text-text-main dark:text-white">Certificate Included</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-primary/5 border border-border-light dark:border-border-dark md:min-w-[320px]">
                <p className="text-sm text-text-secondary dark:text-gray-400 font-medium mb-1">Tuition</p>
                <p className="text-3xl font-black text-text-main dark:text-white mb-1">
                  ${program.price.toLocaleString()}
                </p>
                {program.isFinancialAidEligible && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                    💰 Financial Aid Eligible
                  </p>
                )}
                {!program.isFinancialAidEligible && (
                  <div className="mb-4" />
                )}
                {program.isRegistrationOpen ? (
                  <Link href="/register" className="w-full py-3 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                    <span>Apply Now</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                ) : (
                  <button disabled className="w-full py-3 px-6 rounded-lg bg-slate-300 text-slate-500 font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2">
                    Registration Closed
                  </button>
                )}
                <p className="text-xs text-center text-text-secondary dark:text-gray-500 mt-3">
                  {program.activeStudents > 0
                    ? `${program.activeStudents} students currently enrolled.`
                    : "Limited seats available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          
          {/* Curriculum Highlights */}
          {program.curriculumHighlights && program.curriculumHighlights.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h2 className="text-3xl font-bold text-text-main dark:text-white">Curriculum Highlights</h2>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-border-light dark:border-border-dark overflow-hidden">
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {program.curriculumHighlights.map((item, index) => (
                    <label key={index} className="flex items-start gap-4 p-5 hover:bg-background-light dark:hover:bg-gray-700/50 cursor-pointer transition-colors group">
                      <div className="relative flex items-center mt-0.5">
                        <input type="checkbox" checked={true} disabled className="peer h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"/>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-text-main dark:text-white group-hover:text-primary transition-colors">{item}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Program Info */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <h2 className="text-3xl font-bold text-text-main dark:text-white">About This Program</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary dark:text-gray-300 text-lg leading-relaxed">
                {program.description}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Quick Facts */}
          <div className="bg-primary text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-6 relative z-10">Program Details</h3>
            <div className="space-y-5 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">schedule</span>
                </div>
                <div>
                  <p className="text-lg font-bold">{program.duration}</p>
                  <p className="text-white/80 text-sm">Duration</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">payments</span>
                </div>
                <div>
                  <p className="text-lg font-bold">${program.price.toLocaleString()}</p>
                  <p className="text-white/80 text-sm">Tuition</p>
                </div>
              </div>
              {program.difficultyLevel && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">signal_cellular_alt</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{program.difficultyLevel}</p>
                    <p className="text-white/80 text-sm">Difficulty Level</p>
                  </div>
                </div>
              )}
              {program.category && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">category</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{program.category}</p>
                    <p className="text-white/80 text-sm">Category</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="sticky top-24 z-10 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg border border-primary/20">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-text-secondary dark:text-gray-400">Tuition</span>
                <span className="text-xl font-bold text-text-main dark:text-white">${program.price.toLocaleString()}</span>
              </div>
              <div className="h-px bg-border-light dark:border-border-dark"></div>
              {program.isFinancialAidEligible && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center font-medium">Flexible payment plans and scholarships available.</p>
              )}
              {program.isRegistrationOpen ? (
                <Link href="/register" className="w-full mt-2 py-3 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                  Register Now
                </Link>
              ) : (
                <button disabled className="w-full mt-2 py-3 px-6 rounded-lg bg-slate-300 text-slate-500 font-bold cursor-not-allowed">
                  Registration Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
