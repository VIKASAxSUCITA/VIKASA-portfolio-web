import fs from "node:fs";
import path from "node:path";

export const metadata = {
  title: "VIKASA",
  description:
    "VIKASA — creative business consulting for corporate entities and professional businesses.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  const rawHtml = fs.readFileSync(
    path.join(process.cwd(), "app", "content.html"),
    "utf8"
  );

  const html = rawHtml
    .replace(/<!-- Header[\s\S]*?<\/sticky-header>\s*/i, "")
    .replace(
      /<div class="theme-drawer drawer-additional"[\s\S]*?<\/div>\s*/i,
      ""
    );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
