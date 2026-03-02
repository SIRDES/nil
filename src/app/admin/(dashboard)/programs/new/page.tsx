"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProgramFormData {
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  curriculumHighlights: string[];
  bannerFile: File | null;
  bannerPreview: string;
  price: string;
  isPublished: boolean;
  enrollmentOpen: boolean;
}

export default function AddProgramPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<ProgramFormData>({
    name: "",
    description: "",
    duration: "",
    difficulty: "",
    curriculumHighlights: [""],
    bannerFile: null,
    bannerPreview: "",
    price: "",
    isPublished: true,
    enrollmentOpen: true,
  });

  const updateField = <K extends keyof ProgramFormData>(key: K, value: ProgramFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Curriculum highlights handlers
  const addHighlight = () => {
    setForm((prev) => ({ ...prev, curriculumHighlights: [...prev.curriculumHighlights, ""] }));
  };

  const updateHighlight = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...prev.curriculumHighlights];
      updated[index] = value;
      return { ...prev, curriculumHighlights: updated };
    });
  };

  const removeHighlight = (index: number) => {
    setForm((prev) => ({
      ...prev,
      curriculumHighlights: prev.curriculumHighlights.filter((_, i) => i !== index),
    }));
  };

  // File upload handlers
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField("bannerPreview", e.target?.result as string);
      };
      reader.readAsDataURL(file);
      updateField("bannerFile", file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.duration || !form.price) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        duration: form.duration,
        difficultyLevel: form.difficulty || undefined,
        curriculumHighlights: form.curriculumHighlights.filter((h) => h.trim() !== ""),
        price: parseFloat(form.price),
        isPubliclyVisible: form.isPublished,
        isRegistrationOpen: form.enrollmentOpen,
      };
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || `Failed to create program (${res.status})`);
      }
      toast.success("Program created successfully!");
      router.push("/admin/programs");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create program.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/programs"
          className="flex items-center justify-center size-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Add New Program</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Create a new course and configure its details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Program Information */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">info</span>
                Program Information
              </h2>

              <div className="space-y-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Program Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g., Full Stack Web Development"
                    className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description <span className="text-red-500">*</span></label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Brief summary displayed on the course card (max 200 words)."
                    rows={4}
                    maxLength={1000}
                    className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none"
                  />
                  <p className="text-xs text-slate-400 text-right">{form.description.length}/1000</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Duration <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => updateField("duration", e.target.value)}
                      placeholder="e.g., 4 months"
                      className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Difficulty Level</label>
                    <select
                      value={form.difficulty}
                      onChange={(e) => updateField("difficulty", e.target.value)}
                      className="h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    >
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Highlights */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">list_alt</span>
                Curriculum Highlights
              </h2>

              <div className="space-y-3">
                {form.curriculumHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder={`Curriculum point ${index + 1}`}
                      className="flex-1 h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                    />
                    {form.curriculumHighlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="p-2 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addHighlight}
                className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Add Point
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN (1/3) ── */}
          <div className="space-y-8">
            {/* Banner Upload */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">image</span>
                Program Banner
              </h2>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all ${
                  isDragging
                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                    : "border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {form.bannerPreview ? (
                  <div className="relative w-full">
                    <img src={form.bannerPreview} alt="Banner preview" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateField("bannerFile", null);
                        updateField("bannerPreview", "");
                      }}
                      className="absolute top-2 right-2 size-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3">cloud_upload</span>
                    <p className="text-sm font-semibold text-primary">Click to upload</p>
                    <p className="text-xs text-slate-400 mt-1">or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                Pricing
              </h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tuition Fee (USD) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="0.00"
                    className="w-full h-11 pl-8 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Availability</h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Published</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Make this program visible on the website</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.isPublished}
                    onClick={() => updateField("isPublished", !form.isPublished)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      form.isPublished ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                        form.isPublished ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Enrollment Open</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Allow new students to enroll</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.enrollmentOpen}
                    onClick={() => updateField("enrollmentOpen", !form.enrollmentOpen)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      form.enrollmentOpen ? "bg-primary" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                        form.enrollmentOpen ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/admin/programs"
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Save as Draft
          </button>
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
                Publish Program
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
