"use client";

import useFetch from "@/hooks/useFetch";
import { InstructorType } from "@/types/common-types";

export default function InstructorsSection() {
    const { data: instructors, loading, error } = useFetch<InstructorType>("/api/instructors");

    if (error) {
        return (
            <section className="px-4 md:px-10 lg:px-20 py-20 md:py-24 bg-primary/5 text-center">
                <p className="text-red-500">Failed to load instructors.</p>
            </section>
        );
    }

    return (
        <section className="px-4 md:px-10 lg:px-20 py-20 md:py-24 bg-primary/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mx-auto">
                        <span className="material-symbols-outlined text-sm">groups</span>
                        Our People
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main">
                        Meet Our Team
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                        Our instructors are industry veterans with a passion for teaching.
                        We believe in mentorship that goes beyond the classroom.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // Loading Skeletons
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-border-light animate-pulse">
                                <div className="aspect-square mb-6 bg-slate-100 rounded-xl" />
                                <div className="h-6 bg-slate-100 rounded mb-3 w-3/4" />
                                <div className="h-4 bg-slate-100 rounded mb-3 w-1/2" />
                                <div className="space-y-2">
                                    <div className="h-3 bg-slate-100 rounded w-full" />
                                    <div className="h-3 bg-slate-100 rounded w-full" />
                                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                                </div>
                            </div>
                        ))
                    ) : (
                        instructors.map((member) => (
                            <div
                                key={member._id}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-1 border border-border-light"
                            >
                                <div className="aspect-square mb-6 overflow-hidden rounded-xl">
                                    {member.avatarUrl ? (
                                        <img
                                            alt={member.fullName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={member.avatarUrl}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <span className="material-symbols-outlined text-5xl">person</span>
                                        </div>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-text-main">
                                    {member.fullName}
                                </h4>
                                <p className="text-primary font-medium text-sm mb-3">
                                    {member.title || "Instructor"}
                                </p>
                                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                                    {member.bio || "No biography provided."}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
