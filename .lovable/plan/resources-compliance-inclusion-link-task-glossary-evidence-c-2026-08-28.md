# Resources & Compliance: inclusion link, task glossary, evidence consistency

Three fixes on the Resources & Compliance page and the related methodology surfaces.

## 1. Inclusion criteria link actually lands on the criteria

Today the "Platform scope" box links to `/products`, but the inclusion criteria there live inside a
collapsed panel with no anchor, so the reader lands on the product grid and sees nothing.

- Give the Products inclusion panel an anchor (`id="inclusion-criteria"`) and make it open
  automatically when the page is opened with that hash, scrolling it into view.
- Point the Resources link at `/products#inclusion-criteria`.
- Also restate the included/excluded rule in short form directly in the Resources scope box, so the
  criteria are readable without leaving the page.

## 2. Complete the glossary of clinical tasks

The glossary lists 10 tasks but the catalogue uses a different set. Missing entries will be added and
the ordering aligned with the site-wide task order used by the filters:

Reconstruction, Image Enhancement, Image Synthesis, Auto-Contouring, Tracking, **Positioning (new)**,
Treatment Planning, Clinical Prediction, Registration, Performance Monitor, **Platform (new)**.

- **Positioning** — AI-based patient setup and positioning support (e.g. camera/image-driven setup
  verification and repositioning guidance).
- **Platform** — vendor ecosystems that bundle several AI tasks (contouring, planning, adaptive,
  analytics) behind one deployment, orchestration and integration layer.
- **Reporting** is kept but marked explicitly as an emerging task with no catalogued products yet, so
  the glossary does not imply a populated category.
- One product currently carries the non-standard category `Dose Prediction`; it will be flagged in the
  report at the end (data fix proposed separately, not silently changed here).

## 3. Per-publication scoring described consistently

Per-publication scoring already exists on product pages, but none of the methodology pages explain it,
so the site reads as if E/I were assigned per product only. The same short explanation will be added to:

- Resources & Compliance, "Evidence level classification" section.
- The Evidence & Impact guide page (a dedicated card next to the axis definitions).
- The Reviewer guide, in the evidence-classification steps.

Wording (single source, reused verbatim): each peer-reviewed publication is scored individually on
rigor (E) and impact (I) with a written rationale and the five study-quality flags; the product-level
E/I shown in badges and dashboards is the maximum across its scored publications; regulatory
clearances, vendor documents, press items and conference abstracts are listed as sources but are not
scoreable and never raise a product score.

## Technical notes

- Files: `src/pages/ResourcesCompliance.tsx`, `src/pages/Products.tsx`,
  `src/components/resources/ClinicalTasksGlossary.tsx`, `src/pages/EvidenceImpactGuide.tsx`,
  `src/pages/reviewer/ReviewerGuide.tsx`.
- Task order sourced from the existing `preferredOrder` in `src/utils/filterOptions.ts` — no new
  taxonomy source is introduced.
- Presentation-only change: no product data, scoring logic (`computeProductEvidenceScore`) or
  filter behaviour is modified.
- Verification: typecheck, then a browser pass over `/resources-compliance`,
  `/products#inclusion-criteria` and `/evidence-impact-guide`.
