## Goal

Replace the two separate buttons on the Company Dashboard ("Structured Submission" and "Submit Revision") with a single **"Submit Update"** button that opens one unified dialog with two tabs — **Structured** (recommended) and **Free Text** — plus inline guidance helping the company rep choose.

## Current State

`src/pages/company/Dashboard.tsx` exposes two parallel entry points:
- `StructuredCertificationDialog` (gated by `structuredDialogOpen`) — submits version, CE/FDA, evidence links, etc.
- A free-text `Dialog` (gated by `dialogOpen`) — calls `create_company_revision` RPC with product + change description.

Both write to `company_revisions` and refresh via `fetchRevisions()`. They duplicate trigger UI and confuse reps about which to use.

## Plan

### 1. New component `src/components/company/UnifiedSubmissionDialog.tsx`

- Props: `open`, `onOpenChange`, `products`, `onSubmitted`.
- Layout: shadcn `Dialog` containing a top guidance banner + shadcn `Tabs` with two tabs:
  - **Structured (recommended)** — embeds the existing form body extracted from `StructuredCertificationDialog` (version, regulatory status, evidence URLs, notified body, etc.). Badge: "Faster review · Powers verified badge".
  - **Free text** — product selector + change description textarea (current free-text flow). Badge: "Use for unstructured updates".
- Guidance banner (always visible above tabs): one-line "Choose Structured for product facts (version, CE/FDA, evidence). Use Free text only for narrative changes that don't fit a field."
- Per-tab helper text under the tab header reinforcing when to pick each option.
- Submit button is rendered per tab and reuses the existing submit handlers.

### 2. Refactor `StructuredCertificationDialog`

- Extract its inner form into an exported `StructuredCertificationForm` (no Dialog wrapper, accepts `onSubmitted` + `onCancel`).
- Keep the existing `StructuredCertificationDialog` as a thin wrapper around the form for backward compatibility (in case it is used elsewhere — verify and remove imports if not).

### 3. Update `src/pages/company/Dashboard.tsx`

- Remove `structuredDialogOpen` + `dialogOpen` state and both old `Dialog`/trigger blocks (lines ~360–502 area).
- Replace with a single primary button **"Submit Update"** + `UnifiedSubmissionDialog` controlled by one `submitOpen` state.
- Keep `handleSubmitRevision` logic but move/reuse it inside the free-text tab (passed via the form or kept in dashboard with a callback prop). Simplest: move both submit handlers into the new dialog component, passing `products` and `onSubmitted={fetchRevisions}`.
- Keep the separate "Certify Product" dialog as-is (different workflow) — out of scope.

### 4. UX details

- Default open tab: **Structured**.
- After successful submission in either tab, close dialog, toast, and call `onSubmitted`.
- Both tabs share the same product selector at the top so switching tabs preserves the chosen product.
- Empty product list → show inline message "No products assigned to your company yet."

### 5. Verification

- Manual: open dashboard as a company rep, confirm single "Submit Update" button, both tabs work and write to `company_revisions`, lists refresh, withdraw still works.
- Grep for any other consumers of `StructuredCertificationDialog` to ensure none break.

## Out of Scope

- Certify Product dialog, withdraw flow, RPC changes, admin/reviewer side, GitHub PR sync.
