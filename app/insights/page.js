import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync(
  path.join(process.cwd(), "app", "insights", "content.html"),
  "utf8"
);

export const metadata = {
  title: "Insights",
  description:
    "Latest insights and articles from VIKASA — creative business consulting.",
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
