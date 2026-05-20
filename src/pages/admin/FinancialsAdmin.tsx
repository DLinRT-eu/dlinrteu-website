import { useEffect, useState, useCallback } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatEUR } from "@/data/financials";

const EXPENSE_CATEGORIES = [
  "Hosting & Infrastructure",
  "Domain & Email",
  "Software & Tooling",
  "Conferences & Outreach",
  "Legal & Admin",
  "Other",
] as const;

interface ExpenseRow {
  id: string;
  entry_date: string;
  category: string;
  description: string;
  amount: number;
  notes: string | null;
}

interface IncomeRow {
  id: string;
  entry_date: string;
  source: string;
  gross: number;
  net: number;
  notes: string | null;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

function ExpenseDialog({
  open,
  onOpenChange,
  initial,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: ExpenseRow | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [entryDate, setEntryDate] = useState(initial?.entry_date ?? todayISO());
  const [category, setCategory] = useState<string>(initial?.category ?? "Software & Tooling");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [amount, setAmount] = useState<string>(initial ? String(initial.amount) : "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setEntryDate(initial?.entry_date ?? todayISO());
      setCategory(initial?.category ?? "Software & Tooling");
      setDescription(initial?.description ?? "");
      setAmount(initial ? String(initial.amount) : "");
      setNotes(initial?.notes ?? "");
    }
  }, [open, initial]);

  const submit = async () => {
    const amt = parseFloat(amount);
    if (!description.trim() || isNaN(amt)) {
      toast({ title: "Missing data", description: "Description and a valid amount are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      entry_date: entryDate,
      category,
      description: description.trim(),
      amount: amt,
      notes: notes.trim() || null,
    };
    const { error } = initial
      ? await supabase.from("financial_expenses").update(payload).eq("id", initial.id)
      : await supabase.from("financial_expenses").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: initial ? "Expense updated" : "Expense added" });
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit expense" : "Add expense"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Date</Label>
            <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label>Amount (EUR)</Label>
            <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <Label>Notes (optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IncomeDialog({
  open,
  onOpenChange,
  initial,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: IncomeRow | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [entryDate, setEntryDate] = useState(initial?.entry_date ?? todayISO());
  const [source, setSource] = useState(initial?.source ?? "");
  const [gross, setGross] = useState<string>(initial ? String(initial.gross) : "");
  const [net, setNet] = useState<string>(initial ? String(initial.net) : "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setEntryDate(initial?.entry_date ?? todayISO());
      setSource(initial?.source ?? "");
      setGross(initial ? String(initial.gross) : "");
      setNet(initial ? String(initial.net) : "");
      setNotes(initial?.notes ?? "");
    }
  }, [open, initial]);

  const submit = async () => {
    const g = parseFloat(gross);
    const n = parseFloat(net);
    if (!source.trim() || isNaN(g) || isNaN(n)) {
      toast({ title: "Missing data", description: "Source, gross and net are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      entry_date: entryDate,
      source: source.trim(),
      gross: g,
      net: n,
      notes: notes.trim() || null,
    };
    const { error } = initial
      ? await supabase.from("financial_income").update(payload).eq("id", initial.id)
      : await supabase.from("financial_income").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: initial ? "Income updated" : "Income added" });
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit income" : "Add income"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Date</Label>
            <Input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
          </div>
          <div>
            <Label>Source</Label>
            <Input value={source} onChange={(e) => setSource(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Gross (EUR)</Label>
              <Input type="number" step="0.01" value={gross} onChange={(e) => setGross(e.target.value)} />
            </div>
            <div>
              <Label>Net (EUR)</Label>
              <Input type="number" step="0.01" value={net} onChange={(e) => setNet(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Notes (optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function FinancialsAdmin() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [income, setIncome] = useState<IncomeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expDialog, setExpDialog] = useState(false);
  const [incDialog, setIncDialog] = useState(false);
  const [editExp, setEditExp] = useState<ExpenseRow | null>(null);
  const [editInc, setEditInc] = useState<IncomeRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: e }, { data: i }] = await Promise.all([
      supabase.from("financial_expenses").select("*").order("entry_date", { ascending: false }),
      supabase.from("financial_income").select("*").order("entry_date", { ascending: false }),
    ]);
    setExpenses((e ?? []) as ExpenseRow[]);
    setIncome((i ?? []) as IncomeRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const removeExpense = async (id: string) => {
    const { error } = await supabase.from("financial_expenses").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    toast({ title: "Expense deleted" });
    load();
  };
  const removeIncome = async (id: string) => {
    const { error } = await supabase.from("financial_income").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    toast({ title: "Income deleted" });
    load();
  };

  return (
    <PageLayout>
      <SEO title="Financials Admin" description="Admin management of financial entries" />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Financials</h1>
          <p className="text-muted-foreground">
            Manage income and expense entries shown on the public Transparency page.
            Historical entries from static files remain visible but cannot be edited here.
          </p>
        </header>

        <Tabs defaultValue="expenses">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Expenses ({expenses.length})</CardTitle>
                <Dialog open={expDialog} onOpenChange={(o) => { setExpDialog(o); if (!o) setEditExp(null); }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { setEditExp(null); setExpDialog(true); }}>
                      <Plus className="h-4 w-4 mr-2" /> Add expense
                    </Button>
                  </DialogTrigger>
                  <ExpenseDialog open={expDialog} onOpenChange={setExpDialog} initial={editExp} onSaved={load} />
                </Dialog>
              </CardHeader>
              <CardContent>
                {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : expenses.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No DB expenses yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-24" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((e) => (
                        <TableRow key={e.id}>
                          <TableCell className="whitespace-nowrap">{e.entry_date}</TableCell>
                          <TableCell>{e.category}</TableCell>
                          <TableCell>
                            <div>{e.description}</div>
                            {e.notes && <div className="text-xs text-muted-foreground">{e.notes}</div>}
                          </TableCell>
                          <TableCell className="text-right">{formatEUR(Number(e.amount))}</TableCell>
                          <TableCell className="text-right">
                            <Button size="icon" variant="ghost" onClick={() => { setEditExp(e); setExpDialog(true); }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete expense?</AlertDialogTitle>
                                  <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => removeExpense(e.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Income ({income.length})</CardTitle>
                <Dialog open={incDialog} onOpenChange={(o) => { setIncDialog(o); if (!o) setEditInc(null); }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { setEditInc(null); setIncDialog(true); }}>
                      <Plus className="h-4 w-4 mr-2" /> Add income
                    </Button>
                  </DialogTrigger>
                  <IncomeDialog open={incDialog} onOpenChange={setIncDialog} initial={editInc} onSaved={load} />
                </Dialog>
              </CardHeader>
              <CardContent>
                {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : income.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No DB income yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Gross</TableHead>
                        <TableHead className="text-right">Net</TableHead>
                        <TableHead className="w-24" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {income.map((i) => (
                        <TableRow key={i.id}>
                          <TableCell className="whitespace-nowrap">{i.entry_date}</TableCell>
                          <TableCell>
                            <div>{i.source}</div>
                            {i.notes && <div className="text-xs text-muted-foreground">{i.notes}</div>}
                          </TableCell>
                          <TableCell className="text-right">{formatEUR(Number(i.gross))}</TableCell>
                          <TableCell className="text-right">{formatEUR(Number(i.net))}</TableCell>
                          <TableCell className="text-right">
                            <Button size="icon" variant="ghost" onClick={() => { setEditInc(i); setIncDialog(true); }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete income?</AlertDialogTitle>
                                  <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => removeIncome(i.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
