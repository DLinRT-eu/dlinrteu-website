import { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FINANCIAL_YEARS,
  formatEUR,
  summarizeYear,
  type FinancialYear,
} from "@/data/financials";

const CATEGORY_COLORS = [
  "#5090D0",
  "#1a1a2e",
  "#7FB069",
  "#E0A458",
  "#9B5DE5",
  "#F25F5C",
];

const YearReport = ({ year }: { year: FinancialYear }) => {
  const summary = useMemo(() => summarizeYear(year), [year]);

  const expenseByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of year.expenses) {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    }
    return Array.from(map, ([name, value]) => ({ name, value }));
  }, [year.expenses]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total income (net)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatEUR(summary.totalIncome)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Gross {formatEUR(summary.totalGrossIncome)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatEUR(summary.totalExpenses)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                summary.net >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {formatEUR(summary.net)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Closing balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatEUR(summary.closingBalance)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Carry-over {formatEUR(year.carryOver)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
          <CardContent>
            {year.income.length === 0 ? (
              <p className="text-sm text-muted-foreground">No income recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Gross</TableHead>
                      <TableHead className="text-right">Net</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {year.income.map((e, i) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-nowrap">{e.date}</TableCell>
                        <TableCell>
                          <div>{e.source}</div>
                          {e.notes && (
                            <div className="text-xs text-muted-foreground">{e.notes}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">{formatEUR(e.gross)}</TableCell>
                        <TableCell className="text-right">{formatEUR(e.net)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by category</CardTitle>
          </CardHeader>
          <CardContent>
            {expenseByCategory.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Cost details will be published once the annual ledger is finalised.
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label={(d) => formatEUR(d.value as number)}
                    >
                      {expenseByCategory.map((_, idx) => (
                        <Cell
                          key={idx}
                          fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RTooltip formatter={(v: number) => formatEUR(v)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {year.expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No expenses recorded yet for {year.year}.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {year.expenses.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell className="whitespace-nowrap">{e.date}</TableCell>
                      <TableCell>{e.category}</TableCell>
                      <TableCell>
                        <div>{e.description}</div>
                        {e.notes && (
                          <div className="text-xs text-muted-foreground">{e.notes}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{formatEUR(e.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Last updated: {year.lastUpdated}
        {year.notes ? ` — ${year.notes}` : ""}
      </p>
    </div>
  );
};

const Transparency = () => {
  const years = FINANCIAL_YEARS;
  const [active, setActive] = useState(String(years[0]?.year ?? new Date().getFullYear()));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Financial Transparency",
    description:
      "Annual financial overview of DLinRT.eu — income, expenses, and balance, published openly to foster transparency.",
    url: "https://dlinrt.eu/transparency",
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Financial Transparency - DLinRT.eu Annual Overview"
        description="Annual income and expenses for DLinRT.eu, published openly to document how community donations are used."
        canonical="https://dlinrt.eu/transparency"
        structuredData={structuredData}
      />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold">Financial Transparency</h1>
          <p className="text-muted-foreground max-w-3xl">
            DLinRT.eu is a community-driven, non-commercial initiative. To keep our
            funding accountable, we publish an annual overview of income and
            expenses. Donations come primarily through our GoFundMe campaign and are
            used to cover hosting, domains, and outreach costs.
          </p>
        </header>

        {years.length > 1 ? (
          <Tabs value={active} onValueChange={setActive}>
            <TabsList>
              {years.map((y) => (
                <TabsTrigger key={y.year} value={String(y.year)}>
                  {y.year}
                </TabsTrigger>
              ))}
            </TabsList>
            {years.map((y) => (
              <TabsContent key={y.year} value={String(y.year)} className="mt-6">
                <YearReport year={y} />
              </TabsContent>
            ))}
          </Tabs>
        ) : years[0] ? (
          <YearReport year={years[0]} />
        ) : (
          <p className="text-muted-foreground">No financial reports published yet.</p>
        )}

        <Card className="bg-muted/30">
          <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
            <div>
              <h2 className="text-lg font-semibold">Support DLinRT.eu</h2>
              <p className="text-sm text-muted-foreground">
                Contributions are processed through GoFundMe. All proceeds are
                reflected in the report above.
              </p>
            </div>
            <Button
              onClick={() =>
                window.open("https://gofund.me/f775f8ba", "_blank", "noopener,noreferrer")
              }
              className="bg-[#FF6F2F] hover:bg-[#FF5A1F] text-white flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Donate on GoFundMe
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Transparency;
