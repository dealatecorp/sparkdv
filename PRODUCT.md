# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

For the commerce-first redesign, the primary journey is product discovery and shopping for dental professionals and other shoppers. Keep parents/caregivers, distributors, school-program partners, and general visitors supported through clear secondary paths. Dental professionals still need fast access to clinical evidence, protocols, samples, pricing and specialist support; commerce emphasis does not remove those needs.

## Product Purpose

SPARK-DV presents clinically oriented products for pediatric and preventive dentistry, including prevention, pediatric endodontics, and aesthetic restorations. Its public website combines product discovery and shopping with science information, professional protocols, parent education, school dental-health programming, company information, and enquiry/contact paths. The current redesign direction puts product discovery and shopping on the homepage first, with qualified enquiries, clinical information, and audience-specific content kept accessible.

## Positioning

The site positions SPARK-DV around dentist-oriented, evidence-led, R&D-focused products made in India. These are source-site positioning statements, not independently verified claims. Do not invent or strengthen clinical, regulatory, efficacy, patent, or manufacturing claims.

## Operating Context

The experience serves people scanning product information on desktop and mobile, including dental professionals who may be between patient visits and parents seeking plain-language guidance. Key journeys include browsing product families and variants, reviewing evidence or protocols, purchasing where enabled, and contacting the team about clinical, distributor, demo, school-program, or general enquiries.

## Capabilities and Constraints

- Preserve all observed public routes, content areas, product families and variants, commerce affordances, audience pathways, and regulatory/legal information described in `SPARK-DV-Recreation-PRD.md`.
- The current site exposes a product catalogue, product detail routes, cart affordance, contact/enquiry routes, Science & Research, For Dentists, For Parents, School Program, About, and policy pages.
- The user requested a distinct, improved UI/UX and scroll animations in the design document.
- Product family/SKU totals, some prices/statuses, policy text, product detail copy, form destinations, and clinical claims need source-owner verification; do not fabricate missing facts.
- Keep the original packaging photographs and their verified product-to-image mapping; never substitute generated or stock product images. Confirm ambiguous source mappings before changing them.
- Existing repository documentation describes cart and checkout as local/demo flows without a payment gateway or order API. Do not promise live payment, inventory, fulfilment, or completed orders until those services are connected and verified.
- Interactive storefront direction: meaningful scroll-linked reveals, product/category selection feedback, and restrained pointer responses. Preserve equivalent touch, keyboard and screen-reader operation; respect reduced motion. No 3D product models or WebGL product scenes.
- Existing brand assets, source brand palette/type, commerce backend, form integrations, and implementation stack have not been confirmed in this workspace.

## Evidence on Hand

- Live SPARK-DV homepage accessibility content and publicly indexed route content summarized in `SPARK-DV-Recreation-PRD.md`.
- User instruction to prioritize dentists first while retaining parent/shopping paths, and to optimize catalogue discovery and enquiries.
- User direction on 9 November 2026 to make the entire public site ecommerce-first, reduce explanatory text, and make the experience scroll-interactive, cursor-interactive, and dynamic. The current detailed proposal is in `SPARK-DV-Commerce-First-Redesign-PRD.md` and `SPARK-DV-Commerce-First-Redesign-Design.md`.
- Firecrawl research and browser review of live SPARK-DV, Henry Schein, BOKA, 21st.dev, and Inspira UI are summarized and linked in the companion design document. REA passive browser discovery was attempted, but the available Brave CDP endpoint was unreachable.
- Browser research of public pediatric dental and professional oral-health sites, summarized with links in `SPARK-DV-Design.md`.
- No verified source images or approved clinical citations have been collected into the workspace.

## Product Principles

- Help dental professionals reach products, protocols, evidence, and an enquiry quickly.
- Keep parent education clear, separate, and appropriately qualified.
- Preserve full product and content coverage without inventing details.
- Make professional-use status, availability, price, and variant distinctions explicit.
- Treat clinical and regulatory statements as controlled content that requires source approval.

## Accessibility & Inclusion

The redesigned site should support keyboard and screen-reader use, mobile layouts, visible focus, meaningful labels, accessible form errors/statuses, adequate contrast, and reduced-motion preferences. Scroll animations must not conceal content or block task completion.

## Stack

React + Vite, chosen by the user on 4 November 2026 for this website build. No prior application implementation was present in the workspace.
