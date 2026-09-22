# Scripts

## eudamed-audit.ts

Read-only audit of the catalogue against the public EUDAMED REST API
(`https://ec.europa.eu/tools/eudamed/api`, GET-only JSON, no API key). For each
company it reports the registered actor SRN plus any CE certificate numbers and
Notified Body IDs; for each product it reports Basic UDI-DI, risk class, EMDN
code and the linked manufacturer SRN.

```bash
npm run audit:eudamed                                  # companies + products
bun scripts/eudamed-audit.ts --companies-only
bun scripts/eudamed-audit.ts --company="MVision AI"
bun scripts/eudamed-audit.ts --limit=5 --delay=2500 --no-cache --json
bun scripts/eudamed-audit.ts --diff                    # compare the sweep with recorded eudamed blocks
```

`--diff` prints, instead of writing a report: confirmed EUDAMED records missing
from the catalogue, recorded SRN/Basic UDI-DI values that differ from EUDAMED,
and CE risk-class mismatches. It never edits data — discrepancies are resolved
by a human.

Outputs `docs/audits/eudamed/YYYY-MM-DD-eudamed-audit.md` and `.csv`, one row
per company/product, each with the EUDAMED query URL so every claim is checkable
by hand. Responses are cached under `.cache/eudamed/`; requests are throttled
(default 1.5 s) with exponential backoff because the API rate-limits with 429.

The script never edits `src/data/`. Matching is name-based, so rows are marked
`confirmed`, `ambiguous`, `not-registered` or `lookup-failed` and nothing is
auto-accepted. MDR registration only becomes mandatory on 28 May 2026, so
`not-registered` is not evidence of a missing CE mark.

## eudamed-discovery.ts

Read-only discovery sweep for products registered under EMDN/CND branches in
EUDAMED. It downloads the official EMDN workbook, expands the selected branches
to terminal codes, queries `devices/udiDiData` with `cndCode`, enriches candidate
rows through `devices/basicUdiData/udiDiData/{uuid}`, and diffs results against
DLinRT by Basic UDI-DI plus manufacturer/name matching.

```bash
npm run audit:eudamed:discovery
bun scripts/eudamed-discovery.ts --branches=Z1101,Z1104 --delay=750
bun scripts/eudamed-discovery.ts --limit-codes=5 --limit-pages=1 --json
bun scripts/eudamed-discovery.ts --no-cache --enrich=all
```

Outputs `docs/audits/eudamed/YYYY-MM-DD-eudamed-emdn-discovery.{md,csv,json}`.
Rows are screening leads only. The script marks existing catalogue matches,
possible missing candidates and manual-review rows, but never edits `src/data/`.
A product should be added only after separate public-source review confirms a
disclosed AI/deep-learning core radiotherapy function.

## generate-estro-flyers.mjs

One-off generator for the ESTRO 2026 flyers in `public/flyers/`. Requires `pdfkit` and `qrcode`:

```bash
npm install --no-save pdfkit qrcode
node scripts/generate-estro-flyers.mjs
```

Outputs:
- `public/flyers/DLinRT_Companies_ESTRO2026.pdf`
- `public/flyers/DLinRT_Community_ESTRO2026.pdf`

Fonts: bundled Roboto in `scripts/assets/` (Apache 2.0 license).
