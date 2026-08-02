## 1. Resources & Compliance — add the FLI AI Safety Index

In `src/components/resources/ResourceLinks.tsx`, next to the existing index entries (Stanford AI Index 2025, MIT AI Agent Index 2025, International AI Safety Report 2025) in the "AI/ML Guidelines" group:

- **AI Safety Index — Summer 2026 Edition** (Future of Life Institute, July 2026). Independent expert panel grading nine leading AI developers (Anthropic, OpenAI, Google DeepMind, Meta, xAI, DeepSeek, Mistral, Z.ai, Alibaba Cloud) on safety and security domains; highest overall grade C+.
- URL: `https://futureoflife.org/ai-safety-index-summer-2026/`
- Carry the same verification metadata used across the page: `version: "Summer 2026 edition"`, `status: 'guidance'`, `lastVerified: '2026-08-02'`, rendered via the existing `VerifiedBadge`.

## 2. Initiatives — add CancerData

New entry in `src/data/initiatives/datasets.ts` (Open Dataset category, matching the page's inclusion criteria):

- **CancerData** — open-source resource sharing platform for cancer research data, contouring atlases and OAR dose-constraint guidelines (currently focused on neuro-oncology), `https://cancerdata.org/`, organization MAASTRO / CancerData consortium, status Active, tags for Open Access, Contouring Atlas, Dose Constraints, Neuro-Oncology.
- Description will note the site is being rebuilt ("under construction" banner) so readers know content is in migration.

## 3. Initiatives audit + "Last revised" date

Audit every entry in `challenges.ts`, `datasets.ts`, `modelzoo.ts`, `llmplatforms.ts` by fetching each `website` and checking status, dates, results links and dead URLs. Known corrections already identified:

- **SynthRAD2023 / SynthRAD2025**: mark as post-challenge — data and leaderboards remain open for submission after the ranking deadline.
- **COBRA2026**: currently "Upcoming"; registration is now open, so it moves to "Active" with updated participation info.
- Anything else the audit turns up (broken links, challenges that have since closed, changed leaderboard URLs) is corrected in the same pass.

Support for the post-challenge label:

- Extend `Initiative` in `src/types/initiative.d.ts` with an optional `postChallenge?: boolean` flag (and an optional `lastVerified?: string`).
- Render a small neutral "Post-challenge open" badge in `src/components/initiatives/InitiativeCard.tsx` next to the status badge, using existing badge styling — no new colour system.

Date stamp:

- Add `INITIATIVES_LAST_AUDIT` (ISO date) in a small module under `src/data/initiatives/`, and show "Last revised: 2 Aug 2026" in `src/components/initiatives/InitiativesHeader.tsx` under the intro paragraph, mirroring the wording used on Resources & Compliance.

## Technical notes

- No backend or schema changes; all edits are static data plus two presentational components.
- Field additions are optional, so existing initiative records stay valid.
- Verification of external URLs is done with read-only fetches during implementation; any URL that cannot be confirmed live is flagged in the final report rather than silently changed.
