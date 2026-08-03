import { requireAdmin } from "@/lib/auth";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-background sm:flex-row">
      <AdminSidebar />
      <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
