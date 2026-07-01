## Scope fit

Both proposed products fit the platform:

- **ClariCT-PET** — PET/CT image enhancement, radiotracer dose reduction, scan-time reduction. PET/CT is routinely used for RT target delineation, and the existing ClariCT.AI (diagnostic CT denoising) is already catalogued, so this is consistent with current inclusion practice.
- **ClariACE** — CT contrast-media enhancement / contrast-dose reduction. Same inclusion logic as ClariCT.AI: AI-based image enhancement on CT used upstream of RT planning.

Both are AI/DL products (neural-network denoising / enhancement), so they clear the AI-DL technology threshold. Inclusion is contingent on at least one recognised regulatory approval (CE, FDA, MDR-exempt, NMPA, TGA, TFDA, PMDA, MFDS, Health Canada, ANVISA, MHRA, or UKCA) per the catalog inclusion gate. I'll confirm this from public sources before adding each product; any product without confirmed approval will be held back and flagged to David rather than added speculatively.

## Files to change

1. `src/data/products/image-enhancement/claripi.ts`
   - Append two new `ProductDetails` entries: `claripi-clarict-pet` and `claripi-clariace`.
   - Use the same structure as `claripi-clarict-ai` (regulatory, technicalSpecifications, technology, evidence, evidence rigor/impact, adoption readiness, source disclosure).
   - Only fill fields that have a disclosed public source (ClariPi product pages, FDA 510(k) DB, CE/MDR listings, peer-reviewed papers). Unknown fields left empty rather than invented. Evidence rigor/impact set conservatively (likely E1/I1 or E0/I0 pending literature search) with notes explaining why.

2. `src/data/products/image-enhancement/index.ts`
   - Already imports `CLARIPI_PRODUCTS` as a spread array, so new entries surface automatically. Verify no per-id export is required.

3. `src/data/companies/specialized-solutions.ts`
   - Extend `productIds` on the `claripi` company from `["claripi-clarict-ai"]` to include the two new IDs.

4. Company certification program
   - The `claripi` company is already enrolled and David (ClariPi) is the verified representative for ClariCT.AI. Once the new products exist in the catalog, they automatically appear in his Company Dashboard under ClariPi and become eligible for the standard certification workflow (verify → sign-off → "Verified by Company" badge). No schema change needed — the workflow keys off `company` + user role.

## Research to do before writing entries

For each of ClariCT-PET and ClariACE, gather from public sources:

- Regulatory status (FDA 510(k) number, CE class/MDR, MFDS, etc.) — required for inclusion.
- Intended-use statement, modality, anatomical scope, deployment/integration.
- Any peer-reviewed evidence (PubMed) to set `evidenceRigor` / `clinicalImpact` and populate the `evidence[]` array with real citations only — no fabricated papers (per project no-hallucination rule).
- `trainingData` / `evaluationData` only if a source discloses them; otherwise omit and note `disclosureLevel`.

## Reply to David

After the entries are live, send a short reply pointing him to:
- The two new product pages.
- The standard company certification flow in his existing dashboard (no separate enrollment needed).
- The Field Reference and Review Guide so he can propose additions / corrections directly via the visual editor.

## Out of scope

- No changes to schema, routing, or UI.
- No changes to ClariCT.AI's existing entry.
- Any ClariPi product without a confirmed recognised regulatory approval will not be added; I'll flag it back to David instead.
