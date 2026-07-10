import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");

// The original template ("Consulo HTML") may live in the project root or in a
// parent directory (e.g. when the app was moved into a nested folder). Search
// upwards for it.
function findSourceDir() {
  const candidates = [
    path.join(ROOT, "Consulo HTML"),
    path.join(
      process.env.HOME ?? "",
      "Downloads/consulohtml-10/consulohtml-10/Consulo HTML"
    ),
  ];

  let dir = ROOT;
  for (let i = 0; i < 4; i++) {
    candidates.push(path.join(dir, "Consulo HTML"));
    dir = path.dirname(dir);
  }

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }

  throw new Error(
    'Could not locate the "Consulo HTML" source folder near the project.'
  );
}

const SOURCE_DIR = findSourceDir();

// filename (without .html) -> route segment ("" means the home page at /)
function routeForName(name) {
  return name === "index" ? "" : name;
}

function extract(re, html) {
  const m = html.match(re);
  return m ? m[1].trim() : "";
}

/**
 * Rewrite the raw template markup so it works inside the Next.js app:
 *  - point every `*.html` link at its new route
 *  - point every relative `assets/...` reference at `/assets/...`
 *  - drop the template's own <script> includes (loaded globally in the layout)
 */
function transform(markup) {
  let out = markup;

  // Remove the vendor.js / main.js includes (handled by the root layout).
  out = out.replace(
    /<script\b[^>]*assets\/js\/[^>]*><\/script>/gi,
    ""
  );

  // Rewrite internal page links: about.html -> /about, index.html -> /
  out = out.replace(
    /href="([a-zA-Z0-9_-]+)\.html([^"]*)"/g,
    (_full, name, rest) => {
      const route = name === "index" ? "/" : `/${name}`;
      return `href="${route}${rest}"`;
    }
  );

  // Rewrite relative asset references (href/src/url()/srcset) to absolute.
  out = out.replace(/([\s,"'(])assets\//g, "$1/assets/");

  return applyBranding(out.trim());
}

/** Swap template branding for VIKASA and point logos at the VIKASA asset. */
function applyBranding(markup) {
  const logo = "/assets/img/vikasa/vikasa_logo.png";

  return markup
    .replace(/\/assets\/img\/logo-white\.png/g, logo)
    .replace(/\/assets\/img\/logo\.png/g, logo)
    .replace(/aria-label="Consulo Logo"/g, 'aria-label="VIKASA"')
    .replace(/aria-label="Consulo"/g, 'aria-label="VIKASA"')
    .replace(/alt="Consulo Logo"/g, 'alt="VIKASA"')
    .replace(/width="189"\s*\n\s*height="32"/g, 'width="108"\n                height="40"')
    .replace(/width="191"\s*\n\s*height="32"/g, 'width="108"\n                height="40"')
    .replace(/width="189" height="32"/g, 'width="108" height="40"')
    .replace(/width="191" height="32"/g, 'width="108" height="40"');
}

function jsEscape(str) {
  return JSON.stringify(str ?? "");
}

const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => f.endsWith(".html"))
  .sort();

const generated = [];

for (const file of files) {
  const name = file.replace(/\.html$/, "");
  const route = routeForName(name);
  const raw = fs.readFileSync(path.join(SOURCE_DIR, file), "utf8");

  const title = extract(/<title>([\s\S]*?)<\/title>/i, raw)
    .replace(/Consulo/gi, "VIKASA")
    .replace(/Creative Business Consulting Template/i, "VIKASA");
  const description = extract(
    /<meta\s+name="description"\s+content="([^"]*)"/i,
    raw
  ).replace(/Consulo/gi, "VIKASA");

  const styleBlock = (raw.match(/<style>[\s\S]*?<\/style>/i) || [""])[0];
  const bodyInner = (raw.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [
    "",
    "",
  ])[1];

  const content = transform(`${styleBlock}\n${bodyInner}`);

  const targetDir = route ? path.join(APP_DIR, route) : APP_DIR;
  fs.mkdirSync(targetDir, { recursive: true });

  fs.writeFileSync(path.join(targetDir, "content.html"), content, "utf8");

  const readPathParts = route
    ? `"app", ${jsEscape(route)}, "content.html"`
    : `"app", "content.html"`;

  const pageSource = `import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync(
  path.join(process.cwd(), ${readPathParts}),
  "utf8"
);

export const metadata = {
  title: ${jsEscape(title)},
  description: ${jsEscape(description)},
};

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
`;

  fs.writeFileSync(path.join(targetDir, "page.js"), pageSource, "utf8");

  generated.push({ file, route: route ? `/${route}` : "/", title });
}

// Which template page powers the site home (/). Its markup is copied over the
// generated home content so `/` shows this design (the page also stays at its
// own route, e.g. /index-2).
const HOME_SOURCE = "index-3";
const homeSourceDir = path.join(APP_DIR, HOME_SOURCE);
if (fs.existsSync(path.join(homeSourceDir, "content.html"))) {
  fs.copyFileSync(
    path.join(homeSourceDir, "content.html"),
    path.join(APP_DIR, "content.html")
  );
}

console.log(`Generated ${generated.length} routes:`);
for (const g of generated) {
  console.log(`  ${g.route.padEnd(20)} <- ${g.file}`);
}
console.log(`Home (/) content sourced from ${HOME_SOURCE}.html`);
