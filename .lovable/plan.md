## Goal

Keep the existing GoFundMe link in Support (no payments integration). Add a new public **Financial Transparency** page that publishes an annual overview of income and expenses, linked from the About page. Structure it so it's easy to update each year once you provide the Excel file with the cost details.

## Scope

- No payment provider, no checkout, no Stripe/Paddle.
- Page is public, read-only, statically rendered from a typed data file.
- Initial content uses placeholders + the income side we already know (donations via GoFundMe). Costs will be filled in once you share the Excel.

## Deliverables

1. **New route** `/transparency` (page: `src/pages/Transparency.tsx`)
  - Hero: short statement on why we publish this (non-profit, community-funded, full transparency).
  - Year selector (tabs) — starts with 2025, easy to add 2026, etc.
  - Per-year sections:
    - Summary cards: Total income, Total expenses, Net balance, Carry-over.
    - **Income table**: source, date, gross amount, net amount, notes (e.g. GoFundMe fees).
    - **Expenses table**: category, description, date, amount, notes.
    - **Breakdown chart**: simple Recharts pie/bar of expenses by category.
  - "Last updated" timestamp + link to GoFundMe campaign for ongoing donations.
  - SEO + structured data (`Dataset` / `Report`).
2. **Typed data layer** `src/data/financials/`
  - `types.ts` — `FinancialYear`, `IncomeEntry`, `ExpenseEntry`, `ExpenseCategory`.
  - `2025.ts` — initial year file with placeholders; income pre-seeded with GoFundMe row(s) you can edit, expenses left empty pending the Excel.
  - `index.ts` — array export of all years, sorted desc.
  - When you send the Excel later, I'll write a small one-shot script to convert it into `2025.ts` (or whatever year) entries — no manual retyping.
3. **About page link**
  - Add a clearly visible "Financial Transparency" link/card in `src/pages/About.tsx` pointing to `/transparency`.
4. **Routing**
  - Register `/transparency` in `src/App.tsx` (lazy-loaded, public).
5. **Keep GoFundMe**
  - No changes to `Support.tsx` donate button.
  - Add a small "Support us on GoFundMe" CTA at the bottom of the Transparency page that reuses the same URL.
6. &nbsp;
7. Within the scope

- Admin form to keep track of costs/income,no DB table — annual updates are committed to the data files (low frequency, fits your workflow) and via the form.
- No automatic Excel parsing in the app at runtime; conversion happens once at build/author time.

## Technical notes

- Stack: React + Tailwind + shadcn/ui Tabs, Card, Table; Recharts for the breakdown.
- Currency formatting via `Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' })`.
- File layout:
  ```text
  src/
    pages/Transparency.tsx
    data/financials/
      types.ts
      2025.ts
      index.ts
  ```
- Categories suggestion (you can edit): Hosting & Infrastructure, Domain & Email, Software/Tooling, Conferences & Outreach, Legal/Admin, Other.

## Next step after approval

I implement the page + data scaffolding with placeholder/empty cost data. When you upload the Excel, I'll parse it and populate `2025.ts`.