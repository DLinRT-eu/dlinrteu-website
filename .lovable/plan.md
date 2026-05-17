## Update: Accuray at ESTRO 2026 (news round-up)

Edit `src/data/news/estro-2026-announcements.ts` to add an **Accuray** section between RaySearch and United Imaging, keeping with the DLinRT.eu inclusion criterion (AI/DL component for radiotherapy must be explicit).

### What Accuray announced for ESTRO 2026 (booth, ESTRO Stage talks, press)

From the public material (accuray.com/estro, accuray.com/estro-stage, Sept 2025 Stellar launch PR, and ESTRO26 press coverage):

- **Accuray Stellar™ solution** — a configuration of the Radixact® Treatment Delivery System, marketed under "Make ARTwork — Adapt with Confidence." Bundle of imaging + adaptive tools. US market first; ESTRO 2026 is the European showcase.
- **Radixact® / Accuray Helix™** — helical radiotherapy delivery hardware, "advanced options" promoted at ESTRO26.
- **Synchrony®** — real-time motion tracking & correction. Already tracked in the DLinRT.eu catalogue as AI-based (patient-specific AI motion model).
- **PreciseART®** — offline adaptive replanning workflow.
- **Adapt LTE™ powered by Accuray Cenos™** — retrospective evaluation of previously delivered Precision plans against original objectives, for training / post-treatment analysis. US-only, "Learn, Trial, Evaluate."
- **ClearRT®** — helical kVCT imaging for IGRT/adaptive.
- **ESTRO Stage session (Mon 18 May, 10:15)** — "AI in radiotherapy: clinical performance, legal framework, ethics" (symposium content, not a product launch).

### AI/DL scope assessment

| Item | AI/DL component explicit in public material? | Action |
|---|---|---|
| Synchrony | Yes (patient-specific AI motion model) | Refresh existing entry with ESTRO 2026 reference |
| Stellar (Radixact configuration) | No — described as a "solution / tool set"; AI not isolated | Mention in news but **do not** add catalogue entry; flag for revision once vendor confirms an AI/DL component |
| Radixact / Helix | No — delivery hardware | Out of scope per inclusion criteria |
| PreciseART | No — adaptive workflow, AI role not disclosed | Flag for revision |
| Adapt LTE / Cenos | No — retrospective evaluation tool; AI role not disclosed | Flag for revision |
| ClearRT | No — kVCT imaging hardware | Out of scope |
| ESTRO Stage AI talk | Educational session, no product | Mention only |

### News-file change (single section to add)

A short Accuray subsection that:
1. Notes the ESTRO 2026 presence (booth, "Make ARTwork" theme, ESTRO Stage AI session reference).
2. Confirms **Synchrony** as the only Accuray product at the booth with an explicitly disclosed AI/DL component for radiotherapy; links to the existing catalogue entry; refreshes its `lastUpdated`/`lastRevised` and adds an ESTRO 2026 source line in `accuray.ts`.
3. Explicitly states that **Stellar, PreciseART, Adapt LTE / Cenos, ClearRT, Radixact, Helix** are tracked here as platform/workflow announcements only — catalogue entries will be created (or existing ones revised) once Accuray publishes documentation describing any AI/DL model, training data and intended use inside these products. Per the [product inclusion criteria](/about), they are not added to the catalogue today.
4. Cites: accuray.com/estro, accuray.com/estro-stage, Accuray investor PR (26 Sep 2025) for Stellar, ESTRO26 press coverage.

### Files touched

- `src/data/news/estro-2026-announcements.ts` — add Accuray section.
- `src/data/products/tracking/accuray.ts` — append "Accuray ESTRO 2026 booth presence" to the `source` field; bump `lastUpdated` / `lastRevised` to today.

No type, schema, or UI changes. No new product files. No newsletter dispatch.

### Open question (non-blocking)

Should I also add a one-line "watchlist" bullet listing Stellar / Adapt LTE / PreciseART as **pending vendor clarification** at the bottom of the Accuray section, so reviewers can see what we are explicitly waiting on? Default: yes.
