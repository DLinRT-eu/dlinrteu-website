
# Remove Duplicate Product Slides from PPTX Export

## Problem

The `generatePresentation` method calls two methods that both produce per-category product slides:

1. **`addCompanyLogosByTaskSlides`** (line 1210) -- creates logo slides + product table slides per task (the new feature)
2. **`addProductGridSlides`** (line 1222) -- creates per-category product card slides (the old feature)

Both group products by category/task and show similar information, causing duplicate content from approximately slide 30 onward.

## Fix

Remove the `addProductGridSlides` call from `generatePresentation` (line 1222). The task-based logo + table slides already provide comprehensive per-task product information with more detail (CE/FDA status, anatomy, links).

### File: `src/utils/pptxExport.ts`

Remove lines 1221-1222:
```
// Section 3: Products (async for image loading)
await this.addProductGridSlides(data);
```

The resulting slide sequence becomes:
1. Title, Mission/Vision, Overview, Company Logos
2. Task-based: Logo slide + Product table slide(s) per task
3. Analytics charts (category, task, company, location, modality, structure)
4. Platform summary, Contact, Governance
