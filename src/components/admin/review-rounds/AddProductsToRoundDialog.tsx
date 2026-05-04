import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Search, PackagePlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";
import {
  bulkAssignProducts,
  calculateProposedAssignments,
  type AssignmentAlgorithm,
} from "@/utils/reviewRoundUtils";
import type { ReviewRound } from "@/utils/reviewRoundUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  round: ReviewRound;
  onUpdate: () => void;
}

export function AddProductsToRoundDialog({ open, onOpenChange, round, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingIds, setExistingIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [algorithm, setAlgorithm] = useState<AssignmentAlgorithm>("balanced");
  const [deadline, setDeadline] = useState<string>(round.default_deadline ?? "");

  useEffect(() => {
    if (!open) return;
    setSelected(new Set());
    setSearch("");
    setCategoryFilter("all");
    setDeadline(round.default_deadline ?? "");
    loadExisting();
  }, [open, round.id]);

  const loadExisting = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("product_id")
        .eq("review_round_id", round.id);
      if (error) throw error;
      setExistingIds(new Set((data ?? []).map((r) => r.product_id)));
    } catch (err) {
      console.error("Failed to load existing assignments:", err);
      toast.error("Failed to load existing round assignments");
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    ALL_PRODUCTS.forEach((p) => p.category && set.add(p.category));
    return Array.from(set).sort();
  }, []);

  const candidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => !existingIds.has(p.id))
      .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
      .filter((p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      )
      .slice(0, 500);
  }, [search, categoryFilter, existingIds]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllVisible = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      const allSelected = candidates.every((c) => next.has(c.id));
      if (allSelected) {
        candidates.forEach((c) => next.delete(c.id));
      } else {
        candidates.forEach((c) => next.add(c.id));
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) {
      toast.error("Select at least one product");
      return;
    }
    setSubmitting(true);
    try {
      const proposed = await calculateProposedAssignments(ids, undefined, algorithm);
      const result = await bulkAssignProducts(
        round.id,
        ids,
        deadline || undefined,
        proposed
      );
      if (result.failed > 0) {
        toast.warning(`Added ${result.success}, ${result.failed} failed`);
      } else {
        toast.success(`Added ${result.success} product${result.success === 1 ? "" : "s"} to round`);
      }
      onOpenChange(false);
      onUpdate();
    } catch (err) {
      console.error("Failed to add products:", err);
      const msg = err instanceof Error ? err.message : "Failed to add products";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const allVisibleSelected = candidates.length > 0 && candidates.every((c) => selected.has(c.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackagePlus className="h-5 w-5" />
            Add Products to "{round.name}"
          </DialogTitle>
          <DialogDescription>
            Select additional products to assign in this round. Products already in the round are hidden.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product, company, or ID"
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              {loading ? "Loading…" : `${candidates.length} available · ${selected.size} selected`}
            </div>
            <Button variant="ghost" size="sm" onClick={toggleAllVisible} disabled={candidates.length === 0}>
              {allVisibleSelected ? "Clear visible" : "Select visible"}
            </Button>
          </div>

          <ScrollArea className="flex-1 border rounded-md">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : candidates.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                {existingIds.size === ALL_PRODUCTS.length
                  ? "All products are already assigned to this round."
                  : "No products match your filters."}
              </div>
            ) : (
              <div className="divide-y">
                {candidates.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.has(p.id)}
                      onCheckedChange={() => toggle(p.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {p.company} · {p.category}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">{p.id}</Badge>
                  </label>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
            <div className="space-y-1">
              <Label>Assignment algorithm</Label>
              <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as AssignmentAlgorithm)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (workload + expertise)</SelectItem>
                  <SelectItem value="expertise-first">Expertise first</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Deadline (optional)</Label>
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || selected.size === 0}>
            {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Adding…</>) : `Add ${selected.size} product${selected.size === 1 ? "" : "s"}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
