# TheraPanacea structure audit against brochure v3.2.0 (March 2026)

## Result of the audit
The structure lists were checked against the vendor brochure (ART-BRO-AN-07EU, March 2026, v3.2.0). They already match it, and each model sits on the right product:

| Brochure model | DLinRT product | Count (brochure / DLinRT) |
|---|---|---|
| CT Head & Neck | Annotate | 46 OARs + 19 LNs / same |
| CT Thorax/Breast/Abdo | Annotate | 73 OARs + 12 LNs / same |
| CT Pelvis Male | Annotate | 19 OARs + 15 LNs + 3 ROIs / same |
| CT Pelvis Female | Annotate | header 18 OARs + 20 LNs + 2 ROIs; 19 OARs itemised (already noted) |
| Syn-CT Pelvis Male | AdaptBox | 7 OARs + 2 ROIs / same |
| Syn-CT Thorax/Breast | AdaptBox | 12 OARs / same |
| Syn-CT Head & Neck | AdaptBox | 26 OARs / same |
| MRI Brain T1, Pelvis Male T2 Elekta, Pelvis/Abdo TrueFISP | MR-Box | 27; 11 + 2; 7 + 9 + 2 / same |
| MRI BrachyBox | BrachyBox | 4 OARs / same |

The synthetic-CT structures are not counted under Annotate's auto-contouring. The three Syn-CT anatomies match AdaptBox's FDA-cleared CBCT-to-synthetic-CT scope (Head & Neck, Breast/Thorax, Male Pelvis), so they stay on AdaptBox.

## Proposed change (small)
- Stamp the re-verification date (2026-10-03, brochure ART-BRO-AN-07EU) in the structure notes of Annotate, AdaptBox, MR-Box and BrachyBox, so the audit leaves a visible record.
- No structure names, counts or evidence scores change.

## Technical details
- Notes-only edits in `src/data/products/auto-contouring/therapanacea.ts`, `therapanacea-brachybox.ts`, `src/data/products/image-synthesis/therapanacea.ts`, `therapanacea-adaptbox.ts`; update the header comment in `therapanacea-structures.ts` with the brochure document code.
- Then run the evidence validator and the typecheck.
