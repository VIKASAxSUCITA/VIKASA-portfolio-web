import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services",
  description:
    "VIKASA services — Investment and Business Enhancement for growing businesses.",
};

export default function Page() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "app", "services", "content.html"),
    "utf8"
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
