"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const update = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
            setToast({ type: "error", message: "Please fill in all required fields." });
            return;
        }

        setIsSubmitting(true);
        setToast(null);

        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone || undefined,
                subject: formData.subject,
                messageBody: formData.message,
                source: "Contact Form",
            };

            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                setToast({
                    type: "error",
                    message: result.details || result.error || "Something went wrong. Please try again.",
                });
                return;
            }

            // Success
            setToast({
                type: "success",
                message: "Your message has been sent! Our team will get back to you within 24 hours.",
            });

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                subject: "General Inquiry",
                message: "",
            });
        } catch {
            setToast({
                type: "error",
                message: "Network error. Please check your connection and try again.",
            });
        } finally {
            setIsSubmitting(false);

            // Auto-dismiss toast after 6 seconds
            setTimeout(() => setToast(null), 6000);
        }
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full px-4 py-8 md:py-12 bg-background-light">
            <div className="w-full max-w-7xl flex flex-col gap-10">

                {/* Hero Section */}
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <h1 className="text-slate-900 text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Get in Touch</h1>
                    <p className="text-slate-500 text-lg md:text-xl font-normal max-w-2xl">
                        Whether you have questions about our curriculum, admissions process, or career support, we&apos;re here to help you start your journey in tech.
                    </p>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div
                        className={`fixed top-6 right-6 z-50 max-w-md flex items-start gap-3 p-4 rounded-xl shadow-2xl border animate-in slide-in-from-right transition-all ${toast.type === "success"
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-red-50 border-red-200"
                            }`}
                    >
                        <span
                            className={`material-symbols-outlined mt-0.5 ${toast.type === "success" ? "text-emerald-600" : "text-red-500"
                                }`}
                        >
                            {toast.type === "success" ? "check_circle" : "error"}
                        </span>
                        <div className="flex-1">
                            <p
                                className={`text-sm font-bold ${toast.type === "success"
                                    ? "text-emerald-700"
                                    : "text-red-700"
                                    }`}
                            >
                                {toast.type === "success" ? "Message Sent!" : "Error"}
                            </p>
                            <p
                                className={`text-sm mt-0.5 ${toast.type === "success"
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {toast.message}
                            </p>
                        </div>
                        <button
                            onClick={() => setToast(null)}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Contact Form Card */}
                    <div className="lg:col-span-7 bg-white rounded-lg p-6 md:p-8 shadow-sm border border-slate-100">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h3>
                            <p className="text-slate-500 ">Fill out the form below and our admissions team will get back to you within 24 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-900 text-sm font-bold">
                                        First Name <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Jane"
                                        value={formData.firstName}
                                        onChange={(e) => update("firstName", e.target.value)}
                                        disabled={isSubmitting}
                                        className="form-input w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400 disabled:opacity-50"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-900 text-sm font-bold">Last Name</span>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={(e) => update("lastName", e.target.value)}
                                        disabled={isSubmitting}
                                        className="form-input w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400 disabled:opacity-50"
                                    />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-900 text-sm font-bold">
                                        Email Address <span className="text-red-500">*</span>
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="jane.doe@example.com"
                                        value={formData.email}
                                        onChange={(e) => update("email", e.target.value)}
                                        disabled={isSubmitting}
                                        className="form-input w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400 disabled:opacity-50"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-900 text-sm font-bold">Phone Number</span>
                                    <input
                                        type="tel"
                                        placeholder="e.g. 0200000000"
                                        value={formData.phone}
                                        onChange={(e) => update("phone", e.target.value)}
                                        disabled={isSubmitting}
                                        className="form-input w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 placeholder:text-slate-400 disabled:opacity-50"
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-900 text-sm font-bold">
                                    Subject <span className="text-red-500">*</span>
                                </span>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => update("subject", e.target.value)}
                                    disabled={isSubmitting}
                                    className="form-select w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-12 px-4 disabled:opacity-50"
                                >
                                    <option>General Inquiry</option>
                                    <option>Course Details</option>
                                    <option>Tuition & Financing</option>
                                    <option>Partnerships</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-900 text-sm font-bold">
                                    Message <span className="text-red-500">*</span>
                                </span>
                                <textarea
                                    placeholder="How can we help you achieve your career goals?"
                                    value={formData.message}
                                    onChange={(e) => update("message", e.target.value)}
                                    disabled={isSubmitting}
                                    className="form-textarea w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary min-h-[8rem] p-4 placeholder:text-slate-400 resize-none disabled:opacity-50"
                                ></textarea>
                            </label>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 flex w-full md:w-auto cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-primary hover:bg-primary-dark transition-all text-white text-base font-bold shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Side */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* Image Card */}
                        <div className="relative overflow-hidden rounded-lg h-64 shadow-md group">
                            <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgKctl0F_jhrm3SWPUdYwnNDBAdnhwsxpUcnUs8kEoazM_yDomdahxO6l6jyc94Fqg7nSjQ42LSzDRMCkyZGQLhnwOA0OzD41G08qZNnTDbRfX59tP7k6T5qvjBMH-jiytBvm37Zh06hRKFjNxTM5fOEJK2tok5lh4ErLSZbF1jYik2roescibJwdbq6FuoPol02T7_GgSNTQb3zfle7cHXJ8B6b0fXcUUKALyZds52Zx0Q5yhAbDVNHju6Xfsxzq3_CAvugZ11wI")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold mb-1">Visit Our Campus</h3>
                                <p className="text-white/90 text-sm">Experience our state-of-the-art labs and learning spaces.</p>
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold mb-1">Call Us</h4>
                                    <p className="text-slate-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+233242770336" className="text-primary hover:underline font-medium block">+233 24 277 0336</a>
                                    {/* <a href="tel:+233542345678" className="text-primary hover:underline font-medium block">+233 54 234 5678</a> */}
                                </div>
                            </div>
                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="flex items-start gap-4">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div>
                                    <h4 className="text-slate-900 font-bold mb-1">Email Us</h4>
                                    <p className="text-slate-500 text-sm mb-2">Our friendly team is here to help.</p>
                                    <a href="mailto:info@FBI.edu" className="text-primary hover:underline font-medium">info@FBI.edu</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 p-2">
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7251579163667!2d-0.18804412476602764!3d5.607552494373348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b4ab98812cf%3A0x5e8413943cb6d9e9!2sVolta%20Place%20(VRA%20PROPCo)!5e0!3m2!1sen!2sgh!4v1774332905689!5m2!1sen!2sgh"
                            className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                            title="Future Bridge Institute Location Map"
                            allowFullScreen
                        ></iframe>


                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7251579163667!2d-0.18804412476602764!3d5.607552494373348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b4ab98812cf%3A0x5e8413943cb6d9e9!2sVolta%20Place%20(VRA%20PROPCo)!5e0!3m2!1sen!2sgh!4v1774332905689!5m2!1sen!2sgh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}


                        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs transition-opacity hover:opacity-100">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <h4 className="font-bold text-slate-900 text-sm">Main Campus</h4>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Volta Place (VRA PROPCo)
                                JR57+2RC<br />
                                Airport Residence, Accra, Ghana
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
