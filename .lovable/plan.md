

# Regenerate ESTRO 2026 Flyers & Assess New GE Product

## Summary

Three changes: (1) regenerate both PDF flyers to match the HTML reference designs exactly, (2) update the community flyer content, and (3) assess MIM LesionID Pro as a potential new product.

## 1. Flyer Fixes

### Color
The HTML references use **#2AA5A5** (teal) for the ".eu" in "DLinRT.eu" and stat numbers, with **#1a1a2e** (dark slate) for body text and "DLinRT" portion. The current PDFs used #00A6D6 which is close but I'll match the exact teal from the HTML. The logo from `public/LogoDLinRT.eu.png` will be embedded.

### Capitalization
All references must use **DLinRT** (capital D, L, R, T) consistently — never "DLINRT" or "Dlinrt".

### Community flyer content changes
- Replace step 3 "Share experience" with **"Explore dashboards"** — describe the analytics dashboards and product detail pages
- Add mention of detailed product pages with regulatory info, evidence, training data
- Remove any reference to user comments or community feedback features
- Contact: `info[at]dlinrt.eu` (no personal email)
- Footer: "DLinRT.eu Project Team" (no personal name)
- Categories: use actual site categories (Auto-Contouring, Treatment Planning, Image Synthesis, Image Enhancement, Registration, Clinical Prediction, Tracking, Reconstruction, Performance Monitor, Platform)

### Companies flyer content changes
- Contact: `info[at]dlinrt.eu` (no personal email)
- Footer: "DLinRT.eu Project Team" (no personal name)
- Keep all other content as-is from the HTML reference

### Layout
Match the HTML reference layouts closely: header with "DLinRT.eu" + "ESTRO 2026", horizontal rule, sections filling the full A5 page, proper spacing, no overlap, no large empty gaps.

## 2. New Product Assessment: MIM LesionID Pro

**MIM LesionID Pro** (FDA 510(k) cleared Jan 2026, by MIM Software / distributed by GE HealthCare) is an AI-powered **theranostics** tool for whole-body tumor burden analysis on PSMA PET/CT and SPECT/CT. It automates lesion segmentation and calculates total tumor volume (TTV) and SUVmean for radiopharmaceutical therapy planning and response monitoring.

**Assessment**: This product is **not a direct fit** for DLinRT.eu's scope. It targets nuclear medicine/theranostics workflows, not radiotherapy planning (contouring, dose, planning, image enhancement). While it uses Contour ProtégéAI+ internally, the product itself is for tumor burden quantification, not RT treatment. **Recommendation: do not add** unless the platform scope explicitly expands to theranostics.

No other new untracked FDA-cleared RT AI products were found in the search. Therapanacea ART-Plan+ (K253091, Dec 2025) and Radformation AutoContour V4 (K242729, Dec 2024) are already up to date in the database.

## Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v4.py` |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

No changes to `Presentation.tsx` — the download links are already correct.

## Technical Details

- reportlab A5 (148×210mm), matching the HTML reference layout
- Logo from `public/LogoDLinRT.eu.png` embedded in header
- Brand teal (#2AA5A5) for accent elements, dark slate for text
- Proper Y-coordinate tracking to prevent overlap
- Full-page fill with balanced spacing
- QA: convert to images and inspect every element before delivering

