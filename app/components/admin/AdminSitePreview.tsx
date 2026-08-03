"use client";

type AdminSitePreviewProps = {
  children: React.ReactNode;
};

/** Admin page canvas without public site chrome (no header/footer). */
export default function AdminSitePreview({ children }: AdminSitePreviewProps) {
  return <div className="admin-site">{children}</div>;
}
