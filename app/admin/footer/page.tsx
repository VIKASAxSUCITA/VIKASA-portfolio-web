"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminEditableFooter from "@/app/components/admin/AdminEditableFooter";
import { usePageEditor } from "@/app/components/admin/usePageEditor";

export default function AdminFooterPage() {
  const { content, loading, saving, dirty, message, update, save } =
    usePageEditor("footer");

  const shellProps = {
    pageTitle: "Footer",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading footer...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <div className="admin-site admin-footer-page">
          <p className="text text-16 admin-footer-editor-hint">
            Click a social icon to edit its URL, then Save.
          </p>
          <AdminEditableFooter content={content} update={update} />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
