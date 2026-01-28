
# Phase 5 Implementation: GitHub Integration + Extended Editable Fields

## Prerequisites

The `GITHUB_TOKEN` secret must be added to Supabase Edge Functions secrets before the GitHub sync feature will work.

**Add Secret**: [Edge Functions Secrets](https://supabase.com/dashboard/project/msyfxyxzjyowwasgturs/settings/functions)

---

## Part 1: GitHub Integration Edge Function

### New File: `supabase/functions/apply-product-edit/index.ts`

Creates automated GitHub Pull Requests from approved product edits:

**Functionality:**
- Accepts `draft_id` parameter
- Verifies admin authentication
- Fetches approved draft from `product_edit_drafts` table
- Generates formatted TypeScript code from the draft data
- Creates a new branch: `visual-edit/{product_id}/{timestamp}`
- Commits the updated product file to the branch
- Opens a Pull Request with edit summary as description
- Updates draft record with `github_pr_url` and `github_synced_at`
- Sets status to `applied`

**File Path Resolution Logic:**
```text
Category-based routing:
- clinical-prediction -> src/data/products/clinical-prediction.ts
- registration -> src/data/products/registration/index.ts
- Other categories -> src/data/products/{category-slug}/{company-slug}.ts

Example: 
  Product "Limbus AI" in "Auto-Contouring" by "Limbus AI Inc"
  -> src/data/products/auto-contouring/limbus.ts
```

**TypeScript Code Generation:**
- Serializes product data with proper indentation
- Handles nested objects (regulatory, technology, market)
- Preserves array formatting
- Updates only the modified product while keeping others intact

### Update: `supabase/config.toml`

Add edge function configuration:
```toml
[functions.apply-product-edit]
verify_jwt = false
```

---

## Part 2: Admin UI - Sync to GitHub Button

### Update: `src/pages/admin/EditApprovals.tsx`

Add "Sync to GitHub" functionality for approved drafts:

**Changes:**
- Add `syncToGitHub` async function to call the edge function
- Add "Sync to GitHub" button in `DraftCard` for approved drafts without PR URL
- Show loading state during sync
- Display success/error toast notifications
- Refresh drafts list after successful sync

---

## Part 3: New Field Editors for Complex Data Types

### New File: `src/components/product-editor/FieldEditors/StructuresEditor.tsx`

Editor for the `supportedStructures` array (both string and object formats):

**Features:**
- Add/remove structures
- Toggle between string format ("Region: Structure") and object format (name, type, accuracy)
- Visual distinction for OARs, GTVs, Elective structures
- Mark structures as investigational

### New File: `src/components/product-editor/FieldEditors/DosePredictionModelsEditor.tsx`

Editor for `dosePredictionModels` array in Treatment Planning products:

**Fields per model:**
- Name (e.g., "H&N VMAT")
- Anatomical Site (e.g., "Head & Neck")
- Technique (e.g., "VMAT", "PBS")
- Intent (optional: Curative, Palliative, SBRT)
- Status (approved/investigational)

### New File: `src/components/product-editor/FieldEditors/IntegratedModulesEditor.tsx`

Editor for `integratedModules` array in Platform products:

**Fields per module:**
- Name
- Description
- Category
- Product URL
- Key Features (sub-array)

### New File: `src/components/product-editor/FieldEditors/PartOfEditor.tsx`

Editor for the `partOf` object (products that are part of larger systems):

**Fields:**
- Parent product name
- Version (optional)
- Product URL (optional)
- Relationship (Module, Feature, Add-on, Component)

---

## Part 4: Extended Editable Fields in Product Components

### Update: `src/components/product/GeneralInformationDetails.tsx`

Add missing editable fields:
- `modality` (array type)
- `anatomicalLocation` (array type) 
- `subspeciality` (text type)
- `diseaseTargeted` (array type)

### Update: `src/components/product/RegulatoryInformationDetails.tsx`

Integrate full regulatory editing:
- Add conditional rendering of `RegulatoryEditor` when in edit mode
- Keep existing display for view mode
- Allow editing CE/FDA/TGA status, class, certificates, notified body, etc.

### Update: `src/components/product/GuidelinesDetails.tsx`

Add guidelines array editing:
- Import `EditableField` and `useProductEdit`
- Integrate `GuidelinesEditor` for adding/editing guidelines
- Support quick-add for common guidelines (AAPM, ESTRO, RTOG, etc.)

### Update: `src/components/product/SupportedStructures.tsx`

Add structures array editing:
- Import `EditableField` and `useProductEdit`
- Show `StructuresEditor` when in edit mode
- Preserve existing display logic for view mode

### Update: `src/components/product/EvidenceLimitationsDetails.tsx`

Enhance evidence editing:
- Integrate `EvidenceEditor` for the evidence array
- Add `evidenceLevel` dropdown selector (levels 0-6)
- Keep existing limitations array editing

### Update: `src/components/product/IntegratedModulesDetails.tsx`

Add modules editing support:
- Import `EditableField` and `useProductEdit`
- Show `IntegratedModulesEditor` when in edit mode
- Allow editing module details inline

### Update: `src/components/product/DosePredictionModels.tsx`

Add dose prediction models editing:
- Import `EditableField` and `useProductEdit`
- Show `DosePredictionModelsEditor` when in edit mode
- Allow adding/removing/editing model entries

### Update: `src/components/product/PartOfDetails.tsx`

Add partOf object editing:
- Import `EditableField` and `useProductEdit`
- Show `PartOfEditor` when in edit mode
- Allow editing parent product details

### Update: `src/components/product-editor/FieldEditors/index.ts`

Export new editors:
```typescript
export { StructuresEditor } from './StructuresEditor';
export { DosePredictionModelsEditor } from './DosePredictionModelsEditor';
export { IntegratedModulesEditor } from './IntegratedModulesEditor';
export { PartOfEditor } from './PartOfEditor';
```

---

## Technical Details

### Edge Function: API Endpoints

```text
POST /apply-product-edit
Headers: Authorization: Bearer {JWT}
Body: { "draft_id": "uuid" }

Response (success):
{
  "success": true,
  "pr_url": "https://github.com/DLinRT-eu/dlinrteu-website/pull/123",
  "branch": "visual-edit/limbus-ai/1706450400"
}

Response (error):
{
  "success": false,
  "error": "Draft not found or not approved"
}
```

### GitHub API Operations

1. **Get file SHA** - GET `/repos/{owner}/{repo}/contents/{path}`
2. **Create branch** - POST `/repos/{owner}/{repo}/git/refs` (from main)
3. **Update file** - PUT `/repos/{owner}/{repo}/contents/{path}`
4. **Create PR** - POST `/repos/{owner}/{repo}/pulls`

### Security Considerations

- Admin-only access enforced via JWT validation
- Audit logging for all GitHub sync operations
- Rate limiting handled via GitHub API headers
- Token stored securely in Supabase secrets

---

## Files Summary

### Files to Create (5)

| File | Purpose |
|------|---------|
| `supabase/functions/apply-product-edit/index.ts` | GitHub PR automation edge function |
| `src/components/product-editor/FieldEditors/StructuresEditor.tsx` | Supported structures array editor |
| `src/components/product-editor/FieldEditors/DosePredictionModelsEditor.tsx` | Dose prediction models editor |
| `src/components/product-editor/FieldEditors/IntegratedModulesEditor.tsx` | Integrated modules editor |
| `src/components/product-editor/FieldEditors/PartOfEditor.tsx` | Parent product relationship editor |

### Files to Modify (10)

| File | Changes |
|------|---------|
| `supabase/config.toml` | Add apply-product-edit function config |
| `src/pages/admin/EditApprovals.tsx` | Add "Sync to GitHub" button and API call |
| `src/components/product/GeneralInformationDetails.tsx` | Add modality, anatomy, subspeciality, diseaseTargeted fields |
| `src/components/product/RegulatoryInformationDetails.tsx` | Integrate RegulatoryEditor for full editing |
| `src/components/product/GuidelinesDetails.tsx` | Add GuidelinesEditor integration |
| `src/components/product/SupportedStructures.tsx` | Add StructuresEditor integration |
| `src/components/product/EvidenceLimitationsDetails.tsx` | Add EvidenceEditor integration |
| `src/components/product/IntegratedModulesDetails.tsx` | Add IntegratedModulesEditor integration |
| `src/components/product/DosePredictionModels.tsx` | Add DosePredictionModelsEditor integration |
| `src/components/product/PartOfDetails.tsx` | Add PartOfEditor integration |

---

## Success Criteria

After implementation:
1. All product fields are editable in review mode
2. Approved drafts have a "Sync to GitHub" button
3. Clicking sync creates a GitHub branch, commits changes, and opens a PR
4. The draft status updates to "applied" with the PR URL
5. Complex field types (structures, guidelines, evidence) have dedicated editors
6. Auto-save continues to work for all field types
