## Goal
Revise `supportedStructures` for the three vendors flagged as under-listed: **Therapanacea (Annotate)**, **Manteia (AccuContour)**, **Wisdom Tech (DeepContour)**.

## Findings on source availability

| Vendor | Public enumerated list? | Action plan |
|---|---|---|
| **Therapanacea** | ✅ Yes — therapanacea.eu/our-products/annotate enumerates Head & Neck, Female Thorax/Breast, Male Thorax, SBRT Lung, Pelvis Male, Pelvis Female, plus heart sub-structures, with explicit OARs and LNs and guideline references | Full rewrite of `supportedStructures` from vendor page |
| **Manteia** | ❌ No — site only states "300+ OARs, 1200+ targets" with no enumerated list. FDA 510(k) summaries (e.g. K223539 AccuContour) typically list a sample only | Add `structuresUnavailable: true` and trim list to a curated "representative" subset, OR keep current 142 with a note. Recommended: keep current list, add a comment + `clinicalEvidenceLimitations`-style note that the full atlas (300 OARs / 1200 targets per vendor) is not publicly enumerated |
| **Wisdom Tech** | ❌ No — site only says "120+ OARs and 16+ tumor targets". FDA K232928 summary may help but typically does not enumerate. | Same approach: keep current 78, add a documented note that vendor advertises 120+ but only the K232928-validated subset is publicly known |

## Implementation

### 1. Therapanacea — full rewrite (`src/data/products/auto-contouring/therapanacea.ts`)
Replace `supportedStructures` with the vendor-enumerated list, normalised to the project's `Region: Structure Name` convention with `_L` / `_R` suffixes and AAPM TG-263-style naming where possible. Expected new count: ~190–210 structures across:
- Head & Neck OARs + LNs (cervical lymph nodes IA–VIIB L/R, ~45 entries)
- Female Thorax / Breast OARs + LNs (~45)
- Male Thorax OARs (~35, dedup with female where shared)
- Heart sub-structures (apical / anterior / inferior / lateral / septal LV, atria L/R, coronary arteries, ~15)
- SBRT Lung OARs (~16)
- Pelvis Male OARs + ROI (~18)
- Pelvis Female OARs + LNs (~25, incl. gyneco LNs and CTVt/CTVn entries)

Update `source` to cite the vendor page directly, bump `lastRevised`, leave evidence scores untouched.

### 2. Manteia (`manteia.ts`)
- Keep existing 142-entry list (it's not wrong, just incomplete).
- Append a short note in `limitations[]`: "Vendor advertises 300+ OARs and 1200+ targets; only the publicly documented and 510(k)-cited subset is enumerated here."
- Bump `lastRevised`.

### 3. Wisdom Tech (`wisdom-tech.ts`)
- Same pattern as Manteia: keep current 78 entries, add limitation note: "Vendor advertises 120+ OARs and 16+ tumor targets; only structures publicly documented or covered by FDA 510(k) K232928 are enumerated here."
- Bump `lastRevised`.

## What this changes / does not change

- No regulatory, evidence, or scoring fields touched.
- No UI changes — `supportedStructures` rendering already handles lists of arbitrary length.
- Therapanacea structure count rises from 111 → ~200, closing the discrepancy with their public site.
- Manteia / Wisdom remain visibly under-listed, with a documented reason on the product page (limitation copy), removing the silent gap.

## Out of scope
- The over-listed vendors (Limbus, MVision, Carina, Coreline, Philips) — different problem (dedupe/scope) and not requested in this turn.

Confirm and I'll execute. If you'd rather wait on Manteia/Wisdom until we have a direct vendor-supplied list (e.g. via the certification outreach flow), say so and I'll only revise Therapanacea.
