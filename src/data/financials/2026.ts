import type { FinancialYear } from "./types";

const expenses2026 = [
  { date: "2026-01-19", category: "Software & Tooling" as const, description: "Lovable subscription & credits", amount: 198.13 },
  { date: "2026-03-11", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 26.45 },
];

const total2026 = expenses2026.reduce((s, e) => s + e.amount, 0);

const year2026: FinancialYear = {
  year: 2026,
  currency: "EUR",
  carryOver: 0,
  income: [
    {
      date: "2026-05-07",
      source: "UMC Utrecht — operational sponsorship",
      gross: total2026,
      net: total2026,
      notes:
        "UMC Utrecht covers all running costs of DLinRT.eu (hosting, domain and tooling). All expenses below are reimbursed in full.",
    },
  ],
  expenses: expenses2026,
  lastUpdated: "2026-05-07",
  notes:
    "Year-to-date through May 2026. February had no charges; the May Lovable charge is pending reconciliation. UMC Utrecht continues to cover all operational costs.",
};

export default year2026;
