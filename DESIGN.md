# SPARK-DV design system

Updated 8 November 2026. The prior serif direction is archived in audit/DESIGN-before.md. The Cleer reference and user-supplied shelf, glass reveal and footer define this redesign.

## Identity and tokens

Original SPARK-DV logo and product imagery. Logo navy #073763, footer #062b50, warm canvas #fffcf8, orange #e78308, coral #e55e36 and purple #63218b. Accessible action orange #ad4b09 (hover #873908), muted text #526174 and divider #ded8d4. Warm orange/coral/purple gradients on the hero and product showcase; pale lilac research surface.

Self-hosted DM Sans: regular/medium display 44–84px, route headings 43–68px, section headings 30–58px, product names 17–35px, body 16–18px, controls 13–15px and supporting labels 11–12px. Display line height 1.04–1.2, body 1.6–1.8, tracking no tighter than -0.04em. Footer background wordmark is decorative.

1320px maximum width. Desktop gutters 48px, tablet 28px, mobile 20px. Section spacing 88–110px desktop and 55–60px mobile. Breakpoints 760, 1000/1024 and 1100px. Controls have 44–48px targets. Standard corners 2px; footer links use the supplied pill shape.

## Components

- Sticky header, original logo, accessible Products disclosure, mobile menu and real cart.
- Supplied Perspective Tunnel hero adapted to six complete original product photographs, centered liquid brand typography and real product links. The supplied LiquidText shader renders both headline lines in brand colours, reacts to pointer/touch movement, and settles after release. Native text stays available for accessibility, reduced motion, loading and WebGL failure. Rendering is capped at 2x resolution (1.5x on touch), runs only during interaction/settling, and pauses offscreen or in hidden tabs. Native scroll and bounded pointer movement drive CSS perspective on desktop; mobile uses a swipeable product rail, and reduced motion shows a static arrangement. No 3D models are used.
- User-supplied Sneaker Product Hero integrated on the homepage and /products with SPARK-DV photographs and data. Retains three-column composition, animated product swaps, changing gradient backdrops, reflections, pointer tilt/loupe, gallery and favourite feedback. Product selectors replace shoe colourways; quantity replaces shoe size; factual category replaces demo ratings. All 17 products remain accessible through filters and selectors, with the existing cart, search and sorting. Favourites persist locally.
- Product dialog with original image zoom, source description, prices, professional-use status, quantity, existing-cart integration, disclosures and full product-page link. No invented ratings, sizes, delivery promises or back-of-pack view.
- Source-specific product and editorial pages with original clinical diagrams, founder portrait, responsive tables, six recovered protocols and FAQs.
- Supplied WebGL glass reveal with original SPARK-DV colours, bounded playback, skip, replay on reload and reduced-motion static logo.
- Cinematic footer with SPARK-DV wordmark, contextual marquee, magnetic enquiry links and compact legal row. The lower four-column section was removed at user request; manufacturer details are on Contact.

## Motion and access

The homepage has a separate `.home-editorial` surface: a perspective product-photo hero with an interactive liquid headline and uncropped original packaging, followed by a research spread. On desktop, a sticky illustration follows three editorial chapters; on mobile and reduced motion, explicit topic buttons select one article. Illustration transitions sequence the outgoing and incoming images so scientific labels do not overlap. Community photography uses one bounded reveal, and testimonial changes provide short feedback. This update is homepage-only and uses no 3D models.

CSS handles small hover feedback. Motion handles existing shelf, accordion and footer effects; GSAP drives the supplied product showcase. Shelf spring is 0.55s, no bounce. Marquee supports pause and stops on hover/focus. Reduced motion disables transforms and uses a static logo. Dialogs contain focus, make background content inert and restore focus. Product photographs use object-fit: contain.

## Evidence

Reference: https://non-linear.studio/work/cleer, a design-only case study. Firecrawl content and Playwright screenshots are in audit/. The WebGL gallery was incomplete in headless Chromium; underlying gallery designs were inspected directly. These tokens are proposed SPARK-DV values, not measured Cleer CSS. Source facts and imagery: https://sparkdv.com. Shared/mismatched variant images and pending legal/backend content are documented in README.md.

## Checkout and contact interactions

Product selection uses previous/next arrows with wraparound and a live name/counter. `/checkout` provides a clearly marked demo payment flow with card/UPI fixtures, processing, animated success/rejection, retry and an unchanged saved cart. It collects no payment credentials and creates no order. Contact links open a native modal dialog over the current page, retaining enquiry type/product context, keyboard focus, Escape/backdrop closing and page scroll. Direct contact URLs open the same dialog over the catalogue.

The header uses the supplied proximity/spring dock adapted to visible text labels, with the existing Motion runtime. Text-sized items magnify on desktop pointer/keyboard focus, preserve semantic links and the Products disclosure, and become a scrollable stacked dock in the mobile menu. Reduced motion disables magnification.


The catalogue category list is now the user-supplied liquid-morph floating menu: a warm gradient pill opens into a navy panel with rolling text, category counts, professional filtering and reset. Search and sorting remain above the showcase. The menu closes on selection, Escape, focus departure or outside pointer press, and respects reduced motion.
