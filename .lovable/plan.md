

# Redesign ESTRO 2026 Flyers — Match Logo Color #5090D0 & Website Content

## Problems

1. **Color mismatch**: Current PDFs don't use #5090D0 consistently; the logo background is a gradient around that blue
2. **Inaccurate content**: HTML references list categories like "Dose prediction", "Quality assurance", "Adaptive radiotherapy", "Patient selection" — these don't exist on the website. Actual categories: Auto-Contouring, Treatment Planning, Image Synthesis, Image Enhancement, Registration, Reconstruction, Tracking, Clinical Prediction, Performance Monitor, Platform
3. **Community flyer mentions "Share experience"** — user previously said this feature isn't fully operational; should mention dashboards and product details instead
4. **Contact email**: HTML references show m.maspero@umcutrecht.nl but user wants info@dlinrt.eu
5. **Page not well-filled**: Previous versions had empty space issues; the HTML references show a clean, well-spaced layout we should replicate more faithfully

## Design Approach

Closely replicate the clean HTML reference layout but with corrected content and #5090D0 as the accent color.

### Color palette
- Accent/brand: **#5090D0** (logo blue) — used for ".eu" text, stat numbers, section heading accents, step numbers, category tags, CTA elements
- Gradient header background: **#5090D0** → **#3A70B0**
- Dark text: **#1a1a2e**
- Stat box / card backgrounds: **#EBF1F8** (light blue tint)
- White text on gradient/dark backgrounds

### Community Flyer content fixes
- Stats: "70+ AI products", "35+ Companies", "CE & FDA", "100% Free & open"
- Categories updated to actual website categories (2 rows): Auto-Contouring, Treatment Planning, Image Synthesis, Image Enhancement, Registration, Reconstruction, Clinical Prediction, Performance Monitor
- "WHAT YOU CAN DO" section — 3 steps:
  1. **Search & Filter** — Browse by category, vendor, CE/FDA status
  2. **Compare Products** — Check training data, evidence level, safety recalls
  3. **Explore Dashboards** — View analytics, product details, and regulatory data
- Remove "Share experience" / community feedback references
- Callout: "Each listing shows CE & FDA status, training data transparency, FSCA recalls and evidence classification"
- Contact: info@dlinrt.eu
- Footer: "DLinRT.eu Project Team"

### Companies Flyer content fixes
- Same header/branding
- "WHAT IS DLinRT.eu?" paragraph with accurate product/company counts
- 4 benefit cards: Company Rep Role, Verified Badge, Regulatory Detail, Global Reach
- "HOW TO GET CERTIFIED — 4 STEPS": Visit → Register → Claim → Verified badge
- Contact: info@dlinrt.eu (not m.maspero@umcutrecht.nl)

### Layout (A5 portrait, matching HTML reference structure)
- **Header** (~15%): Logo + "DLinRT.eu" title (28pt) + "Deep Learning in Radiotherapy" subtitle + "ESTRO 2026" badge
- **Hero section** (~15%): Audience label + headline + description paragraph
- **Stats bar** (~10%): 4 stat boxes in a row with #5090D0 numbers
- **Content sections** (~45%): Categories grid + feature cards with numbered steps
- **CTA footer** (~15%): "Start exploring today" / "Ready to certify?" with dlinrt.eu prominently displayed

### Typography
- Liberation Sans TTF (fixes kerning)
- All text via reportlab Paragraph objects
- Title: 28pt, headline: 22pt, body: 10-11pt, stats: 28pt bold

## Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v10.py` |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

## QA
Convert both PDFs to images, verify: color is #5090D0 throughout, categories match website, no overlap, page is well-filled, contact is info@dlinrt.eu.

