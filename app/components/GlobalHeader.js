import fs from "node:fs";
import path from "node:path";

export default function GlobalHeader() {
  const sourceHtml = fs.readFileSync(
    path.join(process.cwd(), "app", "content.html"),
    "utf8"
  );

  const headerMatch = sourceHtml.match(/<!-- Header[\s\S]*?<!-- Main -->/i);
  const globalHeaderHtml = headerMatch
    ? headerMatch[0].replace("<!-- Main -->", "").trim()
    : "";

  return <div dangerouslySetInnerHTML={{ __html: globalHeaderHtml }} />;
}
