
## Goal

Make DLinRT useful for someone preparing an EU **Health Technology Assessment (HTAR, Regulation 2021/2282)** of an AI radiotherapy product — by (1) documenting HTA in Resources, (2) tagging existing fields with HTA terminology, and (3) shipping an HTA-oriented export profile.

The change is additive and respects the Minimal Intervention rule: no existing field is renamed or removed.

---

## 1. Resources & Compliance page — add HTA content

**File: `src/components/resources/RegulatoryLandscape.tsx`**
Add a new card "EU: Health Technology Assessment Regulation (HTAR)" with:
- Badge "EU 2021/2282", in-force since Jan 2025 for oncology/ATMPs
- Short explainer: Joint Clinical Assessments (JCA), Joint Scientific Consultations (JSC), PICO framework, relationship to MDR/AI Act
- Links: `https://health.ec.europa.eu/health-technology-assessment/overview_en`, EUR-Lex 2021/2282, EUnetHTA 21 deliverables

**File: `src/components/resources/ResourceLinks.tsx`**
Add a new `category: "EU HTA"` group with 4 entries:
- HTAR overview (EC)
- Regulation 2021/2282 (EUR-Lex)
- EUnetHTA 21 methodological guidelines (PICO, evidence submission template)
- HTA Coordination Group page

**File: `src/components/resources/ComplianceChecklist.tsx`**
Append one item: "Plan for HTA / market access" — covers PICO definition, comparator selection, real-world evidence, budget impact, alignment of clinical evidence to JCA dossier requirements.

**File: `src/components/resources/PageIndex.tsx`**
Add an entry `{ id: 'hta-guidance', label: 'HTA guidance', icon: Scale }` so the new section is reachable from the quick-nav.

**File: `src/pages/ResourcesCompliance.tsx`**
Insert a new `<section id="hta-guidance">` between "Regulatory landscape" and "Standards & guidelines" containing:
- Short intro on what HTA assessors look for in radiotherapy AI (clinical effectiveness, safety, organisational impact, ethical/legal, costs)
- A small "How DLinRT fields map to HTA domains" table — see §3 below
- CTA buttons: "Download HTA-ready export" (links to Products page export) and "View HTA resources" (anchor to resource library)

---

## 2. HTA-friendly nomenclature on product pages

Goal: keep existing field names but surface HTA-equivalent labels so HTA users recognise what they're reading.

**File: `src/data/hta-mapping.ts` (new)**
Single source of truth mapping DLinRT fields → EUnetHTA Core Model domains:

```ts
// Example excerpt
export const HTA_DOMAIN_MAP = {
  intendedUse:        { domain: 'CUR', label: 'Health problem & current use' },
  keyFeatures:        { domain: 'TEC', label: 'Technical characteristics' },
  evidenceRigor:      { domain: 'EFF', label: 'Clinical effectiveness (rigor)' },
  clinicalImpact:     { domain: 'EFF', label: 'Clinical effectiveness (impact)' },
  evaluationData:     { domain: 'EFF', label: 'Clinical evaluation evidence' },
  safetyCorrectiveActions: { domain: 'SAF', label: 'Safety & FSCAs' },
  trainingData:       { domain: 'ETH', label: 'Data provenance & fairness' },
  regulatory:         { domain: 'LEG', label: 'Regulatory status' },
  // CUR, TEC, EFF, SAF, ECO, ETH, ORG, SOC, LEG
} as const;
```

**File: `src/components/product/HTABadge.tsx` (new)**
Small tooltip-badge component (uses existing shadcn `Tooltip`) that shows the HTA domain (e.g. "EFF — Clinical effectiveness") when an HTA mode is enabled.

**File: `src/pages/ProductDetails.tsx`**
- Add a "HTA view" toggle in the header (off by default, persisted in `localStorage`)
- When on, render `<HTABadge>` next to relevant section headings using the map. No layout change when off.

This keeps the standard view identical for current users while giving HTA users an at-a-glance crosswalk.

---

## 3. HTA-oriented export profile

Add a fourth export format alongside CSV / JSON / FHIR: **"HTA dossier (Excel)"**.

**File: `src/utils/htaExport/htaExporter.ts` (new)**
Builds an `.xlsx` workbook (uses existing `xlsx` dep already used by `excelExporter.ts`) with one sheet per EUnetHTA domain:
1. `Overview` — product name, version, vendor, regulatory status, intended use, contact
2. `CUR — Current use` — clinical task, target anatomy, modality, indication
3. `TEC — Technical` — input/output formats, integration, deployment, processing time, AI model details, dose prediction models
4. `EFF — Effectiveness` — evidence rigor (E0–E3) + impact (I0–I5) with plain-English explanation, evaluation dataset details, study quality flags, top publications
5. `SAF — Safety` — supported structures with status flags, safety/corrective actions, limitations
6. `ETH — Ethics & data` — training data sources, demographics, public datasets, disclosure level, vendor independence
7. `LEG — Legal/regulatory` — CE/FDA/TGA/TFDA, MDR class, AI Act risk hint, intended use statement
8. `ORG — Organisational` — integration requirements, deployment model, market presence
9. `Readme` — explanation of EUnetHTA Core Model domains and links to HTAR/EUnetHTA 21 templates

Each cell uses values already on `ProductDetails`; no new product fields required.

**File: `src/utils/htaExport/index.ts` (new)** — re-exports `exportHTADossier(products)` and `exportSingleHTADossier(product)`.

**File: `src/components/products/ExportDropdown.tsx`** (or wherever existing CSV/JSON/FHIR buttons live — confirmed in `src/utils/exportProducts.ts` callers)
Add menu item "HTA dossier (.xlsx)" calling the new exporter.

**File: `src/pages/ProductDetails.tsx`**
Add a single-product "Download HTA dossier" button next to the existing FHIR/Model-card buttons.

---

## 4. Discoverability

**File: `src/components/products/ReadinessIndicator.tsx`** (existing)
Add an "HTA readiness" sub-score derived from already-tracked fields: presence of evaluationData, multi-centre/external-validation flags, regulatory status, and safety reporting. Purely additive — no schema change.

---

## Out of scope

- No new product data fields (HTA-specific cost/budget data is not part of DLinRT's mission and would risk implying clinical validation).
- No changes to FHIR exporter, RLS policies, or edge functions.
- Educational disclaimer preserved — the HTA export is explicitly labelled "informational, not a substitute for a regulatory dossier".

---

## Files touched (summary)

New:
- `src/data/hta-mapping.ts`
- `src/components/product/HTABadge.tsx`
- `src/utils/htaExport/htaExporter.ts`
- `src/utils/htaExport/index.ts`

Edited:
- `src/components/resources/RegulatoryLandscape.tsx`
- `src/components/resources/ResourceLinks.tsx`
- `src/components/resources/ComplianceChecklist.tsx`
- `src/components/resources/PageIndex.tsx`
- `src/pages/ResourcesCompliance.tsx`
- `src/pages/ProductDetails.tsx`
- `src/components/products/ExportDropdown.tsx` (file path confirmed during implementation)
- `src/components/products/ReadinessIndicator.tsx`
