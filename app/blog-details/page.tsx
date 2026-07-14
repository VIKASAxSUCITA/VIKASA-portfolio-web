import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import HomeFooter from "../components/home/HomeFooter";
import HomePageStyles from "../components/home/HomePageStyles";

export const metadata: Metadata = {
  title: "Insight Details",
  description:
    "Read the latest insights from VIKASA — creative business consulting.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "app", "blog-details", "content.html"),
    "utf8"
  );

  return (
    <>
      <HomePageStyles />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-100">
        <HomeFooter />
      </div>
    </>
  );
}
