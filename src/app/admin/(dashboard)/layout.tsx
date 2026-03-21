"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Toaster } from "react-hot-toast";

export default function AdminDashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <div className="flex min-h-screen bg-slate-50">
 <Toaster
 position="top-right"
 toastOptions={{
 duration: 4000,
 style: {
 borderRadius: "12px",
 padding: "14px 20px",
 fontSize: "14px",
 fontWeight: "500",
 boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
 },
 success: {
 iconTheme: { primary: "#10b981", secondary: "#fff" },
 },
 error: {
 iconTheme: { primary: "#ef4444", secondary: "#fff" },
 },
 }}
 />
 <AdminSidebar />
 <div className="flex-1 flex flex-col min-w-0">
 <AdminTopbar />
 <main className="flex-1 p-8 overflow-auto">
 {children}
 </main>
 <footer className="border-t border-slate-200 py-4 px-8 text-xs text-slate-400">
 © {new Date().getFullYear()} Natural Intelligence Lab. All rights reserved.
 </footer>
 </div>
 </div>
 );
}
