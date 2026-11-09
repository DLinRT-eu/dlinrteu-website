# Auto-refresh product EU registry (UDI) details from the EUDAMED script

Product pages already read registry details from the file the script generates. What is missing is a safe, one-command refresh that never needs hand edits.

## What changes
1. **One command**: `bun run eudamed:refresh` (full run) and `bun run eudamed:refresh -- --company="Elekta"` (one vendor).
2. **Company runs also update pages**: a single-vendor run merges its results into the saved registry file, replacing only that vendor's products and keeping all others.
3. **Safe full runs**: if the registry API fails or rate-limits for a company, that company's previous records are kept instead of being wiped; the run reports which companies were skipped.
4. **Change summary**: each run prints and writes into the audit report what was added, removed or changed per product (Basic UDI-DI, UDI-DI, EMDN), so you can review before publishing.
5. **Platform registrations in the script**: the Monaco RTP System parent registration (currently a hand-added entry) moves into the script's editor-confirmed list so reruns reproduce it.
6. **Dry run**: `--dry-run` shows the change summary without saving.
7. Docs: README and field reference describe the refresh command; AGENTS.md rule updated.

## Not changing
- Matching rules stay strict: exact names, curated SRNs and editor-confirmed associations only; partial matches stay report-only.
- No automatic schedule (the registry rate-limits; runs stay manual).

## Technical details
- `scripts/verify-eudamed.ts`: track per-company success; build next file as `previous` minus refreshed companies' product IDs plus new matches; diff old vs new; `generatedOn` updated; per-company `refreshedOn` recorded.
- Pure merge/diff helpers in `src/utils/eudamedRefresh.ts` with tests in `scripts/eudamedRefresh.test.ts` (company-scoped replace, failed-company preservation, diff output).
- `package.json` script `eudamed:refresh`.
