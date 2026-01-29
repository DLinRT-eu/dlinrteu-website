
# Moving Pipeline Products to a Dedicated Page

## Overview

This plan creates a separate `/products/pipeline` page for pipeline products, removing the collapsible section from the main Products page. This ensures no single company gains disproportionate visibility simply by announcing upcoming products. The link to the pipeline page should be just above the search bar of the prioducts


## Changes Summary

| Component | Change |
|-----------|--------|
| New Page | Create `src/pages/Pipeline.tsx` with full search/filter functionality |
| App Router | Add route `/products/pipeline` |
| Products Page | Replace collapsible section with a simple link to pipeline page |
| DataService | Add method for filtering pipeline products |
| Navigation | Ensure pipeline products are searchable and filterable |

---

## Technical Implementation

### 1. Create Pipeline Products Page

**File:** `src/pages/Pipeline.tsx` (NEW)

A dedicated page following the same structure as the main Products page:

- **SearchHeader** - Same search component with product suggestions
- **FilterBar** - Filters for tasks, modality, anatomy (certifications filter not needed since all are Pipeline)
- **ProductGrid** - Modified to show pipeline products instead of certified ones
- **SEO** - Proper meta tags for the pipeline page
- **Footer** - Consistent with other pages

Key differences from Products page:
- Uses `dataService.getPipelineProducts()` as base data source
- Header clarifies "Products in Pipeline - Not Yet Certified"
- Informational banner explaining pipeline status
- Simplified certification filter (all are Pipeline status)

### 2. Create Pipeline-Specific ProductGrid Component

**File:** `src/components/PipelineProductGrid.tsx` (NEW)

A variant of ProductGrid that:
- Sources data from `dataService.getPipelineProducts()`
- Applies standard filtering logic (task, modality, anatomy)
- Removes comparison mode (comparing unfinished products may not be meaningful)
- Maintains search and sorting functionality

### 3. Update App Router

**File:** `src/App.tsx`

Add new route for pipeline page:

```typescript
const Pipeline = lazy(() => import("./pages/Pipeline"));

// In Routes:
<Route path="products/pipeline" element={<Pipeline />} />
```

### 4. Update Main Products Page

**File:** `src/pages/Products.tsx`

Replace the collapsible pipeline section with a simple link:

```typescript
// Replace the Collapsible section with:
{pipelineProducts.length > 0 && (
  <Link to="/products/pipeline" className="block mb-6">
    <div className="p-4 bg-violet-50 rounded-lg border border-violet-200 hover:border-violet-400 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-violet-600" />
          <span className="text-lg font-semibold text-violet-900">
            Products in Pipeline ({pipelineProducts.length})
          </span>
        </div>
        <ArrowRight className="h-5 w-5 text-violet-600" />
      </div>
      <p className="text-sm text-violet-700 mt-1 ml-7">
        Announced products not yet certified (CE/FDA). Click to view all.
      </p>
    </div>
  </Link>
)}
```

### 5. Update DataService for Pipeline Filtering

**File:** `src/services/DataService.ts`

Add method to filter pipeline products:

```typescript
filterPipelineProducts(filters: Partial<FilterState>): ProductDetails[] {
  return this.getPipelineProducts().filter(product => {
    // Apply task filter
    if (filters.tasks?.length && !filters.tasks.some(task => matchesTask(product, task))) {
      return false;
    }
    // Apply location filter
    if (filters.locations?.length) {
      const normalizedLocations = normalizeAnatomicalLocations(product.anatomicalLocation || []);
      if (!normalizedLocations.some(loc => filters.locations?.includes(loc))) {
        return false;
      }
    }
    // Apply modality filter
    if (filters.modalities?.length) {
      const productModalities = Array.isArray(product.modality) 
        ? product.modality 
        : (product.modality ? [product.modality] : []);
      if (!productModalities.some(m => filters.modalities?.includes(m))) {
        return false;
      }
    }
    return true;
  });
}
```

### 6. Create Pipeline FilterBar Variant

**File:** `src/components/PipelineFilterBar.tsx` (NEW)

A simplified FilterBar that excludes the certification filter (since all products are Pipeline):

- Task filter
- Modality filter  
- Anatomy filter
- No certification filter (all products have same status)

### 7. Update Filter Options Utility

**File:** `src/utils/filterOptions.ts`

Add function to get filter options from pipeline products only:

```typescript
export function getPipelineFilterOptions(field: keyof ProductDetails): string[] {
  const pipelineProducts = dataService.getPipelineProducts();
  // Extract unique values from pipeline products for given field
  // ...
}
```

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/pages/Pipeline.tsx` | **Create** | New dedicated pipeline products page |
| `src/components/PipelineProductGrid.tsx` | **Create** | Grid component for pipeline products |
| `src/components/PipelineFilterBar.tsx` | **Create** | Simplified filter bar without certification |
| `src/App.tsx` | **Update** | Add `/products/pipeline` route |
| `src/pages/Products.tsx` | **Update** | Replace collapsible with link |
| `src/services/DataService.ts` | **Update** | Add `filterPipelineProducts` method |
| `src/utils/filterOptions.ts` | **Update** | Add pipeline-specific filter options |

---

## Page Structure

### Pipeline Page Layout

```text
+--------------------------------------------------+
|  Header with Navigation                          |
+--------------------------------------------------+
|  Search Header                                   |
|  "Products in Pipeline"                          |
|  [Search input with suggestions]                 |
+--------------------------------------------------+
|  Info Banner (violet theme)                      |
|  "These products have been announced but are     |
|   not yet certified (no CE/FDA clearance)."      |
+--------------------------------------------------+
|  Filter Bar                                      |
|  [Tasks] [Modality] [Anatomy]                    |
+--------------------------------------------------+
|  "Showing X pipeline products"                   |
+--------------------------------------------------+
|  Product Grid                                    |
|  +----------+  +----------+  +----------+        |
|  | Product  |  | Product  |  | Product  |        |
|  | Card     |  | Card     |  | Card     |        |
|  +----------+  +----------+  +----------+        |
+--------------------------------------------------+
|  Footer                                          |
+--------------------------------------------------+
```

---

## Navigation Flow

1. **From Products Page**: Click "Products in Pipeline (X)" link -> Navigate to `/products/pipeline`
2. **Direct URL**: `/products/pipeline` shows all pipeline products with search/filter
3. **Back to Products**: Standard header navigation or browser back
4. **Product Details**: Clicking a pipeline product card goes to `/product/:id` (same as certified products)

---

## SEO Considerations

The Pipeline page will have:
- Title: "Products in Pipeline - Upcoming AI Solutions for Radiotherapy"
- Description: "Track upcoming AI products for radiotherapy that have been announced but not yet certified."
- Canonical: `https://dlinrt.eu/products/pipeline`
- Structured data for CollectionPage

---

## Benefits

1. **No Company Bias**: All pipeline products have equal visibility on their own page
2. **Searchable & Filterable**: Full search and filter functionality like the main products page
3. **Clear Separation**: Certified products and pipeline products are clearly distinguished
4. **Scalable**: As more pipeline products are added, they have a dedicated home
5. **Consistent UX**: Same page structure as the main products page for familiarity

