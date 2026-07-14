"use client";

import AdminEditableFooter from "@/app/components/admin/AdminEditableFooter";
import type { FooterContent } from "@/lib/content/types";

type AdminSitePreviewProps = {
  children: React.ReactNode;
  footer: FooterContent;
  footerUpdate: (updater: (prev: FooterContent) => FooterContent) => void;
};

export default function AdminSitePreview({
  children,
  footer,
  footerUpdate,
}: AdminSitePreviewProps) {
  return (
    <div className="admin-site">
      {children}
      <div className="mt-100">
        <AdminEditableFooter content={footer} update={footerUpdate} />
      </div>
    </div>
  );
}
