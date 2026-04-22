

## Plan: Update ESTRO 2026 flyers with reviewer feedback

Apply all 8 ESTRO reviewer suggestions. Both flyers (`public/flyers/DLinRT_Companies_ESTRO2026.pdf` and `DLinRT_Community_ESTRO2026.pdf`) are static PDFs with no generator in the repo, so we'll add a one-off Node script that produces them, regenerate both PDFs, and tighten the matching copy on the Presentation page card.

### 1. Companies flyer — content changes

| # | Reviewer ask | Change in flyer |
|---|---|---|
| 1 | Make clear the process is **free** | Add a prominent "100% Free" pill near the top, repeat "Free of charge — no fees, ever" under the verification section |
| 2 | Clarify who can **apply for verification** | New line: "Eligible: any official representative of the manufacturer (regulatory, product, marketing, or technical lead). One verified rep per company; additional reps can be added after approval." |
| 3 | "Trusted by clinicians worldwide" is risky | Replace with neutral phrasing: **"Used by clinicians and researchers across Europe and beyond"** |
| 4 | "Register as official rep" wording — avoid implying rep of DLinRT.eu | Reword to: **"Register as an official company representative *for your own products* on the platform — you represent your company, not DLinRT.eu"** |
| 5 | "Verified Badge" text | Reword to: **"Get your products reviewed and verified with a certification badge"** |
| 6 | Add benefit: showcase evidence | New bullet: **"Showcase the evidence base of your product (clinical, technical, safety, regulatory) — required for review anyway"** |
| 7 | Add a **QR code** | Add QR code at bottom-right linking to `https://dlinrt.eu/auth?role=company` (registration entry); add a smaller QR at top linking to `https://dlinrt.eu` |
| 8 | Highlight **independent** | Add a strong tagline under the title: **"Independent. Vendor-neutral. Not pay-to-verify."** + repeat "independent European platform" in the intro paragraph in bold accent color |

### 2. Community flyer — lighter touch

Same QR code treatment (top: site, bottom: `/auth` registration), same "independent / not pay-to-verify" tagline, and tone down "share experience" language to match the platform's actual feature set. No structural rewrite.

### 3. Website card copy (`src/pages/Presentation.tsx`)

Update the two card descriptions to match the new flyer messaging:

- Community: "For clinicians & medical physicists — search, compare, and explore independent information on AI tools in radiotherapy."
- Companies: "For industry & manufacturers — claim your products and apply for **free** independent verification."

### 4. Implementation details

- Add `scripts/generate-estro-flyers.mjs` (Node, uses `pdfkit` + `qrcode` — both lightweight, no project runtime dependency since the script runs once and the output is committed PDFs).
- Run the script in default mode to regenerate both PDFs in `public/flyers/`.
- QR codes generated inline as PNG buffers via `qrcode` and embedded via `pdfkit`.
- Layout: A4 portrait, two-column where useful, DLinRT brand colors (primary `#5090D0`, text `#1a1a2e`), header with DLinRT wordmark + "ESTRO 2026" subtitle.
- Verify visually by converting PDFs to images (`pdftoppm`) and inspecting each page; iterate until layout is clean (no overflow, QR codes scannable, contrast OK).

### 5. Files touched

- `public/flyers/DLinRT_Companies_ESTRO2026.pdf` — regenerated
- `public/flyers/DLinRT_Community_ESTRO2026.pdf` — regenerated
- `scripts/generate-estro-flyers.mjs` — new generator (kept in repo for future updates)
- `src/pages/Presentation.tsx` — card descriptions only

### Out of scope

- Changing the flyer download mechanism, filenames, or routing.
- Translating the flyers.
- Other Presentation page sections (PowerPoint export, Live Demo, etc.).

