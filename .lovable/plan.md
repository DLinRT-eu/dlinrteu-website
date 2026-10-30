# MIM Contour ProtégéAI — new sources check

## What I found (Crossref, 30 Oct 2026)

| # | Paper | Status |
|---|---|---|
| 1 | Wallat et al. 2026, JACMP, HDR prostate brachy post-implant CT (10.1002/acm2.70748) | Not listed yet. The abstract only says "a commercially available model, trained on external-beam data" and does not name it. I couldn't open the full text to confirm it's MIM. |
| 2 | Bayley et al. 2026, Applied Sciences (10.3390/app16115681) | Already on MIM (E1/L2) and Limbus. No change. |
| 3 | "Clinical validation… single institution study". The link you gave is the same as #2 (copy-paste slip). The correct paper is Lin et al. 2024, Front Oncol (10.3389/fonc.2024.1375096) | Already on MIM and Manteia. No change. |
| 4 | Aire et al. 2026, JACMP, TheraPanacea synthetic CT (10.1002/acm2.70725) | Already on TheraPanacea's synthetic-CT product. On MIM, ProtégéAI contours the synthetic and real CTs; it's used as a measuring tool, not evaluated itself. |
| 5 | Fan et al. 2025, JACMP, four commercial systems, abdomen (10.1002/acm2.70010) | Already on MIM (E2/L2). No change. |

## Proposed changes (only `src/data/products/auto-contouring/mim-software.ts`)

1. **Wallat 2026**: add it only after the full text confirms the commercial model is MIM Contour ProtégéAI. If it is, add an evidence entry plus a scored paper: E1 (single centre, independent) / L2 (geometric and dose comparison). Note that it's a comparison against an in-house nnU-Net on post-implant brachytherapy CT, which is outside the model's external-beam training. Mark it "added 2026-10-30, pending reviewer check". If I can't confirm it, I'll leave it out and tell you.
2. **Aire 2026**: add it as a supporting evidence entry only, marked indirect: ProtégéAI used to contour synthetic CT. It won't be added as a scored paper, so MIM's levels don't change.
3. #2, #3, #5: no change.

Overall Evidence Rigor and Levels of Efficacy for MIM stay the same: E2 and L2 are already backed by Fan 2025.

## Checks
Run the evidence score checker and catalogue tests, then look at the MIM product page in the browser.
