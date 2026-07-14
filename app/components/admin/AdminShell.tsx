"use client";

import Link from "next/link";
import { useAuth } from "@/app/components/auth/AuthProvider";

type AdminShellProps = {
  children: React.ReactNode;
  onSave?: () => void;
  saving?: boolean;
  dirty?: boolean;
  message?: string;
  pageTitle?: string;
};

export default function AdminShell({
  children,
  onSave,
  saving = false,
  dirty = false,
  message = "",
  pageTitle,
}: AdminShellProps) {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      {/* WordPress-style thin admin bar */}
      <header className="admin-wp-bar" role="banner">
        <div className="admin-wp-bar-left">
          <Link href="/admin" className="admin-wp-bar-item admin-wp-bar-brand">
            VIKASA
          </Link>
          {pageTitle ? (
            <span className="admin-wp-bar-item admin-wp-bar-page">{pageTitle}</span>
          ) : null}
          <Link href="/admin" className="admin-wp-bar-item">
            All pages
          </Link>
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
