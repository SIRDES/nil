"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
 { label: "Dashboard", icon: "dashboard", href: "/admin" },
];

const MANAGEMENT_ITEMS = [
 { label: "Analytics", icon: "analytics", href: "/admin/analytics" },
 { label: "Registrations", icon: "assignment", href: "/admin/registrations" },
 { label: "Programs", icon: "local_library", href: "/admin/programs" },
 { label: "Instructors", icon: "people", href: "/admin/instructors" },
 { label: "Admin Users", icon: "admin_panel_settings", href: "/admin/users" },
];

const SUPPORT_ITEMS = [
 { label: "Messages", icon: "mail", href: "/admin/messages", badge: 3 },
 { label: "Settings", icon: "settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
 const pathname = usePathname();

 const renderNavItem = (item: { label: string; icon: string; href: string; badge?: number }) => {
 const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
 return (
 <Link
 key={item.href}
 href={item.href}
 className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group ${
 isActive
 ? "bg-primary text-white shadow-lg shadow-primary/20"
 : "text-slate-400 hover:bg-white/5 hover:text-white"
 }`}
 >
 <span className={`material-symbols-outlined text-xl ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`}>
 {item.icon}
 </span>
 {item.label}
 {item.badge && (
 <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
 {item.badge}
 </span>
 )}
 </Link>
 );
 };

 return (
 <aside className="flex flex-col w-64 min-h-screen bg-navy-dark border-r border-slate-800 shrink-0">
 {/* Logo */}
 <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
 <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
 <span className="material-symbols-outlined text-xl">school</span>
 </div>
 <h1 className="text-white text-lg font-bold tracking-tight">TechSchool</h1>
 </div>

 {/* Navigation */}
 <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
 <div className="space-y-1">
 {NAV_ITEMS.map(renderNavItem)}
 </div>

 <div>
 <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">Management</p>
 <div className="space-y-1">
 {MANAGEMENT_ITEMS.map(renderNavItem)}
 </div>
 </div>

 <div>
 <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">Support</p>
 <div className="space-y-1">
 {SUPPORT_ITEMS.map(renderNavItem)}
 </div>
 </div>
 </nav>

 {/* Bottom - Logout */}
 <div className="px-3 py-4 border-t border-slate-800">
 <button
 onClick={() => signOut({ callbackUrl: "/admin/login" })}
 className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
 >
 <span className="material-symbols-outlined text-xl">logout</span>
 Sign Out
 </button>
 </div>
 </aside>
 );
}
