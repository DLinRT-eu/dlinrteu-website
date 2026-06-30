## Goal
Resolve the MedMind & Quanta company-name drift so their live products surface correctly on company pages and in rep dashboards, without breaking the archived catalog entries.

## Current state
- **Live catalog** (`src/data/companies/specialized-solutions.ts`) already contains live entries:
  - `medmind-technology` → "MedMind Technology Co., Ltd." → `productIds: ["medmind-rt-mind-ai"]`
  - `quanta-computer` → "Quanta Computer Inc." → `productIds: ["quanta-qoca-image-smart-rt"]`
- **Archived catalog** (`src/data/companies/archived/medmind-technology.ts`, `quanta-computer.ts`) has duplicate IDs with older names and (for Quanta) a stale `productIds: ["qoca-smart-rt"]` that doesn't exist.
- **Product files**:
  - `medmind-rt-mind-ai` → `company: "MedMind Technology"`
  - `quanta-qoca-image-smart-rt` → `company: "Quanta Computer"`

The strings differ from the canonical live names ("MedMind Technology Co., Ltd." / "Quanta Computer Inc."), which is the drift flagged in the audit.

## Decision
Keep both vendors **live** (they each have a current, regulator-cleared product) and remove the duplicate archived catalog entries that now conflict with the live ones.

## Changes

1. **Normalize product `company` strings to match the canonical live catalog names**
   - `src/data/products/auto-contouring/medmind.ts`: `company: "MedMind Technology"` → `"MedMind Technology Co., Ltd."`
   - `src/data/products/auto-contouring/quanta-computer.ts`: `company: "Quanta Computer"` → `"Quanta Computer Inc."`

2. **Remove duplicate archived company entries** (they collide on `id` with the live ones and the archived Quanta entry points at a non-existent product `qoca-smart-rt`)
   - Delete `src/data/companies/archived/medmind-technology.ts`
   - Delete `src/data/companies/archived/quanta-computer.ts`
   - Drop their exports from `src/data/companies/archived/index.ts`
   - Note the removals in `src/data/companies/archived/README.md`

3. **Leave `productIds` on the live catalog entries unchanged** — they already point at the correct product IDs (`medmind-rt-mind-ai`, `quanta-qoca-image-smart-rt`).

## Out of scope
- No DB changes. Reps tied to these companies resolve via `getCompanyIdByName` and will continue to match after the string normalization.
- Plan AI / Accuray / SyntheticMR / Varian items from the earlier audit are not touched here.

## Verification
- Visit `/company/medmind-technology` and `/company/quanta-computer` in the preview — each should list its one live product.
- Confirm no TS errors after removing the archived files (only `archived/index.ts` references them).
