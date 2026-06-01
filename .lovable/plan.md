## Goal

Add `releaseDate` to 16 active product entries that currently lack it. Preserve all other fields (Minimal Intervention).

## Source priority (per your choice)

1. Vendor press release / brochure announcing version launch (most precise).
2. FDA 510(k) `decisionDate` already in the file → use as `releaseDate` proxy.
3. Peer-reviewed paper or trade-press article naming a launch date.
4. If none found → leave unset and report in the closing summary.

## Worklist

| # | Product | Plan |
|---|---|---|
| 1 | Brainlab — Elements AI Tumor Segmentation | Use FDA K250440 `2025-06-17` |
| 2 | Brainlab — Elements RT Segmentation (APM) | Use FDA K243633 `2025-06-13` |
| 3 | GE — MR Contour DL | Use FDA K242925 `2025-04-01` |
| 4 | MedCom — ProSoma Dart | Web search; if nothing → leave |
| 5 | MedMind — RT-Mind-AI | Use FDA K213155 `2022-03-25` |
| 6 | Philips — MRCAT Prostate + Auto-Contouring | Web search vendor; fallback `2015-01-01` from onMarketSince+decisionDate |
| 7 | Quanta — QOCA image Smart RT | Use FDA K231855 `2024-02-13` |
| 8 | Varian — Ethos AI Segmentation | Use FDA K232923 `2024-04-30` |
| 9 | ClariPi — ClariCT.AI | Use FDA K183460 `2019-03-29` |
| 10 | SyntheticMR — SyMRI Spine | Web search (FDA 510(k) lookup); if nothing → leave |
| 11 | Radformation — ClearCheck | Web search vendor blog/press; fallback leave |
| 12 | Sun Nuclear — SunCHECK Patient | Web search vendor; fallback leave |
| 13 | Varian — Mobius3D | Web search vendor; fallback leave |
| 14 | Accuray — Synchrony | Use FDA K182687 `2018-11-23` |
| 15 | MVision — Dose+ | Use FDA K250064 `2025-09-04` |
| 16 | Wisdom Tech — DeepPlan | Web search; fallback leave |

For products 4, 6, 10–13, 16 I'll run targeted `websearch--web_search` queries before deciding.

## Edits per product

- Add `releaseDate: "YYYY-MM-DD"` near existing `version`/`lastUpdated`.
- Bump `lastUpdated` and `lastRevised` to `2026-06-01`.
- Append a short note to `source` explaining the basis (e.g. "releaseDate set from FDA K… decision date, 2026-06-01").
- No changes to evidence, regulatory, structures, or any other field.

## Verification

- `bunx tsc --noEmit -p tsconfig.app.json` after edits.
- Closing message lists every product updated and any that couldn't be verified.
