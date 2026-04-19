

## Plan: Audit & retrieve missing logos (company + product)

### Findings

**A. Missing logo FILES (referenced but not in `public/logos/`)**
None of these resolve. All `logoUrl:` references in companies map to existing files. ✅

**B. Companies with NO entry in `src/data/companies/` but with active products**
These ship products on the site but the company never appears in `getActiveCompanies()` and on `/companies`:
1. **Varian (Siemens Healthineers)** — logo exists: `varian.jpg`
2. **ViewRay** — logo exists: `Viewray.png`
3. **RefleXion Medical** — logo exists: `Reflexion.png`
4. **Leo Cancer Care** — logo exists: `LeoCancerCare.jpg`
5. **Quanta Computer Inc.** — no logo, just added by April audit
6. **Inpictura** — no logo (lowercase + leading-space `company: "Inpictura"`, looks like an example/placeholder — needs verification)

**C. Companies with INCONSISTENT names across products** (will silently split company on detail pages)
- "Manteia" vs "Manteia Technologies" — pick one
- "Radformation" vs "RadFormation" — pick one (company entry uses "RadFormation")
- "Quanta Computer Inc." vs "Quanta Computer, Inc." — pick one

**D. Products using placeholder logos**
- `quanta-computer.ts` → `logoUrl: "/logos/placeholder.svg"` (placeholder)
- One product uses `logoUrl: "/placeholder.svg"` (root, not even in /logos/) — needs locating & fixing

**E. Logo files present but UNUSED** (orphans — keep but worth noting)
- `dlinrt-org.png` (likely site branding, OK)
- `logo-blue-therapanacea-new.png` (newer Therapanacea logo not wired up)
- `oncosoft.png` exists twice (case duplicate `Oncosoft.png` / `oncosoft.png` — confirm filesystem)
- `sun-nuclear.png` referenced by a product but the company entry uses `SunNuclear.png` (case mismatch — fragile on case-sensitive hosts)

### Retrieval plan (for your evaluation)

For each truly-missing logo, I'll fetch the official one from the vendor site (favicon/press kit/PNG from header), save to `public/logos/`, and wire it into the company entry. Proposed sources:

| Company | Source | Filename |
|---|---|---|
| Varian | varian.com press kit / `varian.jpg` already exists | reuse `varian.jpg`, add company entry |
| ViewRay | viewray.com (now MRIdian/dissolved — use Wayback) | reuse `Viewray.png` |
| RefleXion Medical | reflexion.com press | reuse `Reflexion.png` |
| Leo Cancer Care | leocancercare.com | reuse `LeoCancerCare.jpg` |
| Quanta Computer | quantacloudtech.com | new `quanta-computer.png` |
| Inpictura | TBD — needs your call: real company or stub to delete? | — |

### Actions I'll take after approval

1. **Add 5 missing company entries** to the appropriate file in `src/data/companies/` (radiotherapy-equipment.ts for Varian/ViewRay/RefleXion/Leo, specialized-solutions.ts for Quanta), each linked to existing `productIds` and existing logo files.
2. **Retrieve 1 new logo** (Quanta Computer) via fetch from quantacloudtech.com and save as `public/logos/quanta-computer.png`; update the product's `logoUrl`.
3. **Fix the placeholder** in `quanta-computer.ts` (`/logos/placeholder.svg` → new logo).
4. **Locate & fix** the `/placeholder.svg` (root path) reference and replace with correct vendor logo.
5. **Normalize company name strings** in product files: choose canonical "Manteia", "Radformation", "Quanta Computer Inc." and rewrite mismatches.
6. **Investigate "Inpictura"** entry — report back with what product it's attached to so you can decide keep/delete.
7. **Report back** a single summary table: company → logo source URL → file saved → wired in (✓/✗) for your sign-off before any commit to `main` style data.

### Files touched (estimate)

- 2 company files (`radiotherapy-equipment.ts`, `specialized-solutions.ts`) — add ~5 entries
- 1 new logo: `public/logos/quanta-computer.png`
- 1 product file: `quanta-computer.ts` (logoUrl)
- 2–4 product files for company-name normalization
- 1 product file containing `/placeholder.svg` (TBD which)
- No DB changes, no migrations

