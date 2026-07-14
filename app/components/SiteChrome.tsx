"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GlobalHeader from "@/app/components/GlobalHeader";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <GlobalHeader />
      <div className="page-content">{children}</div>
    </>
  );
}
