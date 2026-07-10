import type { Metadata } from "next";
import HomeContent from "./components/home";

export const metadata: Metadata = {
  title: "VIKASA",
  description:
    "VIKASA — creative business consulting for corporate entities and professional businesses.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <HomeContent />;
}
