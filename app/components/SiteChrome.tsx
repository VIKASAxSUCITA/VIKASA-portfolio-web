"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import GlobalHeader from "@/app/components/GlobalHeader";
import { LocaleProvider } from "@/app/components/i18n/LocaleProvider";

declare global {
  interface Window {
    AOS?: {
      refreshHard?: () => void;
      refresh?: () => void;
    };
  }
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const timer = window.setTimeout(() => {
      if (window.AOS?.refreshHard) {
        window.AOS.refreshHard();
      } else {
        window.AOS?.refresh?.();
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [pathname, isAdmin]);

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
