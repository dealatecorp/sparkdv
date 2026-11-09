# SPARK-DV

React 18 / Vite website with original SPARK-DV assets, a typed product shelf, a WebGL logo reveal and a contextual cinematic footer.

## Ecommerce-first redesign direction

The approved whole-site redesign brief prioritizes product discovery and shopping on the homepage, reduces long-form copy while preserving clinical and legal content, and specifies accessible scroll- and pointer-responsive interactions. See [the PRD](./SPARK-DV-Commerce-First-Redesign-PRD.md) and [the design brief](./SPARK-DV-Commerce-First-Redesign-Design.md). These documents describe the target direction; they do not mean the redesign has been implemented.

## Run

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

The development site is at http://localhost:5173. Production hosts must rewrite application paths to `/index.html` for React Router. The site has not been deployed by this work.

## Components and styling

- `src/components/ui/skincare-product-shelf.tsx`: adapted from the supplied Aakash Mehra component; used on **both `/` and `/products`**. All 17 variants are supported. Category filters, search and sorting remain available on the catalogue.
- `src/components/ui/liquid-glass-logo-reveal.tsx`: the supplied WebGL shader and timeline, using the original SPARK-DV logo. The original source credits zanwei/glass-icon-reveal (MIT).
- `src/components/ui/landing-reveal.tsx`: plays on each landing mount/reload, has an explicit skip action, a static reduced-motion alternative and no persisted “seen” flag.
- `src/components/ui/motion-footer.tsx`: supplied cinematic design adapted to dental science, with real enquiry links. The extra four-column footer was removed at the user's request. Manufacturer information is accessible on Contact.
- `src/components/ui/` is the shadcn-compatible component location, addressed by `@/components/ui`. `components.json`, TypeScript paths and the Vite alias agree on this location. `src/lib/utils.ts` provides `cn`.
- Tailwind v4 is configured using the official Vite plugin. `src/tailwind.css` supplies theme/utilities without resetting the existing site's global styles. Setup reference: https://tailwindcss.com/docs/installation/using-vite
- Motion is the only animation dependency. The supplied footer's effects were adapted to Motion rather than adding a second animation runtime.

## Original images and factual content

- `audit/firecrawl-crawl.json`: raw Firecrawl capture of 30 source pages.
- `audit/asset-mapping.json`: discovered original assets, source URLs, dimensions and pages where each was used.
- `src/product-assets.json`: product-to-image assignments for all 17 catalogue entries.
- `public/assets/products/<slug>/`: optimized images and 640px derivatives. Packaging uses `object-fit: contain`.
- `src/source-content.json`: page-specific source content, including research, founder information and product-specific clinical details.
- `src/protocols.json`: six protocols recovered by expanding the live website's controls through Playwright.

No generated or stock product images replace original assets. Several source products provide logos rather than packaging photographs. The live website also reuses the Nanion Lite Pro photograph across variants; the audit records this source limitation. The Nanion Elite source page uses a bottle photograph rather than an Elite-labelled toothpaste photograph; this is a source mapping discrepancy requiring owner confirmation, not evidence of separate verified Elite packaging. Do not generate missing labels or a back-of-pack view. The shelf supports zoom, not a fabricated 360° product view.

Scientific claims, prices and testimonials are reproduced from SPARK-DV source material, not independently validated clinical conclusions. Raw content is retained in the audit; duplicate navigation, shopping controls and form labels were removed from presentation.

## Forms and commerce

There is no backend, payment gateway or order API in this repository. The enquiry form validates fields, then prepares an email for the visitor to review and send. The cart retains selections locally and prepares an order enquiry. Neither flow claims that data was submitted, a payment was taken, or an order was placed.

Before public launch, connect an approved submission/order service if automated fulfilment is required, and supply approved privacy, terms and shipping-policy copy. All three policy destinations returned 404 on the original site; their content has not been fabricated. The source download centre states that brochures are coming soon. Research-request links route to a real enquiry path where the source did not expose downloadable studies.

## Review and validation

- Homepage: the supplied `glass-prism-hero.tsx` draws a scroll-rotating prism and cursor-controlled light in WebGL. It uses DM Sans, pauses offscreen, provides a text fallback when WebGL is unavailable, and caps narrow-screen rendering at 1.5x device resolution. The mapped 17-product selector appears immediately after the scroll animation; wide and portrait photos fit centered in the stage with `object-fit: contain`. The separate “Shop the range” card rail was removed from the homepage; the complete catalogue remains under Products. Legacy tunnel components remain in `src/components/ui/` but are not mounted on the homepage.
- The homepage's scroll-linked research spread, mobile topic controls, and community/testimonial transitions remain intact. Other pages retain their existing layouts.

- The 3D scenes were removed from all five editorial pages at the user's request. Responsive headings, original photography, clinical protocols and source articles remain. `src/components/editorial/editorial-heading.tsx` provides the shared heading layout.
- `audit/EDITORIAL-3D.md`, `audit/editorial-comparison.html` and the scene-specific capture/QA scripts document the superseded 3D iteration; they do not describe the current website.

- `audit/comparison.html`: reference/before/after screenshot gallery.
- `audit/screenshots/`: desktop/mobile page captures plus shelf, product-dialog, glass-reveal and footer states.
- `node scripts/qa.mjs`: 32 routes, image loading, page headings, console errors and responsive widths.
- `node scripts/component-qa.mjs`: reload reveal, catalogue shelves, quantity-to-cart handoff, filters, mobile image zoom, footer controls and reduced motion.
- `node scripts/links-and-reference.mjs`: internal links, anchors and source reference assets.

Cleer is a design-only case study at https://non-linear.studio/work/cleer. Its underlying gallery designs were inspected directly after its WebGL gallery rendered incompletely in headless Chromium. No live Cleer checkout, product-rotation system or storefront behavior is claimed as inspected.

The capture/one-time transformation scripts in `scripts/` document the work; do not rerun transformation scripts on edited source. The browser QA scripts are repeatable against the running development server.

### Liquid homepage headline

The user-supplied LiquidText component is integrated into both hero headline lines, using the existing Motion runtime. Product photography and routes remain unchanged. The SDF/shader implementation lives in `src/components/ui/liquid-text.tsx`; missing canvas/visibility helpers are implemented locally in `liquid-text-utils.ts`. Animation responds to pointer and touch, settles after release, and pauses offscreen/in background tabs. Reduced motion and unavailable/lost WebGL show ordinary accessible text.

### Vercel deployment

Commit source files, `package.json`, `package-lock.json`, and `vercel.json`. Keep `node_modules/` and `dist/` out of Git: Windows-generated dependency launchers cannot be reused as Linux executables. The Vercel configuration installs with `npm ci`, builds with `npm run build`, and serves `dist/`. The SPA rewrite supports direct visits and refreshes on product and editorial routes.

After pushing the dependency-tracking fix, deploy the new commit. Redeploying the old commit will retain its tracked dependencies. If manually redeploying, turn off reuse of the existing build cache for the first corrected deployment.
