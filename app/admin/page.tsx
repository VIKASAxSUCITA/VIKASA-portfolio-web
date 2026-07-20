import Link from "next/link";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";

const pages = [
  {
    href: "/admin/home",
    label: "Home",
    status: "Edit hero, about, services, contact",
  },
  { href: "/admin/about", label: "About", status: "Edit story, vision, mission" },
  {
    href: "/admin/insights",
    label: "Insights",
    status: "Add and edit full insight articles",
  },
  {
    href: "/admin/events",
    label: "Events",
    status: "Add events and announcements with schedule",
  },
  {
    href: "/admin/footer",
    label: "Footer",
    status: "Edit social URLs and copyright",
  },
] as const;

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <AdminShell pageTitle="Dashboard">
        <div className="admin-main">
          <section className="admin-dashboard">
            <h1 className="heading text-50">Content</h1>
            <p className="text text-18 admin-dashboard-lead">
              Open a page to edit it in the same layout as the live site. Click
              text or images, then Save in the top bar.
            </p>

            <ul className="admin-page-list list-unstyled">
              {pages.map((page) => (
                <li key={page.href} className="admin-page-item">
                  <div>
                    <div className="heading text-22">{page.label}</div>
                    <div className="text text-14">{page.status}</div>
                  </div>
                  <Link
                    href={page.href}
                    className="button button--primary button--slim justify-center items-center"
                  >
                    Open editor
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
