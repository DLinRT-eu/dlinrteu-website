## Goal
Audit the `supportedStructures` list of every auto-contouring product against what the vendor publicly advertises on their website (and, where useful, FDA 510(k) summaries / CE documentation). Report mismatches per company — missing structures, extra/unsupported structures, naming drift from DICOM-RT / TG-263 nomenclature, and region-grouping inconsistencies.

No product `.ts` files will be edited in this pass — the deliverable is a report, per the Minimal Intervention policy and the product-audit-swarm skill (separate, user-confirmed edit pass afterwards).

## Scope
All active products under `src/data/products/auto-contouring/` (~30 vendors), excluding archived. Each product's `supportedStructures` array (and `*-structures.ts` sidecar where applicable: GE, Limbus, MVision, RaySearch) is compared to the vendor's public source of truth.

## Method (per vendor)
1. Load the in-repo structure list + `productUrl` / `website` / `source` fields.
2. Fetch the vendor's structure list from: product page, datasheet/PDF, FDA 510(k) summary (when linked), CE technical brief.
   - Tool: `code--fetch_website` for HTML pages; `websearch--web_search` for datasheets/510(k) PDFs when the product page lacks a list.
3. Normalize both lists (case, separators, L/R suffix, region prefix) and diff:
   - **Missing in repo**: structure advertised by vendor but absent here.
   - **Extra in repo**: structure listed here but not found on vendor source (possible stale data or unverifiable).
   - **Naming drift**: present in both but not in `Region: Structure Name` / TG-263 form.
   - **Region mismatch**: vendor groups differently (e.g. Thorax vs H&N).
4. Skip vendors where the website does not publish a structure list (mark "unverifiable — vendor does not publish list"). Several already carry `structuresUnavailable: true` (e.g. United Imaging) — those are confirmed unverifiable, no diff needed.

## Deliverables
Written to `/mnt/documents/`:
- `structure-list-audit-2026-05-22.md` — one section per vendor with: Source URL consulted, counts (repo vs vendor), Missing list, Extra list, Naming/region notes, Confidence (high/medium/low based on source quality).
- `structure-list-audit-2026-05-22.csv` — one row per finding (`product_id, finding_type, structure, vendor_source_url, severity`).
- Summary table at top: vendors with discrepancies vs vendors fully aligned vs unverifiable.

Surfaced via `<presentation-artifact>` tags. No code changes.

## Caveats
- Vendors frequently publish structure lists only in sales PDFs or under NDA. Where no public list exists, the entry is marked unverifiable rather than flagged as wrong.
- Naming differences are reported as `info`-level only when the clinical meaning is identical (e.g. `Parotid_L` vs `Left Parotid`); flagged as `warn` when they break the project's `Region: Structure Name` convention.
- FDA 510(k) summaries are treated as authoritative when more recent than the vendor page.
- This audit will take multiple fetch/search rounds; expect ~3–5 minutes of tool calls.

Confirm and I'll run it. If you want a narrower scope (e.g. only CE-cleared vendors, or only the top 10 most-used), say so before approval.
