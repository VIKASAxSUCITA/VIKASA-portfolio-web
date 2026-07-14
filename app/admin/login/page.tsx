import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminLoginForm from "@/app/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <AdminGuard guestOnly>
      <div className="admin-login-page">
        <AdminLoginForm />
      </div>
    </AdminGuard>
  );
}
