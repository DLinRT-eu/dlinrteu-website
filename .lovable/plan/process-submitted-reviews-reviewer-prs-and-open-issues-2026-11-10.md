# Process submitted reviews, reviewer PRs and open issues

## Scope found
**Submitted product edits (pending review) — 5**
- Brainlab Elements RT Segmentation
- Limbus Contour
- Philips Precise Position
- TaiMed DeepMets
- United Imaging uRT Auto-Contouring

Unsubmitted drafts (MVision AI Contouring, MVision Verify, PTW AIQUALIS x2, Synaptiq Mediq RT, United uCS-AI) are left untouched.

**Reviewer pull requests on GitHub — 4 (all from Viktor Rogowski)**
- #164 SubtleHD and SubtleHD(PET)
- #163 PyMedix
- #162 SubtlePET
- #161 AlgoMedica (PixelShine)

**Open GitHub issues — 2 (Kareem Wahid)**
- #158 Review: DeepContour
- #156 Review: iSecare

Also: notes left on completed Q4 2026 review assignments are read for any requested change not yet applied.

## Approach per item
1. Read the proposed change and diff it against the current product record (catch reverts of newer work, e.g. data-source shortening, Levels of Efficacy, EUDAMED, lifecycle fields).
2. Verify every factual claim against a disclosed source: FDA database (K-number, date, product code, regulation), Crossref for DOIs/authors/journal, vendor pages, EUDAMED where relevant.
3. Score new evidence on E0–E3 / Levels of Efficacy (L1t–L6), mark "pending reviewer check".
4. Normalise to house style: first author + "et al.", British spelling, brief data-source labels, structure naming "Region: Structure", applicable quality flags only, no empty rows, schema-valid field values.
5. Apply accepted content; omit unsupported claims and record why in the review feedback.
6. Close the item: drafts marked applied with feedback; PR content ported into the product files here (so Lovable and GitHub stay in sync rather than merging stale PR branches over newer main); issues answered by applying what holds up — I'll give you a short comment text per PR/issue to post, since I cannot comment or close on GitHub myself.

## Checks
- Catalogue tests (`bun test scripts`), evidence score checker, build.
- Browser check of every touched product page.
- Report saved to Files listing per item: accepted / adapted / omitted, with reasons and remaining decisions.

## Risks
- PRs branched from older main may reintroduce outdated fields; only the reviewer's intended changes are ported.
- Issue #156/#158 overlap with Kareem's suggestions already applied earlier; only remaining deltas are handled.
