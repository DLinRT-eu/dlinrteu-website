# Update United Imaging entries from the uRT-linac 506c product page

## What the page says (read 2026-11-14)
- **AI features:** "Intelligent Auto-Contouring" (contours in seconds, more than 100 OAR and target models for lung, rectal and cervical cancer) and "Autoplan" (3D dose modelling, beam orientation optimisation, auto-optimisation, one-click plans). Both are "Powered by uIPW and uTPS OmniplanTx". Both features carry an asterisk that the page never explains.
- **Wording:** the page uses "intelligent" and "intelligence empowered", never "AI" or "deep learning". The deep-learning claim still rests on the ESTRO 2026 and partner press releases and on published studies.
- **Regulatory:** "CE Marked. Not available for sale in all markets." The linac is "designed in compliance with Regulation (EU) 2017/745", made under ISO 13485, and listed against EN 60601-1, -2-44, -1-2 and -1-3. No class, notified body or certificate number is given. The page says nothing about FDA.
- **Timing:** "a rectal cancer case takes about 15 minutes", CT simulation to delivery, with the duration depending on disease. The published 20-patient study reports 37.5 minutes.

## Changes
1. **uRT Auto-Contouring**
   - The CE class "IIb" has no source; this page gives no class. Change it to "Unresolved" and quote the MDR/ISO wording as the source.
   - Add the page's feature details (100+ models; lung, rectal and cervical; powered by uIPW and uTPS OmniplanTx).
   - Point the product link to this page and update the access date.
   - Note that the page itself doesn't say AI or deep learning.
2. **uRT Auto-Planning**
   - Add the Autoplan description (dose modelling, beam orientation optimisation, one-click) and the uTPS OmniplanTx link.
   - Add the MDR/ISO wording to the CE notes, with class still unresolved.
   - Contrast the vendor's "about 15 minutes" (rectal, CT simulation to delivery) with the 37.5 minutes reported by Li et al. 2026.
3. Add this page as a vendor source on both entries, with today's date and a note that the page says nothing about FDA.
4. Run the tests and the evidence checker. No evidence scores change.

## Technical notes
- Files: `src/data/products/auto-contouring/united-imaging.ts` and `src/data/products/treatment-planning/united-imaging.ts` only.
