

# Fix ESTRO 2026 Flyers — Layout, Branding & Content

## Problems Identified

1. **Overlapping text**: "PRODUCT CATEGORIES" heading overlaps with bullet points
2. **Page not filled**: Large empty space at the bottom of both flyers
3. **No logo**: The DLinRT.eu logo (`public/LogoDLinRT.eu.png`) is not included
4. **Website URL not prominent**: `dlinrt.eu` should be clearly visible as a CTA
5. **Too much text**: Descriptions are verbose compared to the HTML reference designs

## Approach

Regenerate both PDFs using the HTML reference layouts as the design target. The HTML versions (visible in the parsed screenshots) are clean, well-spaced, and fill the page properly. Key changes:

### Both flyers
- Add **DLinRT.eu logo** (from `public/LogoDLinRT.eu.png`) in the header area
- Make **dlinrt.eu** prominently visible in the CTA section
- Use proper section spacing to **fill the full A5 page** — no empty bottom half
- Reduce text to short, punchy phrases
- Fix font rendering to avoid overlap
- Contact: `info[at]dlinrt.eu` (no personal emails)
- Footer: "DLinRT.eu Project Team" (no personal names)

### Community flyer specifics
- Tighter category list (use 2-column grid layout, shorter labels)
- Shorten the 3-step descriptions to one line each
- Remove the long italic paragraph — replace with a concise bold callout

### Companies flyer specifics
- Shorten the "WHAT IS DLINRT.EU?" paragraph significantly
- Keep the 2x2 feature grid (Company Rep Role, Verified Badge, Regulatory Detail, Global Reach) but with shorter text
- Keep the 4-step certification process
- Tighter spacing between sections

## Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v2.py` |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

## Technical Details

- reportlab with A5 pagesize (148mm x 210mm)
- Logo loaded from `public/LogoDLinRT.eu.png` via `reportlab.lib.utils.ImageReader`
- Careful Y-coordinate tracking to prevent overlap — each section calculates its height before placing the next
- Brand colors: `#00A6D6` (teal), `#0f172a` (dark slate), light grey backgrounds for stat boxes
- QA: convert to images and inspect every element for overlap/clipping before delivering

