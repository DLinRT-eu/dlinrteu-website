export type ExpenseCategory =
  | "Hosting & Infrastructure"
  | "Domain & Email"
  | "Software & Tooling"
  | "Conferences & Outreach"
  | "Legal & Admin"
  | "Other";

export interface IncomeEntry {
  date: string; // ISO yyyy-mm-dd
  source: string;
  gross: number; // EUR
  net: number; // EUR (after fees)
  notes?: string;
}

export interface ExpenseEntry {
  date: string; // ISO yyyy-mm-dd
  category: ExpenseCategory;
  description: string;
  amount: number; // EUR
  notes?: string;
}

export interface FinancialYear {
  year: number;
  currency: "EUR";
  carryOver: number; // balance brought forward from previous year
  income: IncomeEntry[];
  expenses: ExpenseEntry[];
  lastUpdated: string; // ISO date
  notes?: string;
}
