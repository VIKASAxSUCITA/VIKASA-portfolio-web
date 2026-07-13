import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import AboutBody from "../components/about";

const restHtml = fs.readFileSync(
  path.join(process.cwd(), "app", "about", "content.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "About VIKASA",
  description:
    "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
};

export default function Page() {
  return <AboutBody restHtml={restHtml} />;
}
