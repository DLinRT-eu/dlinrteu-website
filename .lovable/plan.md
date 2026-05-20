# Admin-managed financial entries

Today, financial data lives in static TypeScript files (`src/data/financials/2025.ts`, `2026.ts`) and is rendered on `/transparency`. Admins cannot add or remove entries without a code change. This plan adds a small admin UI backed by Supabase so admins can manage income and expenses directly.

## What admins will get

A new page **/admin/financials** (linked from the admin overview) with two tabs: **Expenses** and **Income**.

Each tab shows a table of entries with:
- Year filter (defaults to current year)
- "Add entry" button opening a dialog
- Inline delete (trash icon) with confirmation
- Inline edit (pencil) reopening the same dialog

**Expense dialog fields**: date, category (dropdown from existing `ExpenseCategory` union), description, amount (EUR), notes (optional).

**Income dialog fields**: date, source, gross (EUR), net (EUR), notes (optional).

Validation via `react-hook-form` + `zod`. Toasts on success/error via `useToast`.

## What the public sees

`/transparency` keeps the exact same layout. The page will merge:
1. Static entries from `src/data/financials/*` (kept as historical seed).
2. DB entries from the new tables.

Merging happens in a new hook `useFinancialYears()` that returns the same `FinancialYear[]` shape as `FINANCIAL_YEARS` today, so `summarizeYear`, charts, and tables continue to work unchanged. Entries are grouped by year, sorted by date.

To avoid double-counting once an entry is migrated to the DB, the static 2025/2026 arrays stay as-is for now; new entries go to the DB. If the admin wants to remove a static entry, the plan is to first move it to the DB, then delete it from the static file (a follow-up task — not part of this change).

## Technical details

**New tables** (migration):
- `financial_expenses`: `id uuid pk`, `entry_date date not null`, `category text not null`, `description text not null`, `amount numeric(12,2) not null`, `currency text default 'EUR'`, `notes text`, `created_by uuid`, `created_at timestamptz default now()`, `updated_at timestamptz default now()`.
- `financial_income`: `id uuid pk`, `entry_date date not null`, `source text not null`, `gross numeric(12,2) not null`, `net numeric(12,2) not null`, `currency text default 'EUR'`, `notes text`, `created_by uuid`, `created_at timestamptz default now()`, `updated_at timestamptz default now()`.

**RLS**:
- `SELECT`: public (anon + authenticated) — financial transparency is already public on the site.
- `INSERT/UPDATE/DELETE`: `has_role(auth.uid(), 'admin'::app_role)` only.
- Explicit `Deny anonymous` for write commands is implicit (no policy = denied).

**New files**:
- `supabase/migrations/<ts>_financial_entries.sql` — tables + RLS + `updated_at` trigger.
- `src/hooks/useFinancialEntries.ts` — fetch + mutate DB rows.
- `src/hooks/useFinancialYears.ts` — merges static + DB rows into `FinancialYear[]`.
- `src/pages/admin/FinancialsAdmin.tsx` — tabs, tables, dialogs.
- `src/components/admin/financials/ExpenseFormDialog.tsx`
- `src/components/admin/financials/IncomeFormDialog.tsx`

**Edited files**:
- `src/pages/Transparency.tsx` — swap `FINANCIAL_YEARS` import for `useFinancialYears()` hook output.
- `src/App.tsx` — register `/admin/financials` route under the admin guard.
- `src/pages/admin/AdminOverview.tsx` — add a card/link to the new page.

No changes to `src/data/financials/*` files, no changes to chart/table presentation, no auth or RLS changes outside the two new tables.

## Out of scope

- Editing the static 2025/2026 entries from the UI (kept read-only for now).
- CSV import/export of entries.
- Multi-currency support (locked to EUR, matching current behaviour).
