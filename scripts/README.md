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
