# Fix review assignments that point to wrong or old product names

## What I found
I compared every product in the review assignments (all rounds) with the current catalogue. Most match. 11 names don't match any current product. 4 of them are in the current round (started 16 Oct 2026).

**Current round**
| Assigned name | Reviewer / status | Correct product | Why |
|---|---|---|---|
| Philips SmartDose CT Enhancement | Matteo, in progress | **Precise Image** (Philips) | Same product: same FDA clearance K210760. It was merged into Precise Image in June 2026. You already completed Precise Image. |
| aimify | Musti, completed | **AiMIFY** (Subtle Medical) | Same product, old short ID. |
| United uCS-AI | Viktor, pending | none | Removed in 2026: no United Imaging source names it. The real MR product, uAIFI on uMR, already has its own entry. |
| Siemens Dual Energy Optimizer | Tamás, completed | none | Never in the catalogue. Not AI (checked 4 Nov). |

**Earlier rounds (history only)**
- Philips Auto-Contouring (yours, Dec 2025) is now **MRCAT Prostate + Auto-Contouring**.
- No current product exists for these: AIRS CT Clarity, Brainlab Elements AI Tumor Seg, Canon Advanced Vis AI, GE TrueFidelity Pro, Philips IntelliSpace AI Enhancement, Subtle Gad. They were removed or renamed earlier. I'll check each one's history before linking it to anything.

## Changes
1. **Current round**
   - Close your SmartDose assignment as a duplicate of Precise Image (already completed). No new task for you.
   - Point Musti's "aimify" review to AiMIFY, keeping status and notes.
   - Remove Viktor's pending uCS-AI assignment, since the product no longer exists.
   - Leave Tamás's Dual Energy review as completed history.
2. **Old links:** make the old names open the correct product (SmartDose → Precise Image, Philips Auto-Contouring → MRCAT Prostate + Auto-Contouring, aimify → AiMIFY), so past reviews still show the right page. Stored review history stays unchanged.
3. **Earlier-round names with no successor:** keep them as history and label them "no longer in catalogue" on the admin assignment page.
4. **Stop it happening again:** the admin assignment page will warn when a round includes a name that isn't in the catalogue.

## Technical details
- Data changes in `product_reviews` (user-managed Supabase): one status update, one product_id change, and one delete. I'll show you the exact rows before running them.
- Old-name mappings go in `src/utils/productAliases.ts` (the one central place for old names). Stored records use `getProductForStoredRecord`.
- Add a test for the three new mappings, plus a check that every current-round product_id resolves to a catalogue product.
