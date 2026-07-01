## Goal

Add RaySearch **RayIntelligence** to the catalogue as a **Performance Monitor** entry, aligned with the existing pattern used for PTW Aqualis and MVISION performance-monitor products, because RayIntelligence v2026 introduces explicit monitoring of AI outputs (Deep Learning Segmentation performance monitoring).

## Rationale & fit

RayIntelligence is an oncology analytics platform. Per project policy, Performance Monitor entries are included when they explicitly monitor AI-generated outputs. RayIntelligence v2026 qualifies:
- "AI performance monitoring … RayIntelligence v2026 introduces Deep Learning Segmentation monitoring" (source: raysearchlabs.com/rayintelligence, retrieved 2026-07-01).
- Additional non-AI-monitoring features (plan benchmarking, device utilization, expertise mapping) will be listed as features but the product's inclusion basis is the AI-monitoring capability.

Classification:
- `usesAI: false` (analytics tool; doesn't itself run DL models — matches PTW/MVISION performance-monitor precedent).
- `monitorsAIProducts: ["RaySearch Deep Learning Segmentation (RayStation)", "Auto-Contouring outputs"]`.
- Category: `Performance Monitor`.

## Inclusion-gate caveat (needs confirmation before merge)

The project's inclusion gate requires CE / FDA / MDR-exempt / NMPA / etc. RaySearch press releases mark RayIntelligence with "®*" (subject to regulatory registration in some markets). RaySearch holds an EU MDR QMS certificate (CE 2862), but I have not confirmed whether RayIntelligence itself is CE-marked as a medical device, is MDR-exempt (analytics/decision-support outside MDR scope), or is still pending. Plan:
1. Attempt to confirm CE/FDA status from RaySearch regulatory page and EUDAMED.
2. If confirmed cleared or MDR-exempt → publish live.
3. If pending only → publish under `/products/pipeline` (Tier 2) instead, per Pipeline Products Hub policy.

## Files to add/modify

1. **New product file** `src/data/products/performance-monitor/raysearch.ts`
   - Full `ProductDetails` for `raysearch-rayintelligence` with:
     - name, company "RaySearch Laboratories", `companyUrl`, `productUrl`, `githubUrl`
     - description, keyFeatures (AI monitoring, plan benchmarking, device utilization, expertise mapping)
     - `modality: ["Treatment Planning System Data"]`, `anatomicalLocation: ["Agnostic"]`
     - `technicalSpecifications` (input: TPS/OIS/RIS data; output: dashboards/analytics)
     - `technology`: cloud/on-prem integration with RayStation and RayCare
     - `regulatory`: filled after confirmation (see caveat)
     - `evidenceRigor: "E0"`, `clinicalImpact: "I0"`, `adoptionReadiness: "R1"` initially — no peer-reviewed evaluations located; upgrade later if evidence is found.
     - `usesAI: false`, `monitorsAIProducts: [...]`
     - `trainingData` / `evaluationData`: `disclosureLevel: "not_applicable"` (no model)
     - `source`: raysearchlabs.com/rayintelligence + v2025/v2026 press releases, with `sourceRetrievedOn: 2026-07-01`.

2. **`src/data/products/performance-monitor/index.ts`** — export `RAYSEARCH_PERFORMANCE_PRODUCTS`.

3. **`src/data/companies/specialized-solutions.ts`** — append `raysearch-rayintelligence` to the RaySearch `productIds` array and add `"Performance Monitor"` to `secondaryTasks`.

4. No changes to routing, task taxonomy, or shared UI — the Performance Monitor category and monitoring badges already exist.

## Out of scope

- No changes to existing RayStation / RayStation Planning entries.
- No changes to design or shared components.
- No auto-editing of other product files.

## Verification after implementation

- `tsgo` typecheck.
- Confirm product appears on `/products?category=Performance Monitor` and on the RaySearch company page.
- Confirm "Monitors AI Products" badge renders with the referenced items.
