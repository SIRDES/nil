"use client";

import { useState, useRef, useEffect, use } from "react";
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
  sendWelcomeEmail: boolean;
  publicProfile: boolean;
}

export default function EditInstructorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [availablePrograms, setAvailablePrograms] = useState<AvailableProgram[]>([]);

  // Fetch programs from API for the assignment checkboxes
  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => setAvailablePrograms(Array.isArray(data) ? data : []))
      .catch(() => {});
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
    sendWelcomeEmail: true,
    publicProfile: true,
  });

  // Fetch instructor data on load
  useEffect(() => {
    async function loadInstructor() {
      try {
        const res = await fetch(`/api/instructors/${id}`);
        if (!res.ok) throw new Error("Instructor not found");
        const data = await res.json();
        
        let availability: "full-time" | "part-time" | "contract" = "full-time";
        if (data.availabilityStatus === "Part-time") availability = "part-time";
        // Convert array of objects to array of ids
        const assignedProgramIds = data.assignedPrograms ? data.assignedPrograms.map((p: any) => typeof p === 'string' ? p : p._id) : [];

        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          title: data.professionalTitle || "",
          bio: data.bio || "",
          avatarFile: null,
          avatarPreview: data.avatarUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          linkedin: data.linkedInUrl || "",
          location: data.location || "",
          assignedPrograms: assignedProgramIds,
          availability: data.availabilityStatus === "Active" ? "full-time" : data.availabilityStatus === "On Leave" ? "contract" : "full-time",
          sendWelcomeEmail: true,
          publicProfile: true,
        });
      } catch (err) {
        toast.error("Failed to load instructor data");
        router.push("/admin/instructors");
      } finally {
        setIsLoading(false);
      }
    }
    loadInstructor();
  }, [id, router]);

  const update = <K extends keyof InstructorForm>(key: K, value: InstructorForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleProgram = (programId: string) => {
    setForm((prev) => ({
      ...prev,
      assignedPrograms: prev.assignedPrograms.includes(programId)
        ? prev.assignedPrograms.filter((p) => p !== programId)
        : [...prev.assignedPrograms, programId],
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
        availabilityStatus: form.availability === "full-time" ? "Active" : "On Leave",
      };
      const res = await fetch(`/api/instructors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `Failed to update instructor (${res.status})`);
      }
      toast.success("Instructor profile updated!");
      router.push("/admin/instructors");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update instructor.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/instructors"
            className="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Edit Instructor</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Update the instructor profile and program assignments.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/instructors/${id}`}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            View Profile
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── TOP SECTION: Avatar + Name + Bio ── */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => avatarRef.current?.click()}
                className="relative group"
              >
                <div className={`flex size-28 items-center justify-center rounded-full border-2 border-dashed transition-all overflow-hidden ${
                  form.avatarPreview
                    ? "border-primary"
                    : "border-slate-300 dark:border-slate-600 hover:border-primary"
                }`}>
                  {form.avatarPreview ? (
                    <img src={form.avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600">person</span>
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
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Sarah"
                    className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Jenkins"
                    className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g., Lead Developer Accelerator"
                  className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="A short biography highlighting experience, expertise, and teaching philosophy..."
                  rows={4}
                  maxLength={500}
                  className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
                />
                <p className="text-xs text-slate-400 text-right">{form.bio.length}/500 characters</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION: Contact + Programs ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">contact_mail</span>
              Contact Details
            </h2>

            <div className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">mail</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="sarah.jenkins@techschool.edu"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">link</span>
                  <input
                    type="url"
                    value={form.linkedin}
                    onChange={(e) => update("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/sarahjenkins"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">location_on</span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Accra, Ghana"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Program Assignment + Availability */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">school</span>
                Program Assignment
              </h2>

              <div className="space-y-1">
                {availablePrograms.length > 0 ? availablePrograms.map((prog) => {
                  const isChecked = form.assignedPrograms.includes(prog._id);
                  return (
                    <label
                      key={prog._id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border ${
                        isChecked
                          ? "bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30"
                          : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleProgram(prog._id)}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-700 dark:checked:bg-primary cursor-pointer"
                      />
                      <span className={`text-sm font-medium ${isChecked ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
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
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Availability Status</h2>
              <div className="space-y-2">
                {[
                  { value: "full-time" as const, label: "Full-time", desc: "Available for all scheduled sessions" },
                  { value: "part-time" as const, label: "Part-time", desc: "Available for limited sessions per week" },
                  { value: "contract" as const, label: "Contract", desc: "Available on a project or term basis" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border ${
                      form.availability === opt.value
                        ? "bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <input
                      type="radio"
                      name="availability"
                      value={opt.value}
                      checked={form.availability === opt.value}
                      onChange={() => update("availability", opt.value)}
                      className="mt-0.5 h-4 w-4 border-slate-300 text-primary focus:ring-primary/20 dark:border-slate-600 cursor-pointer"
                    />
                    <div>
                      <p className={`text-sm font-semibold ${form.availability === opt.value ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ACCOUNT SETTINGS ── */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Account Settings</h2>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Send Welcome Email</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically send login credentials to the new instructor.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.sendWelcomeEmail}
                onClick={() => update("sendWelcomeEmail", !form.sendWelcomeEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.sendWelcomeEmail ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${form.sendWelcomeEmail ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Public Profile</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Make this instructor visible on the public website.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.publicProfile}
                onClick={() => update("publicProfile", !form.publicProfile)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.publicProfile ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${form.publicProfile ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/admin/instructors"
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">check</span>
                Save Updates
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
