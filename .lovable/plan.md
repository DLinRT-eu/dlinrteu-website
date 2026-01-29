
# Pipeline Products Section: Tracking Upcoming AI Products

## Overview

This plan introduces a new "Pipeline" section to track products that have been announced but are not yet certified (no CE/FDA clearance). This will help users stay informed about upcoming AI tools in radiotherapy. the pipeline products can be added in the count in the first page, but should not be included in the dashboard since they are not certified and info is not fully available.

## Approach

Rather than creating a separate page, we'll add a new **development stage** field to products and integrate pipeline products into the existing products page with clear visual differentiation and filtering.

### Key Design Decisions

1. **Add `developmentStage` field** to ProductDetails interface to classify products
2. **Create a dedicated folder** for pipeline products at `src/data/products/pipeline/`
3. **Add "Pipeline" certification option** to allow filtering
4. **Create a visual badge** to clearly distinguish announced/upcoming products
5. **Update DataService** to handle pipeline products with separate methods
6. **Add a dedicated section on Products page** highlighting pipeline products

---

## Technical Implementation

### 1. Update ProductDetails Interface

**File:** `src/types/productDetails.d.ts`

Add new field for development stage:

```typescript
// Development stage for tracking product maturity
developmentStage?: "certified" | "pipeline" | "research" | "discontinued";
```

### 2. Create Pipeline Products Folder

**New folder:** `src/data/products/pipeline/`

**Files to create:**
- `src/data/products/pipeline/index.ts` - Main export file
- `src/data/products/pipeline/therapanacea.ts` - Therapanacea upcoming products
- `src/data/products/pipeline/medlever.ts` - MedLever AI features

### 3. Therapanacea Pipeline Products

**File:** `src/data/products/pipeline/therapanacea.ts`

Products to add:
- **SmartPlan** - AI-powered treatment planning (Coming Soon)
- **TumorBox** - AI tumor segmentation (Coming Soon)
- **BrachyBox** - Brachytherapy delineation (Coming Soon)

Example structure:
```typescript
{
  id: "therapanacea-smartplan-pipeline",
  name: "SmartPlan",
  company: "Therapanacea",
  description: "AI-powered treatment planning module for ART-Plan+ platform. Automatically generates optimized treatment plans.",
  category: "Treatment Planning",
  certification: "Pipeline",
  developmentStage: "pipeline",
  partOf: {
    name: "ART-Plan+",
    relationship: "Module"
  },
  // ... other fields
}
```

### 4. MedLever AI Features Pipeline

**File:** `src/data/products/pipeline/medlever.ts`

Products to add:
- **MedLever Assistant** - AI-powered workflow assistant (Coming Soon)
- **MedLever Copilot** - AI copilot for clinical decisions (Coming Soon)

### 5. Update Certification Tags

**File:** `src/config/tags.ts`

Add new certification option:

```typescript
export const CERTIFICATION_TAGS = [
  'FDA',
  'CE',
  'CE exempt',
  'MDR exempt',
  'NMPA',
  'Pending',
  'Investigation Use',
  'Pipeline'  // NEW
];

export const COMBINED_CERTIFICATION_TAGS = [
  'CE & FDA',
  'CE',
  'FDA',
  'MDR exempt',
  'NMPA',
  'Pending',
  'Investigation Use',
  'Pipeline'  // NEW
];
```

### 6. Create Pipeline Badge Component

**File:** `src/components/PipelineBadge.tsx`

A distinct visual badge (purple/violet theme) to differentiate from investigational (amber):

```typescript
export function PipelineBadge({ showTooltip = true }) {
  const badge = (
    <Badge className="flex items-center gap-1 bg-violet-100 text-violet-800 border-violet-300">
      <Clock className="h-3 w-3" />
      Coming Soon
    </Badge>
  );
  // Tooltip explaining pipeline status
}
```

### 7. Update DataService

**File:** `src/services/DataService.ts`

Add methods for pipeline products:

```typescript
// Get all pipeline products (not certified but announced)
getPipelineProducts(): ProductDetails[] {
  const productList = this.verificationsLoaded ? this.products : ALL_PRODUCTS;
  return productList.filter(product => 
    product.developmentStage === 'pipeline' || 
    product.certification?.toLowerCase() === 'pipeline'
  );
}

// Get certified products only (current behavior)
getCertifiedProducts(): ProductDetails[] {
  const productList = this.verificationsLoaded ? this.products : ALL_PRODUCTS;
  return productList.filter(product => 
    hasRegulatoryApproval(product) && 
    product.developmentStage !== 'pipeline'
  );
}
```

### 8. Update Product Filters

**File:** `src/utils/productFilters.ts`

Add pipeline detection:

```typescript
export const isPipelineProduct = (product: ProductDetails): boolean => {
  return product.developmentStage === 'pipeline' || 
         product.certification?.toLowerCase() === 'pipeline' ||
         product.certification?.toLowerCase() === 'coming soon';
};
```

### 9. Update Products Page

**File:** `src/pages/Products.tsx`

Add pipeline products section with toggle:

```typescript
// New state for showing pipeline
const [showPipeline, setShowPipeline] = useState(false);

// Get pipeline products
const pipelineProducts = dataService.getPipelineProducts();

// Render pipeline section
{pipelineProducts.length > 0 && (
  <div className="mb-8 p-4 bg-violet-50 rounded-lg border border-violet-200">
    <h3 className="text-lg font-semibold text-violet-900 flex items-center gap-2">
      <Clock className="h-5 w-5" />
      Products in Pipeline ({pipelineProducts.length})
    </h3>
    <p className="text-sm text-violet-700 mt-1">
      Announced products not yet certified. Click to expand.
    </p>
    // Collapsible grid of pipeline products
  </div>
)}
```

### 10. Update Filter Options

**File:** `src/utils/filterOptions.ts`

Include "Pipeline" in certification options when pipeline products exist.

### 11. Update Data Index

**File:** `src/data/index.ts`

Import and export pipeline products:

```typescript
import { PIPELINE_PRODUCTS } from "./products/pipeline";

export const ALL_PRODUCTS: ProductDetails[] = [
  ...AUTO_CONTOURING_PRODUCTS,
  // ... existing categories
  ...PIPELINE_PRODUCTS
];

export { PIPELINE_PRODUCTS };
```

### 12. Update UnifiedProductCard

**File:** `src/components/common/UnifiedProductCard.tsx`

Add pipeline badge rendering:

```typescript
const renderCertificationBadge = () => {
  // Check for pipeline first
  if (isPipelineProduct(product)) {
    return <PipelineBadge />;
  }
  // ... existing certification logic
};
```

---

## Visual Design

| Status | Badge Color | Icon |
|--------|-------------|------|
| CE/FDA Certified | Green | ShieldCheck |
| MDR Exempt | Amber | ShieldAlert |
| Investigational | Amber | AlertTriangle |
| **Pipeline (NEW)** | Violet/Purple | Clock |

---

## Files Summary

| File | Action |
|------|--------|
| `src/types/productDetails.d.ts` | Add `developmentStage` field |
| `src/config/tags.ts` | Add "Pipeline" certification option |
| `src/components/PipelineBadge.tsx` | **Create** new badge component |
| `src/data/products/pipeline/index.ts` | **Create** pipeline products index |
| `src/data/products/pipeline/therapanacea.ts` | **Create** Therapanacea pipeline products |
| `src/data/products/pipeline/medlever.ts` | **Create** MedLever AI pipeline products |
| `src/data/index.ts` | Import and include pipeline products |
| `src/services/DataService.ts` | Add pipeline product methods |
| `src/utils/productFilters.ts` | Add `isPipelineProduct` function |
| `src/utils/filterOptions.ts` | Include Pipeline in certification options |
| `src/pages/Products.tsx` | Add pipeline section with toggle |
| `src/components/common/UnifiedProductCard.tsx` | Render pipeline badge |

---

## Pipeline Products to Include

### Therapanacea (Part of ART-Plan+)
| Product | Category | Status |
|---------|----------|--------|
| SmartPlan | Treatment Planning | Coming Soon |
| TumorBox | Auto-Contouring | Coming Soon |
| BrachyBox | Auto-Contouring | Coming Soon |

### MedLever
| Product | Category | Status |
|---------|----------|--------|
| MedLever Assistant | Platform | Coming Soon |
| MedLever Copilot | Platform | Coming Soon |

---

## Benefits

1. **Searchable & Filterable**: Pipeline products appear in search and can be filtered using the certification filter
2. **Clear Visual Differentiation**: Purple "Coming Soon" badge distinguishes from certified products
3. **Dedicated Section**: Collapsible pipeline section on Products page highlights upcoming products
4. **Future-Ready**: The `developmentStage` field supports additional stages like "research" or "discontinued"
5. **Maintains Data Integrity**: Pipeline products are stored separately and clearly marked as not certified
