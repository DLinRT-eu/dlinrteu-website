import type { FinancialYear } from "./types";

const year2025: FinancialYear = {
  year: 2025,
  currency: "EUR",
  carryOver: 0,
  income: [
    // Pre-seeded placeholder for GoFundMe donations.
    // Replace with actual entries once payouts are reconciled.
    {
      date: "2025-12-31",
      source: "GoFundMe community donations",
      gross: 0,
      net: 0,
      notes: "Aggregated donations via gofund.me/f775f8ba (placeholder — to be updated).",
    },
  ],
  expenses: [
    // To be populated from the Excel file provided by the maintainer.
  ],
  lastUpdated: "2026-05-05",
  notes:
    "Initial transparency report. Cost details will be added once the annual ledger is finalised.",
};

export default year2025;
