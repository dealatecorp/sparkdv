# SPARK-DV design system

Updated 8 November 2026. The prior serif direction is archived in audit/DESIGN-before.md. The Cleer reference and user-supplied shelf, glass reveal and footer define this redesign.

## Commerce-first redesign — implemented

On 9 November 2026, the user set a whole-site direction: prioritize ecommerce, reduce long introductory copy, and make browsing dynamic through scroll and pointer interaction. The implementation now begins with the user-supplied Sticker Swap Headline with original product-photo stickers and a scroll-opening photo curtain, followed directly by the featured product showcase. The full catalogue remains available through Products. Original mapped package photography, clinical and safety content, professional-use guidance and legal routes are retained. No 3D product models or generated/stock product substitutes are used.

Use [SPARK-DV-Commerce-First-Redesign-PRD.md](./SPARK-DV-Commerce-First-Redesign-PRD.md) for requirements and [SPARK-DV-Commerce-First-Redesign-Design.md](./SPARK-DV-Commerce-First-Redesign-Design.md) for references, responsive behavior and motion safeguards. The older tunnel and liquid-morph components below are legacy source files, not active homepage sections.

## Identity and tokens

Original SPARK-DV logo and product imagery. Logo navy #073763, footer #062b50, warm canvas #fffcf8, orange #e78308, coral #e55e36 and purple #63218b. Accessible action orange #ad4b09 (hover #873908), muted text #526174 and divider #ded8d4. Warm orange/coral/purple gradients on the hero and product showcase; pale lilac research surface.

Self-hosted DM Sans: regular/medium display 44–84px, route headings 43–68px, section headings 30–58px, product names 17–35px, body 16–18px, controls 13–15px and supporting labels 11–12px. Display line height 1.04–1.2, body 1.6–1.8, tracking no tighter than -0.04em. Footer background wordmark is decorative.

1320px maximum width. Desktop gutters 48px, tablet 28px, mobile 20px. Section spacing 88–110px desktop and 55–60px mobile. Breakpoints 760, 1000/1024 and 1100px. Controls have 44–48px targets. Standard corners 2px; footer links use the supplied pill shape.

## Components

- Sticky header, original logo, accessible Products disclosure, mobile menu and real cart.
- User-supplied Sticker Swap Headline on the homepage, with SPARK-DV centered above the animated lettering. Original product-photo stickers pop into changing words; eight original product photos open as a scroll curtain. Desktop photos flank the lettering; mobile photos flank the central headline and stacked shopping actions. The headline supports keyboard advancement and a pause control, and autoplay stops offscreen and under reduced motion. The glass prism is no longer rendered.
- User-supplied Sneaker Product Hero appears immediately after the sticker and curtain scene and uses the mapped SPARK-DV product records and photos. Product navigation updates image, name and price together; quantity controls add the selected quantity to the existing cart. Package photos use a full-frame `contain` image stage to center wide and tall images. Demo shoe ratings and unsupported gallery angles are hidden.
- All 17 products are available in the Products catalogue with search, category filters, sorting, product pages and cart actions. The separate “Shop the range” homepage rail was removed by request.
- Product dialog with original image zoom, source description, prices, professional-use status, quantity, existing-cart integration, disclosures and full product-page link. No invented ratings, sizes, delivery promises or back-of-pack view.
- Source-specific product and editorial pages with original clinical diagrams, founder portrait, responsive tables, six recovered protocols and FAQs.
- Supplied WebGL glass reveal with original SPARK-DV colours, bounded playback, skip, replay on reload and reduced-motion static logo.
- Cinematic footer with SPARK-DV wordmark, contextual marquee, magnetic enquiry links and compact legal row. The lower four-column section was removed at user request; manufacturer details are on Contact.

## Motion and access

The homepage uses native page scrolling to open the product-photo curtain around the sticker headline, with subtle pointer parallax. The product showcase immediately follows and floats, tilts gently on desktop, and stacks vertically on mobile. The product selector works with touch and keyboard. Product photos use `object-fit: contain`. Reduced-motion preferences show the curtain open, disable headline autoplay, and disable the product float/tilt.

CSS handles small hover feedback. Motion handles existing shelf, accordion and footer effects; GSAP drives the supplied product showcase. Shelf spring is 0.55s, no bounce. Marquee supports pause and stops on hover/focus. Reduced motion disables transforms and uses a static logo. Dialogs contain focus, make background content inert and restore focus. Product photographs use object-fit: contain.

## Evidence

Reference: https://non-linear.studio/work/cleer, a design-only case study. Firecrawl content and Playwright screenshots are in audit/. The WebGL gallery was incomplete in headless Chromium; underlying gallery designs were inspected directly. These tokens are proposed SPARK-DV values, not measured Cleer CSS. Source facts and imagery: https://sparkdv.com. Shared/mismatched variant images and pending legal/backend content are documented in README.md.

## Checkout and contact interactions

Product selection uses previous/next arrows with wraparound and a live name/counter. The cart and checkout routes lead to an order enquiry; the repository has no payment gateway or order API, so the site does not claim an order or payment succeeded. Contact is a dedicated route with enquiry context and validation.

The header uses the supplied proximity/spring dock adapted to visible text labels, with the existing Motion runtime. Text-sized items magnify on desktop pointer/keyboard focus, preserve semantic links and the Products disclosure, and become a scrollable stacked dock in the mobile menu. Reduced motion disables magnification.


The catalogue uses clear search, sorting and category filters above standard product cards. The user-supplied liquid-morph component remains in the repository but is not active on the homepage or catalogue.


## 10 November 2026 responsive and commerce update

- Mobile hero mirrors the desktop composition: large SPARK-DV name, centered sticker headline and two side curtains. Mobile menu uses the supplied TextRoll, adapted for touch, keyboard focus and reduced motion.
- Checkout uses address, payment/delivery information, item review, quantity controls and an order summary. The final action prepares an email enquiry; no payment processor or order-submission backend is connected.
- Science uses the supplied animated LayoutGrid with existing research diagrams and article text revealed in an accessible dialog. Article URLs use the article query parameter and support browser back/forward.
- About uses the supplied interactive image accordion. Research, family and community scenes are generated illustrative imagery; the founder portrait remains the original. All assets are local optimized WebP images.
- The original founder photo appears in a centered scroll-image tunnel. It begins at 88% scale and grows to full size on a transparent background, with a static reduced-motion alternative.
