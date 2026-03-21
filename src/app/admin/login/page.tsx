"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setError("");
 setLoading(true);

 const result = await signIn("credentials", {
 email,
 password,
 redirect: false,
 });

 if (result?.error) {
 setError("Invalid email or password. Please try again.");
 setLoading(false);
 } else {
 router.push("/admin");
 }
 };

 return (
 <div className="min-h-screen flex flex-col bg-navy-dark">
 {/* Top bar */}
 <header className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
 <div className="flex items-center gap-3 text-white">
 <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
 <span className="material-symbols-outlined text-xl text-white">school</span>
 </div>
 <h2 className="text-lg font-bold tracking-tight">TechSchool Admin</h2>
 </div>
 <div className="flex items-center gap-6 text-sm">
 <a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a>
 <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Support</a>
 </div>
 </header>

 {/* Center login card */}
 <main className="flex-grow flex items-center justify-center px-4 py-16">
 <div className="w-full max-w-md">
 <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-8 md:p-10 border border-slate-200">
 <div className="flex flex-col items-center mb-8">
 <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
 <span className="material-symbols-outlined text-3xl">lock</span>
 </div>
 <h1 className="text-2xl font-black text-slate-900 ">Welcome Back</h1>
 <p className="mt-2 text-sm text-slate-500 text-center">
 Please enter your credentials to access the dashboard.
 </p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-5">
 <div className="flex flex-col gap-2">
 <label className="text-sm font-bold text-slate-700 ">Admin Email</label>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="admin@techschool.edu"
 required
 className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary"
 />
 </div>
 <div className="flex flex-col gap-2">
 <div className="flex items-center justify-between">
 <label className="text-sm font-bold text-slate-700 ">Password</label>
 <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot Password?</a>
 </div>
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="••••••••"
 required
 className="h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary"
 />
 </div>

 {error && (
 <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
 <span className="material-symbols-outlined text-lg">error</span>
 {error}
 </div>
 )}

 <button
 type="submit"
 disabled={loading}
 className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
 >
 {loading ? (
 <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
 ) : (
 <>
 Sign In
 <span className="material-symbols-outlined text-sm">arrow_forward</span>
 </>
 )}
 </button>
 </form>
 </div>
 </div>
 </main>

 <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
 © {new Date().getFullYear()} TechSchool Education Systems. All rights reserved.
 </footer>
 </div>
 );
}
