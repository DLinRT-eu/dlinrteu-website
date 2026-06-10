## Objective
Consolidate the FDA 510(k) artefacts that are cluttering the repository root into the existing `public/fda_pdfs/` folder, so the codebase is browsable again without changing any served URL.

## Current state
- **Repo root (clutter, 16 files):** `K161625.pdf`, `K161625_summary.pdf`, `K191468.pdf`, `K191468_summary.pdf`, `K193282.pdf`, `K200714.pdf`, `K200714.txt`, `K200714_head.txt`, `K203020.pdf`, `K203020_summary.pdf`, `K212274.pdf`, `K212274.txt`, `K212274_head.txt`, `K213717.pdf`, `K213717_summary.pdf`, `K220264.pdf`, `K220264.txt`, `K220264_head.txt`, `K230082.pdf`, `K230082.txt`, `K230082_head.txt`, `K251306.pdf`, `K251306.txt`, `K251306_head.txt`, `K253091.pdf`.
- **Canonical location (already exists):** `public/fda_pdfs/` holds 12 PDFs and is served at `/fda_pdfs/<file>` by Vite.
- **Code references:** a project-wide search for `K[0-9]{6}` and `fda_pdfs` across `src/`, `supabase/`, `scripts/`, `docs/`, and Markdown returns **zero hits**. The root-level files are completely orphaned, and the served PDFs in `public/fda_pdfs/` are not linked from the React app either.

## Plan

### 1. Move every root-level K-file into `public/fda_pdfs/`
Single `mv` per file (using shell `mv`, since these are binary assets, not code). Targets:
- All 8 main `Kxxxxxx.pdf` files at root → `public/fda_pdfs/`
- All 6 `Kxxxxxx.txt` raw extracts → `public/fda_pdfs/`
- All 5 `Kxxxxxx_summary.pdf` companions → `public/fda_pdfs/`
- All 6 `Kxxxxxx_head.txt` companions → `public/fda_pdfs/`

For the two filenames that already exist in `public/fda_pdfs/` (`K193282.pdf`, `K253091.pdf`), the root copies are 418-byte placeholders while the public copies are the real assets — the root placeholders will be **deleted** (`rm`) rather than overwriting the good files.

### 2. Verify no URL break
Re-run `rg "K[0-9]{6}|fda_pdfs"` across the codebase after the move. Expected: still zero hits → nothing to rewrite, nothing breaks. Files newly placed under `public/fda_pdfs/` become available at `/fda_pdfs/<file>` (a superset of what was reachable before, since the root files weren't served at all by Vite).

### 3. Leave `public/fda_pdfs/` as-is
No renaming of the folder, no introduction of a new `public/fda/510k/` subtree — that would invalidate the 12 existing canonical URLs and contradict the no-broken-link requirement.

## Out of scope
- Migrating any of these PDFs to the Lovable CDN (`lovable-assets`). They are public reference documents that may be linked from external sources by URL; switching to CDN URLs would constitute a URL break.
- Wiring the PDFs into the UI (none of them are surfaced today; adding links is a separate feature request).
- Touching `K200714_head.txt`-style helper files' content.

## Technical details
- Files touched: 25 root-level binaries moved / 2 deleted. No source code modified.
- Post-move state: repo root no longer contains any `K*.pdf` or `K*.txt`; `public/fda_pdfs/` grows from 12 → ~33 files, all reachable at stable `/fda_pdfs/<name>` URLs.
