# SPARK-DV About surface

Reference: https://www.purplerockscissors.com/about, inspected using Firecrawl and Playwright on 10 November 2026. This is an adaptation inside the existing SPARK-DV design system, not a site-wide identity change.

## Direction contract
**THESIS:** A scroll-paced brand story leads into the people, products and clinical purpose behind SPARK-DV.

**OWN-WORLD:** Retain navy #073763, purple #63218b, warm paper #fffcf8, DM Sans, original logo and product photography. Lavender #eee9f3 and peach #f7d9c4 divide story and values. Broad fields and unboxed editorial layouts replace the prior About accordion hero/sidebar.

**STORY:** Product-oriented statements introduce the range; a concise company story leads to the original founder portrait and biography, nine-photo collage, four values, journey and links for professionals, parents and schools.

**FIRST VIEWPORT:** A full-height navy stage below shared navigation, small About title, large centered scrolling statements, persistent product description and shopping link. Bottom story anchor and three progress marks remain clear of the chat widget.

**FORM:** Explicit user-selected PRS reference, adapted with SPARK-DV content. Code-led implementation; no random concept selection or generated comp. Keep user-selected founder-left/biography-right composition. Mobile keeps the same content in a readable single-column flow with a three-column photo gallery.

**FINISH:** Browser checks at 320–1920px, screenshot comparison, motion telemetry, reduced-motion validation and independent finish review. Existing global DESIGN.md remains authoritative; this document records About-only changes.

## Reference evidence and adaptation
Measured in Playwright: 300vh opening, centered 45px desktop statement, sticky 100vh stage, 500ms-class line swap; nine-image collage starting from a stack, spreading over 75vh of scroll with 1.5s smoothing. White collage section and broad colored story/values sections, accordion beside image, people section near the end. Firecrawl branding returned inconsistent static values during animation; browser measurements govern the motion spec.

Shipping changes use the existing GSAP installation with cleanup, no additional motion runtime. Original product photographs use `object-fit:contain`. The existing generated research/family/community/consultation images remain illustrative assets; no reference media is used. Founder identity and portrait remain the user's original.

Main files: `src/AboutPage.jsx`, `src/about.css`, `motion/prs-about.js`. `src/Editorial.jsx` routes only `/about` to this component; other editorial routes remain intact.

## Founder poster refinement — 10 November 2026
User-supplied founder poster guides this section only: a thin navy rule, oversized Newsreader serif heading, warm italic accent, original portrait in a slightly rotated white frame, name caption, and editorial biography. Desktop keeps the previously requested portrait-left / text-right arrangement; mobile stacks the content. Newsreader is self-hosted from the existing dependency. Portrait hover gently straightens the frame; reduced motion disables the transition. Checks at 320, 390, 768 and 1440px confirm loaded imagery, working disclosure, no horizontal overflow or console errors. Independent screenshot/code review: ship, with no material findings in the reviewed 1440/390px scope.
