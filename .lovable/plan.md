
# Documentation Update Plan: Visual Product Editing System

## Overview

This plan updates all project documentation to reflect the new Visual Product Editing system that was recently implemented. The documentation will be updated across 6 files to ensure reviewers, admins, and contributors understand the new in-browser editing workflow. nake sure that the multiple ways to perform a reviw (directly via Githb also) are indicated!

## Current Documentation State

All documentation was last updated January 19, 2026. The following major feature is not documented:

- **Visual Product Editing** - A complete in-browser editing system allowing admins, reviewers, and company representatives to edit product data without using GitHub directly

## New Feature Summary

The Visual Editing system includes:

| Component | Purpose |
|-----------|---------|
| ProductEditContext | State management for edit mode, auto-save every 30 seconds |
| EditableField | Smart wrapper for inline text/array/date/url editing |
| SelectFieldEditor | Dropdown for single-select fields (category, certification) |
| MultiSelectFieldEditor | Multi-select with predefined options (modality, anatomy) |
| StructuresEditor | Editor for supported structures with OAR/GTV/Elective classification |
| RegulatoryEditor | Full CE/FDA/TGA regulatory information editing |
| GuidelinesEditor | Professional guidelines compliance editing |
| EvidenceEditor | Clinical evidence links with evidence level classification |
| EditToolbar | Floating bar showing changes, validation, save/submit actions |
| EditApprovals | Admin page for reviewing and approving submitted edits |
| GitHub Integration | Approved edits create PRs automatically via edge function |

## Files to Update

### 1. docs/README.md

**Changes:**
- Add new "Visual Editing" section to Quick Navigation
- Add route `/admin/edit-approvals` to Admin Guide routes
- Update "Last Updated" date to January 28, 2026

### 2. docs/ADMIN_GUIDE.md

**Changes:**
- Add route `/admin/edit-approvals` to Quick Access section
- Add new section "9. Product Edit Approvals" covering:
  - Accessing the Edit Approvals page
  - Review workflow (Pending → Approve/Reject → Sync to GitHub)
  - Draft status lifecycle (draft, pending_review, approved, rejected, applied)
  - Using the DiffViewer to compare changes
  - Syncing approved edits to GitHub (creates PR automatically)
  - Rejection workflow with feedback
- Update Last Updated date

### 3. docs/REVIEWER_GUIDE.md

**Changes:**
- Completely rewrite "Section 4: Reviewing Products" to include visual editing workflow
- Add new subsections:
  - "Using Visual Edit Mode" - How to enable editing on product pages
  - "The EditToolbar" - Understanding the floating action bar
  - "Field Types" - Different editor types (text, dropdown, multi-select, arrays)
  - "Saving and Submitting" - Draft auto-save and submission workflow
  - "Validation" - Understanding validation errors and warnings
- Update "Making Updates" section to reflect in-browser editing instead of GitHub
- Add information about evidence level classification and when to set it
- Update Last Updated and Version

### 4. docs/review/GUIDE.md

**Changes:**
- Rewrite "Reviewing Products" section to emphasize visual editing
- Add new workflow steps:
  1. Open product page
  2. Click "Edit" button (requires reviewer/admin/company role)
  3. Click on editable fields to modify
  4. Use dropdown menus for predefined options
  5. Save draft or submit for review
  6. Admin reviews and approves/rejects
  7. Approved edits sync to GitHub as PR
- Update "Submit Changes" section to reflect draft → review → approval flow
- Add section on "Evidence Level Classification" with levels 0-6
- Update Last Updated date

### 5. docs/review/README.md

**Changes:**
- Update "For Reviewers" quick start to reflect visual editing
- Add "Visual Editing Workflow" section with brief overview
- Add link to visual editing documentation
- Mention evidence level classification requirement

### 6. docs/FIELD_REFERENCE.md

**Changes:**
- Add new section "Visual Editing Field Types" explaining:
  - Which fields use dropdowns (category, certification, regulatory status)
  - Which fields use multi-select (modality, anatomy, secondary categories)
  - Which fields have specialized editors (structures, guidelines, evidence, regulatory)
- Update the "Quick Checklist for Reviewers" to include:
  - Setting evidence level
  - Using visual edit mode
  - Submitting for review

## Content Details

### New ADMIN_GUIDE Section: Product Edit Approvals

```text
## 9. Product Edit Approvals

Review and approve product edits submitted by reviewers and company representatives.

### Accessing Edit Approvals
**Route**: `/admin/edit-approvals`

### Features
- View all pending edits requiring review
- Compare changes using visual diff viewer
- Approve or reject edits with feedback
- Sync approved edits to GitHub (creates PR automatically)

### Draft Status Lifecycle

| Status | Description |
|--------|-------------|
| draft | Work in progress, auto-saved every 30 seconds |
| pending_review | Submitted by author, awaiting admin review |
| approved | Ready to sync to GitHub |
| rejected | Returned to author with feedback |
| applied | Synced to GitHub as pull request |

### Review Workflow

1. Navigate to Edit Approvals page
2. Open "Pending Review" tab
3. Click "View Changes" to see diff comparison
4. Review the edit summary provided by author
5. Click "Approve" or "Reject"
6. Provide feedback (required for rejections)
7. For approved edits: Click "Sync to GitHub"

### GitHub Integration

When you click "Sync to GitHub" on an approved edit:
1. A new branch is created: `visual-edit/{product_id}/{timestamp}`
2. Product file is updated with the edited data
3. Pull request is opened automatically
4. Draft status changes to "applied"
5. PR link is displayed for review

**Requirement**: `GITHUB_TOKEN` must be configured in Supabase Edge Functions secrets.
```

### Updated REVIEWER_GUIDE Section 4: Reviewing Products

```text
## 4. Reviewing Products

### Using Visual Edit Mode

DLinRT.eu now supports in-browser visual editing for product data.

**Who Can Edit:**
- Administrators (all products)
- Reviewers (assigned products)
- Company Representatives (own company products)

**Starting a Review:**
1. Navigate to the product page
2. Click "Edit" button in the header
3. The page enters edit mode with the EditToolbar appearing at the bottom

### The EditToolbar

A floating action bar appears showing:
- Number of changes made
- Validation status (errors, warnings)
- Draft status

**Actions:**
- **Reset** - Discard all changes
- **Save Draft** - Manually save (also auto-saves every 30 seconds)
- **Submit** - Submit changes for admin review
- **X** - Exit edit mode

### Field Types

Different fields have different editing experiences:

| Type | Example Fields | Editor Style |
|------|---------------|--------------|
| Text | Name, Description | Inline text input |
| Dropdown | Category, Certification | Single-select menu |
| Multi-Select | Modality, Anatomy | Checkboxes with chips |
| Array | Features, Limitations | Add/remove items |
| Date | Release Date, Last Updated | Date picker |
| URL | Website, Product URL | URL input with validation |
| Complex | Regulatory, Evidence, Guidelines | Specialized full-screen editors |

### Evidence Level Classification

Every product should have an evidence level assigned (0-6):

| Level | Name | When to Use |
|-------|------|-------------|
| 0 | No Evidence | FDA summary only, no peer review |
| 1t | Technical | Reproducibility tests |
| 1c | Potential Clinical | Correlation studies |
| 2 | Stand-Alone Performance | Clinical dataset validation |
| 3 | Workflow Efficacy | Time savings studies |
| 4 | Treatment Decision | Plan impact studies |
| 5 | Patient Outcome | Toxicity, survival data |
| 6 | Societal | Health economics |

**The Evidence & Limitations card is now always visible** on every product page to encourage setting this important classification.

### Saving and Submitting

**Auto-Save:**
- Changes are automatically saved as a draft every 30 seconds
- Drafts are stored in the database and persist across sessions

**Submitting for Review:**
1. Click "Submit" in the EditToolbar
2. Write an edit summary describing your changes
3. Click "Submit for Review"
4. Your edit enters the admin approval queue
5. You will be notified when approved or rejected

### Validation

The system validates your changes in real-time:

- **Errors** (red): Must be fixed before submitting
- **Warnings** (amber): Should be reviewed but won't block submission

Common validation checks:
- Required fields are present
- URLs are valid format
- Regulatory information is consistent
```

## Technical Notes

- All date fields should be updated to "January 28, 2026"
- Version numbers in REVIEWER_GUIDE.md should increment to 1.2
- All new admin routes should be added to relevant "Key Routes" sections
- Cross-references between docs should be maintained

## Files Summary

| File | Type of Update |
|------|----------------|
| docs/README.md | Add visual editing to navigation, update routes |
| docs/ADMIN_GUIDE.md | Add Section 9: Product Edit Approvals |
| docs/REVIEWER_GUIDE.md | Rewrite Section 4: Reviewing Products |
| docs/review/GUIDE.md | Update review workflow with visual editing |
| docs/review/README.md | Update quick start for visual editing |
| docs/FIELD_REFERENCE.md | Add visual editing field types section |

## Success Criteria

After implementation:
1. All documentation reflects the visual editing workflow
2. Reviewers understand how to use in-browser editing
3. Admins know how to review and approve edits
4. Field reference includes editor type information
5. Evidence level classification is prominently documented
6. All dates and versions are updated consistently
