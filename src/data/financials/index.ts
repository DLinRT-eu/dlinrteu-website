import type { FinancialYear } from "./types";
import year2025 from "./2025";

export const FINANCIAL_YEARS: FinancialYear[] = [year2025].sort(
  (a, b) => b.year - a.year,
);

export const formatEUR = (value: number): string =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);

export const summarizeYear = (y: FinancialYear) => {
  const totalIncome = y.income.reduce((s, e) => s + e.net, 0);
  const totalGrossIncome = y.income.reduce((s, e) => s + e.gross, 0);
  const totalExpenses = y.expenses.reduce((s, e) => s + e.amount, 0);
  const net = totalIncome - totalExpenses;
  const closingBalance = y.carryOver + net;
  return { totalIncome, totalGrossIncome, totalExpenses, net, closingBalance };
};

export type { FinancialYear, IncomeEntry, ExpenseEntry, ExpenseCategory } from "./types";
