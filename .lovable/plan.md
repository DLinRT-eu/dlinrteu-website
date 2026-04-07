

# Redesign ESTRO 2026 Flyers — Larger Fonts, Better Fill, Visual Appeal

## Problems

1. **Font sizes too small** — body text ~8-9pt, headings ~10pt on an A5 page feel tiny
2. **CTA box wastes ~30% of page** — massive dark rounded rectangle with just "dlinrt.eu" and email
3. **Sparse middle sections** — bullet points and category grid don't fill the space; large gaps between elements
4. **Overall feel is flat** — no visual hierarchy, no icons or decorative elements beyond small dots

## Design Changes

### Layout overhaul (both flyers)

**Header** (top ~22%): Keep gradient `#5090D0` → `#3A70B0` with logo + "DLinRT.eu" title. Increase title to **28pt**, subtitle to **13pt**. Add "ESTRO 2026" badge.

**Stats bar** (below header, ~12%): Three stat boxes with numbers at **32pt bold** (was ~24pt) and labels at **11pt**. Use `#EBF1F8` background with rounded corners.

**Main content** (~50%): 
- Section headings at **14pt bold** (was ~10pt) with `#5090D0` accent bar
- Feature titles at **12pt bold** (was ~9pt), descriptions at **10pt** (was ~8pt)
- Increase vertical spacing between items for readability
- Categories in a compact 2-column grid at **10pt**

**CTA footer** (bottom ~16%, was ~30%): Shrink dramatically. Use a slim `#5090D0` band with:
- "dlinrt.eu" at **22pt bold white**
- "info@dlinrt.eu" at **10pt** below
- "DLinRT.eu Project Team" small footer line

### Color palette (unchanged from approved)
- Primary: `#5090D0`, gradient to `#3A70B0`
- Stat backgrounds: `#EBF1F8`
- Dark text: `#1a1a2e`
- CTA background: `#5090D0`

### Typography
- Use Liberation Sans TTF (already proven to fix kerning)
- All text via reportlab `Paragraph` objects for proper rendering
- Minimum body text: **10pt**, minimum heading: **12pt**

## Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v9.py` |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

## QA
Convert both PDFs to images, verify font sizes are readable, page is well-filled with no large empty gaps, and no text overlap.

