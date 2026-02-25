# Add Per-Task Product Detail Table Slides to PPTX Export

## Overview

After each task-based logo slide (e.g., "Auto-Contouring Companies"), add a product details table slide showing the key products for that task with relevant columns and clickable links.  
  
The slides are at the end duplicated, there are multiple slides with the same content. Remove them.

## Changes

### 1. `src/services/DataService.ts` -- Add product details to per-task data

Extend the `companyLogosByTask` data structure to also include products for each task. For each task group, collect all products matching that task (via `category` or `secondaryCategories`) and include key details:

- Product name
- Company name
- Modality
- CE status
- FDA status
- Product URL (for hyperlink in PPTX)
- Anatomical location

The updated structure becomes:

```text
companyLogosByTask: Array<{
  task: string;
  companies: Array<{ name: string; logo: string }>;
  products: Array<{
    name: string;
    company: string;
    modality: string;
    ceStatus: string;
    fdaStatus: string;
    productUrl: string;
    anatomy: string;
  }>;
}>
```

### 2. `src/utils/pptxExport.ts` -- Update interface and add table slide method

**Update `PresentationData` interface**: Add `products` array to the `companyLogosByTask` type.

**New method `addTaskProductTableSlide**`: For each task group, after the logo slide, add one or more table slides:

- Title: "{Task} -- Products Overview"
- Table columns (task-appropriate):
  - Product Name
  - Company
  - Modality
  - CE Status
  - FDA Status
  - Anatomy
  - Link (hyperlinked product URL)
- Use pptxgenjs `addTable()` with styled header row matching brand colors
- Paginate: if more than ~12 products, split across multiple slides
- Product name cells with `productUrl` get a hyperlink (`hyperlink: { url }`)

**Update `addCompanyLogosByTaskSlides**`: After each logo slide, call `addTaskProductTableSlide` for the same task group.

### 3. File summary


| File                          | Change                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| `src/services/DataService.ts` | Add products array to each task group in `companyLogosByTask`                          |
| `src/utils/pptxExport.ts`     | Update interface; add `addTaskProductTableSlide` method; call it after each logo slide |
