## Reconsider Lumonus for inclusion

Rationale for revisiting: our catalog already includes AI-workflow / QA-of-AI style products (e.g. RaySearch **RayIntelligence** as a Performance Monitor tagged MDR-exempt; MVision Verify; PTW Aqualis). Lumonus AI sits in the same family — ML/LLM-based automation wrapped around the RT planning and follow-up workflow — and the FDA **Clinical Decision Support Software (CDSS) exemption** it holds is a formal regulatory determination (non-device under 21st Century Cures §3060), which is analogous to the "MDR-exempt" pathway we already accept.

Under that reading Lumonus meets the inclusion gate.

## Proposed catalog entry

- **New product file:** `src/data/products/platform/lumonus.ts`
  - `id`: `lumonus-ai`
  - `name`: Lumonus AI (Oncology Intelligence Layer)
  - `category`: Platform (primary), with `secondaryCategories`: Performance Monitor, Treatment Planning
  - `usesAI`: true (LLMs + ML), scoped to workflow/decision support
  - `company`: Lumonus
  - `modality`: N/A (workflow layer over EMR/OIS/TPS)
  - Modules described: Consult, Document, Plan (dosimetry workspace + planning automation), Improve (analytics)
  - `regulatory`: `us: { status: "cdss_exempt", type: "21st Century Cures §3060 CDSS exemption", notes: "Sigma module — non-device determination per Rook QS case study" }`; `ce: "not_marked"`; other authorities: none identified
  - `evidenceRigor`: **E0** (no peer-reviewed validation identified)
  - `clinicalImpact`: **I0**
  - `evaluationData`: MSK collaboration announcement only, flagged as non-peer-reviewed
  - `limitations`: workflow/LLM-oriented; not a validated DL clinical algorithm for a core RT function; FDA CDSS exemption is a non-device pathway, not a clearance
  - `keyPapers`: empty (none available)
  - Sources block: Lumonus website, Rook QS case study, MSK collaboration press release, Series B announcement — all with retrieval dates
- **New company file:** `src/data/companies/specialized-solutions.ts` — append a `lumonus` entry (Sydney, AU + New York, US), `primaryTask: "Platform"`, `secondaryTasks: ["Performance Monitor", "Treatment Planning"]`, `productIds: ["lumonus-ai"]`.
- **Regulatory utils:** extend `src/utils/regulatoryUtils.ts` if needed to render `cdss_exempt` with a distinct badge (label "FDA CDSS Exempt", styled like MDR-exempt).
- **News item update:** amend `src/data/news/aapm-2026-and-certification-milestone.ts` — replace the "not included" decision with a short note that Lumonus has been added under the CDSS-exempt pathway, with the caveats above.
- **Memory update:** append to `mem://policy/regulatory-approval-recognized-authorities` that FDA CDSS exemption (21st Century Cures §3060) is treated analogously to MDR-exempt, requiring public disclosure of the exemption source.

## What this deliberately does not do

- No claim of clinical validation — evidence stays E0/I0 until Lumonus publishes peer-reviewed studies.
- No mapping into Auto-Contouring / Image Synthesis / Reconstruction, since no specific DL clinical algorithm is documented.
- No AdaptCHECK, ART-Plan, or ProtégéAI+ 2.0 changes in this plan — those remain follow-ups.

## Open decisions before I implement

1. **Primary category** — Platform (my recommendation, matches MVision Platform / RayIntelligence pattern) vs. Performance Monitor vs. Treatment Planning. Prefer Platform because it spans the full workflow.
2. **Regulatory badge** — introduce a new `cdss_exempt` status (cleanest, distinct from MDR-exempt), or reuse the existing `mdr_exempt` label with a US-specific note (simpler, no schema change).
3. **News item** — amend the just-published AAPM post (my recommendation), or leave it and add a small standalone note in a future update.

If you confirm 1 = Platform, 2 = new `cdss_exempt` status, 3 = amend, I will proceed exactly as above once switched to build mode.

&nbsp;

After revision, I confirm both 3 points affermative as suggested 