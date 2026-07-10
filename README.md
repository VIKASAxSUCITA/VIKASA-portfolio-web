# VIKASA Web

The Consulo HTML template converted into a [Next.js](https://nextjs.org) (App Router) project.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

## How the conversion works

The original static template lives in `Consulo HTML/`. It is a Bootstrap 5
template that relies on native Web Components (custom elements such as
`sticky-header`, `hero-slider`, `counter-up`, ...) defined in
`assets/js/main.js`, plus vendor libraries (AOS, Swiper, Bootstrap) in
`assets/js/vendor.js`.

- **Assets** (`css`, `js`, `img`) were copied to `public/assets/`, so every
  `/assets/...` URL resolves exactly as it did in the original template.
- **Layout** (`app/layout.js`) loads the shared fonts, `vendor.css`,
  `style.css`, and the two template scripts. `vendor.js` is loaded
  `beforeInteractive` and `main.js` `afterInteractive` so the custom elements
  upgrade once the server-rendered markup is present.
- **Pages**: each `*.html` file became a route under `app/`. The body markup of
  each page is stored next to its route as `content.html` and rendered with
  `dangerouslySetInnerHTML`, preserving the exact design and behaviour.

### Route map

| Route | Source |
| --- | --- |
| `/` | `index.html` |
| `/index-2` | `index-2.html` |
| `/index-3` | `index-3.html` |
| `/about` | `about.html` |
| `/services` | `services.html` |
| `/service-details` | `service-details.html` |
| `/project` | `project.html` |
| `/project-details` | `project-details.html` |
| `/team` | `team.html` |
| `/team-details` | `team-details.html` |
| `/blog` | `blog.html` |
| `/blog-list` | `blog-list.html` |
| `/blog-details` | `blog-details.html` |
| `/pricing-plan` | `pricing-plan.html` |
| `/faq` | `faq.html` |
| `/contact` | `contact.html` |
| `/privacy-policy` | `privacy-policy.html` |
| `/terms-condition` | `terms-condition.html` |
| `/error` | `error.html` |

## Regenerating the pages

If you edit the source template, re-run the conversion:

```bash
npm run convert
```

This regenerates every route's `content.html` and `page.js` from the files in
`Consulo HTML/`, rewriting internal `*.html` links to Next.js routes and
`assets/...` references to `/assets/...`.

> Note: the template ships with grey placeholder images (labelled with their
> dimensions). Replace the files in `public/assets/img/` with your own artwork.
