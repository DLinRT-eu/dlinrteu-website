## Goal
Bring `src/data/products/auto-contouring/synaptiq.ts` (Mediq RT) into compliance with `docs/FIELD_REFERENCE.md`. The general `description` currently carries detailed Mediq Viewer / Agent / Server hardware specs, which the field reference does not permit there.

## Field-reference findings
- `description` — narrative product summary only; not the place for hardware tables.
- `technology.deployment` — **enum only**: `on_prem`, `cloud`, `hybrid`. Current values (`"Cloud-based (SaaS)"`, `"Desktop (Windows 10+/MacOS 10+)"`, `"Mobile/tablet (iPad Pro 2021+)"`, etc.) are non-compliant.
- `technology.integration` — array of integrated systems (TPS/PACS), not hardware.
- `technology.processingTime` — free text, latency only.
- `compatibleSystems` — "TPS/OS/hardware compatibility. Array of systems." → correct home for OS / GPU / RAM / network requirements.
- No dedicated `systemRequirements` field exists; do **not** invent one.

## Changes to `src/data/products/auto-contouring/synaptiq.ts`

1. **`description`** — revert to the concise product narrative (capabilities, modalities, CE status, Active Contouring, adaptive learning). Remove the entire "System requirements (vendor): Mediq Viewer … ≥1 Gbps network link." block.

2. **`technology.deployment`** — replace the 4 free-text strings with the allowed enum values only:
   ```
   deployment: ["cloud", "on_prem"]
   ```
   (SaaS → `cloud`; self-hosted hospital install → `on_prem`. Desktop/tablet are client access methods, not deployment models, and move to `compatibleSystems`.)

3. **Add `compatibleSystems`** as an array of concise hardware/OS compatibility strings, one per component, preserving every vendor spec verbatim in substance:
   - `"Mediq Viewer (client): Windows 10+ / macOS 10+ with latest Chrome, Edge or Safari; ≥4 GB RAM; 2-core CPU ≥2 GHz; ≥20 GB disk; ≥50 Mbps network"`
   - `"Mediq Viewer (tablet): iPad Pro 2021 or equivalent"`
   - `"Mediq Agent: Ubuntu 22.04+ workstation/VM; ≥2 GB RAM; 2-core CPU ≥2 GHz; ≥25 GB disk; continuous uptime"`
   - `"Mediq Server (on-prem only): Ubuntu 22.04; ≥16 GB RAM; 8-core CPU ≥3.8 GHz; ≥512 GB disk; dedicated NVIDIA GPU ≥20 GB VRAM; ≥1 Gbps network"`

4. **`source`** — leave the "vendor-provided System Requirements documentation (2026-06-10)" citation intact; it now justifies `compatibleSystems` instead of the description.

5. **`lastUpdated`** — bump to `2026-06-10` (already set).

## Not changed
- Structures list, evidence, regulatory, limitations, evidenceRigor/clinicalImpact/adoptionReadiness — out of scope.
- No other product files, no schema/type changes, no UI changes.

## Validation
- `rg "deployment" src/types/productDetails*` to confirm the `deployment` field accepts a string array (no TS enum to break).
- Confirm `compatibleSystems` exists on `ProductDetails` before writing; if absent, fall back to placing the four lines in `limitations` prefixed with `"System requirement: …"` (still compliant, since limitations accept free strings). Plan currently assumes the field exists per FIELD_REFERENCE line 236.
