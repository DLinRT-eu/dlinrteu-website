## Goal

Use the uploaded MedMind logo throughout the catalogue.

## Steps

1. Copy `user-uploads://MedMindCo_logo.png` → `public/logos/medmind.png`.
2. Add `logoUrl: "/logos/medmind.png"` to the MedMind company entry in `src/data/companies/specialized-solutions.ts` (currently missing — line 105–112 block).
3. Add `logoUrl: "/logos/medmind.png"` to the RT-Mind-AI product in `src/data/products/auto-contouring/medmind.ts`.
4. Bump `lastUpdated` / `lastRevised` on the product to today.
5. `bunx tsc --noEmit -p tsconfig.app.json` to verify.

No archived-company file is touched (it's a graveyard entry).
