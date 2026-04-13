

# Update GE AIR Recon DL with New FDA Clearance K252379

## Findings Summary

After checking all recent FDA QKB (Radiotherapy) clearances and GE Healthcare products:

- **GE AIR Recon DL** has a new 510(k) clearance **K252379** (December 23, 2025) that is not yet tracked in the codebase. Both the Reconstruction and Image Enhancement entries need updating.
- All other radiotherapy products in the database are already current with their latest clearances (TAIMedImg DeepMets K250427, OncoStudio K242994, AI-Rad Companion RT K242745, MR Contour DL K242925, Contour ProtégéAI+ K250035, Manteia K250780, etc.).
- GE's True Definition DL (CT bone/lung), CleaRecon DL (interventional CBCT), and Clarify DL (SPECT/CT) are outside the radiotherapy scope.

## Changes

### 1. `src/data/products/reconstruction/ge-healthcare.ts` — AIR Recon DL

- Add K252379 to the `clearanceNumber` field: `"K193282, K213717, K252379"`
- Update `fda.notes` to include: "K252379 expanded clearance (Dec 2025)"
- Add K252379 evidence entry
- Update `lastUpdated` and `lastRevised` to `"2026-04-13"`

### 2. `src/data/products/image-enhancement/ge-healthcare.ts` — AIR Recon DL Enhancement Mode

- Update `fda.notes` to reference K252379 as part of the broader AIR Recon DL platform clearances
- Add K252379 evidence entry
- Update `lastUpdated` and `lastRevised` to `"2026-04-13"`

No new products to add. No other certification updates needed — the database is current.

