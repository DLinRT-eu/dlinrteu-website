# EUDAMED verification script

Add `scripts/eudamed-audit.ts`: a read-only audit that queries the public EUDAMED API for every company and product in the DLinRT catalogue and writes a report of what EUDAMED officially holds.

## What it does

1. Load the catalogue from the existing data modules (companies from `src/data/companies`, products from `src/data/products`).
2. For each company: look up the registered actor (`actors/registeredActors`) to obtain the official SRN, actor type, country and registration status.
3. For each company: look up certificates (`certificates/search`) to obtain certificate numbers, Notified Body ID, certificate type (MDR/MDD/AIMDD), validity dates and status.
4. For each product: look up devices by trade name (`devices/udiDiData`, `devices/basicUdiData`) to obtain Basic UDI-DI, risk class, EMDN code and the linked manufacturer SRN.
5. Match results back to the catalogue and classify each row: `confirmed`, `not-registered`, `ambiguous` (several candidate matches), or `lookup-failed`.
6. Write outputs to `docs/audits/eudamed/<date>-eudamed-audit.{md,csv}` — one row per company and per product, with the EUDAMED query URL in every row so each claim is checkable by hand.

## Ground rules

- Read-only. The script never edits product files; no CE status, certificate number or SRN is written into `src/data/products/` by this script. Any catalogue change stays a separate, human-reviewed step.
- No invented data: a field EUDAMED does not return stays empty, and the row says why (`not-registered` / `lookup-failed`).
- Name matching is fuzzy, so every match is reported as a candidate with its EUDAMED name next to our name. Nothing is auto-accepted.
- The report states up front that MDR certificate registration only becomes mandatory on 28 May 2026 (Commission Decision (EU) 2025/2371), so "not registered in EUDAMED" is not evidence of missing CE marking.

## Technical notes

- Run with bun: `npm run audit:eudamed` → `bun scripts/eudamed-audit.ts`. Flags: `--companies-only`, `--products-only`, `--company="<name>"`, `--limit=N`, `--json`.
- Base URL `https://ec.europa.eu/tools/eudamed/api/`, GET-only JSON, no key. Pagination via `page`/`pageSize` (max 300).
- Earlier probing hit HTTP 429, so the client needs: a sequential queue with a configurable delay (default 1.5 s), retry with exponential backoff on 429/5xx, a cap on retries, and tolerant parsing (empty or non-JSON body → `lookup-failed`, never a crash).
- Responses cached under `.cache/eudamed/` keyed by query so re-runs are cheap and the report is reproducible; `--no-cache` bypasses it.
- Strict TypeScript: explicit interfaces for `EudamedActor`, `EudamedCertificate`, `EudamedDevice`, and an `EudamedAuditRow` union for the report; small single-purpose functions, early returns.
- Docs: `scripts/README.md` gains a section on the script; `docs/audits/README.md` gains the new `eudamed/` folder.

## Expected first-run outcome

Based on earlier probing, most vendors will come back with zero certificates and several actor lookups will fail or rate-limit. That is the expected state before 28 May 2026 — the value of this run is the baseline report plus a repeatable command to re-run once registration becomes mandatory.

## Out of scope for this step

The EMDN `Z1104` discovery sweep for products not yet in DLinRT — a separate script, proposed after this audit runs.
