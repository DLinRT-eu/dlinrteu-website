# GE discontinued, BrachyBox/TumorBox re-score, literature + EUDAMED for Matteo's five products

## 1. GE Auto Segmentation to the discontinued page
- Change its market status from "availability review" to "end of sales" (the same marker Mirada DLC uses). Keep Mustafa's sources: AccessGUDID lists distribution ending 2026-03-09, EUDAMED says "no longer on the market", and the product pages return 404.
- The product page stays public with the lifecycle notice. GE disappears from current-market counts. MR Contour DL stays current.
- Update the lifecycle test: GE now appears on the discontinued list.

## 2. Re-score BrachyBox and TumorBox
- Both have no peer-reviewed paper. The only evidence is regulatory (FDA K253091, CE).
- Replace the legacy I0 with a final Levels of Efficacy code: L1t (technical, from regulatory and bench documentation only). This matches other E0 products like Monaco. Keep `legacyClinicalImpact: "I0"` for history. Rigor stays E0.
- Update the efficacy notes to read "L1t (Levels of Efficacy)".
- Update the TheraPanacea test expectations to match.
- First I'll check how the brachy and tumour functions inside ART-Plan Segmentation get their level, so the standalone entries and the ART-Plan functions stay consistent.

## 3. Literature search for the five products
Canon AiCE CT, Philips SmartSpeed Precise, Siemens Deep Resolve, United Imaging uAIFI. For Philips SmartDose CT Enhancement, I'll check whether it's a renamed or merged entry. If I can't match it, I'll flag it and not create it.
- Search Europe PMC and Crossref (2019–2026) for each product name and its aliases, focused on radiotherapy use (simulation CT/MR, synthetic CT, contouring, dose). Drop papers already cited.
- Read the abstract, and the full text when available, to confirm the paper names the product.
- Add the confirmed papers as scored keyPapers (E/L, quality flags that apply, house style), marked "pending reviewer check" with the date 2026-11-06.
- Recompute the overall levels only through the existing checker.
- List what was rejected and why (reviews, diagnostic-only studies with no RT link, papers that don't name the product).

## 4. EUDAMED check for the five products
- Query EUDAMED's public device search by manufacturer and trade name (Canon Medical Systems, Philips Medical Systems Nederland, Siemens Healthineers, Shanghai United Imaging).
- If a record is found: add the risk class, basic UDI-DI and status as the CE source, with the retrieval date.
- If no record is found: add the note "not found in EUDAMED (searched 2026-11-06)", the same way as for Elekta. Existing CE claims are left as they are.

## Checks
Run the evidence score checker and `bun test scripts`, then open the GE page and one updated reconstruction page in the browser. Report the changes per product, the papers added and rejected, and the EUDAMED results.
