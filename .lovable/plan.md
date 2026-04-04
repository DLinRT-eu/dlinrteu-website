

# Add ESTRO 2026 Flyers to Presentation Page

## Overview

Generate two A5 PDF flyers (community + companies) and add a download section to the Presentation page. Contact info updated to `info@dlinrt.eu`. Stats aligned with live platform data.

## Changes

### 1. Generate PDF flyers via script

Create a Python script that generates two A5 PDF flyers using reportlab, matching the layout and branding from the uploaded HTML files:

- **Community flyer** (`public/flyers/DLinRT_Community_ESTRO2026.pdf`): For clinicians and medical physicists — search/filter, compare tools, share experience. Stats from DataService (products, companies, certifications, free access).
- **Companies flyer** (`public/flyers/DLinRT_Companies_ESTRO2026.pdf`): For industry — company rep role, verified badge, regulatory detail, global reach. 4-step certification process.

Key content changes from uploaded HTML:
- Footer/CTA contact: `info@dlinrt.eu` (not personal email)
- Remove personal name from footer — use "DLinRT.eu Project Team"
- Stats: use approximate current values from platform (70+ products, 35+ companies) since PDFs are static
- Categories list aligned with actual site categories: Auto-Contouring, Treatment Planning, Image Synthesis, Image Enhancement, Registration, Clinical Prediction, Tracking, Reconstruction, Performance Monitor, Platform

Brand: `#00A6D6` (brand blue), `#0f172a` (slate), Inter font, same visual structure as the HTML.

### 2. Add flyers section to Presentation.tsx

Insert a new section between the two main action cards and the slide previews:

```
ESTRO 2026 Flyers
├── Community Flyer card (preview icon, description, Download PDF button)
└── Companies Flyer card (preview icon, description, Download PDF button)
```

Each card has:
- FileText icon with title and subtitle
- Brief description of the flyer audience
- Download button linking to `public/flyers/DLinRT_*.pdf`

### Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers.py` (build script) |
| Create | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Create | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |
| Edit | `src/pages/Presentation.tsx` — add flyers section |

### Technical Details

- PDFs generated with reportlab (A5 portrait, 148x210mm)
- Static files in `public/flyers/` — no runtime generation needed
- Download via `<a href="/flyers/..." download>` wrapped in Button
- QA: convert PDF pages to images and inspect before delivering

