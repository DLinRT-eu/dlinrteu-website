# FDA AI list sweep — new products and clearance updates

Goal: bring the catalogue in line with the current FDA record, adding genuinely new radiotherapy AI products and refreshing clearance details on products we already list. Every field traces to the FDA record or the vendor page; nothing is invented.

## What the first search already shows

Checked the FDA radiation-therapy AI product codes against our data (clearance numbers grepped in `src/data`):

New — not in the catalogue yet
- **RadOncAI — InformAI, Inc.** K253050, cleared 18 Jun 2026, product code MUJ, 21 CFR 892.5050, Class II. AI dose planning for head & neck; FDA record documents a 500-patient retrospective validation (UT Southwestern and Arizona Oncology), hierarchically dense U-Net with attention. Fits Treatment Planning (dose prediction).
- **DeepBT Detector-Plus — Aitewan Biomedical Technology** K252190, cleared 10 Apr 2026, code QKB. Needs an inclusion check first (brachytherapy applicator/needle detection) — listed only if it performs an AI radiotherapy task under our criteria.

Clearance updates for products we already list
- **AutoContour — Radformation**: we record V5 (K260509). Newer **RADAC V6, K262452, cleared 14 Aug 2026**.
- **AI Contouring — Varian**: newer **VA10A, K261306, cleared 10 Jul 2026** (we currently carry the CE-mark announcement).
- **OncoStudio — Oncosoft**: we record K242994. Newer **K260528, cleared 2 Jul 2026**.
- **AI-Rad Companion Organs RT — Siemens**: newer **K252548, cleared 10 Apr 2026**.
- **Contour ProtégéAI+ — MIM**: K253270 already recorded; verify version/date wording only.

Not yet verified: whether each newer clearance is the same product version we describe or a separate release, and the full 49-device QKB list beyond the 24 shown. Both are part of step 1 below.

## Plan

1. **Full sweep.** Pull the complete FDA AI-Enabled Medical Devices list plus the radiotherapy-relevant product codes (QKB image processing for RT, MUJ RT planning systems, and the dose/imaging codes used by products we already list), and diff every clearance number against `src/data/products`. Produce a short findings table: already listed / clearance outdated / new candidate / out of scope.
2. **Inclusion screening.** Apply the existing criteria to each new candidate — AI/deep learning at the core, a clinical radiotherapy task in the taxonomy, intended clinical use. Record the reason for anything excluded so the decision is traceable.
3. **Add RadOncAI** under Treatment Planning, with FDA regulatory block (K253050, 892.5050, MUJ, Class II, 18 Jun 2026), intended use quoted from the FDA summary, the 500-patient retrospective validation as `evaluationData`, and `dosePredictionModels`. Evidence stays at the level the published record supports — the FDA summary and vendor release are not peer-reviewed publications, so no paper score is invented. Add InformAI as a company and wire the export in `treatment-planning/index.ts` plus `productIds`.
4. **Add any further qualifying products** found in step 1, same standard, one file per vendor in the matching category folder.
5. **Update clearances** on AutoContour, Varian AI Contouring, OncoStudio and AI-Rad Companion Organs RT: newest clearance number, decision date and version, with earlier clearances retained in the regulatory history notes. Leave `lastRevised` and `companyRevisionDate` untouched.
6. **Verify.** `npx tsgo --noEmit -p tsconfig.app.json`, `npm run validate:evidence`, regenerate the sitemap, and confirm the new product pages return 200.

## Technical notes

- New products follow the `ProductDetails` shape in `src/types/productDetails.d.ts`; structure names use the `Region: Structure` convention where a structure list applies.
- Sources: FDA 510(k) database entries and clearance PDFs (accessdata.fda.gov) for regulatory fields; vendor pages for market and feature claims, each cited with a retrieval date.
- Where the FDA record gives no training-data detail, the field stays empty rather than being filled from a press release.
- News entry for the update is optional — say if you want one, otherwise no news item is added.

## Open question

DeepBT Detector-Plus is a borderline case. I will screen it in step 2 and report the decision rather than adding it silently.
