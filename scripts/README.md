# Scripts

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
