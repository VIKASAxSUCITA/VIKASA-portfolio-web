import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/app/components/auth/AuthProvider";
import HomePageStyles from "@/app/components/home/HomePageStyles";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <HomePageStyles />
      <div className="admin-root">{children}</div>
    </AuthProvider>
  );
}
