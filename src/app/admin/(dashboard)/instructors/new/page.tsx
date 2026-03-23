"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AvailableProgram {
    _id: string;
    name: string;
}

interface InstructorForm {
    firstName: string;
    lastName: string;
    title: string;
    bio: string;
    avatarFile: File | null;
    avatarPreview: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    assignedPrograms: string[];
    availability: "full-time" | "part-time" | "contract";
    isActive: boolean;
    showProfilePublic: boolean;
}

export default function AddInstructorPage() {
    const router = useRouter();
    const avatarRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availablePrograms, setAvailablePrograms] = useState<AvailableProgram[]>([]);

    // Fetch programs from API for the assignment checkboxes
    useEffect(() => {
        fetch("/api/programs")
            .then((res) => res.json())
            .then((data) => setAvailablePrograms(Array.isArray(data) ? data : []))
            .catch(() => { });
    }, []);

    const [form, setForm] = useState<InstructorForm>({
        firstName: "",
        lastName: "",
        title: "",
        bio: "",
        avatarFile: null,
        avatarPreview: "",
        email: "",
        phone: "",
        linkedin: "",
        location: "",
        assignedPrograms: [],
        availability: "full-time",
        showProfilePublic: true,
        isActive: true,
    });

    const update = <K extends keyof InstructorForm>(key: K, value: InstructorForm[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const toggleProgram = (id: string) => {
        setForm((prev) => ({
            ...prev,
            assignedPrograms: prev.assignedPrograms.includes(id)
                ? prev.assignedPrograms.filter((p) => p !== id)
                : [...prev.assignedPrograms, id],
        }));
    };

    const handleAvatarSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => update("avatarPreview", e.target?.result as string);
            reader.readAsDataURL(file);
            update("avatarFile", file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.title || !form.email) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setIsSubmitting(true);
        try {
            const payload = {
                firstName: form.firstName,
                lastName: form.lastName,
                professionalTitle: form.title,
                bio: form.bio || undefined,
                email: form.email,
                phone: form.phone || undefined,
                linkedInUrl: form.linkedin || undefined,
                location: form.location || undefined,
                assignedPrograms: form.assignedPrograms,
                availabilityStatus: form.availability,
                showProfilePublic: form.showProfilePublic,
                isActive: form.isActive,
                avatarUrl: "",
                avatarPublicId: "",
            };

            // If an image is selected, upload it first
            if (form.avatarFile) {
                const formData = new FormData();
                formData.append("file", form.avatarFile);
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!uploadRes.ok) throw new Error("Failed to upload image");
                const uploadData = await uploadRes.json();
                payload.avatarUrl = uploadData.url;
                payload.avatarPublicId = uploadData.publicId;
            }
            const res = await fetch("/api/instructors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                throw new Error(err?.error || `Failed to create instructor (${res.status})`);
            }
            toast.success("Instructor profile created!");
            router.push("/admin/instructors");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to create instructor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Back + Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/instructors"
                    className="flex items-center justify-center size-10 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 ">Add Instructor</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Create a new instructor profile and assign teaching programs.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* ── TOP SECTION: Avatar + Name + Bio ── */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={() => avatarRef.current?.click()}
                                className="relative group"
                            >
                                <div className={`flex size-28 items-center justify-center rounded-full border-2 border-dashed transition-all overflow-hidden ${form.avatarPreview
                                    ? "border-primary"
                                    : "border-slate-300 hover:border-primary"
                                    }`}>
                                    {form.avatarPreview ? (
                                        <img src={form.avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="material-symbols-outlined text-3xl text-slate-300 ">person</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </div>
                            </button>
                            <p className="text-xs text-slate-400">JPG, PNG or GIF. Max 2MB</p>
                            <input
                                ref={avatarRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleAvatarSelect(file);
                                }}
                            />
                        </div>

                        {/* Name + Title + Bio */}
                        <div className="flex-1 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 ">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={form.firstName}
                                        onChange={(e) => update("firstName", e.target.value)}
                                        placeholder="Sarah"
                                        className="h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 ">Last Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={form.lastName}
                                        onChange={(e) => update("lastName", e.target.value)}
                                        placeholder="Jenkins"
                                        className="h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Professional Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => update("title", e.target.value)}
                                    placeholder="e.g., Lead Developer Accelerator"
                                    className="h-11 px-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Professional Bio</label>
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => update("bio", e.target.value)}
                                    placeholder="A short biography highlighting experience, expertise, and teaching philosophy..."
                                    rows={4}
                                    maxLength={500}
                                    className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
                                />
                                <p className="text-xs text-slate-400 text-right">{form.bio.length}/500 characters</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM SECTION: Contact + Programs ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Details */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">contact_mail</span>
                            Contact Details
                        </h2>

                        <div className="space-y-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Email Address <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">mail</span>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        placeholder="sarah.jenkins@techschool.edu"
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">phone</span>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => update("phone", e.target.value)}
                                        placeholder="+1 555 000 0000"
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">LinkedIn Profile</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">link</span>
                                    <input
                                        type="url"
                                        value={form.linkedin}
                                        onChange={(e) => update("linkedin", e.target.value)}
                                        placeholder="https://linkedin.com/in/sarahjenkins"
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 ">Location</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">location_on</span>
                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) => update("location", e.target.value)}
                                        placeholder="Accra, Ghana"
                                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Assignment + Availability */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">school</span>
                                Program Assignment
                            </h2>

                            <div className="space-y-1">
                                {availablePrograms.length > 0 ? availablePrograms.map((prog) => {
                                    const isChecked = form.assignedPrograms.includes(prog._id);
                                    return (
                                        <label
                                            key={prog._id}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border ${isChecked
                                                ? "bg-primary/5 border-primary/20"
                                                : "border-transparent hover:bg-slate-50"
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleProgram(prog._id)}
                                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                            />
                                            <span className={`text-sm font-medium ${isChecked ? "text-slate-900 " : "text-slate-600 "}`}>
                                                {prog.name}
                                            </span>
                                        </label>
                                    );
                                }) : (
                                    <p className="text-sm text-slate-400 italic px-4 py-3">No programs available. Create a program first.</p>
                                )}
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-base font-bold text-slate-900 mb-4">Availability Status</h2>
                            <div className="space-y-2">
                                {[
                                    { value: "full-time" as const, label: "Full-time", desc: "Available for all scheduled sessions" },
                                    { value: "part-time" as const, label: "Part-time", desc: "Available for limited sessions per week" },
                                    { value: "contract" as const, label: "Contract", desc: "Available on a project or term basis" },
                                ].map((opt) => (
                                    <label
                                        key={opt.value}
                                        className={`flex items-start gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border ${form.availability === opt.value
                                            ? "bg-primary/5 border-primary/20"
                                            : "border-transparent hover:bg-slate-50"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="availability"
                                            value={opt.value}
                                            checked={form.availability === opt.value}
                                            onChange={() => update("availability", opt.value)}
                                            className="mt-0.5 h-4 w-4 border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                                        />
                                        <div>
                                            <p className={`text-sm font-semibold ${form.availability === opt.value ? "text-slate-900 " : "text-slate-600 "}`}>
                                                {opt.label}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── ACCOUNT SETTINGS ── */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-base font-bold text-slate-900 mb-5">Account Settings</h2>
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 ">Public Profile</p>
                                <p className="text-xs text-slate-500 mt-0.5">Make this instructor visible on the public website.</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={form.showProfilePublic}
                                onClick={() => update("showProfilePublic", !form.showProfilePublic)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.showProfilePublic ? "bg-primary" : "bg-slate-300"
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${form.showProfilePublic ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 ">Active</p>
                                <p className="text-xs text-slate-500 mt-0.5">Activate this instructor</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={form.isActive}
                                onClick={() => update("isActive", !form.isActive)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isActive ? "bg-primary" : "bg-slate-300"
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${form.isActive ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
                    <Link
                        href="/admin/instructors"
                        className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-sm">check</span>
                                Create Instructor
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
