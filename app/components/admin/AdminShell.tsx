"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthProvider";

type AdminShellProps = {
  children: React.ReactNode;
  onSave?: () => void;
  saving?: boolean;
  dirty?: boolean;
  message?: string;
  pageTitle?: string;
};

const NAV_PAGES = [
  { href: "/admin", label: "Home" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/footer", label: "Footer" },
] as const;

export default function AdminShell({
  children,
  onSave,
  saving = false,
  dirty = false,
  message = "",
}: AdminShellProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname() ?? "/admin";

  const isActive = (href: string) =>
    href === "/admin"
      ? pathname === "/admin" || pathname === "/admin/home"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="admin-shell">
      {/* WordPress-style thin admin bar */}
      <header className="admin-wp-bar" role="banner">
        <div className="admin-wp-bar-left">
          <Link href="/admin" className="admin-wp-bar-item admin-wp-bar-brand">
            VIKASA
          </Link>
          <nav className="admin-wp-bar-nav" aria-label="Pages">
            {NAV_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={`admin-wp-bar-item${
                  isActive(page.href) ? " is-active" : ""
                }`}
                aria-current={isActive(page.href) ? "page" : undefined}
              >
                {page.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="admin-wp-bar-item" target="_blank" rel="noreferrer">
            View site
          </Link>
        </div>
        <div className="admin-wp-bar-right">
          {message ? <span className="admin-wp-bar-msg">{message}</span> : null}
          {onSave ? (
            <button
              type="button"
              className={`admin-wp-bar-save${dirty ? " is-dirty" : ""}`}
              onClick={onSave}
              disabled={saving || !dirty}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          ) : null}
          <span className="admin-wp-bar-item">{user?.email ?? "admin"}</span>
          <button type="button" className="admin-wp-bar-item admin-wp-bar-btn" onClick={() => logout()}>
            Sign out
          </button>
        </div>
      </header>
      <div className="admin-wp-content">{children}</div>
    </div>
  );
}
