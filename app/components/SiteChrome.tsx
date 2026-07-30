"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GlobalHeader from "@/app/components/GlobalHeader";
import { LocaleProvider } from "@/app/components/i18n/LocaleProvider";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <LocaleProvider>
      {isAdmin ? (
        <>{children}</>
      ) : (
        <>
          <GlobalHeader />
          <div className="page-content consulting-site">{children}</div>
        </>
      )}
    </LocaleProvider>
  );
}
