import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  FINANCIAL_YEARS,
  type FinancialYear,
  type ExpenseEntry,
  type IncomeEntry,
  type ExpenseCategory,
} from "@/data/financials";

export interface DbExpenseRow {
  id: string;
  entry_date: string;
  category: string;
  description: string;
  amount: number;
  notes: string | null;
}
export interface DbIncomeRow {
  id: string;
  entry_date: string;
  source: string;
  gross: number;
  net: number;
  notes: string | null;
}

const yearOf = (d: string) => parseInt(d.slice(0, 4), 10);

export const useFinancialYears = () => {
  const [years, setYears] = useState<FinancialYear[]>(FINANCIAL_YEARS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: exp }, { data: inc }] = await Promise.all([
      supabase.from("financial_expenses").select("*").order("entry_date", { ascending: false }),
      supabase.from("financial_income").select("*").order("entry_date", { ascending: false }),
    ]);

    // Clone static years
    const map = new Map<number, FinancialYear>();
    for (const y of FINANCIAL_YEARS) {
      map.set(y.year, {
        ...y,
        income: [...y.income],
        expenses: [...y.expenses],
      });
    }

    const ensure = (yr: number): FinancialYear => {
      let y = map.get(yr);
      if (!y) {
        y = {
          year: yr,
          currency: "EUR",
          carryOver: 0,
          income: [],
          expenses: [],
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
        map.set(yr, y);
      }
      return y;
    };

    for (const row of (exp ?? []) as DbExpenseRow[]) {
      const y = ensure(yearOf(row.entry_date));
      const entry: ExpenseEntry = {
        date: row.entry_date,
        category: row.category as ExpenseCategory,
        description: row.description,
        amount: Number(row.amount),
        notes: row.notes ?? undefined,
      };
      y.expenses.push(entry);
    }
    for (const row of (inc ?? []) as DbIncomeRow[]) {
      const y = ensure(yearOf(row.entry_date));
      const entry: IncomeEntry = {
        date: row.entry_date,
        source: row.source,
        gross: Number(row.gross),
        net: Number(row.net),
        notes: row.notes ?? undefined,
      };
      y.income.push(entry);
    }

    for (const y of map.values()) {
      y.expenses.sort((a, b) => b.date.localeCompare(a.date));
      y.income.sort((a, b) => b.date.localeCompare(a.date));
    }

    setYears(Array.from(map.values()).sort((a, b) => b.year - a.year));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { years, loading, refresh: load };
};
