import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync(
  path.join(process.cwd(), "app", "about", "content.html"),
  "utf8"
);

export const metadata = {
  title: "About Us",
  description:
    "Learn about VIKASA — creative business consulting for corporate entities and professional businesses.",
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
