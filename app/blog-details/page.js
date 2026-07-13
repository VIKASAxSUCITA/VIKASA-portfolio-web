import fs from "node:fs";
import path from "node:path";
import HomeFooter from "../components/home/HomeFooter";

export const metadata = {
  title: "VIKASA VIKASA",
  description:
    "VIKASA is a creative business consulting Bootstrap 5 template designed for corporate entities and professional businesses.",
};

export const dynamic = "force-dynamic";

export default function Page() {
  const html = fs.readFileSync(
    path.join(process.cwd(), "app", "blog-details", "content.html"),
    "utf8"
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-100">
        <HomeFooter />
      </div>
    </>
  );
}
