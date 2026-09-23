# Merge approved MVision edits into live Adapt+, Image+ and Dose+ entries

## Problem
The approval sync saved the representative's approved edits as whole files that the site never loads:
- Image+ → `image-synthesis/mvision-ai.ts` (live entry: `image-synthesis/mvision.ts`)
- Dose+ → `treatment-planning/mvision-ai.ts` (live entry: `treatment-planning/mvision.ts`)
- Adapt+ → it overwrote `registration/index.ts`. That file has already been restored; the approved version is still in the project history (commit 9ba9566).

## Steps
1. **Field-by-field diff.** For each product, compare the approved version with the live one and list every field that differs.
2. **Merge field by field, not by whole file.** Each approved change goes into the live entry, with these rules:
   - Take the vendor's approved changes. Known examples: Image+/Adapt+ deployment "Cloud-based" + "On-premise"; Dose+ EUDAMED block (Basic UDI 642983006423Dose1.0DH, class IIa, SRN FI-MF-000013082, checked 2026-09-22); version numbers; Adapt+ release date and anatomical coverage.
   - Keep today's newer work where the approved file is older. Image+ keeps the two JACMP papers, E1/I1 scores, keyPapers, Abdomen and the new limitations.
   - Check each change against the field rules and fix it rather than copy an error:
     - Adapt+ `anatomy` is a single comma-joined string; split it into separate values.
     - Dose+ `releaseDate` (2025-09-04) conflicts with its `source` note (2026-06-01); use the FDA K250064 decision date.
     - Dose+ CE: the EUDAMED record exists, but the CE status stays "under review". A EUDAMED record alone is not a CE certificate.
   - Flag for your decision, rather than guess, any change that alters a regulatory claim or evidence score, or that has no disclosed source.
3. **Remove the orphan files** `image-synthesis/mvision-ai.ts` and `treatment-planning/mvision-ai.ts` once merged, so the duplicates can't drift.
4. **Fix the sync at the root.** The approval function currently regenerates a whole single-product file at a guessed path (`<category>/<company>.ts`). Change it to:
   - find the file that actually defines the product id (use the product's `githubUrl`, then fall back to a search);
   - replace only that product's object inside its array, not the whole file;
   - refuse if the product id isn't found, instead of creating a new file.
5. **Verify**: typecheck, `validate:evidence`, full build, and open the three product pages in the browser.
6. **Report**: a short table per product: merged / kept current / corrected / needs your decision.

## Technical notes
- The diff runs as a bun script that loads both versions; the Adapt+ version is loaded from git history.
- Dates: `lastUpdated`/`lastRevised` become 2026-09-23; `source` gets a "merged approved vendor edits 2026-09-23" note.
- The edge function change is deployed after editing; existing pending drafts are unaffected.
