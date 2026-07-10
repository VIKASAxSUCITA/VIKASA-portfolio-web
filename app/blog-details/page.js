import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync(
  path.join(process.cwd(), "app", "blog-details", "content.html"),
  "utf8"
);

export const metadata = {
  title: "VIKASA VIKASA",
  description: "VIKASA is a creative business consulting Bootstrap 5 template designed for corporate entities and professional businesses.",
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
