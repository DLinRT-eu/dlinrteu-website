import type { FinancialYear } from "./types";

const expenses2025 = [
  { date: "2025-04-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 22.54 },
  { date: "2025-04-26", category: "Domain & Email" as const, description: "IONOS domain (dlinrt.eu)", amount: 9.76 },
  { date: "2025-05-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 22.66 },
  { date: "2025-06-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 22.00 },
  { date: "2025-07-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.78 },
  { date: "2025-08-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.85 },
  { date: "2025-09-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.85 },
  { date: "2025-10-07", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.87 },
  { date: "2025-10-22", category: "Software & Tooling" as const, description: "Lovable credits top-up", amount: 44.05 },
  { date: "2025-10-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.98 },
  { date: "2025-10-27", category: "Software & Tooling" as const, description: "Lovable credits top-up", amount: 21.98 },
  { date: "2025-11-01", category: "Software & Tooling" as const, description: "Lovable credits top-up", amount: 44.26 },
  { date: "2025-11-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 22.15 },
  { date: "2025-11-28", category: "Software & Tooling" as const, description: "Lovable credits top-up", amount: 22.03 },
  { date: "2025-12-01", category: "Software & Tooling" as const, description: "Lovable credits top-up", amount: 44.14 },
  { date: "2025-12-26", category: "Software & Tooling" as const, description: "Lovable subscription", amount: 21.66 },
];

const total2025 = expenses2025.reduce((s, e) => s + e.amount, 0);

const year2025: FinancialYear = {
  year: 2025,
  currency: "EUR",
  carryOver: 0,
  income: [
    {
      date: "2025-12-31",
      source: "UMC Utrecht — operational sponsorship",
      gross: total2025,
      net: total2025,
      notes:
        "UMC Utrecht covers all running costs of DLinRT.eu (hosting, domain and tooling). All expenses below are reimbursed in full.",
    },
  ],
  expenses: expenses2025,
  lastUpdated: "2026-05-07",
  notes:
    "All operational costs for 2025 were covered by UMC Utrecht. Net result: €0.",
};

export default year2025;
