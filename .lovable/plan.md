## Skill: `product-audit-swarm`

Agent-side workflow skill (no app code shipped) authored at `.agents/skills/product-audit-swarm/` and activated via `skills--apply_draft`. It directs me to run a coordinated multi-agent audit of every `ProductDetails` entry in `src/data/products/<category>/`, aligned to `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`, the inclusion policy (AI/DL for radiotherapy), and the dual-axis evidence rubric in `src/data/evidence-impact-levels.ts`.

### Trigger

Fires on requests like "audit the products", "run the product swarm", "compile a product review report", "re-score evidence for all products", "check products for inconsistencies".

### Swarm shape

Each pass spawns specialised sub-agent roles. They run independently per product, then a Compiler merges their findings into one per-product report.

| Role | Inputs | Checks |
| --- | --- | --- |
| **Identity** | id, name, company, category, secondaryCategories, logoUrl, productUrl | slug matches `company-product`, no duplicate ids, logo file exists in `public/logos/`, URL resolves, category ∈ allowed enum |
| **Inclusion** | description, features, usesAI, category | Confirms AI/DL component for radiotherapy per `mem://policy/product-inclusion-criteria` and `mem://constraints/ai-dl-technology-threshold`; flags classical-processing-only or generic QA |
| **Regulatory** | regulatory.{ce,fda,tga,tfda}, certification, intendedUseStatement | Status enum valid, class/clearance number present when cleared, `certification` summary matches `regulatory.*`, decision dates plausible |
| **Technical** | technicalSpecifications, technology, modality, anatomicalLocation, diseaseTargeted | DICOM nomenclature (RTSTRUCT/RTPLAN/RTDOSE), modality array form, integration names spelled consistently |
| **Structures** | supportedStructures, structuresUnavailable | Enforce `Region: Structure Name` per `mem://data/structure-naming-convention-v3`; `(investigational)`/`(unverified)` suffixes per `mem://data-quality/structure-status-marking`; empty list ⇒ `structuresUnavailable: true` |
| **Evidence** | evidenceRigor, clinicalImpact, adoptionReadiness, *Notes, evidence[], keyPapers[], clinicalEvidence | Re-score against `EVIDENCE_RIGOR_LEVELS` and `CLINICAL_IMPACT_LEVELS`; verify study-quality sub-attrs (`vendorIndependent`, `multiCenter`, `multiNational`, `prospective`, `externalValidation`); targeted PubMed/DOI lookup via `websearch--web_search`; record search date |
| **Transparency** | trainingData, evaluationData, safetyCorrectiveActions, dosePredictionModels, limitations, source | Per `mem://data/transparency-and-safety-schema`; flag missing model-card / training-data when E ≥ E1 |
| **Cross-check** | All product files + `src/data/companies/*` | Company name matches an active company entry; archived companies/products not referenced from live entries; duplicate ids across categories; broken `partOf` / `priorVersions` / `supersededBy` refs |
| **Compiler** | Outputs from all roles above | Merges into one per-product Markdown block with severity-tagged findings + suggested edits |

### Workflow

1. **Bootstrap** — read `docs/FIELD_REFERENCE.md`, `docs/review/GUIDE.md`, `src/data/evidence-impact-levels.ts`, and the inclusion-policy memories once per session. Cache the rubric.
2. **Enumerate** — `rg -l "^export const " src/data/products` (excluding `archived/` and `examples/`) to build the worklist. Optionally accept a filter argument: a category folder or product id.
3. **Per product**, run roles in parallel where independent (Identity, Inclusion, Regulatory, Technical, Structures, Transparency can run together; Evidence runs after a PubMed/DOI query; Cross-check uses the cached registry).
4. **Compile** a Markdown block per product with sections: *Summary*, *Field findings* (table: field, severity `info|warn|error`, observation, suggested fix), *Re-scoring proposal* `(E,I,R)` with notes, *Sources consulted*.
5. **Aggregate** — write three artefacts to `/mnt/documents/`:
   - `product-audit-<YYYY-MM-DD>.md` — full per-product report
   - `product-audit-<YYYY-MM-DD>.csv` — flat row per finding for the worklist (id, role, severity, field, observation, suggested fix)
   - `product-audit-<YYYY-MM-DD>-rescoring.csv` — id, current E/I/R, proposed E/I/R, rationale
6. **Hand-off** — surface the artefacts to the user with `<presentation-artifact>` tags. Do NOT auto-edit product files. Edits are applied in a separate, confirmed pass (one PR per category wave) per the *Minimal Intervention* memory.

### Severity rubric

- **error** — invalid enum, broken URL, duplicate id, archived-company reference, AI/DL inclusion violation, regulatory status inconsistent with `certification`.
- **warn** — missing recommended field for the assigned `(E,I,R)` (e.g. `keyPapers` empty at E ≥ E1), `lastRevised` > 180 days, DICOM nomenclature drift.
- **info** — neutral observations and re-scoring suggestions where current scores are defensible.

### Composability

Pulls in the **AI Gateway for Scripts** skill (`knowledge://skill/ai-gateway`) for the Evidence role's optional LLM-assisted abstract summarisation when re-scoring large papers. Falls back to direct `websearch--web_search` and `code--fetch_website` if the gateway is unavailable.

### Files in the draft

```
.agents/skills/product-audit-swarm/
├── SKILL.md                            # navigation, triggers, workflow overview, severity rubric
├── references/
│   ├── roles.md                        # per-role inputs/checks/output schema (full table above expanded)
│   ├── scoring-rubric.md               # condensed E/I/R cheatsheet + study-quality sub-attrs
│   ├── inclusion-policy.md             # AI/DL-for-RT inclusion gates, exclusions, edge cases
│   └── output-format.md                # exact Markdown + CSV schemas the Compiler must emit
└── scripts/
    └── enumerate_products.sh           # rg-based worklist generator with --category filter
```

### Out of scope

- Company-only audits (user excluded).
- Auto-applying edits to product `.ts` files.
- Any in-app feature, edge function, or DB table.
- Editing the rubric itself.

### Hand-off

After writing the four Markdown files and the script, call `skills--apply_draft` with `path: ".agents/skills/product-audit-swarm"` to activate.
