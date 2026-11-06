# Consistency pass on recently added evidence and product edits

Goal: make the entries added in the last few sessions read and look like the rest of the catalogue. No scores, sources or facts change — wording and field layout only.

## Scope (recent changes)
- MRCAT Brain: Ranta 2023, Yang 2024, Milan 2026, Rossi 2024, Buschmann 2026 fix, onMarketSince/compatible scanners
- MIM Contour ProtégéAI: Wallat 2026 and other new papers
- DirectORGANS: Berenato 2024, Goddard 2024
- IRIS Evo: Keeler 2026, FDA K252188, pelvis-only note
- Monaco Segmentation Component: structures, FDA K252002, CE note
- syngo.via RT Image Suite revision
- Pipeline updates (iSecare, Synaptiq)

## Inconsistencies already found (MRCAT Brain)
- Author format mixed: "Rossi E et al." / "Buschmann M et al." vs "Ranta I, Wright P, Suilamo S, et al." — align to the format used by most catalogue papers.
- New papers list every study-quality flag (including `false` ones) and `appliesToCategory`; older papers only list `true` flags. Align to the dominant pattern.
- Rationale wording differs ("Added and verified in the … sweep" vs "Added 2026-11-03; DOI verified on Crossref and full text confirms …; pending reviewer check."). Use one standard sentence order: provenance/date, then study design, then results, then independence note.
- Evidence descriptions: drop ad hoc tails like "Philips co-author." in favour of the standard "Vendor-affiliated authors" phrasing if that is what other products use.
- `evidenceRigorNotes` still says "I2 set by Buschmann" — legacy axis; change to "L2" (Levels of Efficacy).

## Steps
1. Sample 5–10 established products to pin down the house style (author format, flag listing, rationale order, pending-review wording, CE/EUDAMED note phrasing, British vs American spelling such as "centre"/"center").
2. Apply that style to every entry in scope above; fix any leftover "I0–I5"/"Clinical Impact" wording in them.
3. Run the evidence checker and catalogue tests; spot-check two product pages in the browser.
4. Report what was normalised per product.

## Out of scope
Re-scoring, new sources, and older entries outside the recent changes.
