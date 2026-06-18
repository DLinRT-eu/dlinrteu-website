## Goal

Triage the Philips AI-enabled solutions list against DLinRT's inclusion criteria (AI/DL for core clinical functions in radiotherapy) and add the relevant missing products.  
  
Introduce a new task/category: positioning. Make sure this is added in all the necessary files. Precise Position will use this new category.

## Triage decisions


| Philips product                    | Decision                                                                             | Rationale                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Precise Image                      | **Already in catalog** (Reconstruction, +Image Enhancement)                          | No action                                                                                                                                                                          |
| SmartSpeed                         | **Already in catalog** (Reconstruction)                                              | No action                                                                                                                                                                          |
| MRCAT (H&N / Brain / Pelvis)       | **Already in catalog** (Image Synthesis)                                             | No action                                                                                                                                                                          |
| **Precise Position**               | **ADD**                                                                              | Camera-based DL patient auto-positioning on Philips CT — directly used in CT simulation workflow for RT. Category: **Positioning**. FDA K-number to be verified during data entry. |
| **PET/CT Adaptive Reconstruction** | **ADD**                                                                              | DL-based PET reconstruction; relevant for PET-guided RT planning and biological target volume definition. Category: **Reconstruction**, modality PET (+CT secondary).              |
| MR AI Protocol Assistant           | **EXCLUDE**                                                                          | Protocol-selection helper; not a core clinical RT function. Borderline AI workflow tool with no direct treatment impact.                                                           |
| Ingenia Ambition X                 | **EXCLUDE**                                                                          | MR scanner hardware/platform (BlueSeal magnet), not a standalone AI product. SmartSpeed (already catalogued) covers the AI software running on this platform.                      |
| SmartSpeed Precise                 | **Already in catalog** (`philips-smartspeed-precise` in `reconstruction/philips.ts`) | User noted it's missing from Philips's marketing page — this is a vendor-page omission, not a catalog gap. No action.                                                              |


## Implementation

### 1. `src/data/products/performance-monitor/philips.ts` (new file)

Add `PrecisePosition` product:

- `id: "philips-precise-position"`, category `Performance Monitor`, modality `CT`
- Fields populated from publicly verifiable sources only: Philips product page, FDA 510(k) database (search "Precise Position" / Philips CT), and any peer-reviewed literature found via web search. Mark `disclosureLevel: "minimal"` if training data isn't disclosed.
- Conservative defaults if no clinical evidence found: `evidenceRigor: "E0"`, `clinicalImpact: "I0"`, `adoptionReadiness` derived from regulatory status.
- Wire into `src/data/products/performance-monitor/index.ts`.

### 2. `src/data/products/reconstruction/philips.ts` (extend existing file)

Add `PETCTAdaptiveReconstruction` export:

- `id: "philips-petct-adaptive-reconstruction"`, category `Reconstruction`, modality `PET` (+CT secondary)
- Same evidence-rigor discipline — only publicly verifiable claims, FDA clearance number verified, no hallucinated dataset sizes.
- Add to `PHILIPS_RECONSTRUCTION_PRODUCTS` array (or equivalent export pattern already used in that file).

### 3. `src/data/companies/medical-imaging.ts`

Append the two new IDs (`philips-precise-position`, `philips-petct-adaptive-reconstruction`) to Philips's `productIds` array. Add `Performance Monitor` to `secondaryTasks` if not already present.

### 4. `public/sitemap.xml`

Add two `<url>` entries for the new product pages.

5. Update among the task / category adding the "positioning" category.

### 6. Evidence-gathering step (pre-write, build mode)

Before populating each new product, run targeted web searches (FDA 510(k) database, PubMed/Google Scholar, Philips product pages) to confirm:

- Exact product name and current vendor description
- FDA clearance number + decision date (CE status via Philips materials)
- Any peer-reviewed independent evaluation (likely none for Precise Position; possibly some for PET/CT DL reconstruction)
- Disclosed training data details (likely "minimal" for both)

If a field cannot be verified from a public source, leave it empty or mark `disclosureLevel: "minimal"` with a note in `evidenceRigorNotes` — no fabricated specifics, per project's source-disclosure rule.

## Out of scope

- No changes to existing Precise Image, SmartSpeed, SmartSpeed Precise, MRCAT entries.
- MR AI Protocol Assistant and Ingenia Ambition X excluded; no archived stubs created.

## Open question for you

For **Precise Position**, a new category like **Positioning** (which doesn't exist today). Introduce a, for now, one-product category