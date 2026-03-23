"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InstructorData {
    _id: string;
    firstName: string;
    lastName: string;
    professionalTitle: string;
    bio?: string;
    avatarUrl?: string;
    email: string;
    phone?: string;
    linkedInUrl?: string;
    location?: string;
    assignedPrograms: Array<{ _id: string; name: string }>;
    availabilityStatus: string;
    createdAt: string;
}

export default function ViewInstructorPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [instructor, setInstructor] = useState<InstructorData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadInstructor() {
            try {
                const res = await fetch(`/api/instructors/${id}`);
                if (!res.ok) throw new Error("Instructor not found");
                const data = await res.json();
                setInstructor(data);
            } catch (err) {
                toast.error("Failed to load instructor data");
                router.push("/admin/instructors");
            } finally {
                setIsLoading(false);
            }
        }
        loadInstructor();
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <svg className="h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        );
    }

    if (!instructor) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/instructors"
                        className="flex items-center justify-center size-10 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 ">Instructor Profile</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Viewing details for {instructor.firstName} {instructor.lastName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/instructors/${id}/edit`}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Edit Profile
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center">
                        <div className="size-32 rounded-full overflow-hidden mb-4 border-4 border-slate-50">
                            {instructor.avatarUrl ? (
                                <img src={instructor.avatarUrl} alt={`${instructor.firstName} ${instructor.lastName}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-5xl">person</span>
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 ">{instructor.firstName} {instructor.lastName}</h2>
                        <p className="text-sm font-medium text-primary mt-1">{instructor.professionalTitle}</p>

                        <div className="mt-4 flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${instructor.availabilityStatus === "Active"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}>
                                {instructor.availabilityStatus}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">contact_page</span>
                            Contact Information
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">mail</span>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 ">Email Address</p>
                                    <a href={`mailto:${instructor.email}`} className="text-sm font-medium text-slate-900 hover:text-primary transition-colors">{instructor.email}</a>
                                </div>
                            </div>

                            {instructor.phone && (
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">phone</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 ">Phone Number</p>
                                        <a href={`tel:${instructor.phone}`} className="text-sm font-medium text-slate-900 hover:text-primary transition-colors">{instructor.phone}</a>
                                    </div>
                                </div>
                            )}

                            {instructor.location && (
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">location_on</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 ">Location</p>
                                        <p className="text-sm font-medium text-slate-900 ">{instructor.location}</p>
                                    </div>
                                </div>
                            )}

                            {instructor.linkedInUrl && (
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">link</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 ">LinkedIn Profile</p>
                                        <a href={instructor.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline break-all">
                                            {instructor.linkedInUrl}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio & Programs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">person_book</span>
                            Professional Biography
                        </h3>
                        {instructor.bio ? (
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {instructor.bio}
                            </p>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No biography provided.</p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                            Assigned Programs
                        </h3>

                        {instructor.assignedPrograms && instructor.assignedPrograms.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {instructor.assignedPrograms.map((prog) => (
                                    <Link
                                        key={prog._id}
                                        href={`/admin/programs`}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">menu_book</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                                                {prog.name}
                                            </p>
                                            <p className="text-xs text-slate-500 ">Program</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-lg border border-dashed border-slate-200 text-center">
                                This instructor is not assigned to any programs yet.
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-sm text-slate-500 ">
                        Added to TechSchool on {new Date(instructor.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    );
}
