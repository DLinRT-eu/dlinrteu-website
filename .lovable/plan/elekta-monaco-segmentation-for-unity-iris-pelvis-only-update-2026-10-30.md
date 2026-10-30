# Elekta: Monaco segmentation for Unity + IRIS pelvis-only update

## 1. New product: Elekta Monaco Segmentation (Unity), auto-contouring only
Source: Elekta "Monaco Segmentation Component Technical Reference Manual" (E076326/01, 2025). It isn't public, so it's marked as a manufacturer document with today's retrieval date.

- Category: Auto-Contouring only. MR (T2-weighted, Unity MR-Linac), for organs at risk only. Contours are suggestions to review and edit within the Monaco/Unity workflow, not for targets.
- Models (the manual describes four, which is what we'll show):
  - Female pelvis, intact uterus (ekt_mr_femalepelvis 1.0)
  - Female pelvis, after hysterectomy (ekt_mr_femalepelvishyst 1.0)
  - Male pelvis (ekt_mr_malepelvis 1.0)
  - Head and neck (ekt_mr_headneck 1.0)
- Details from the manual: 3D ResUNet design; training data (labelled and unlabelled Unity scans, patient counts); test data (e.g. 46 intact and 40 hysterectomy patients); mean surface distance / Dice results and expert review; the manual's own limitations (MR only, T2 axial only, head-first supine, Unity scans only).
- Structure list per model, written as "Region: Structure", copied from the manual's tables.
- Regulatory: CE and FDA, as you confirmed. I'll ask you for the certificate or 510(k) number and date if I can't find them in public databases; until then those fields will say "per Elekta".
- Evidence: E0 / L1t (vendor testing only) unless I find a peer-reviewed paper that names this tool.
- Tagline mentions "Monaco for Unity". Elekta's company page count updates automatically.

## 2. IRIS Evo update
Source: Elekta XVI Instructions for Use, Vol. 3 (doc 1575840_02, 2025), section 6.15.6.
- Add the AI component: a deep neural network estimates scatter, trained on Monte Carlo simulations of pelvic CT, and feeds the iterative "High Definition" (Polyquant) reconstruction.
- Add: currently available only for certain pelvis acquisition presets. Add the IFU's listed limitations (streaks from leftover scatter/metal, noise, cone-beam artefacts).
- Add the IFU as a disclosed non-public source. Evidence stays E0.

## Technical details
- New file src/data/products/auto-contouring/elekta-monaco.ts, registered in the auto-contouring index; IRIS edits in src/data/products/reconstruction/elekta.ts.
- Run the product tests and the evidence checker; check both product pages in the browser.
