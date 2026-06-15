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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Shuffle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";
import {
  calculateProposedAssignments,
  reassignProductReviewAdmin,
  type AssignmentAlgorithm,
  type ReviewRound,
} from "@/utils/reviewRoundUtils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  round: ReviewRound;
  onUpdate: () => void;
}

interface CurrentAssignment {
  id: string;
  product_id: string;
  assigned_to: string;
  reviewer_name?: string;
}

interface ProposedRow {
  reviewId: string;
  productId: string;
  productName: string;
  currentReviewerId: string;
  currentReviewerName: string;
  proposedReviewerId: string;
  proposedReviewerName: string;
  changed: boolean;
}

export function ShuffleAssignmentsDialog({ open, onOpenChange, round, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [computing, setComputing] = useState(false);
  const [algorithm, setAlgorithm] = useState<AssignmentAlgorithm>("balanced");
  const [current, setCurrent] = useState<CurrentAssignment[]>([]);
  const [reviewerMap, setReviewerMap] = useState<Map<string, string>>(new Map());
  const [proposed, setProposed] = useState<ProposedRow[] | null>(null);

  useEffect(() => {
    if (!open) {
      setProposed(null);
      return;
    }
    void loadCurrent();
  }, [open, round.id]);

  const loadCurrent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("id, product_id, assigned_to")
        .eq("review_round_id", round.id)
        .not("assigned_to", "is", null);
      if (error) throw error;

      const rows = (data ?? []) as CurrentAssignment[];
      setCurrent(rows);

      const reviewerIds = Array.from(new Set(rows.map((r) => r.assigned_to))).filter(Boolean);
      if (reviewerIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email")
          .in("id", reviewerIds);
        const map = new Map<string, string>();
        (profiles ?? []).forEach((p: any) => {
          map.set(p.id, `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || p.email);
        });
        setReviewerMap(map);
      } else {
        setReviewerMap(new Map());
      }
    } catch (err) {
      console.error("Failed to load assignments:", err);
      toast.error("Failed to load current assignments");
    } finally {
      setLoading(false);
    }
  };

  const compute = async () => {
    if (current.length === 0) {
      toast.error("No assignments to shuffle");
      return;
    }
    setComputing(true);
    try {
      const productIds = current.map((c) => c.product_id);
      const result = await calculateProposedAssignments(productIds, undefined, algorithm);
      const proposedMap = new Map(result.map((p) => [p.product_id, p.assigned_to]));

      // Ensure proposed reviewer names available
      const extraIds = Array.from(
        new Set(result.map((r) => r.assigned_to).filter((id) => !reviewerMap.has(id)))
      );
      let nameMap = reviewerMap;
      if (extraIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email")
          .in("id", extraIds);
        nameMap = new Map(reviewerMap);
        (profiles ?? []).forEach((p: any) => {
          nameMap.set(p.id, `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || p.email);
        });
        setReviewerMap(nameMap);
      }

      const rows: ProposedRow[] = current.map((c) => {
        const product = ALL_PRODUCTS.find((p) => p.id === c.product_id);
        const proposedReviewerId = proposedMap.get(c.product_id) || c.assigned_to;
        return {
          reviewId: c.id,
          productId: c.product_id,
          productName: product?.name || c.product_id,
          currentReviewerId: c.assigned_to,
          currentReviewerName: nameMap.get(c.assigned_to) || c.assigned_to,
          proposedReviewerId,
          proposedReviewerName: nameMap.get(proposedReviewerId) || proposedReviewerId,
          changed: proposedReviewerId !== c.assigned_to,
        };
      });
      setProposed(rows);
    } catch (err) {
      console.error("Shuffle failed:", err);
      toast.error(err instanceof Error ? err.message : "Failed to compute new assignments");
    } finally {
      setComputing(false);
    }
  };

  const changedCount = useMemo(() => proposed?.filter((r) => r.changed).length ?? 0, [proposed]);

  const apply = async () => {
    if (!proposed) return;
    const toApply = proposed.filter((r) => r.changed);
    if (toApply.length === 0) {
      toast.info("No changes to apply");
      return;
    }
    setSubmitting(true);
    let success = 0;
    let failed = 0;
    const reason = `Bulk shuffle (${algorithm})`;
    for (const row of toApply) {
      try {
        const res = await reassignProductReviewAdmin(row.reviewId, row.proposedReviewerId, reason);
        if (res?.success) success++;
        else {
          failed++;
          console.error("Reassign failed:", res);
        }
      } catch (err) {
        failed++;
        console.error("Reassign error:", err);
      }
    }
    setSubmitting(false);
    if (failed > 0) {
      toast.warning(`Reassigned ${success}, ${failed} failed`);
    } else {
      toast.success(`Reassigned ${success} assignment${success === 1 ? "" : "s"}`);
    }
    onOpenChange(false);
    onUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Shuffle Assignments — "{round.name}"
          </DialogTitle>
          <DialogDescription>
            Re-run the assignment algorithm across the {current.length} current assignment
            {current.length === 1 ? "" : "s"} in this draft round. Preview changes before applying.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
            <div className="space-y-1">
              <Label>Assignment algorithm</Label>
              <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as AssignmentAlgorithm)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (workload + expertise)</SelectItem>
                  <SelectItem value="expertise-first">Expertise first</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={compute} disabled={loading || computing || current.length === 0}>
              {computing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Computing…</>
              ) : (
                <><Shuffle className="h-4 w-4 mr-2" />Preview shuffle</>
              )}
            </Button>
          </div>

          <ScrollArea className="flex-1 border rounded-md min-h-[200px]">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : !proposed ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                Choose an algorithm and click "Preview shuffle" to see proposed changes.
              </div>
            ) : proposed.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                No assignments in this round.
              </div>
            ) : (
              <div className="divide-y">
                {proposed.map((row) => (
                  <div
                    key={row.reviewId}
                    className={`flex items-center gap-3 p-2 ${row.changed ? "bg-amber-50 dark:bg-amber-950/20" : ""}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{row.productName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                        <span>{row.currentReviewerName}</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className={row.changed ? "font-medium text-foreground" : ""}>
                          {row.proposedReviewerName}
                        </span>
                      </div>
                    </div>
                    {row.changed ? (
                      <Badge variant="default" className="text-xs">Changed</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Unchanged</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {proposed && (
            <div className="text-sm text-muted-foreground">
              {changedCount} of {proposed.length} assignment{proposed.length === 1 ? "" : "s"} will change.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={apply} disabled={submitting || !proposed || changedCount === 0}>
            {submitting ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Applying…</>
            ) : (
              `Apply ${changedCount} change${changedCount === 1 ? "" : "s"}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
