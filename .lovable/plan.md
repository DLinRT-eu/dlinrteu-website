## Problem

In `src/utils/structureClassification.ts`, the regex meant to recognize nodal CTVs (CTVn, CTV_n, CTV_LN) as **Elective** uses `\b` word boundaries that fail when followed by `_`. Since `_` is a word character, no boundary exists between `n` and `_`.

Result: structures like `CTVn_L1_L`, `CTVn_IMN_R`, `CTV_n_L`, `CTV_LN_neck` are currently misclassified as **Targets** (via the generic CTV target pattern) instead of Elective. This affects Synaptiq (`CTVn_L1_L` … `CTVn_Interpec_R`) and any future product using the same convention. Radformation's space-separated `CTVn L1 ESTRO L` happens to match `\bCTVn\b` and is fine, but should be covered by the same broader pattern.

## Fix

Update `classifyStructure()` in `src/utils/structureClassification.ts`:

1. **Target negative lookahead** — replace the current restrictive lookaheads with one that drops any `_`/`-` boundary requirement, so `CTV_n_*` and `CTV_LN_*` are excluded from Targets:

   ```ts
   /\b(CTV(?!n|[_\-\s]n|[_\-\s]LN)|GTV|PTV|Clinical\s+Target|Planning\s+Target|Gross\s+Tumor|Gross\s+Target)\b/i
   ```

   (Lookahead is case-insensitive via the `/i` flag, so `[nN]` collapses to `n`. The key change: no trailing `\b` inside the lookahead — any character may follow.)

2. **Elective nodal-CTV alternative** — broaden to match the prefix followed by anything:

   ```ts
   /\bCTVn\b|\bCTVn[_\-\s]|\bCTV[_\-\s]n(?:[_\-\s]|\b)|\bCTV[_\-\s]LN(?:[_\-\s]|\b)/i
   ```

   This catches `CTVn`, `CTVn_L1_L`, `CTVn IMN R`, `CTV_n`, `CTV_n_L`, `CTV_LN`, `CTV_LN_neck`.

No other files change. The rest of the elective patterns (LN_*, ESTRO_LN, Nodes, level-specific naming) already work and stay intact.

## Verification

After build, spot-check that for Synaptiq's `Breast (ESTRO): CTVn_L1_L` (and the IMN/Interpec variants), the structure-type counts on the product page show them under **Elective** instead of **Targets**. Radformation's `CTVn L1 ESTRO L` should remain Elective.

## Scope

- Single file edit: `src/utils/structureClassification.ts` (regex in `classifyStructure`).
- No data file changes; no UI changes.
