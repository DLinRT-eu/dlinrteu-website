## Overlap with SubtlePET — verified

| Aspect | SubtlePET (K182336/K211964, 2018) | SubtleHD(PET) (2026-05-27) |
|---|---|---|
| Function | PET enhancement / acceleration | PET enhancement / acceleration |
| Speedup | 4× faster, 75% dose reduction | Up to 75% faster |
| Tracers | Fixed list (FDG, amyloid, 18F-DOPA, DCFPyL, Ga-68 Dotatate, Ga-68 PSMA) | All FDA-approved radiotracers incl. theranostics |
| Architecture | Original DL model | New SOTA AI model |
| Extras | — | Adjustable denoising, CT-anatomy-guided reconstruction, improved SUVmax quantitation, PET/CT + PET/MR |

**Conclusion:** Functional overlap is large, but SubtleHD(PET) is the explicit next-generation successor. Per the project's versioning schema, both stay listed and are linked via `priorVersions` / `supersededBy` (SubtlePET still deployed on existing scanners worldwide).

## Edits

1. **`src/data/products/image-enhancement/subtle-medical.ts`** — add new product `subtle-hd-pet`:
   - Category: Image Enhancement, modality PET, anatomy Whole body
   - Disease targets: Cancer, Theranostics, Neurological, Cardiovascular
   - Key features: up to 75% faster PET; all FDA-approved radiotracers (incl. theranostic agents); adjustable denoising level; CT-anatomy-guided reconstruction; improved SUVmax quantitation; PET/CT + PET/MR compatibility
   - Regulatory: FDA `510k_cleared`, decisionDate `2026-05-27`, clearanceNumber `"Pending FDA database publication"`; CE `under_review`
   - `priorVersions: [{ id: "subtle-pet", name: "SubtlePET" }]`
   - `evidenceRigor: "E0"`, `clinicalImpact: "I0"`, `adoptionReadiness: "R2"` (just cleared, no independent literature)
   - `source`: PRNewswire 2026-05-27, Diagnostic Imaging 2026-05-27

2. **Same file — update `subtle-pet`**:
   - Add `supersededBy: { id: "subtle-hd-pet", name: "SubtleHD(PET)" }`
   - Bump `lastUpdated` and `lastRevised` to `2026-05-27`
   - Append note to `source` indicating successor

3. **No index changes** — `SUBTLE_MEDICAL_PRODUCTS` array auto-propagates to `IMAGE_ENHANCEMENT_PRODUCTS` → `ALL_PRODUCTS`.

4. **Verify** the new entry appears in Image Enhancement category and PET modality filter via a grep on `ALL_PRODUCTS`.

## Open item

FDA 510(k) K-number not yet in the public database (clearance announced today). Will be filled in once FDA publishes the entry.
