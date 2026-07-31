## Goal

Audit every factual claim on `/resources` (Resources & Compliance) and make provenance visible: each regulatory card, core document, standard and library link gets a **Last verified** date and, where applicable, a **version/status note** (e.g. "Reg. (EU) 2024/1689, consolidated", "COM(2025) 1023 — proposal, not in force").

## Part 1 — Accuracy audit (no assumptions, verified before edits)

For each section of `src/pages/ResourcesCompliance.tsx`:

1. **RegulatoryLandscape.tsx** — re-verify EU AI Act dates (2 Aug 2026 enforcement + Art. 50 transparency, 2 Dec 2027 Annex III, 2 Aug 2028 Annex I), AI Omnibus COM(2025) 836 status, MDR proposal COM(2025) 1023 / 2025/0404(COD) legislative state, FDA and international cards.
2. **StandardsGuidelines.tsx**, **RegulatoryFramework.tsx**, **ComplianceChecklist.tsx** — check standard numbers/editions (ISO 13485, IEC 62304, ISO 14971, IEC 81001-5-1, AAPM/ESTRO reports) and any claim of current applicability.
3. **CoreDocuments.tsx** and **ResourceLinks.tsx** — link-check every URL (HTTP status + redirect target) and confirm each title/description matches the page it points to.
4. **Evidence/taxonomy sections** — confirm text matches `docs/review/GUIDE.md` and `src/data/evidence-impact-levels.ts`.

Findings are fixed in place; anything that cannot be verified is flagged in-copy as "unverified" rather than silently kept.

## Part 2 — Verification metadata model

Add a single source of truth so dates are not scattered in JSX:

- New `src/data/resources/verification.ts` exporting a `VerificationMeta` type (`lastVerified: string` ISO date, `version?: string`, `status?: 'in-force' | 'proposal' | 'guidance' | 'superseded'`, `note?: string`).
- New `src/components/resources/VerifiedBadge.tsx` — compact, accessible badge rendering `Verified <date>` with an optional tooltip carrying the version/status note. Uses existing shadcn `Badge` + `Tooltip` and design tokens only.

## Part 3 — Apply to every item

- **RegulatoryLandscape**: each card header gets a `VerifiedBadge` plus an explicit version line (regulation number, consolidated-text date, or proposal status).
- **CoreDocuments**: each document entry gains `lastVerified` and `version`/`status`; badge shown next to the existing type badge.
- **ResourceLinks**: each link entry gains `lastVerified`; badge shown in the card footer, and the existing search filter is extended to match version text.
- **StandardsGuidelines** / **RegulatoryFramework** / **ComplianceChecklist**: per-item verified date and edition/year.
- **Page header**: a summary line "All entries verified as of <most recent date>" derived from the data, not hardcoded.

## Technical notes

- All new logic in TypeScript with explicit types; no `any`.
- Dates stored as `YYYY-MM-DD` strings in data files; formatted for display in one helper.
- Semantic tokens only — no hardcoded colours.
- Verification via Playwright screenshots of `/resources` sections plus a link-check pass; lint/test/build run at the end.
- No changes to product data, backend, or unrelated pages.
