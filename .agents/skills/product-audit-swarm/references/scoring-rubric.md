# Scoring Rubric Cheatsheet

Authoritative source: `src/data/evidence-impact-levels.ts`. This file is the
quick lookup the Evidence role uses during a sweep — do not re-derive.

## Evidence Rigor (E0–E3)

| Level | One-liner |
| --- | --- |
| E0 | Vendor materials / regulatory submission only. No peer-reviewed study identified. |
| E1 | At least one peer-reviewed single-centre, retrospective, phantom, in-silico or pre-clinical study. |
| E2 | External, independent or multi-centre validation in the target indication. |
| E3 | Prospective, comparative real-world study, RCT, or systematic review/meta-analysis. |

## Clinical Impact (I0–I5)

| Level | When to assign |
| --- | --- |
| I0 | Feasibility only, no clinical benefit demonstrated. |
| I1 | QA, monitoring, consistency checks. |
| I2 | Workflow: time/variability/dose reduction, image-quality gains. |
| I3 | Decision: changes in treatment management or plan selection. |
| I4 | Patient outcome: improved morbidity/mortality/QoL. |
| I5 | Health-system: cost-effectiveness, equity, population-level outcomes. |

## Adoption Readiness (R0–R4)

Derived from `(E, I, regulatory)`:

| R | Meaning |
| --- | --- |
| R0 | Pre-market / no clearance. |
| R1 | Cleared but evidence E0; high implementation burden. |
| R2 | Cleared and E1; structured pilot recommended. |
| R3 | Cleared and E2; deploy with contextual safeguards. |
| R4 | Cleared and E3; broadly adoption-grade. |

## Study-Quality Sub-Attributes

Per `mem://data-quality/evidence-study-quality-attributes`:

- `vendorIndependent` — author affiliations exclude the vendor.
- `multiCenter` — ≥2 distinct centres.
- `multiNational` — ≥2 distinct countries.
- `prospective` — protocol registered before data collection.
- `externalValidation` — test set from a centre not used for training.

Set these per the strongest paper that supports the assigned Evidence Rigor.

## Notes-Field Rules

- 1–3 sentences. Cite the strongest paper inline (author, year, DOI or
  PubMed URL).
- Always record the literature-search date when re-scoring lands on E0
  (e.g. "PubMed searched 2026-05-20; no peer-reviewed validation found.").
