## Goal

Show vendor/initiative logos on initiative cards (Challenges, Datasets, Model Zoos), starting with SynthRAD and MONAI. The logo should be shown only when available, no placeholders!

## Current state

- `Initiative.logoUrl?: string` already exists in `src/types/initiative.d.ts`.
- Only one initiative currently uses it (`mhub-ai` in `modelzoo.ts`), and even that one is **not rendered** — `InitiativeCard.tsx` doesn't read `logoUrl` at all.
- Logos for products/companies are stored under `public/logos/` and referenced as `/logos/<name>.svg|png`.

## Plan

### 1. Render `logoUrl` in `InitiativeCard.tsx`

In the `CardHeader`, show the logo to the left of the title when `logoUrl` is set; fall back to title-only layout when missing. Style consistent with `CompanyCard` / `ProductCard`:

- Square thumbnail (~40×40), `object-contain`, white background, subtle border, rounded.
- `loading="lazy"`, `alt={`${name} logo`}`.
- Graceful fallback if image fails to load (hide on `onError`).

### 2. Add logo files

Drop SVG/PNG files under `public/logos/`:

- `public/logos/synthrad.svg` (or `.png`) — used by SynthRAD2023 + SynthRAD2025.
- `public/logos/monai.svg` — used by MONAI Model Zoo.
- (Optional) other initiatives that have a recognizable logo: Grand Challenge, AAPM challenges, TCIA, etc. — defer until user provides assets.

### 3. Wire `logoUrl` into the data files

- `src/data/initiatives/challenges.ts`: add `logoUrl: "/logos/synthrad.svg"` to both SynthRAD2023 and SynthRAD2025 entries.
- `src/data/initiatives/modelzoo.ts`: add `logoUrl: "/logos/monai.svg"` to the MONAI Model Zoo entry.

## Open question

I don't have the actual SynthRAD and MONAI logo files. Two options:

- **A.** You upload `synthrad.svg` and `monai.svg` (preferred — official artwork, correct licensing).
- **B.** I download them from the official sites (synthrad2023.grand-challenge.org, monai.io) — quick but check trademark/attribution before publishing.

After you confirm, I'll implement steps 1–3 in one pass.

## Out of scope

- Restyling cards beyond inserting the logo slot.
- Backfilling logos for every initiative — only SynthRAD + MONAI now; the field is ready for future additions.