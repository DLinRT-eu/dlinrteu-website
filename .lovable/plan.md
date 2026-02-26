

# Archive AATMA, QOCA, and RT-Mind-AI Products and Companies

## Why

These three products were added as minimal entries based solely on FDA clearance data, but lack sufficient public information for a quality database entry. Archiving preserves them for future restoration when more data becomes available. Note: AATMA is from Elekta (correcting the original entry).

## Changes

### 1. Move product files to archive

Move the following files from `src/data/products/auto-contouring/` to `src/data/products/archived/`:
- `aatma.ts` (update company name to "Elekta" before archiving)
- `qoca.ts`
- `medmind.ts`

### 2. Remove from auto-contouring index

**File:** `src/data/products/auto-contouring/index.ts`
- Remove imports for `QOCA_PRODUCTS`, `MEDMIND_PRODUCTS`, `AATMA_PRODUCTS`
- Remove their spread entries from the `AUTO_CONTOURING_PRODUCTS` array

### 3. Update archived products index

**File:** `src/data/products/archived/index.ts`
- Add imports for the three moved product files
- Add them to the `ARCHIVED_PRODUCTS` array

### 4. Update archived products README

**File:** `src/data/products/archived/README.md`
- Add three new rows to the table:
  - AATMA | Elekta | Insufficient public documentation
  - QOCA Smart RT | Quanta Computer | Insufficient public documentation
  - RT-Mind-AI | MedMind Technology | Insufficient public documentation

### 5. Remove company entries

**File:** `src/data/companies/specialized-solutions.ts`
- Remove the `medmind-technology` and `aatma` company objects

**File:** `src/data/companies/medical-imaging.ts`
- Remove the `quanta-computer` company object

### 6. Create archived company files

Create three new files in `src/data/companies/archived/`:
- `quanta-computer.ts` -- archived Quanta Computer entry
- `medmind-technology.ts` -- archived MedMind Technology entry
- `aatma.ts` -- archived AATMA/Elekta entry

### 7. Update archived companies index and README

**File:** `src/data/companies/archived/index.ts`
- Import and add the three new archived companies

**File:** `src/data/companies/archived/README.md`
- Add three rows:
  - Quanta Computer | Insufficient public documentation for QOCA product
  - MedMind Technology | Insufficient public documentation for RT-Mind-AI
  - Elekta (AATMA) | Insufficient public documentation

### 8. Remove GE MR Contour DL product ID reference

**File:** `src/data/companies/medical-imaging.ts`
- The `ge-mr-contour-dl` product ID was added to GE Healthcare's `productIds` -- this stays as it's a legitimate product. No change needed here.

## Files Summary

| File | Action |
|------|--------|
| `src/data/products/auto-contouring/aatma.ts` | Delete (recreate in archived) |
| `src/data/products/auto-contouring/qoca.ts` | Delete (recreate in archived) |
| `src/data/products/auto-contouring/medmind.ts` | Delete (recreate in archived) |
| `src/data/products/archived/aatma.ts` | Create (with company corrected to Elekta) |
| `src/data/products/archived/qoca.ts` | Create |
| `src/data/products/archived/medmind.ts` | Create |
| `src/data/products/auto-contouring/index.ts` | Edit -- remove 3 imports and spreads |
| `src/data/products/archived/index.ts` | Edit -- add 3 imports and spreads |
| `src/data/products/archived/README.md` | Edit -- add 3 rows |
| `src/data/companies/specialized-solutions.ts` | Edit -- remove medmind-technology and aatma entries |
| `src/data/companies/medical-imaging.ts` | Edit -- remove quanta-computer entry |
| `src/data/companies/archived/quanta-computer.ts` | Create |
| `src/data/companies/archived/medmind-technology.ts` | Create |
| `src/data/companies/archived/aatma.ts` | Create |
| `src/data/companies/archived/index.ts` | Edit -- add 3 imports |
| `src/data/companies/archived/README.md` | Edit -- add 3 rows |

