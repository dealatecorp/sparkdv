# Motion verification — 10 November 2026

Reference: [Purple Rock Scissors About](https://www.purplerockscissors.com/about). Desktop capture 1440 × 1000, phone observation 390 × 844. Playwright operated actual scroll and pointer/keyboard interactions; DOMMatrix sampled the reference, sandbox and integration.

| Check | Reference | Sandbox | Tolerance | Result |
|---|---|---|---|---|
| Statement duration | 518/519ms | 501/501ms | ±10% | pass |
| Stagger | same frame | same frame | ±30ms | pass |
| Statement y endpoints | 0 to -63; 63 to 0 | same | ±2% | pass |
| Normalized statement curves | captured | RMSE .0076/.0074; max .025/.024 | <.02 / <.06 | pass |
| Start order | outgoing/incoming together | together | identical | pass |
| Collage horizontal curve | captured left positions | RMSE 0, max 0 | <.02 / <.06 | pass |
| Collage vertical curve | jumps from CSS auto | smooth translation | intentionally changed | adaptation |

## Integrated page
- Statements: 603/602ms; deliberate 20% timing increase from the 500ms implementation to distinguish the adaptation. Not claimed as duration parity.
- Corrected normalized statement curves: RMSE .0072/.0077; maximum difference .025. Incoming final y is **0**, outgoing final y is -218.578 at 1440px. Endpoints are normalized to the taller SPARK-DV text window.
- Photo spread: horizontal RMSE .0002, maximum difference .001 after responsive coordinate normalization. Smooth vertical expansion differs intentionally from reference.
- Initial integrated measurement exposed an extra pixel translation on hidden statements. Corrected with explicit `y:0`; all three forward/reverse states now receive geometric visibility checks, not only curve fitting.
- Founder photo moved to the former large research-image position at user request. Portrait left and biography right on desktop; portrait then biography on mobile. Duplicate lower founder section removed.
- Check script covers 320/390/768/1440/1920 widths, every statement forward/reverse, accordion click and keyboard, founder detail disclosure, image loading, overflow, reduced motion and SPA navigation.

Private frame/curve directories are gitignored. `checks.json` records the final UI run. Build/typecheck results are recorded in delivery, not inferred from screenshots.
