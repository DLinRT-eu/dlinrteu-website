# Revise 5 Image-Enhancement Products (Evidence Verification + Enrichment)

## Scope
Re-review the 5 products below — all currently sit at low evidence (E0/E1, I0/I1) after the 2026-06-15 sweep removed unverified DOIs. Goal: find **verifiable** peer-reviewed publications, update evidence axes if justified, and tighten training/evaluation sections. Strictly no hallucinations — only cite DOIs/URLs confirmed via web search.

| ID | Product | Current E/I |
|---|---|---|
| `philips-smartdose-ct-enhancement` | SmartDose CT Enhancement | E1 / I1 |
| `subtle-mr` | SubtleMR | E1 / I1 |
| `subtle-pet` | SubtlePET | E1 / I1 |
| `united-ucs-ai` | uCS-AI | E0 / I0 |
| `claripi-clarict-ai` | ClariCT.AI | E1 / I1 |

## Workflow per product
1. **Verify existing citations** — re-resolve every DOI/URL already in the record; drop or fix any that don't resolve to a product-specific paper.
2. **Search for new evidence** (PubMed, Google Scholar, vendor pubs page) using product name + AI keywords. Capture: DOI, title, authors, journal, year, study design, sample size, vendor-independence, multi-center, prospective/retrospective.
3. **Update fields** when verified evidence supports it:
   - `evidence[]` — add new entries with confirmed DOI links
   - `evidenceRigorNotes` / `clinicalImpactNotes` — replace verification-pending wording with concrete citations
   - `evidenceRigor` / `clinicalImpact` — bump only if new evidence justifies (e.g. multi-reader prospective → E2; demonstrated workflow/dose impact → I2)
   - `evidenceVendorIndependent`, `evidenceMultiCenter`, `evidenceMultiNational`, `evidenceProspective`, `evidenceExternalValidation` — set true only when paper explicitly meets the criterion
   - `adoptionReadiness` / `adoptionReadinessNotes` — re-derive from new E + regulatory status
   - `trainingData` — enrich `description`, `datasetSize`, `institutions`, `countries`, `demographics`, `datasetSources`, `scannerModels`, `publicDatasets` **only if disclosed in a confirmed source**; keep `disclosureLevel` honest
   - `evaluationData` — enrich `studyDesign`, `primaryEndpoint`, `results`, `description` with verified study details
   - `clinicalEvidence` — concise summary citing confirmed sources only
   - `lastUpdated` / `lastRevised` → `2026-06-17`
4. **No fabrication rule** — if a search returns nothing new and verifiable, leave the record at current E/I and document the negative search in `evidenceRigorNotes` ("PubMed/Scholar re-searched 2026-06-17, no new product-specific publications").

## Known starting points (to verify, not assumed)
- SmartDose CT Enhancement — likely only FDA K203020 V&V; verify whether any Philips Spectral CT paper actually names SmartDose.
- SubtleMR — re-check Bash et al. AJNR 2021 (10.3174/ajnr.A7358) and Bash et al. Clin Neuroradiol 2022 (10.1007/s00062-021-01121-2); add if DOIs resolve and name SubtleMR.
- SubtlePET — search for Weyts, Chaudhari, Xu, or Boellaard PET-DLE papers naming SubtlePET specifically.
- uCS-AI — search United Imaging uRT-linac CBCT publications; likely remains E0 if none confirmed.
- ClariCT.AI — search for Nam, Singh, or Greffier CT denoising papers naming ClariCT.AI; Kim et al. Eur Radiol 2020 was already removed as misattributed.

## Files to edit
- `src/data/products/image-enhancement/philips-smartdose.ts`
- `src/data/products/image-enhancement/subtle-medical.ts` (only `subtle-mr` and `subtle-pet` entries; leave `subtle-hd-pet` and `aimify` untouched)
- `src/data/products/image-enhancement/united-imaging.ts`
- `src/data/products/image-enhancement/claripi.ts`

## Verification
- Every newly added DOI fetched and confirmed to (a) resolve and (b) name the specific product.
- Re-render `/product/<id>` for each of the 5 to confirm UI displays the updated evidence and training/evaluation sections without errors.

## Out of scope
- Other products in these files (e.g. SwiftMR, SubtleHD-PET, AiMIFY, GE Precision DL, AlgoMedica, Siemens).
- Schema/UI changes.
- Regulatory/intended-use rewrites unless a verified source contradicts current text.
