import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import AboutBody from "../components/about";

export const metadata: Metadata = {
  title: "About VIKASA",
  description:
    "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
};

/** Drop the old image + What We Do block if it still exists in the HTML dump. */
function stripLegacyWhatWeDo(html: string) {
  return html.replace(
    /\s*<!--\s*Image Text\s*-->[\s\S]*?(?=\s*<!--|\s*<div class="(?:running-content|why-choose-us)|$)/i,
    "\n"
  );
}

/** HomeFooter is rendered as a React component — remove the HTML dump footer. */
function stripFooter(html: string) {
  return html
    .replace(/\s*<!--\s*Main\s*-->[\s\S]*$/i, "\n")
    .replace(/\s*<!--\s*Footer\s*-->[\s\S]*$/i, "\n")
    .replace(/\s*<footer\b[\s\S]*$/i, "\n");
}

export default function Page() {
  const restHtml = stripFooter(
    stripLegacyWhatWeDo(
      fs.readFileSync(
        path.join(process.cwd(), "app", "about", "content.html"),
        "utf8"
      )
    )
  );

  return <AboutBody restHtml={restHtml} />;
}
