# Roles

Each role takes a single `ProductDetails` object and emits a list of findings
`{ role, field, severity, observation, suggestedFix }`. Roles are pure: they
read the product file, the cached docs, and (Evidence only) the web. They
never write back to product files.

## Identity

Fields: `id`, `name`, `company`, `category`, `secondaryCategories`, `logoUrl`,
`productUrl`, `website`, `companyUrl`, `githubUrl`.

Checks:
- `id` is lowercase, hyphen-separated, shaped `company-product`; unique across
  the entire `src/data/products` tree (cross-check role confirms uniqueness).
- `category` ∈ the enum in `docs/FIELD_REFERENCE.md`.
- `secondaryCategories` ≤ 3, each in the same enum, no duplicates with
  `category`.
- `logoUrl` resolves to an existing file under `public/logos/`.
- `productUrl` / `website` use `https://` and resolve (HEAD via
  `code--fetch_website`; tolerate redirects).
- `githubUrl` (when present) points to a real repo path.

## Inclusion

Fields: `description`, `features`, `keyFeatures`, `usesAI`, `category`,
`developmentStage`.

Checks per `mem://policy/product-inclusion-criteria` and
`mem://constraints/ai-dl-technology-threshold`:
- An AI/DL component for radiotherapy is described in the product text.
- Classical image processing only ⇒ `error` (does not belong in catalogue).
- Generic QA without `monitorsAIProducts: true` ⇒ `error` unless
  `usesAI: true` is documented with the AI/DL component.
- `usesAI` default is `true`; QA/monitoring tools must be explicit per
  `mem://ux/ai-vs-non-ai-classification`.

## Regulatory

Fields: `regulatory.ce`, `regulatory.fda`, `regulatory.tga`, `regulatory.tfda`,
`certification`, `intendedUseStatement`.

Checks:
- Status values use the enums in `docs/FIELD_REFERENCE.md`.
- Cleared CE → `class` set (I/IIa/IIb/III). Cleared FDA → clearance type and,
  when public, clearance number.
- `certification` summary on the card matches the structured `regulatory.*`
  state.
- Decision dates plausible (not in the future, not before product
  `releaseDate`).
- For system-component AI (e.g. integrated in a linac), call out that the CE
  marking is system-level rather than standalone.

## Technical

Fields: `technicalSpecifications`, `technology`, `modality`,
`anatomicalLocation`, `diseaseTargeted`.

Checks:
- DICOM nomenclature per `mem://data-quality/dicom-nomenclature-standardization`:
  use `DICOM-RTSTRUCT`, `DICOM-RTPLAN`, `DICOM-RTDOSE` (not "DICOM RT
  Struct" etc.).
- `modality` is an array; single values normalised to array form.
- `technology.integration` entries spelled consistently with other catalogue
  entries (Eclipse, RayStation, Pinnacle, Monaco, MIM, Velocity, ...).
- `technology.processingTime` quotes the vendor figure, not internal tests.

## Structures

Fields: `supportedStructures`, `structuresUnavailable`.

Checks per `mem://data/structure-naming-convention-v3` and
`mem://data-quality/structure-status-marking`:
- Each structure name is in `Region: Structure Name` form (e.g.
  `Thorax: Heart`, `Pelvis: Prostate`).
- `(investigational)` / `(unverified)` suffixes used per convention; UI
  surfaces them as alerts.
- Empty list AND vendor has not published a verified DICOM-conformant list
  ⇒ `structuresUnavailable: true` must be set. Otherwise the empty list is
  an `error`.

## Evidence

Fields: `evidenceRigor`, `clinicalImpact`, `adoptionReadiness`,
`evidenceRigorNotes`, `clinicalImpactNotes`, `adoptionReadinessNotes`,
`evidence[]`, `keyPapers[]`, `clinicalEvidence`.

Checks (see `references/scoring-rubric.md` for the cheatsheet):
- Re-score against `EVIDENCE_RIGOR_LEVELS` and `CLINICAL_IMPACT_LEVELS` in
  `src/data/evidence-impact-levels.ts`.
- Validate study-quality sub-attributes per
  `mem://data-quality/evidence-study-quality-attributes`:
  `vendorIndependent`, `multiCenter`, `multiNational`, `prospective`,
  `externalValidation`.
- Targeted lookup via `websearch--web_search` (PubMed / DOI). Record the
  search date inline.
- `keyPapers` empty while `evidenceRigor ≥ E1` ⇒ `warn`.
- Notes fields are 1–3 sentences citing the strongest paper if any.

## Transparency

Fields: `trainingData`, `evaluationData`, `safetyCorrectiveActions`,
`dosePredictionModels`, `limitations`, `source`.

Checks per `mem://data/transparency-and-safety-schema`:
- For `evidenceRigor ≥ E1`, missing `trainingData` or `evaluationData`
  description ⇒ `warn`.
- `dosePredictionModels` populated when the product is in Treatment Planning
  / Clinical Prediction and predicts dose (per
  `mem://features/dose-prediction-model-tracking`).
- `limitations` lists at least one vendor- or publication-declared caveat.

## Cross-check

Inputs: every product file + `src/data/companies/index.ts` + archived
companies/products + the in-memory registry built during Bootstrap.

Checks:
- `company` matches an active entry in `src/data/companies/*` (not
  `archived/`). Referencing an archived company ⇒ `error`.
- `priorVersions[].id`, `supersededBy.id`, `partOf.name` resolve to known
  entries.
- No duplicate `id` across the entire products tree.

## Compiler

Inputs: the merged finding list from all roles above.

Output: one Markdown block per product following
`references/output-format.md`, plus appended rows to the two CSVs.
