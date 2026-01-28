
# Visual Editing in Product Review Mode

## Executive Summary

This plan introduces a visual editing interface for product review mode that allows authorized users (admins, reviewers, and company representatives) to make inline edits to product data directly in the browser. Changes are saved as drafts in the database, subject to an approval workflow, and then synced to the GitHub repository to maintain version control.

## Current State Analysis

### How Products Are Stored Today
- Products are defined as TypeScript files in `src/data/products/[category]/[company].ts`
- Static data is exported and aggregated into `ALL_PRODUCTS`
- Changes require editing files via GitHub (create branch, edit, submit PR)
- Company representatives can submit revision requests via `company_revisions` table (text-based summaries only)

### Existing Infrastructure to Leverage
- **Role System**: `admin`, `reviewer`, `company` roles with proper RLS policies
- **Company Revisions Table**: Already tracks revision requests with approval workflow
- **Validation Rules**: `VALIDATION_RULES` in `fieldValidationHelper.ts` for real-time validation
- **GitHub Integration**: Existing helpers for creating edit URLs and PRs
- **Product Reviews Table**: Tracks review assignments and status

## Architecture Overview

```text
+------------------+     +------------------+     +------------------+
|   Visual Editor  | --> |  Draft Storage   | --> |  Approval Flow   |
|   (React Forms)  |     |  (Supabase)      |     |  (Admin/Review)  |
+------------------+     +------------------+     +------------------+
                                                          |
                                                          v
                                                  +------------------+
                                                  |  GitHub Sync     |
                                                  |  (Edge Function) |
                                                  +------------------+
```

## Implementation Components

### 1. Database Schema: Product Edit Drafts

Create a new table to store pending product edits:

```sql
CREATE TABLE product_edit_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- The edited product data (full ProductDetails JSON)
  draft_data jsonb NOT NULL,
  
  -- Track which fields were modified
  changed_fields text[] NOT NULL DEFAULT '{}',
  
  -- Edit summary for reviewers
  edit_summary text,
  
  -- Workflow status
  status text NOT NULL DEFAULT 'draft' 
    CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'applied')),
  
  -- Review metadata
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,
  review_feedback text,
  
  -- GitHub sync status
  github_pr_url text,
  github_synced_at timestamptz
);
```

### 2. Visual Editor Components

**2.1 ProductEditContext**
A React context to manage edit state, track changes, and handle save/discard operations.

**2.2 EditableProductField Component**
A wrapper component that detects field type and renders appropriate edit controls:
- Text fields: Inline editable text
- Arrays (features, modalities): Tag-style editor with add/remove
- Objects (regulatory, technology): Expandable section editors
- Dates: Date picker
- URLs: Validated URL input

**2.3 ProductVisualEditor Component**
Main editor component that:
- Loads current product data
- Loads any existing draft for the user
- Shows inline edit controls when in edit mode
- Highlights changed fields with visual indicators
- Provides real-time validation feedback
- Auto-saves drafts periodically

**2.4 EditToolbar Component**
Floating toolbar with:
- Save Draft / Discard Changes buttons
- Submit for Review button
- View Changes (diff view) button
- Validation status indicator

### 3. Permission Model

| Role | Capabilities |
|------|--------------|
| **Admin** | Edit any product, approve/reject edits, apply to GitHub |
| **Reviewer** | Edit assigned products, submit for admin approval |
| **Company Rep** | Edit own company's products, submit for approval |
| **Anonymous** | View only (no edit controls) |

### 4. Workflow States

```text
[Draft] --> [Pending Review] --> [Approved] --> [Applied to GitHub]
                |                    |
                v                    v
           [Rejected]           (PR Created)
```

### 5. Edge Function: Apply Product Edit

Creates a GitHub PR with the approved changes:

1. Fetch approved draft from database
2. Generate TypeScript code for the product
3. Create a branch via GitHub API
4. Commit the updated file
5. Create a PR with edit summary
6. Update draft status with PR URL

## UI/UX Design

### Edit Mode Toggle
- Add "Enable Visual Editing" toggle button in product review page header
- When enabled, editable fields show subtle edit indicators on hover
- Click any editable field to activate inline editing

### Field-Level Editing
- **Text Fields**: Click to edit, press Enter or click away to save
- **Array Fields**: Show as tags with + button, click X to remove
- **Nested Objects**: Expand/collapse sections with form fields inside
- **Validation**: Real-time feedback with green/yellow/red indicators

### Change Tracking
- Modified fields highlighted with colored border
- "Changes" panel shows before/after comparison
- Undo individual field changes

### Review Interface (Admin/Reviewer)
- List of pending edit drafts
- Side-by-side diff view
- Approve/Reject with comments
- Bulk actions for efficiency

## File Structure

```text
src/
├── components/
│   └── product-editor/
│       ├── ProductEditContext.tsx      # Edit state management
│       ├── ProductVisualEditor.tsx     # Main editor container
│       ├── EditToolbar.tsx             # Save/submit/discard controls
│       ├── EditableField.tsx           # Smart field wrapper
│       ├── FieldEditors/
│       │   ├── TextFieldEditor.tsx
│       │   ├── ArrayFieldEditor.tsx
│       │   ├── DateFieldEditor.tsx
│       │   ├── UrlFieldEditor.tsx
│       │   ├── RegulatoryEditor.tsx
│       │   └── TechnologyEditor.tsx
│       ├── DiffViewer.tsx              # Show changes comparison
│       └── ValidationIndicator.tsx     # Real-time validation status
├── hooks/
│   ├── useProductDraft.ts              # Draft CRUD operations
│   └── useProductValidation.ts         # Real-time validation
├── pages/
│   └── admin/
│       └── EditApprovals.tsx           # Admin approval dashboard
supabase/
├── functions/
│   └── apply-product-edit/             # GitHub sync edge function
│       └── index.ts
```

## Implementation Phases

### Phase 1: Foundation (Core Infrastructure)
- Create `product_edit_drafts` table with RLS policies
- Implement `ProductEditContext` for state management
- Build `useProductDraft` hook for database operations
- Add basic edit mode toggle to ProductReview page

### Phase 2: Field Editors (Visual Components)
- Create `EditableField` smart wrapper component
- Implement field-specific editors (text, array, date, URL)
- Integrate real-time validation using existing rules
- Add visual change indicators

### Phase 3: Complex Fields (Nested Objects)
- Build `RegulatoryEditor` for CE/FDA information
- Build `TechnologyEditor` for integration/deployment
- Handle array-of-objects (evidence, guidelines, structures)

### Phase 4: Workflow & Approval
- Create admin approval dashboard page
- Build diff viewer for comparing changes
- Implement approve/reject with feedback
- Add notification integration

### Phase 5: GitHub Integration
- Create `apply-product-edit` edge function
- Implement TypeScript code generation from JSON
- GitHub API integration for branch/commit/PR
- Status tracking and error handling

## Security Considerations

- RLS policies enforce role-based access to drafts
- Users can only edit drafts for products they're authorized to modify
- Validation prevents malicious data from being submitted
- GitHub sync requires admin approval as final gate
- All changes are audited with timestamps and user IDs

## Technical Details

### Draft Data Structure
```typescript
interface ProductEditDraft {
  id: string;
  product_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  draft_data: ProductDetails;  // Full product with edits
  changed_fields: string[];    // ['name', 'regulatory.fda.clearanceNumber']
  edit_summary: string;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'applied';
  reviewed_by?: string;
  reviewed_at?: string;
  review_feedback?: string;
  github_pr_url?: string;
}
```

### Change Detection Algorithm
```typescript
function detectChanges(original: ProductDetails, edited: ProductDetails): string[] {
  const changes: string[] = [];
  const compare = (path: string, orig: any, edit: any) => {
    if (JSON.stringify(orig) !== JSON.stringify(edit)) {
      changes.push(path);
    }
  };
  // Recursively compare all fields...
  return changes;
}
```

### RLS Policies for Drafts Table
- Admins: Full access to all drafts
- Reviewers: View/edit drafts for assigned products
- Company reps: View/edit drafts for own company products
- Service role: Full access for edge functions

## Success Metrics

- Reduction in time from edit to publication
- Decrease in GitHub-related friction for non-technical users
- Increase in product update frequency
- Fewer validation errors in submitted changes

## Dependencies

- Existing Supabase authentication and roles
- GitHub API access (already configured for PR dashboard)
- Existing validation rules and helpers

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Data loss during edit | Auto-save drafts every 30 seconds |
| Conflicting edits | Lock product while editing, show conflict resolution |
| Invalid data submitted | Real-time validation blocks submission |
| GitHub sync failures | Queue failed syncs for retry, notify admins |
