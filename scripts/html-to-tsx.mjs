import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const ATTR_MAP = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-miterlimit": "strokeMiterlimit",
  "fill-opacity": "fillOpacity",
  "stroke-opacity": "strokeOpacity",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "flood-opacity": "floodOpacity",
  "color-interpolation-filters": "colorInterpolationFilters",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "text-anchor": "textAnchor",
  "dominant-baseline": "dominantBaseline",
  "alignment-baseline": "alignmentBaseline",
  "baseline-shift": "baselineShift",
  "vector-effect": "vectorEffect",
  "paint-order": "paintOrder",
  "shape-rendering": "shapeRendering",
  "xml:space": "xmlSpace",
  "xlink:href": "xlinkHref",
  "xmlns:xlink": "xmlnsXlink",
  "accept-charset": "acceptCharset",
  "http-equiv": "httpEquiv",
  crossorigin: "crossOrigin",
  autocomplete: "autoComplete",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  colspan: "colSpan",
  rowspan: "rowSpan",
  frameborder: "frameBorder",
  allowfullscreen: "allowFullScreen",
  srcset: "srcSet",
};

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function escapeTemplateLiteral(value) {
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function convertAttributes(markup) {
  let out = markup.replace(/\bclass=/g, "className=");
  out = out.replace(/\bclass /g, "className ");
  out = out.replace(/\bfor=/g, "htmlFor=");

  for (const [from, to] of Object.entries(ATTR_MAP)) {
    out = out.replace(new RegExp(`\\b${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=`, "g"), `${to}=`);
  }

  return out;
}

function convertComments(markup) {
  return markup.replace(/<!--([\s\S]*?)-->/g, (_, comment) => {
    const trimmed = comment.trim();
    return trimmed ? `{/* ${trimmed} */}` : "";
  });
}

function convertStyleBlocks(markup) {
  return markup.replace(/<style>([\s\S]*?)<\/style>/gi, (_, css) => {
    const escaped = escapeTemplateLiteral(css.trim());
    return `<style dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
  });
}

function selfCloseVoidTags(markup) {
  return markup.replace(
    /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)\b([^>]*?)(?<!\/)>/gi,
    (match, tag, attrs) => {
      if (match.endsWith("/>")) return match;
      return `<${tag}${attrs} />`;
    }
  );
}

const NUMERIC_ATTRS = [
  "rows",
  "cols",
  "width",
  "height",
  "tabIndex",
  "maxLength",
  "minLength",
  "size",
  "span",
  "start",
  "colSpan",
  "rowSpan",
  "step",
  "min",
  "max",
];

function convertInlineStyles(markup) {
  return markup.replace(/style="([^"]*)"/g, (_, styleValue) => {
    const declarations = styleValue
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean);

    const properties = declarations.map((declaration) => {
      const separator = declaration.indexOf(":");
      const property = declaration.slice(0, separator).trim();
      const value = declaration.slice(separator + 1).trim();
      const camelProperty = property.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );

      return `${camelProperty}: ${JSON.stringify(value)}`;
    });

    return `style={{ ${properties.join(", ")} }}`;
  });
}

function convertNumericAttributes(markup) {
  let out = markup;

  for (const attr of NUMERIC_ATTRS) {
    out = out.replace(
      new RegExp(`\\b${attr}="(\\d+)"`, "g"),
      `${attr}={$1}`
    );
  }

  return out;
}

function htmlToJsx(markup) {
  let out = markup.trim();
  out = convertStyleBlocks(out);
  out = convertComments(out);
  out = convertAttributes(out);
  out = convertInlineStyles(out);
  out = convertNumericAttributes(out);
  out = selfCloseVoidTags(out);
  return out;
}

function extractSection(html, startPattern, endPattern) {
  const start = html.search(startPattern);
  if (start === -1) return "";

  const slice = html.slice(start);
  const end = slice.search(endPattern);
  if (end === -1) return slice.trim();

  return slice.slice(0, end).trim();
}

function writeComponent(filePath, componentName, jsxBody) {
  const source = `/* Auto-generated from content.html. Run \`node scripts/html-to-tsx.mjs\` to regenerate. */

export default function ${componentName}() {
  return (
    <>
${jsxBody
  .split("\n")
  .map((line) => (line ? `      ${line}` : ""))
  .join("\n")}
    </>
  );
}
`;

  fs.writeFileSync(filePath, source, "utf8");
}

function main() {
  const inputPath = path.join(ROOT, "app", "content.html");
  const outputDir = path.join(ROOT, "app", "components", "home");
  const html = fs.readFileSync(inputPath, "utf8");

  const styleBlock = (html.match(/<style>[\s\S]*?<\/style>/i) || [""])[0];
  const headerBlock = extractSection(
    html,
    /<!-- Header/i,
    /<!-- Main -->/i
  );
  const bodyBlock = extractSection(html, /<!-- Main -->/i, /<!-- all js -->/i);

  fs.mkdirSync(outputDir, { recursive: true });

  const styleJsx = htmlToJsx(styleBlock);
  const headerJsx = htmlToJsx(headerBlock);
  const bodyJsx = htmlToJsx(bodyBlock);

  writeComponent(path.join(outputDir, "HomePageStyles.tsx"), "HomePageStyles", styleJsx);
  writeComponent(path.join(outputDir, "HomeHeader.tsx"), "HomeHeader", headerJsx);
  writeComponent(path.join(outputDir, "HomeBody.tsx"), "HomeBody", bodyJsx);

  const indexSource = `/* Auto-generated from content.html. Run \`node scripts/html-to-tsx.mjs\` to regenerate. */

import HomeBody from "./HomeBody";
import HomePageStyles from "./HomePageStyles";

export { default as HomePageStyles } from "./HomePageStyles";
export { default as HomeHeader } from "./HomeHeader";
export { default as HomeBody } from "./HomeBody";

export default function HomeContent() {
  return (
    <>
      <HomePageStyles />
      <HomeBody />
    </>
  );
}
`;

  fs.writeFileSync(path.join(outputDir, "index.tsx"), indexSource, "utf8");

  console.log("Generated TypeScript components:");
  console.log(`  ${path.relative(ROOT, outputDir)}/HomePageStyles.tsx`);
  console.log(`  ${path.relative(ROOT, outputDir)}/HomeHeader.tsx`);
  console.log(`  ${path.relative(ROOT, outputDir)}/HomeBody.tsx`);
  console.log(`  ${path.relative(ROOT, outputDir)}/index.tsx`);
}

main();
