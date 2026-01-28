

# Phase 5: GitHub Integration + Extended Editable Fields

## Overview

This plan completes Phase 5 of the Visual Editing feature (GitHub integration) and adds editable fields to components that currently lack them. This ensures all product data can be modified visually, and approved edits automatically generate GitHub Pull Requests.

## Part 1: Gap Analysis - Components Missing EditableField Support

| Component | Current State | Fields to Make Editable |
|-----------|--------------|-------------------------|
| `RegulatoryInformationDetails` | Only `intendedUseStatement` editable | Add CE/FDA/TGA status editing via RegulatoryEditor |
| `GuidelinesDetails` | No edit support | Add guidelines array via GuidelinesEditor |
| `SupportedStructures` | No edit support | Add structures array editing |
| `IntegratedModulesDetails` | No edit support | Add modules editing |
| `DosePredictionModels` | No edit support | Add dose prediction models editing |
| `PartOfDetails` | No edit support | Add partOf object editing |
| `EvidenceLimitationsDetails` | Has limitations editable | Add evidence array via EvidenceEditor |
| `GeneralInformationDetails` | Missing modality, anatomy, subspeciality | Add missing fields |

## Part 2: GitHub Integration Edge Function

### Function: `apply-product-edit`

Creates a GitHub Pull Request from an approved draft by:
1. Fetching the approved draft from database
2. Generating TypeScript code from the JSON data
3. Creating a branch, committing the file, and opening a PR
4. Updating the draft record with the PR URL

### GitHub API Requirements

The function requires a `GITHUB_TOKEN` secret with these permissions:
- `contents:write` - To create branches and commits
- `pull_requests:write` - To create PRs

### TypeScript Code Generation

The function will convert JSONB product data to properly formatted TypeScript:

```typescript
// Input: JSONB from product_edit_drafts.draft_data
// Output: Valid TypeScript that matches existing file format

function generateTypeScriptCode(product: ProductDetails): string {
  // Handle nested objects (regulatory, technology, etc.)
  // Format arrays properly
  // Preserve comments where possible
  // Match existing code style
}
```

## Implementation Steps

### Step 1: Add GitHub Token Secret

Add `GITHUB_TOKEN` to Supabase Edge Function secrets with repository access.

### Step 2: Create apply-product-edit Edge Function

Create `supabase/functions/apply-product-edit/index.ts`:

```text
POST /apply-product-edit
Body: { draft_id: string }
Response: { success: boolean, pr_url?: string, error?: string }
```

The function will:
1. Verify admin authentication
2. Fetch the approved draft
3. Determine the target file path from `product.category` and `product.id`
4. Generate TypeScript code
5. Create a new branch: `visual-edit/{product_id}/{timestamp}`
6. Commit the updated file
7. Create a PR with the edit summary as description
8. Update `product_edit_drafts` with `github_pr_url` and `github_synced_at`
9. Set status to `applied`

### Step 3: Add "Sync to GitHub" Button

Update `EditApprovals.tsx` to include a "Sync to GitHub" button for approved drafts that haven't been synced yet.

### Step 4: Extend Editable Fields in Components

#### 4.1 RegulatoryInformationDetails.tsx
- Integrate the existing `RegulatoryEditor` component
- Add edit mode toggle for CE/FDA/TGA sections
- Show inline editing for all regulatory fields

#### 4.2 GuidelinesDetails.tsx
- Import `EditableField` and `useProductEdit`
- Wrap guidelines section with `GuidelinesEditor`
- Allow adding/removing/editing guideline entries

#### 4.3 SupportedStructures.tsx
- Add edit support for structures array
- Create a new `StructuresEditor` field editor for adding/removing structures

#### 4.4 GeneralInformationDetails.tsx
- Add EditableField for `modality` (array type)
- Add EditableField for `anatomicalLocation` (array type)
- Add EditableField for `subspeciality` (text type)
- Add EditableField for `diseaseTargeted` (array type)

#### 4.5 EvidenceLimitationsDetails.tsx
- Integrate the existing `EvidenceEditor` for the evidence array
- Add `evidenceLevel` selector (dropdown with levels 0-6)

#### 4.6 IntegratedModulesDetails.tsx
- Add edit mode support
- Create inline editing for module name, description, category, and features

#### 4.7 DosePredictionModels.tsx
- Add edit mode support
- Create inline editing for dose prediction model entries

#### 4.8 PartOfDetails.tsx
- Add EditableField for partOf object properties

### Step 5: Update supabase/config.toml

Add configuration for the new edge function:

```toml
[functions.apply-product-edit]
verify_jwt = false
```

## File Changes Summary

### Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/apply-product-edit/index.ts` | GitHub PR creation edge function |
| `src/components/product-editor/FieldEditors/StructuresEditor.tsx` | Editor for supported structures array |
| `src/components/product-editor/FieldEditors/DosePredictionModelsEditor.tsx` | Editor for dose prediction models |
| `src/components/product-editor/FieldEditors/IntegratedModulesEditor.tsx` | Editor for integrated modules |

### Files to Modify

| File | Changes |
|------|---------|
| `supabase/config.toml` | Add apply-product-edit function config |
| `src/pages/admin/EditApprovals.tsx` | Add "Sync to GitHub" button with API call |
| `src/components/product/RegulatoryInformationDetails.tsx` | Full regulatory editing support |
| `src/components/product/GuidelinesDetails.tsx` | Guidelines editing with GuidelinesEditor |
| `src/components/product/SupportedStructures.tsx` | Structures array editing |
| `src/components/product/GeneralInformationDetails.tsx` | Add modality, anatomy, subspeciality, diseaseTargeted fields |
| `src/components/product/EvidenceLimitationsDetails.tsx` | Evidence array editing with EvidenceEditor |
| `src/components/product/IntegratedModulesDetails.tsx` | Modules editing support |
| `src/components/product/DosePredictionModels.tsx` | Dose models editing support |
| `src/components/product/PartOfDetails.tsx` | PartOf object editing |
| `src/components/product-editor/FieldEditors/index.ts` | Export new editors |

## Technical Details

### Edge Function: TypeScript Generation Logic

The function will handle the complex mapping of product data to TypeScript:

```typescript
function generateProductTypeScript(product: ProductDetails, existingContent?: string): string {
  // 1. Identify which array in the file contains this product
  // 2. Serialize the product with proper formatting
  // 3. Handle nested objects (regulatory, technology, etc.)
  // 4. Preserve array structure and other products in the file
  // 5. Return complete valid TypeScript
}
```

Key considerations:
- Products are grouped in arrays by company in the data files
- Multiple products may exist in the same file
- Must preserve other products when updating one
- Handle edge cases like new products vs. updates

### File Path Resolution

```typescript
function getProductFilePath(product: ProductDetails): string {
  const categorySlug = product.category.toLowerCase().replace(/ /g, '-');
  
  // Single-file categories
  if (['registration', 'clinical-prediction'].includes(categorySlug)) {
    return `src/data/products/${categorySlug}.ts`;
  }
  
  // Multi-file categories (by company)
  const companySlug = product.company.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  return `src/data/products/${categorySlug}/${companySlug}.ts`;
}
```

### Security Considerations

- Admin-only access for GitHub sync
- JWT validation in edge function
- Rate limiting on GitHub API calls
- Audit logging for all sync operations

## Success Criteria

After implementation:
1. All product fields can be edited visually
2. Approved drafts can be synced to GitHub with one click
3. GitHub PRs are automatically created with proper titles and descriptions
4. The draft status updates to "applied" after successful sync
5. Editors can track which edits have been synced via the PR URL

## Dependencies

- GitHub Personal Access Token with repo permissions
- Existing RegulatoryEditor, GuidelinesEditor, EvidenceEditor, TechnologyEditor components
- Admin approval workflow (already implemented)

