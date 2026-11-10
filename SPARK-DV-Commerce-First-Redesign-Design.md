# SPARK-DV Commerce-First Design Direction

**Design brief · 9 November 2026**  
**Companion:** [Commerce-First Redesign PRD](./SPARK-DV-Commerce-First-Redesign-PRD.md)  
**Scope:** All public routes, with the homepage and product journeys designed around shopping first.  
**Status:** Implemented in the local React app; visual captures are stored in `.impeccable/review/`.

## 1. Direction

**A lively, tactile dental shop built around the real SPARK-DV packages.** A visitor should see the product range and the next shopping action before a long explanation. Keep the clinical brand confidence and original package colors; make the storefront feel alive through scroll, product selection and restrained pointer response.

“Dynamic” means a product responds to browsing, the selected category stays visible, variants update together, and cart actions confirm their result. It does not mean products spin, cards fly around, or the cursor obscures the package. Prior user direction still rules out 3D product models on every page.

The design is a hierarchy and interaction change across the site. Preserve the current SPARK-DV identity and content routes; do not reproduce another shop’s wordmark, illustrations, product images, headline or distinctive composition. The homepage hero now uses the supplied product-motion layout: SPARK-DV is centered above the original mapped package photo, with floating motion, a pointer-responsive gradient, quantity and product controls, current price and a cart action. The catalogue follows the hero immediately. All explanatory, professional, safety and legal source content remains reachable in its own route or disclosure.

## 2. What was reviewed

### Existing SPARK-DV

Read-only browser inspection of [the deployed SPARK-DV homepage](https://sparkdv.vercel.app/) on 9 November 2026 showed a glass logo reveal, fixed shopping/navigation header, image tunnel with six product links, science-research spread, proof line, product showcase with five category controls and 17 listed products, then clinical feature sections, school program, audience paths, testimonials and contact footer. Product cards expose quantity choices, product navigation, price and add-to-cart. The catalogue is discoverable now; the redesign changes how quickly a shopper reaches it.

### Dental and oral-care reference sites

- **[Henry Schein Dental](https://www.henryschein.com/us-en/dental/default.aspx)** — Firecrawl page scrape shows the professional supply home page, offers, popular clinical categories including Preventive Products and Restorative Materials, and direct links into shopping. Apply category-first navigation and useful offers only when a SPARK-DV price/offer is verified. Do not copy its US megacatalog density or unsupported delivery/availability claims.
- **[BOKA](https://www.boka.com/)** — Firecrawl search and scrape identified the oral-care storefront for toothpaste, floss, toothbrushes, whitening, mouthwash and related daily-care items. Apply clear family grouping and product-led entry; do not import its ingredient claims, campaign language or visuals.
- **[Safco Dental](https://www.safcodental.com/)** and **[Benco Dental](https://www.benco.com/)** surfaced in the same dental supplier search. Treat them as additional category and professional shopping references; the initial search results are excerpts, not a comprehensive UI inspection.

These references support a shop-oriented information order. They do not establish that SPARK-DV has the same inventory, fulfilment or payment systems.

### UI component references

- **[21st.dev ecommerce components](https://21st.dev/community/components/explore/ecommerce-components)** — reviewed in the user’s browser and via Firecrawl. The collection describes 60 ecommerce components, with 26 tagged as exact online-retail matches. Visible options include product cards, product carousels, image galleries, drawers and product-detail patterns. Its [Product Carousel](https://21st.dev/@ravikatiyar162/components/product-carousel) explicitly uses a horizontal product row, section title and navigation; the visible demo is grocery merchandise. Borrow the clear row navigation and “see all” relationship, then bind it to the correct dental source data and photographs.
- **[21st.dev product-card collection](https://21st.dev/community/components/s/product-card)** — contains React and Tailwind product-card patterns. Use a restrained product card as the component reference for verified price/status, correct image, variant and action. Inspect the chosen source implementation and license before adopting code.
- **[Inspira UI component index](https://inspira-ui.com/docs/en/components)** — reviewed in the user’s browser. The current catalogue presents Cards, Cursor and other motion-focused groups. The selected card/cursor previews suggest scroll or pointer response as optional component behaviors, not necessary decoration.
- **[Inspira UI Smooth Cursor](https://inspira-ui.com/docs/en/components/cursors/smooth-cursor)** — documentation describes a spring-physics cursor for Vue; card, cursor and scroll components are distributed for Vue/Nuxt. SPARK-DV is React. Do not paste Vue source into the app. Translate only the desired, bounded behavior with the existing React/Motion stack. Do not adopt a global pointer trail; keep the native cursor and shopping affordances clear.

### REA coverage

REA’s passive browser discovery was attempted at `http://127.0.0.1:9222`. It returned `endpoint_unreachable`: the open Brave session is not available at that debugging endpoint. This design therefore distinguishes Firecrawl results and the user-browser observations above from REA evidence; no REA page capture is claimed. If the user later enables or provides a supported REA CDP target, repeat runtime inspection before implementation.

## 3. Identity and visual system

Preserve current SPARK-DV assets and the warm clinical palette documented in the project’s current [design system](./DESIGN.md). Values below are implementation tokens from that system, not newly measured reference-site CSS.

| Token | Use |
| --- | --- |
| Warm paper `#fffcf8` | Main page canvas |
| SPARK-DV navy `#073763`; deep footer navy `#062b50` | Headings, navigation, support/footer panels |
| SPARK-DV action orange `#ad4b09`; hover `#873908` | Purchase/enquiry primary actions and selected states |
| Logo purple `#63218b`; package coral `#e55e36` | Existing logo/package colors; small accents only |
| Secondary text `#526174`; rule `#ded8d4` | Short descriptions and surface separation |
| White / warm cream | Neutral product-image frames and catalog surface |

Use the locally available DM Sans for readable product labels and interaction text. Keep price numerals tabular, buttons plainly labelled, card corners modest, and body copy short. Use restrained color gradients in the hero background as requested; keep product-grid surfaces quiet enough to keep each package legible.

### Photography

- Use only the existing, mapped SPARK-DV package photographs for product merchandising.
- Fit the full package inside a consistent neutral image stage (`contain`) and preserve its aspect ratio, embedded label and colors.
- Use detail crops only when the corresponding source image really is a label/detail image; keep the full package image as the card default.
- Never generate or retouch replacement package labels, show an invented package face, or use a neighboring product’s photo for visual balance.
- Lifestyle, clinic or school images remain within their authentic explanatory sections, not as substitute product hero imagery.

## 4. Site-wide layout and page composition

### Visual comparison record · 9 November 2026

Compared the implementation against the stored Cleer desktop product reference (`audit/screenshots/reference-cleer-products.png`) and mobile reference (`audit/screenshots/reference-cleer-mobile-view.png`). The implementation carries forward generous image staging, restrained navigation, clear product hierarchy and whitespace, while retaining SPARK-DV package photos, colors, product data and labels. The homepage now leads with the supplied WebGL prism animation; its interactive product showcase follows immediately after the scroll sequence. Captures at 1440×900 and 390×844 are in `.impeccable/review/prism-desktop.png`, `prism-mobile.png`, `product-after-prism-desktop.png` and `product-after-prism-mobile.png`. The Nanion Elite original photo was verified centered inside the stage at both viewport sizes, the removed “Shop the range” section is absent, and the full catalogue remains linked from Products. Both viewports reported no horizontal overflow or browser console errors. The animated fixed footer has dedicated at-scroll captures in `footer-desktop.png` and `footer-mobile.png` because static full-page screenshots cannot include its fixed viewport panel.

### Global header

Lead with **Products**; keep Science, About, Contact and the cart in the compact primary navigation. About contains visible paths for For Dentists, For Parents and School Program; their existing direct routes remain available. Use the original logo, cart count and one contextual CTA. The Products menu groups verified families by catalogue category and stays operable on hover, keyboard, touch and screen readers. Mobile shows cart and menu without shrinking tap targets.

### Homepage order

1. The glass-prism WebGL animation introduces SPARK-DV; pointer movement redirects the light and scrolling rotates/dims the prism.
2. Immediately after the animation, the selected original product photo, name, factual summary, price, quantity and cart/enquiry action appear in the interactive product showcase. Its controls can move across all mapped product records.
3. The separate “Shop the range” card rail is omitted from the homepage per the latest direction. The full 17-product catalogue remains available from Products, with category filters, search and sorting.
4. Follow with a short science link, then relevant professional resources and the school-program feature.
6. Compact parent, dental-professional and partner paths; preserve approved social proof and enquiry footer below the shopping journey.

Use a clear merchandising hierarchy instead of many equally weighted section panels. Keep the full existing portfolio and long-form routes available below the first curation sections.

### Product page and catalogue

- **Catalogue:** open with Shop title, search, and sort controls above a three-column product grid. A left sidebar groups category, price range, shopping status, and professional-use filters; mobile collapses this into a labelled filter panel. Filters update live, expose removable active chips and a clear-all control, and show a result count. Product cards use original photography with `object-fit: contain` so full packages remain visible, plus category, name, price/status and add/enquiry action.
- **Product detail:** package gallery beside the name, verified price, variant/quantity and purchase/enquiry action. Keep the buy controls visible on desktop as the visitor browses long specifications; on narrow screens use a clearly labelled compact action area only if it stays above browser controls and never covers warnings.
- **Long detail:** short visible description, then semantic sections for how it works, use/safety/professional status, specifications/evidence and FAQ. Preserve full approved information.
- **Cart:** use a simple drawer or clear cart page with selected package, selected variant, price, quantity controls, subtotal and real next step. Empty state links back to relevant products.

On the Science, Dentists, Parents, School, About and policy routes, put the page purpose and next relevant action first; summarize the topic in one concise paragraph and place approved deeper material in labelled sections. Retain critical warnings and legal destinations visibly, with no forced interaction to reach them.

## 5. Interaction and motion design

### Native scroll drives browsing

- Use smooth but ordinary page scroll. Anchor links move to a labelled product category or next shopping section; do not trap the wheel or create a scroll-jacking tunnel.
- A sticky category bar may mark the currently visible group and let a user jump to another. Synchronize it with scroll using intersection/visibility state; preserve browser history and URL where practical.
- Reveal product cards with a short, low-distance 2D settle as they enter the viewport. Reduced motion shows them immediately.
- A featured photo/summary may stay together briefly as the user browses that product section; stop at its natural end. Text, safety information, imagery and buy controls remain accessible with CSS motion disabled.
- Keep the default content visible and the action reachable if JavaScript or the animation library fails.

### Pointer responds to merchandising

- Desktop hover/focus lifts the card a few pixels or gently enlarges its original package photo. Reveal or emphasize quick add only after confirming price/variant/status.
- Pointer movement may shift a very light image spotlight or move a lens within the existing high-resolution photo; it must not change package identity or crop away the label.
- If a carousel supports pointer drag, show arrow controls and keep each card link/focus target usable. Maintain native text selection and the system cursor.
- Animate add-to-cart into a small, perceivable confirmation and update the cart count. Errors state what needs attention and how to recover.
- No page-wide animated cursor, forced loop, model rotation or auto-advancing product carousel.

### Touch, keyboard and reduced motion

The same actions appear on tap and focus. Product rails support native touch swipes, snap points, previous/next buttons and keyboard navigation. Category and filter controls do not depend on hover. Respect reduced motion for initial entry and live preference changes; never withhold product information because an animation was skipped. Product animation uses short, reversible transitions and pauses offscreen or in a hidden tab.

### Proposed timing budget

Use CSS or the installed Motion runtime. Aim for 150–250 ms for card, selected-filter and add confirmation feedback; allow about 300–450 ms for a deliberate product image or category transition. Keep page-scroll movement native. Avoid animating layout geometry, rapid repeated transitions or expensive effects across a wall of products. These timings are proposed implementation values, not extracted vendor specifications.

## 6. Component adaptation shortlist

| Need | Reference | SPARK-DV adaptation | Fit |
| --- | --- | --- | --- |
| Featured-product row | 21st.dev Product Carousel | Real product cards with arrows, swipe and “Shop all”; original package imagery and source-driven price/status | Strong: React/Tailwind pattern; inspect code and license |
| Responsive product card | 21st.dev product-card collection | Compact title, factual one-line summary, price/status, professional label and valid CTA | Strong: adapt rather than accept placeholder data or ratings |
| Scroll-led feature transition | 21st.dev ecommerce collection’s “Cinematic Product Scroll Section” | Use subtle 2D progression to explain which item/category is active, with ordinary scroll and static fallback | Selective: no scroll trap or 3D package model |
| Pointer-based visual feedback | Inspira UI Smooth Cursor / Cursor family | Reuse only the idea of bounded spring response on an individual image/control; preserve native pointer | Adapt only: reference code is Vue/Nuxt, avoid whole-page trail |
| Card movement | Inspira UI Cards group | Optional restrained hover/focus emphasis for the package card | Adapt only: exclude 3D-model displays and noisy effects |

Verify each selected component’s current API, dependencies, accessibility, license and mobile behavior before implementation. The current React site already has the `motion/react` animation runtime; avoid duplicate libraries. Component directories, result counts and examples may change.

## 7. Responsive structure

- **Wide desktop:** clear product feature, generous package-image area, four-column shop grid where package labels remain readable, desktop category rail and full variant controls.
- **Tablet:** two- or three-column grid based on real package dimensions; reduce visual offsets before shrinking product labels and prices.
- **Mobile:** compact product feature, two-column grid where labels stay legible (otherwise one column), touch carousel, tappable category/filter controls, no hover dependencies and no sideways page overflow.
- Keep prices, professional-use status and disabled states visible at every breakpoint. Test 320, 390, 768, 1024 and 1440 px viewports.

## 8. Accessibility, performance and truthful commerce

- Use semantic headings, links, buttons, labelled filters, variant inputs and cart status; provide useful photo alt text and keyboard-visible focus.
- Set image width/height, preserve full packaging via `object-fit: contain`, lazy-load offscreen assets and avoid repeated full-resolution downloads for a simple hover.
- Run animation only while a relevant section is visible and pause when the tab is hidden. No separate WebGL or 3D product-rendering dependency.
- Announce result counts and cart changes without moving focus unexpectedly; retain Escape/back control and focus restoration for a cart drawer.
- Mark demo checkout honestly. Never mark an enquiry submitted, product ordered or payment processed unless the relevant service confirms it.
- Safety, instructions, clinician-only status, privacy, shipping and other legal terms keep adequate contrast and are not hidden only on hover.

## 9. Source trail and evidence limits

This direction is based on the live SPARK-DV page observed in the user’s Brave browser, Firecrawl search and page retrieval on 9 November 2026, and direct inspection of the 21st.dev ecommerce collection/Product Carousel and Inspira UI component index/Smooth Cursor documentation. The third-party pages are inspiration for reusable interaction patterns, not visual measurements or evidence about SPARK-DV product claims.

- [SPARK-DV live site](https://sparkdv.vercel.app/)
- [Henry Schein Dental homepage](https://www.henryschein.com/us-en/dental/default.aspx)
- [BOKA oral-care shop](https://www.boka.com/)
- [21st.dev ecommerce collection](https://21st.dev/community/components/explore/ecommerce-components)
- [21st.dev Product Carousel](https://21st.dev/@ravikatiyar162/components/product-carousel)
- [21st.dev product-card results](https://21st.dev/community/components/s/product-card)
- [Inspira UI component browser](https://inspira-ui.com/docs/en/components)
- [Inspira UI Smooth Cursor docs](https://inspira-ui.com/docs/en/components/cursors/smooth-cursor)

REA could not attach to the browser because the REA tool requires a local CDP debugging endpoint and the current session did not expose one at the attempted loopback port. Firecrawl page content can omit interactive/hydrated layout details; the user-browser inspection supplied direct visual and accessibility evidence for the 21st.dev, Inspira UI and SPARK-DV pages. Mobile and pointer/scroll states on external reference sites were not captured, so component behavior in the design above is proposed guidance to verify during implementation.
