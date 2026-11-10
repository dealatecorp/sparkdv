# Motion Spec: prs-about
SOURCE: https://www.purplerockscissors.com/about | SECTION: opening statements and values collage | CAPTURED: 2026-11-10 | TRIGGER: scroll-toggle / scroll-scrub

## 1. What the visitor sees
The opening fills the viewport with a centered statement. Scrolling advances through three statements; the old line slides above a clipped window while the new one enters from below. Broad color fields divide the story, collage, values, and people sections. Further down, nine photographs spread from a central stack into a loose editorial composition.

## 2. Anatomy
- **Measured:** reference opening spans 300vh with a 100vh sticky stage; three overlapping text items, each in an overflow-hidden mask. At 1440 × 1000 the text line is 63px tall and type is 45px. At 390 × 844 type is 25px and opening is 2532px tall.
- **Measured:** collage board 1368 × 600; nine absolute images with individual sizes, no perspective, original rounded corners. Initial centers coincide.
- Generic skeleton: `section > sticky-stage > mask > [statement × 3]`; `section > relative-board > [figure × 9]`.
- **Inferred adaptation:** keep SPARK-DV navigation; stage begins below it. Opening 250svh desktop / 200svh mobile; larger DM Sans text; persistent product description and CTA. Mobile collage is a staggered three-column gallery.

## 3. States
| Element | Property | Initial | Final | Confidence |
|---|---|---|---|---|
| Outgoing statement | translateY | 0 | -100% | measured |
| Incoming statement | translateY | 100% | 0 | measured |
| Collage image 1 | left | 581.406px | 68.391px | measured, reference board |
| Collage image 1 | top | 197.406px | 394.812px | measured, discontinuous in reference |
| Integrated photo | transform | centered | normalized final coordinates | inferred adaptation |

## 4. Timeline
| Target | Property | From | To | Start | Duration | Ease | Stagger | Confidence |
|---|---|---|---|---|---|---|---|---|
| Old/new statements | y | 0/100% | -100%/0 | same frame | 518/519ms sampled | power1.out | 0 | measured fit, RMSE .005/.0051 |
| Sandbox statements | y | same | same | same frame | 501ms sampled | power1.out | 0 | measured |
| Integrated statements | y | same normalized endpoints | same | same frame | 603/602ms sampled | power1.out | 0 | measured; deliberate 20% authored timing increase |
| Collage | x / left | centered | scattered | same scroll progress | scroll-linked | power1.out | 0 | measured |
| Integrated collage | y | centered | scattered | same scroll progress | scroll-linked | power1.out | 0 | inferred smoother vertical adaptation |

## 5. Trigger and scroll config
- **Measured reference:** hero transition triggers start at 200px and 1200px, ends 500px and 1500px. Sticky CSS rather than GSAP pin. No snap observed.
- **Measured reference collage:** start 4066px, end 4816px, scrub 1.5 seconds. Span is 75vh at captured viewport. All images start together.
- **Inferred integration:** hero thresholds .18 and .62 of its local scroll interval. Collage starts at `top bottom`, ends `top 25%`, scrub 1.5, no pin. No smooth-scroll library added.

## 6. Interaction and feel
Reference values expand from accordion rows next to photography. Adaptation uses real buttons, `aria-expanded`, controlled regions, and a corresponding image. Pointer hover changes text/link styling; keyboard and touch operate the same controls. Founder research detail uses native `details`. There is no drag requirement.

## 7. Responsive and reduced motion
**Measured reference:** smaller type and same 300vh opening on phone. **Inferred adaptation:** 760px breakpoint, shorter mobile opening, three-column static photo gallery, stacked founder photo and biography. Reduced motion shows all three statements, removes sticky scroll pacing and animation, and keeps content readable. These accessibility adaptations are intentional, not reference parity claims.

## 8. Dependencies
Existing installed GSAP and ScrollTrigger. Existing React, React Router and Lucide. No added packages, paid plugins, fonts, media downloads or WebGL.

## 9. Evidence
- `prs-about/discover.json`: GSAP/ScrollTrigger discovery at three scroll positions.
- `prs-about/frames/ref-hero.png`, `ref-hero-next.png`: first and next statements in the same center position.
- `prs-about/frames/ref-values.png`: nine photographs spread across the white values section.
- `prs-about/frames/ref-details.png`: expanding value rows beside photography.
- `prs-about/curves/ref-hero.json`, `demo-hero.json`, `integrated-hero.json`: per-frame transforms and fitted curves.
- `prs-about/curves/ref-collage.json`, `demo-collage.json`, `collage-x-verification.json`, `integrated-collage.json`: sampled positions and comparisons.
- Final desktop/mobile screenshots prefixed `final-1440` and `final-390`. Automated checks stored in `prs-about/checks.json`.

## 10. Gotchas
Clear the CSS pixel translation using `y:0` when setting GSAP `yPercent`; otherwise hidden statements can retain a second offset. Verify end position, not just normalized easing curves. Fonts and image loads refresh trigger measurements. Scope animations to the component and revert on navigation. Scattered gallery coordinates must be replaced with normal flow at small widths.

## 11. Low confidence or not captured
The reference collage's vertical `auto` offsets jump on the first scroll sample; its horizontal motion is smooth and measured. Our vertical transform intentionally interpolates smoothly instead. No claim of complete parity for reference background colors, accordion timing, cursor decoration, team modal or image drag. Their personnel gallery is replaced with the real SPARK-DV founder and audience links. Illustration provenance remains as recorded in the existing project.

## 12. Never copy
Reference prose, logo, photographs, video, font files, class names, markup and source code are not included in shipping assets or components. Source instrumentation is stored as development evidence only. SPARK-DV product photographs and original founder portrait are retained.
