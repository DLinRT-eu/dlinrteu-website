## Goal
Render every Clinical Evidence entry in a uniform citation format — **Authors (Year). Title. *Journal*. DOI** — across all product pages, without requiring a bulk rewrite of the ~hundreds of existing entries.

## Approach
Display-only normalization with an optional structured upgrade path. No data migration required.

1. **New util `src/lib/formatCitation.ts`**
   - Input: an evidence item (`string | { type, description, link, ... }`) plus optional new structured fields `authors`, `year`, `title`, `journal`, `doi`.
   - If structured fields are present, use them directly.
   - Otherwise parse the legacy `description` string with tolerant regexes:
     - **Authors**: text up to the first `. ` (e.g. `Bayley et al`, `Fan et al`).
     - **Year**: 4-digit 19xx/20xx token, prefer the one adjacent to a journal/volume (`Journal 2025;…` or `(2025)`).
     - **Journal + vol/issue/pages**: substring after the title sentence, before the year/semicolon block.
     - **Title**: middle sentence(s) between authors and journal.
     - **DOI**: derived from `link` (strip `https://doi.org/` / `doi:` prefixes).
   - Return `{ authors, year, title, journal, locator, doi, doiUrl, raw }`. Any missing field falls back gracefully (e.g. show raw description if parsing fails).

2. **Citation component `src/components/product/EvidenceCitation.tsx`**
   - Renders one entry in a single consistent layout:
     ```text
     [Type badge]  [Level badge if present]
     Authors (Year). Title. *Journal* vol(issue):pages.
     doi.org/<DOI>   ↗
     ```
   - Italic journal, monospace DOI link, `FileText` icon, hover underline. Falls back to the current "View Evidence" link when no DOI / unparseable.
   - Keeps the existing left border accent for visual continuity.

3. **Wire into `EvidenceLimitationsDetails.tsx`**
   - Replace `renderEvidenceItem` body with `<EvidenceCitation item={item} />`. Keep the existing top-3 + collapsible "show more" behavior untouched.

4. **Optional structured fields (forward-looking, no migration)**
   - Extend the evidence item type to allow optional `authors?`, `year?`, `title?`, `journal?`, `doi?`. Existing entries continue to validate.
   - Add matching optional inputs in `EvidenceEditor.tsx` (collapsed under an "Structured citation (optional)" subsection) so new/edited entries can be authored cleanly. `description` remains the source of truth when structured fields are empty.

5. **Tests**
   - Add a small `formatCitation.test.ts` covering ~5 representative legacy strings (with/without volume/issue, missing year, plain DOI string, structured override) to lock the parser behavior.

## Out of scope
- Bulk rewriting existing product `description` strings into structured fields.
- Changes to evidence rigor/impact badges, limitations, or the editor's non-citation fields.
- Backend / DB schema changes (evidence lives in TS data files).

## Files
- New: `src/lib/formatCitation.ts`, `src/lib/formatCitation.test.ts`, `src/components/product/EvidenceCitation.tsx`
- Edit: `src/components/product/EvidenceLimitationsDetails.tsx`, `src/components/product-editor/FieldEditors/EvidenceEditor.tsx`
- Edit: evidence item type declaration (in `src/types/productDetails.d.ts` or wherever the evidence array is typed) to add the 5 optional structured fields.
