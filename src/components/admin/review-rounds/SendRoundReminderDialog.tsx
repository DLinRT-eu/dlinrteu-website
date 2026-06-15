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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mail, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Assignment {
  id: string;
  product_id: string;
  assigned_to: string;
  status: string;
  deadline: string | null;
  reviewer_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roundName: string;
  assignments: Assignment[];
}

interface RecipientRow {
  reviewerId: string;
  name: string;
  email: string;
  reviewIds: string[];
  pendingCount: number;
  overdueCount: number;
  earliestDeadline: string | null;
}

export function SendRoundReminderDialog({ open, onOpenChange, roundName, assignments }: Props) {
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const recipients = useMemo<RecipientRow[]>(() => {
    const now = Date.now();
    const byReviewer = new Map<string, RecipientRow>();
    for (const a of assignments) {
      if (a.status === "completed") continue;
      if (!a.assigned_to || !a.reviewer_profile) continue;
      const key = a.assigned_to;
      const existing = byReviewer.get(key);
      const isOverdue = !!a.deadline && new Date(a.deadline).getTime() < now;
      if (existing) {
        existing.reviewIds.push(a.id);
        existing.pendingCount += 1;
        if (isOverdue) existing.overdueCount += 1;
        if (a.deadline && (!existing.earliestDeadline || a.deadline < existing.earliestDeadline)) {
          existing.earliestDeadline = a.deadline;
        }
      } else {
        byReviewer.set(key, {
          reviewerId: key,
          name: `${a.reviewer_profile.first_name} ${a.reviewer_profile.last_name}`.trim(),
          email: a.reviewer_profile.email,
          reviewIds: [a.id],
          pendingCount: 1,
          overdueCount: isOverdue ? 1 : 0,
          earliestDeadline: a.deadline,
        });
      }
    }
    return Array.from(byReviewer.values()).sort((a, b) => b.overdueCount - a.overdueCount);
  }, [assignments]);

  useEffect(() => {
    if (open) {
      setSelectedIds(new Set(recipients.map((r) => r.reviewerId)));
      setSearch("");
    }
  }, [open, recipients]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
    );
  }, [recipients, search]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allVisibleSelected = filtered.length > 0 && filtered.every((r) => selectedIds.has(r.reviewerId));
  const someVisibleSelected = filtered.some((r) => selectedIds.has(r.reviewerId));

  const toggleAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        filtered.forEach((r) => next.delete(r.reviewerId));
      } else {
        filtered.forEach((r) => next.add(r.reviewerId));
      }
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(recipients.map((r) => r.reviewerId)));
  const clearAll = () => setSelectedIds(new Set());

  const handleSend = async () => {
    const reviewIds = recipients
      .filter((r) => selectedIds.has(r.reviewerId))
      .flatMap((r) => r.reviewIds);
    if (reviewIds.length === 0) {
      toast.error("Select at least one reviewer");
      return;
    }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-deadline-reminders", {
        body: { force: true, review_ids: reviewIds },
      });
      if (error) throw error;
      const result = data as { emailsSent?: number; emailsFailed?: number; message?: string };
      if (result?.emailsSent && result.emailsSent > 0) {
        toast.success(`Sent ${result.emailsSent} reminder email${result.emailsSent > 1 ? "s" : ""}`);
      } else {
        toast.info(result?.message || "No reminders sent");
      }
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to send reminders:", err);
      toast.error(err instanceof Error ? err.message : "Failed to send reminders");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Reminders — "{roundName}"
          </DialogTitle>
          <DialogDescription>
            Preview reviewers who will be contacted. Selection is enabled by default; deselect anyone who shouldn't receive a reminder. Reviewers who opted out of deadline emails are skipped automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 flex-1 min-h-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviewer name or email"
              className="pl-8"
            />
          </div>

          <div className="flex items-center justify-between text-sm gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={allVisibleSelected ? true : someVisibleSelected ? "indeterminate" : false}
                onCheckedChange={toggleAllVisible}
                aria-label="Select all visible"
              />
              <span className="text-muted-foreground">
                {recipients.length} recipient{recipients.length === 1 ? "" : "s"} · {selectedIds.size} selected
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={selectAll} disabled={selectedIds.size === recipients.length}>
                Select all
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAll} disabled={selectedIds.size === 0}>
                Clear
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 border rounded-md min-h-[200px]">
            {recipients.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                No reviewers with pending or in-progress assignments.
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-sm text-muted-foreground">
                No reviewers match "{search}".
              </div>
            ) : (
              <div className="divide-y">
                {filtered.map((r) => (
                  <label
                    key={r.reviewerId}
                    className="flex items-center gap-3 p-2 hover:bg-muted/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedIds.has(r.reviewerId)}
                      onCheckedChange={() => toggle(r.reviewerId)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{r.name || r.email}</div>
                      <div className="text-xs text-muted-foreground truncate">{r.email}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {r.overdueCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {r.overdueCount} overdue
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {r.pendingCount} pending
                      </Badge>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending || selectedIds.size === 0}>
            {sending ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending…</>
            ) : (
              `Send to ${selectedIds.size} reviewer${selectedIds.size === 1 ? "" : "s"}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
