# MVision Contour+: fix the structure count wording and give Norina a downloadable list

Norina is right. Counting the vendor's bilateral "X_L/R" entries as one name understated the library. Counting left and right separately, the published library holds **324 distinct structure names across 18 models** (683 model-specific entries) — essentially her 326, and no longer in conflict with the "300+" figure.

## 1. Rephrase the counting

Replace the current "223 unique structure names ... vendor's marketing claim of '300+ structures' counts model-specific instances rather than unique names" wording on the Contour+ record with:

> Structure library derived from the vendor's published Structure Library: 324 distinct structure names (left and right counted separately) across 18 models, giving 683 model-specific entries because many structures appear in more than one model. This is consistent with the vendor's "300+ structures".

Same correction anywhere the 223 figure appears: the provenance note, the header comment in the structure data file, and the source note on the product.

## 2. Downloadable structure list

Add a "Download list (CSV)" button to the supported-structures panel on any product page that has structures, so Norina (and any other reviewer) can pull the list herself instead of waiting for an email. Columns: Model, Structure, Region, Version. It exports the current version's list; the archived version stays available in the version history panel.

Alongside that, produce a one-off Contour+ spreadsheet in this conversation for Matteo to send her directly.

## Technical notes

- `src/data/products/auto-contouring/mvision-structures.ts` — header comment counts.
- `src/data/products/auto-contouring/mvision.ts` — `structuresProvenance.notes` and `source`; refresh `lastUpdated`/`lastRevised`.
- `src/components/product/SupportedStructures.tsx` — new download button using the existing `objectsToCsv`/`downloadCsv` helpers in `src/utils/csv.ts`; no other UI change.
- One-off export written to `/mnt/documents` as `.xlsx` for the email.
- Verify: `npx tsgo --noEmit -p tsconfig.app.json`, `npm run validate:evidence`, and open the Contour+ page.

No structures added or removed, no evidence scores changed.
