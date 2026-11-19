# Recheck EUDAMED (EU device registry)

Last registry check: 2026-11-09, 29 products matched. Since then new products were added (e.g. Neosoma Platform, PIQE CT) and others were revised.

## Steps
1. Re-run the registry check for the whole catalogue (`eudamed:refresh`). Per-company merge keeps prior records if a lookup fails.
2. Run the audit and discovery scripts to list near-matches and new possible registrations (new products included).
3. Review near-matches manually: confirm only exact trade-name, known manufacturer SRN or clearly matching platform registrations; leave the rest in the audit report.
4. Compare with the previous snapshot: new matches, lost matches, changed UDI-DI/EMDN/risk class, and conflicts with the CE info on product pages (flag, do not silently overwrite CE fields).
5. Run EUDAMED tests (match, refresh, export, confirmed) and the full suite; check a few product and company pages in the browser.
6. Deliver a short report (`eudamed-recheck-2026-11-19.md`) with changes and items needing a decision.

## Technical notes
- Never hand-edit `src/data/eudamed/udiVerified.json`; only via the script and curated confirmations.
- Downloads already prefer registry data, so the spreadsheet updates automatically.
- If the EUDAMED service is unreachable, keep the 2026-11-09 data and report it.
