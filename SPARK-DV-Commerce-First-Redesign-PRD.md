# SPARK-DV Commerce-First Website Redesign

**Product requirements document · 9 November 2026**  
**Scope:** Whole public website; homepage repositioning, product discovery, product details, cart and connected content pages.  
**Status:** Implemented in the local React app; payment/order-system integration remains an open product decision.

## 1. Summary

Make SPARK-DV’s public website work first as a product discovery and shopping experience. The homepage should put real products, product families, prices or enquiry routes, and clear shopping actions before long scientific explanations. Across the rest of the website, shorten introductory copy and help visitors move from each page to a relevant product or purchase step.

Retain the site’s original packaging photography, full product range and variants, shopping and contact affordances, safety information, professional-use restrictions, clinical qualifications, audience paths, and legal content. Reorganize extensive explanations as short summaries with clear links or disclosures to the complete material. This brief changes the order and presentation of facts; it does not authorize inventing or strengthening clinical or commercial claims.

### Implementation notes · 9 November 2026

The homepage now opens with the supplied scroll-rotating glass-prism animation, followed immediately by the mapped, shoppable product showcase. The product image is centered and contained for wide and tall package photos. The standalone “Shop the range” rail was removed from the homepage; Products still opens the full 17-product catalogue with conventional product cards, search, sort and category filters. Product and editorial pages place a short summary and shop action ahead of full source content, which remains available in disclosures. Cart and checkout routes direct visitors to an order enquiry because the repository does not connect to payment or order placement. The product selector uses current source records and original mapped product photos; unsupported gallery angles and ratings are hidden. See [the implementation design record](./SPARK-DV-Commerce-First-Redesign-Design.md) and the paired captures in `.impeccable/review/`.

The supplied direction that the site should be scroll interactive, cursor interactive, and dynamic is a product requirement. Interactions should make product browsing or purchase clearer and remain usable through touch, keyboard, screen reader, and reduced-motion settings.

## 2. Observed starting point

The public homepage was reviewed in the browser at [sparkdv.vercel.app](https://sparkdv.vercel.app/) on 9 November 2026. It has a persistent header, a full-screen image tunnel with six linked products around the headline, a science/research spread, proof points, a five-control category filter and 17-item product showcase, followed by further clinical highlights, school-program content, audience links, testimonials and a closing enquiry section. The primary “Explore products” button goes to the catalogue, while the product showcase itself follows a substantial science section. This is the main hierarchy problem to solve.

The existing site already has product routes, a category catalogue, product selection, prices and cart affordances. Repository documentation describes cart storage as local and checkout as a non-payment demo: it collects no card details and does not place an order. Treat production checkout, inventory, shipping, payments and order confirmation as unconnected until verified. Design must never label an enquiry or local cart action as a completed purchase.

The catalogue and source pages expose more product variants than family names. A previous inventory lists 19 product slugs and 13 families; these counts are not a verified current commerce master. Build from the current source-of-truth product feed and keep the observed product paths while the canonical SKU, variant and availability lists are confirmed.

## 3. Goals and success measures

### Goals

1. Let a visitor see and reach product choices from the homepage without first reading an extended science story.
2. Make category, variant, price, availability and professional-use status clear before a visitor adds an item or follows an enquiry route.
3. Reduce friction from homepage to product detail, cart and the actual available checkout or enquiry action.
4. Preserve the complete product catalogue, original package imagery, audience pathways, clinical accuracy and access to supporting evidence.
5. Make motion and pointer interaction contribute to browsing, selection or feedback, rather than distract from purchase.

### Measurement

Instrument events before choosing numerical improvement targets. Establish a baseline from the existing site, then set targets with the site owner.

- Homepage featured-product impressions, category selections, product-card clicks and “shop all” clicks.
- Product search starts, successful results, filter/sort use, zero-result recovery and product-detail views.
- Variant changes, add-to-cart actions, cart opens, cart edits and abandoned carts.
- Completed paid orders **only after** a real payment and order service is connected; otherwise measure completed enquiries separately.
- Mobile versus desktop task completion, keyboard purchase-flow completion and reduced-motion usability.

## 4. Audience and priority

- **Direct shoppers:** need to recognize the correct product, compare available variants, see a trustworthy price/status and take a real next step.
- **Dental professionals:** need products by treatment or specialty, a visible professional-use label, protocols when relevant, and clear routes for professional pricing or clinical questions.
- **Parents and caregivers:** need a calm, plain-language route to products intended for them and to qualified guidance; professional-only instruments and treatments must not appear suitable for self-treatment.
- **Distributors and school-program partners:** need a direct enquiry path that does not disrupt shopping.

Shopping is the homepage’s default path. It does not remove the parent, professional, school or distributor routes from the global navigation.

## 5. Product and content principles

- Use the original SPARK-DV product photographs and labels. Maintain an explicit product-slug-to-image mapping; confirm every mapping against the package before display. Do not substitute generic, generated or another product’s package image.
- Preserve the source catalogue and all variants, detail routes and categories. A product may only be purchasable when its current price, variant and availability support it.
- Keep the short summary close to the purchase action. Put longer explanation behind a visible, descriptive “How it works,” “Use and safety,” “Evidence,” or “Full details” link or disclosure.
- Never remove required safety information, contraindications, professional-only status, clinical qualifiers, disclaimers or legal policies. Place critical warnings before purchase and detailed source information where it is easy to find.
- Distinguish **add to cart**, **request professional pricing**, **learn more**, **coming soon**, **out of stock** and **not available for online purchase**. These states are data-driven, not interchangeable marketing labels.
- Do not invent reviews, stock, discount, delivery promise, formulation benefit or clinical outcome. Do not convert an email enquiry into a purchase confirmation.

## 6. Functional requirements

### 6.1 Homepage

1. Keep the brand and shopping navigation, cart count and direct contact link visible in a compact responsive header.
2. Put a featured purchasable product or product collection in the first screen. Display its original packaging photo, name, category, short factual description, current price/status and a direct purchase or enquiry action. Keep headline copy to one short sentence and optional supporting line.
3. Offer immediately usable category shortcuts, such as Prevention, Endodontics, Restorations and Instruments, using the names currently supported by the catalogue. Selecting a shortcut updates the product view and announces the selected result count.
4. Place a featured product row or responsive grid directly after the initial feature. Show an item’s product name, one concise summary, verified price or enquiry state, professional-use label where required, detail link and valid add-to-cart action.
5. Keep the complete portfolio available through a clear “Shop all products” action and a path to the full catalogue. Homepage curation may feature a subset; it must not replace or silently truncate the full range.
6. Keep a concise trust strip if its claims have current approval. Move the science overview, school-program feature and audience pathways below the first shopping sections. Use a brief introduction and direct links instead of long duplicate copy.
7. Give each non-commerce section one clear action. Avoid repeated product explanations that push the catalogue farther down the page.

### 6.2 Catalogue and shop navigation

- Provide search by product name or an approved category/use term, with useful empty results and an easy clear-search action.
- Filter by source-supported category, variant, professional-use status and verified availability; show result count and removable selected filters. Keep active state shareable in the URL where supported.
- Sort by relevance, name and price only when complete, current price data is present.
- Display product photographs with the whole package visible; identify product names, variants, price, status and next action without hover.
- Provide direct product details and quick add only for a verified purchasable selection. Variant selection cannot silently select an unconfirmed or professional-only product.
- Use a structured Products menu organized by the same categories as the catalogue.

### 6.3 Product details

- Show product name, family/variant, source-approved short summary, mapped original packaging photo, price/status, quantity, professional-use badge and primary action in the first view.
- Make variant changes visibly update package photo, title/SKU, price, availability and cart selection together.
- Keep the gallery truthful. Zoom or additional photographs may show supplied assets only; do not promise a 360-degree view or generate another package face.
- Present expandable sections for “What it is,” “How to use,” “Safety and professional use,” “Evidence and protocol,” ingredients/specifications and FAQs when verified content exists.
- Show related products as a useful follow-on with their own routes and verified images.
- Use add-to-cart for shop-ready items and the appropriate pricing or specialist enquiry for professional or enquiry-only items.

### 6.4 Cart, payment and enquiries

- The cart must show real selected products, variants, quantities, per-item values and available subtotal. Quantity changes and removals have immediate confirmation and can be reversed where practical.
- Confirm the active payment and order workflow before writing checkout copy. If the current demo is the only available checkout, clearly route a visitor to a contact or product-enquiry action and do not simulate a completed order, card charge, inventory reservation or shipment.
- Preserve enquiry context when routing from a product page. Keep partner, clinical, demo and general enquiries distinct from purchase states.
- The header cart counter and accessible cart label update after a valid add/remove operation.

### 6.5 Other site routes

- The Products route is the full store, not an editorial index. It needs search, usable filtering, sorting, clear results and direct product actions.
- Product routes support shopping and reveal factual detail progressively.
- Science, For Dentists, For Parents, School Program and About pages keep their routes and essential information. Replace repeated introductory paragraphs with concise summaries, action links, relevant product links and labelled expandable long-form material.
- Policy, regulatory and safety information remains directly reachable and readable; it must not be visually minimized until it becomes undiscoverable.

## 7. Interaction requirements: scroll, pointer, touch

### Scroll

- Use native page scroll. A category rail may become sticky below the header and accurately indicate the current section or filter.
- Let product sections enter with modest, brief 2D movement, reveal a product detail as it becomes current, or update section/category emphasis based on the visible scroll position.
- Any scroll-linked product view must have a static/native-scroll alternative; content and purchase controls must be usable without animation. Scrolling must never be trapped or used as the only way to reveal a price or CTA.
- Support direct links and browser back/forward without resetting the visitor to an unrelated product or scroll position.

### Pointer and keyboard

- Hover/focus on a product card can clarify its action, gently enlarge the **same** package image, show an existing-image close-up, or display a quick-add control. It must not swap in another product image or hide essential price/status text.
- A pointer-controlled product carousel may support click-drag and visible previous/next controls. Cards remain individually selectable; cursor position cannot be the sole way to choose a product.
- Buttons, category shortcuts, search, selectors, cards, drawers and filter chips have clear hover, focus, pressed, selected, disabled, loading and success/error states. Keyboard use gets the same information and actions.
- Do not replace the pointer with a large animated trail, impair native text selection, or require cursor precision to read a product label.

### Touch and small screens

- Use the same content and actions on mobile. Replace hover with tap-accessible controls and swipeable, snap-aligned product rows with visible previous/next buttons.
- Allow page scrolling while interacting with horizontal rails; prevent only unintended horizontal page overflow.
- Put catalogue filters in a labelled, dismissible sheet or disclosure with Apply/Clear and clear current state.
- Keep cart, product CTA and variant controls at usable touch sizes; avoid hover-only quick add.

## 8. Non-functional requirements

- Use React + Vite and the current project’s Motion, icon and styling dependencies. Check compatibility and cost before considering a new package.
- Do not introduce 3D product models. Product and package visuals remain authentic, flat photographs. Use CSS transforms, scroll position and lightweight Motion effects for merchandising interaction; do not add continuous WebGL/canvas loops to product cards.
- Honor `prefers-reduced-motion`; stop nonessential animations when offscreen or the document is hidden. Avoid autoplay that distracts or makes products unreadable.
- Maintain keyboard access, semantic headings/links/buttons, live status for cart and filter changes, visible focus, sufficient contrast, alt text, text scaling and accessible error recovery.
- Lazy-load offscreen catalog imagery, reserve image dimensions to prevent layout shift and deliver the provided optimized product sizes when available.
- Keep desktop, tablet and narrow mobile layouts functional. Validate 320, 390, 768, 1024 and 1440 CSS-pixel widths.
- Preserve canonical routes, deep links, history, search indexing and non-JavaScript fallback behavior already supported by the deployment.

## 9. Acceptance criteria

1. At desktop and mobile widths, the first homepage view presents a real, correctly mapped product and its current purchase/enquiry action; the visitor does not have to pass through a science article first.
2. Featured sections link to the correct existing product-detail routes. “Shop all” exposes every verified product and variant.
3. Search, categories, product count, filters, sorting and empty states respond to current source data and can be operated by touch and keyboard.
4. Every displayed package is the correct original photograph; variant selection and displayed image stay in sync. No substitute or generated packaging appears.
5. Professional use, price, stock, discount, safety and clinical claims match their approved source state. Products without current online purchasing data cannot show a misleading Add to cart action.
6. Add, edit and remove actions show the resulting cart state and preserve selected variants. The live checkout's ability to take payment and create orders is documented before any completed-order state is shown.
7. Scroll, cursor and carousel behavior work without locking the page, hiding content, forcing motion, or requiring a mouse; mobile and reduced-motion paths remain complete.
8. Supporting pages are shorter to scan while necessary science, safety, usage, regulatory and legal details remain available.
9. Review paired Cleer-reference and SPARK-DV implementation screenshots at matching desktop and mobile viewport sizes. Compare whitespace, type scale, product scale and overall hierarchy, then refine and recapture until the shopping-first composition is clear while retaining SPARK-DV’s own brand and original product photos.
10. A deployed build can be checked through direct navigation and refresh on catalogue, product, content and policy routes.

## 10. Delivery sequence and open decisions

### Suggested sequence

1. Verify product/SKU, image mapping, price, availability, professional restrictions and commerce integration against the authoritative source.
2. Build the homepage shopping feature, category access and original-photo featured products.
3. Align the catalogue, product-detail template, responsive filters and cart messages with those same product records.
4. Shorten and connect the remaining site routes without deleting essential source content.
5. Capture and compare reference/implementation screenshots, then instrument browse-to-cart and valid checkout/enquiry outcomes; assess mobile, keyboard, reduced motion, image match and deep links before launch.

### Source-owner decisions required before release

- What is the authoritative product-family/SKU/variant count, product status and designated primary image for every sellable variant?
- Which prices, discounts, stock states and customer audiences are current and publishable?
- Which items require a dental professional, prescription, clinical advice or separate professional pricing?
- Is payment/order processing available for the deployed site? If so, where are taxes, shipping, order confirmation, refund, privacy and checkout terms defined?
- Which school-program facts, customer reviews and trust claims are approved for continued publication?
- What analytics consent and retention policy governs shop interaction tracking?
