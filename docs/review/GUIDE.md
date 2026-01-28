# DLinRT.eu Product Guide

This guide covers all aspects of working with products on DLinRT.eu, including reviewing existing products and adding new ones.

## Table of Contents

1. [Reviewing Products](#reviewing-products)
2. [Adding New Products](#adding-new-products)
3. [Product Categories](#product-categories)
4. [Multi-Category Products](#multi-category-products)
5. [Product Versioning](#product-versioning)
6. [Field Requirements](#field-requirements)
7. [Example Templates](#example-templates)

## Reviewing Products

DLinRT.eu supports two methods for reviewing products:

### Method 1: Visual Editing (Recommended)

1. **Start Review**
   - Open product page
   - Click "Edit" button in header (requires reviewer/admin/company role)
   - EditToolbar appears at bottom of page

2. **Make Changes**
   - Click on editable fields to modify
   - Use dropdown menus for predefined options (category, modality, anatomy)
   - Use specialized editors for complex fields (regulatory, evidence, structures)
   - Changes auto-save every 30 seconds

3. **Set Evidence Level**
   - Every product should have an evidence level (0-6)
   - The Evidence & Limitations section is always visible
   - Select level from dropdown and add justification notes

4. **Submit for Review**
   - Click "Submit" in EditToolbar
   - Write an edit summary describing your changes
   - Admin reviews and approves/rejects
   - Approved edits automatically sync to GitHub as PR

### Method 2: Direct GitHub Editing

For developers who prefer traditional version control:

1. **Clone repository** from GitHub
2. **Edit product files** in `src/data/products/[category]/`
3. **Create pull request** with your changes
4. **Maintainers review** and merge

## Adding New Products

1. **Choose Primary Category**
   - Auto-Contouring
   - Clinical Prediction
   - Image Enhancement
   - Image Synthesis
   - Performance Monitor
   - Platform
   - Reconstruction
   - Registration
   - Tracking
   - Treatment Planning

2. **Consider Secondary Categories**
   - Products can span multiple categories
   - Use `secondaryCategories` array for additional classifications
   - Example: Auto-contouring product with treatment planning features

3. **Create Product File**
   ```typescript
   // src/data/products/[category]/[company]-[product].ts
   const product: ProductDetails = {
     id: 'company-productname',
     name: 'Product Name',
     company: 'Company Name',
     website: 'https://company.com/product',
     category: 'Auto-Contouring',
     secondaryCategories: ['Treatment Planning'], // Optional multi-category support
     features: ['Feature 1', 'Feature 2'],
     version: '2.1.0',
     releaseDate: '2023-06-15',
     certification: 'CE Mark',
     // Category-specific fields...
   };
   ```

4. **Add Logo**
   - Save to `public/logos/`
   - PNG/SVG format
   - 200x200px minimum
   - Filename: `company.png`

5. **Test & Submit**
   - Run locally: `bun run dev`
   - Verify display
   - Submit through interface

## Product Categories

Each category has specific field requirements:

### Auto-Contouring
- `supportedStructures` (OAR/GTV/Elective classification)
- `anatomicalLocation` (treatment sites)
- `modality` (imaging modalities)

### Image Synthesis
- `modality` (input/output modalities)
- `anatomicalLocation` (supported anatomy)
- Technology integration details

### Registration
- `modality` (supported image types)
- `anatomicalLocation` (registration sites)
- Integration specifications

### Treatment Planning
- `modality` (planning modalities)
- `anatomicalLocation` (planning sites)
- Planning system integrations

### Performance Monitor
- `modality` (monitored modalities)
- Quality assurance capabilities

## Multi-Category Products

Products can belong to multiple categories using the `secondaryCategories` field:

```typescript
const multiCategoryProduct: ProductDetails = {
  id: 'example-multi',
  name: 'Multi-Purpose AI Suite',
  category: 'Auto-Contouring',           // Primary category
  secondaryCategories: [                 // Additional categories
    'Treatment Planning',
    'Performance Monitor'
  ],
  // ... other fields
};
```

**Benefits:**
- Products appear in filters for all relevant categories
- Better discoverability for users
- Accurate representation of product capabilities

**Usage Guidelines:**
- Use primary category for main functionality
- Add secondary categories for significant additional features
- Avoid over-categorization

## Product Versioning

Multiple versions of products can be tracked:

### Approach 1: Separate Entries
```typescript
// Version 1.0
const productV1: ProductDetails = {
  id: 'company-product-v1',
  name: 'Product Name',
  version: '1.0.0',
  releaseDate: '2022-01-15',
  // ... version 1 specifications
};

// Version 2.0
const productV2: ProductDetails = {
  id: 'company-product-v2',
  name: 'Product Name',
  version: '2.0.0',
  releaseDate: '2023-06-15',
  // ... version 2 specifications
};
```

### Approach 2: Current Version Only
```typescript
const currentProduct: ProductDetails = {
  id: 'company-product',
  name: 'Product Name',
  version: '2.1.0',
  releaseDate: '2023-06-15',
  // ... current version specifications
};
```

**Guidelines:**
- Use separate entries for major version differences
- Track evolution through `version` and `releaseDate` fields
- Include version history in evidence/documentation
- Maintain regulatory approval dates per version

## Field Requirements

### Required for All Products
- `id`: Unique identifier (use consistent patterns for versions)
- `name`: Full product name
- `company`: Company name
- `website`: Product webpage
- `category`: Primary category
- `features`: Key features array
- `certification`: Regulatory status
- `version`: Current version
- `releaseDate`: Release date (YYYY-MM-DD format)
- `lastUpdated`: Last verified date

### Optional Multi-Category Fields
- `secondaryCategories`: Array of additional categories

### Version-Specific Fields
- `version`: Semantic versioning (e.g., "2.1.0")
- `releaseDate`: Version release date
- Consider separate entries for major versions

## Example Templates

See example implementations in:
- `docs/examples/products/` - Documentation examples
- `src/data/products/examples/` - Code examples

**Available Examples**:
- auto-contouring-example.ts
- image-synthesis-example.ts
- registration-example.ts
- treatment-planning-example.ts
- performance-monitor-example.ts

All examples include:
- Multi-category support examples
- Versioning best practices
- Complete field documentation
- AI classification fields (`usesAI`, `monitorsAIProducts`)

## Evidence Level Classification

Every product should have an evidence level assigned. The classification follows the hierarchy from [van Leeuwen et al. (2021)](https://doi.org/10.1007/s00330-021-07892-z), adapted for radiotherapy:

| Level | Name | When to Use |
|-------|------|-------------|
| 0 | No Evidence | FDA summary only, no peer review |
| 1t | Technical Efficacy | Reproducibility tests |
| 1c | Potential Clinical Efficacy | Correlation studies |
| 2 | Stand-Alone Performance | Clinical dataset validation |
| 3 | Workflow Efficacy | Time savings studies |
| 4 | Treatment Decision Efficacy | Plan impact studies |
| 5 | Patient Outcome Efficacy | Toxicity, survival data |
| 6 | Societal Efficacy | Health economics |

## Need Help?

- Check example templates
- Open GitHub issue
- Join discussions
- Review hidden admin pages at `/review` and `/timeline`

---

*Last Updated: January 28, 2026*
