
# Dropdown Editors and Always-Visible Evidence Level

## Overview

This enhancement adds dropdown menus for fields with predefined categories and ensures the evidence level section is always visible and editable on every product page.

## Current Issues

1. **Category field uses text input** - The category field in edit mode is a free-text input, but there are 10 predefined categories that should be presented as a dropdown
2. **Modality/Anatomy use array editor** - These fields have predefined valid options but currently accept any text
3. **Evidence Level is hidden** - The entire "Evidence & Limitations" card is hidden when a product has no evidence data, making it invisible and impossible to add
4. **Evidence links not prominent** - Links to compelling evidence resources should be clearly visible

## Implementation Plan

### Part 1: New Field Editors for Dropdowns

#### 1.1 Create SelectFieldEditor.tsx

A new field editor for single-selection dropdowns:

**Features:**
- Accepts an `options` array with `{ value, label }` pairs
- Shows placeholder when no value selected
- Supports optional "clear" button
- Visual indication when field has changed
- Proper background and z-index for dropdown menu

**Location:** `src/components/product-editor/FieldEditors/SelectFieldEditor.tsx`

#### 1.2 Create MultiSelectFieldEditor.tsx

A new field editor for multi-selection from predefined options:

**Features:**
- Shows checkboxes or chips for each predefined option
- Allows selecting multiple values
- Also supports adding custom values not in the predefined list
- Visual indication of selected items
- Combines predefined options with free-text entry

**Location:** `src/components/product-editor/FieldEditors/MultiSelectFieldEditor.tsx`

### Part 2: Update EditableField Component

Extend the `EditableField` component to support new types:

**Changes to `EditableField.tsx`:**
- Add `select` type for single-selection dropdowns
- Add `multi-select` type for multi-selection from options
- Add `options` prop to pass predefined choices
- Import and render new editor components

**New Props:**
```typescript
interface EditableFieldProps {
  // ... existing props
  type?: 'text' | 'textarea' | 'array' | 'date' | 'url' | 'select' | 'multi-select';
  options?: Array<{ value: string; label: string }>;
}
```

### Part 3: Update GeneralInformationDetails.tsx

Convert fields with predefined options to use dropdowns:

| Field | Current Type | New Type | Options Source |
|-------|--------------|----------|----------------|
| Category | text | select | `PRODUCT_CATEGORIES` from constants |
| Secondary Categories | array | multi-select | `PRODUCT_CATEGORIES` |
| Modality | array | multi-select | `MODALITY_TAGS` from config/tags.ts |
| Anatomical Location | array | multi-select | `ANATOMY_TAGS` from config/tags.ts |
| Certification | text | select | `CERTIFICATION_TAGS` |

**Changes:**
- Import `PRODUCT_CATEGORIES`, `CATEGORY_LABELS` from constants
- Import `MODALITY_TAGS`, `ANATOMY_TAGS`, `CERTIFICATION_TAGS` from config/tags
- Convert `EditableField` components to use new types with options

### Part 4: Always-Visible Evidence Level Section

#### 4.1 Update EvidenceLimitationsDetails.tsx

Make the component always render:

**Current behavior:**
```typescript
if (!showEditor && !hasEvidence && !hasLimitations && !hasEvidenceLevel) {
  return null;  // Hidden when no data
}
```

**New behavior:**
- Always render the component
- Show "Not set" or "No evidence available" when empty
- Display evidence level dropdown prominently at the top
- Show placeholder for evidence links even when empty

**UI Changes:**
- Add prominent "Evidence Level" display at the top of the card
- Show "Add Evidence" button when no evidence exists (view mode)
- Make the "Clinical Evidence" section always visible with empty state
- Display evidence level badge in card header regardless of whether level is set

#### 4.2 Add Evidence Level to Product Header

Add the evidence level badge to `ProductHeaderInfo.tsx` for immediate visibility:

**Changes:**
- Import `EvidenceLevelBadge` component
- Display evidence level badge next to revision badges
- Show "No Evidence Level" indicator when not set (in edit mode)

### Part 5: Export New Editors

Update `FieldEditors/index.ts` to export the new components.

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/product-editor/FieldEditors/SelectFieldEditor.tsx` | Single-selection dropdown editor |
| `src/components/product-editor/FieldEditors/MultiSelectFieldEditor.tsx` | Multi-selection dropdown with predefined options |

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/product-editor/EditableField.tsx` | Add `select` and `multi-select` types with `options` prop |
| `src/components/product-editor/FieldEditors/index.ts` | Export new editors |
| `src/components/product/GeneralInformationDetails.tsx` | Use dropdowns for category, modality, anatomy, certification |
| `src/components/product/EvidenceLimitationsDetails.tsx` | Always render, show empty states, make evidence level prominent |
| `src/components/product/ProductHeaderInfo.tsx` | Add evidence level badge to header |

## Technical Details

### Select Field Editor UI

```text
┌─────────────────────────────────────┐
│ Auto-Contouring              ▼      │
└─────────────────────────────────────┘
       │
       ▼ (dropdown opens)
┌─────────────────────────────────────┐
│ Auto-Contouring                   ✓ │
│ Clinical Prediction                 │
│ Image Enhancement                   │
│ Quality Assurance                   │
│ Treatment Planning                  │
│ ...                                 │
└─────────────────────────────────────┘
```

### Multi-Select Field Editor UI

```text
Selected: [CT] [MRI] [+]

Available options:
┌─────────────────────────────────────┐
│ ☑ CT                                │
│ ☑ MRI                               │
│ ☐ CBCT                              │
│ ☐ PET                               │
│ ☐ PET/CT                            │
│ ────────────────────────────────    │
│ [Add custom...]                     │
└─────────────────────────────────────┘
```

### Always-Visible Evidence Section

```text
┌─────────────────────────────────────────────────────────────┐
│ Evidence & Limitations                   [Level 2] badge    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Evidence Level: [Dropdown selector]                         │
│ Notes: [Editable text area]                                 │
│                                                             │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│ Clinical Evidence                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ No evidence links available                      [+ Add] │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ─────────────────────────────────────────────────────────── │
│                                                             │
│ Limitations                                                 │
│ - No limitations specified                         [+ Add]  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Dropdown Styling Requirements

All dropdowns must follow these guidelines from the useful-context:
- Solid background color (not transparent)
- High z-index (z-50) to appear above other elements
- Proper contrast for readability

## Success Criteria

After implementation:
1. Category field shows dropdown with 10 predefined options in edit mode
2. Modality and Anatomy fields show multi-select with predefined options
3. Evidence & Limitations card is always visible on every product page
4. Evidence level is displayed prominently in the card header
5. Evidence level can be set even when no evidence links exist
6. Evidence level badge appears in the product header for quick reference
7. Empty states are clearly indicated with "Not set" or "Add" buttons
