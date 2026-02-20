# Add Task Categories to Companies (Primary & Secondary)

## Overview

Add task-level categories to companies, to select only the companes that have products for specific tasks. Try to re-use the products `category` (primary) and `secondaryCategories`. Currently, companies have a broad `category` field ("Auto-Contouring", "Medical Imaging", etc.) that is not displayed in the UI and doesn't align with the product task taxonomy. This change introduces `primaryTask` and `secondaryTasks` fields derived from the same task list used by products.

## Task Taxonomy (shared with products)

Reconstruction, Image Enhancement, Image Synthesis, Auto-Contouring, Tracking, Treatment Planning, Clinical Prediction, Registration, Performance Monitor, Platform

## Changes

### 1. Type: `src/types/company.d.ts`

Add two new optional fields:

- `primaryTask?: string` -- the company's main task area (e.g., "Auto-Contouring")
- `secondaryTasks?: string[]` -- additional task areas the company operates in

The existing `category` field is kept for backward compatibility (it serves as the broad file-level grouping).

### 2. Data Files: All company data files

Populate `primaryTask` and `secondaryTasks` for each company based on the task categories of their products. For example:

- **MVision AI** (products: auto-contouring) -> `primaryTask: "Auto-Contouring"`
- **Brainlab** (products: auto-contouring + treatment planning) -> `primaryTask: "Auto-Contouring"`, `secondaryTasks: ["Treatment Planning"]`
- **RaySearch** (products: treatment planning + auto-contouring) -> `primaryTask: "Treatment Planning"`, `secondaryTasks: ["Auto-Contouring"]`

Each company's tasks will be derived by looking at their products' `category` and `secondaryCategories` values to ensure accuracy.

Files to update:

- `src/data/companies/auto-contouring.ts`
- `src/data/companies/medical-imaging.ts`
- `src/data/companies/specialized-solutions.ts`
- `src/data/companies/radiotherapy-equipment.ts`

### 3. UI: `src/components/CompanyCard.tsx`

Display the task categories as badges below the company description:

- Primary task shown as a filled badge
- Secondary tasks shown as outline badges

### 4. Filtering: `src/pages/Companies.tsx`

Add a task filter dropdown (matching the product task taxonomy) so users can filter companies by their primary or secondary task category.

## Files to Create / Modify


| File                                           | Action                                        |
| ---------------------------------------------- | --------------------------------------------- |
| `src/types/company.d.ts`                       | Add `primaryTask` and `secondaryTasks` fields |
| `src/data/companies/auto-contouring.ts`        | Populate task fields for all entries          |
| `src/data/companies/medical-imaging.ts`        | Populate task fields for all entries          |
| `src/data/companies/specialized-solutions.ts`  | Populate task fields for all entries          |
| `src/data/companies/radiotherapy-equipment.ts` | Populate task fields for all entries          |
| `src/components/CompanyCard.tsx`               | Show task badges                              |
| `src/pages/Companies.tsx`                      | Add task filter dropdown                      |


## How Primary/Secondary Tasks Are Determined

For each company, I will inspect the `category` of every product linked via `productIds`, plus their `secondaryCategories`. The most frequent task becomes `primaryTask`; the remaining unique tasks become `secondaryTasks`. This ensures the company-level tasks accurately reflect their product portfolio.