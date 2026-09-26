# News wording fix: SeeTreat excluded (no AI) and 5thPort has AI but is not a medical device

Small wording update in the ASTRO 2026 exhibitor-check section of the news item, plus the worksheet.

## Changes in `src/data/news/astro-ecmp-2026-announcements.ts`

1. **SeeTreat bullet** — replace "does not document an AI model, so it is not added. We will ask the company." with a definitive exclusion: ART.1 is **excluded** because it uses no AI (purpose-built registration and dose-calculation algorithms). Keep the vendor-reported clearance note and website link; no attribution of who confirmed it.
2. **5thPort gets its own bullet** — currently grouped with Gosta Labs as "AI tools for clinical documentation or patient engagement". New wording: 5thPort does use AI (AI-avatar patient-education videos, e.g. its "Ada" avatar, used in a radiation oncology pre-consultation case study), but it is patient-education/eConsent software, not a radiotherapy medical device — so it stays **out of scope**. Link to [5thPort's platform page](https://www.5thport.com/platform/overview/) and/or the [radiation oncology case study](https://www.5thport.com/casestudies/ai-avatar-based-pre-consultation-education-in-radiation-oncology/).
3. **Gosta Labs bullet** — keep as-is, minus the 5thPort grouping.

No catalogue changes: SeeTreat stays out, 5thPort stays out.

## Worksheet

Update `/mnt/documents/astro-2026-exhibitor-check.xlsx`: SeeTreat outcome → "Excluded — no AI used"; 5thPort outcome → "Out of scope — AI but not a medical device (AI avatar patient education)".

## Verification

- Typecheck and `validate:evidence` after the edit.
