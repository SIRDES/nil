import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-background-dark">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-slate-800 py-4 px-8 text-xs text-slate-400">
          © 2024 TechSchool Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
