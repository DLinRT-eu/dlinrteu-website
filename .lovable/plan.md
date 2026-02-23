# Complete Missing FDA Reference Data

## Overview

Several products in the database have FDA clearance status noted but are missing structured clearance details (K-numbers, product codes, regulation numbers, decision dates). This update will complete those fields using publicly available FDA 510(k) database records. If a product has been modified, update also the correct date.

## Products to Update

### Group 1: Products with K-numbers available but not in the correct field


| Product                          | File                                     | Issue                                            | Fix                                                                                                              |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Wisdom Tech DeepContour          | `auto-contouring/wisdom-tech.ts`         | K232928 buried in notes, status not standardized | Move K232928 to `clearanceNumber`, add `productCode`, `regulationNumber`, normalize `status` to "510(k) Cleared" |
| Philips SmartDose CT Enhancement | `image-enhancement/philips-smartdose.ts` | K203020 in evidence array but not in fda object  | Add `clearanceNumber: "K203020"`, `regulationNumber`, `productCode` to fda object                                |


### Group 2: Products with clearance numbers that need to be researched

These will require looking up the correct FDA K-numbers. The plan is to add them based on publicly available FDA 510(k) database records:


| Product                                  | File                            | Current State                                      | Action                                                                                     |
| ---------------------------------------- | ------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Philips MRCAT Prostate + Auto-Contouring | `auto-contouring/philips.ts`    | FDA cleared since 2015, no K-number                | Research and add K-number from FDA database. Likely part of Ingenia MR-RT system clearance |
| Siemens Dual Energy Optimizer AI         | `image-enhancement/siemens.ts`  | "Part of syngo.via platform clearances"            | Research the specific K-number for syngo.via with dual-energy AI features                  |
| Elekta IRIS Evo                          | `reconstruction/elekta.ts`      | Cleared Jan 2026, no K-number                      | Research and add K-number from recent FDA clearance                                        |
| Varian Mobius3D                          | `performance-monitor/varian.ts` | 510(k) Cleared, bare-minimum fields                | Research K-number from FDA database                                                        |
| Coreline Aview RT ACS                    | `auto-contouring/coreline.ts`   | "Clearance number pending verification"            | Research K-number                                                                          |
| Oncosoft OncoStudio                      | `auto-contouring/oncosoft.ts`   | "Clearance number pending verification" (Feb 2025) | Research K-number                                                                          |


### Group 3: Discontinued/special cases (lower priority)


| Product           | File                        | Notes                                                                                                          |
| ----------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Mirada DLC Expert | `auto-contouring/mirada.ts` | Product discontinued -- historical K-number if findable, otherwise mark as "Historical - K-number unavailable" |


## Fields to Complete (per product)

For each product, the `regulatory.fda` object will be completed with:

- `clearanceNumber` -- e.g., "K232928"
- `productCode` -- e.g., "QKB", "LLZ", "JAK"
- `regulationNumber` -- e.g., "21 CFR 892.2050"
- `type` -- "510(k)" or "De Novo"
- `decisionDate` -- YYYY-MM-DD format
- Normalize `status` to consistent format ("510(k) Cleared")

## Implementation Approach

1. For Group 1 (2 products): straightforward field restructuring from existing data
2. For Group 2 (6 products): I will use the FDA AccessData 510(k) database to look up the correct clearance numbers and populate all fields
3. For Group 3 (1 product): best-effort historical lookup

## Files to Modify

- `src/data/products/auto-contouring/wisdom-tech.ts`
- `src/data/products/auto-contouring/philips.ts`
- `src/data/products/auto-contouring/coreline.ts`
- `src/data/products/auto-contouring/oncosoft.ts`
- `src/data/products/auto-contouring/mirada.ts`
- `src/data/products/image-enhancement/siemens.ts`
- `src/data/products/image-enhancement/philips-smartdose.ts`
- `src/data/products/reconstruction/elekta.ts`
- `src/data/products/performance-monitor/varian.ts`

Total: 9 product files