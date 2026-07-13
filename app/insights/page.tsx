import type { Metadata } from "next";
import InsightsBody from "../components/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Latest insights and articles from VIKASA — creative business consulting.",
};

export default function Page() {
  return <InsightsBody />;
}
