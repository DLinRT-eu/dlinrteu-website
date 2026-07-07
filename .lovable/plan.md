
## Decision: Yes — create a separate product

Ethos AI Segmentation and AI Contouring for Eclipse share underlying deep-learning models but are distinct commercial products with different regulatory paths, deployment contexts, clinical workflows and release timelines. Cataloguing them separately matches how DLinRT treats other TPS-embedded vs adaptive-console versions (e.g. RayStation vs RayStation Online Adaptive; MVision Contour+ variants).

## Inclusion check

- Deep-learning based autocontouring (Siemens/Varian marketing explicitly: "Deep learning-based autocontouring"). ✅ passes AI/DL threshold.
- Regulatory: **CE marked** (announced 15 May 2026, ESTRO 2026 press release). US: the underlying "AI Segmentation" algorithm family has FDA 510(k)s K203469 (Apr 2021), K211881 (Sep 2021) and K232923 (Apr 2024) under Varian Medical Systems — those clearances cover the algorithm shipped in Ethos; whether the Eclipse-integrated packaging is separately 510(k)-cleared in the US is not yet publicly confirmed and will be flagged `(unverified)` pending confirmation.
- ✅ Meets `hasRegulatoryApproval` inclusion gate via CE.

## Why separate from Ethos AI Segmentation

| Aspect | Ethos AI Segmentation | AI Contouring for Eclipse |
|---|---|---|
| Host system | Ethos treatment console (online adaptive) | Eclipse TPS (offline planning) |
| Trigger | Automatic in daily adaptive workflow | Manual/scripted in planning session |
| Input | CBCT (HyperSight) + planning CT | Planning CT (primary), MR where supported |
| Regulatory milestone | FDA K232923 (2024) | CE mark 2026 |
| Customer base | Ethos adopters | Broad Eclipse installed base |
| Release date | 2020 (Ethos launch) / 2024 v2.0 | 2026 |

Merging them would hide the 2026 CE milestone and mis-represent the deployment surface (Eclipse is by far the larger installed base).

## What to build

Create `src/data/products/auto-contouring/varian-eclipse.ts` exporting `VARIAN_ECLIPSE_PRODUCTS`, and register it in `src/data/products/auto-contouring/index.ts`.

### Product skeleton (key fields)

- `id`: `varian-eclipse-ai-contouring`
- `name`: "AI Contouring for Eclipse"
- `company`: "Varian (Siemens Healthineers)" — matches existing Ethos entry
- `category`: "Auto-Contouring" (no secondary; Eclipse itself is not our product)
- `certification`: "CE" (FDA left blank / `(unverified)` pending K-number confirmation)
- `regulatory.ce`: status `cleared`, class `IIb`, source Siemens Healthineers press release 2026-05-15
- `regulatory.fda`: `not_applicable`/unknown with note referencing K232923 as the underlying algorithm family, marked pending confirmation
- `modality`: ["CT", "MRI"] pending confirmation of MR models
- `anatomicalLocation`: pelvis, thorax, head & neck, abdomen, breast (mirror Ethos set), all suffixed `(unverified)` until Siemens publishes a model card
- `technology.integration`: ["Eclipse Treatment Planning"]
- `technology.deployment`: ["Integrated with Eclipse TPS", "On-premises"]
- `technology.triggerForAnalysis`: "Manual / scripted (ESAPI)"
- `evidenceRigor`: **E1** — vendor press release + shared algorithm lineage with Ethos publications, but no Eclipse-specific peer-reviewed evaluation yet
- `clinicalImpact`: **I1** — efficiency/workflow claims from vendor only
- `adoptionReadiness`: **R2** — CE-only, single-vendor evidence, requires local validation
- Study quality flags: all `false` for now (no independent Eclipse-specific studies located)
- `trainingData` / `evaluationData`: `disclosureLevel: "minimal"` with note that Siemens has not published a model card; reference the Ethos Finnegan 2025 paper as adjacent (shared algorithm) but not as evidence for this product
- `source`: Siemens Healthineers press release (2026-05-15), Siemens autocontouring product page, FDA 510(k) K232923 (algorithm lineage only)
- `lastUpdated` / `lastRevised`: today

### Cross-links

Add a short note in the existing `varian-ethos.ts` `notes`/`source` field pointing out the sibling Eclipse product, and vice-versa, so the shared-algorithm relationship is transparent without conflating the two entries.

### Out of scope

- No changes to Ethos entry's evidence axes or supportedStructures.
- No new companies, categories, or schema fields.
- No admin/UI work — this is a data-only addition.

## Open item to confirm before/after publish

FDA status of the Eclipse-integrated packaging (separate K-number vs coverage under K232923). Ask a Varian representative via the certification program; until confirmed, leave FDA fields empty with an `(unverified)` note.
