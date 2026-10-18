import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ALL_PRODUCTS } from "@/data";
import type { ReviewRound } from "@/utils/reviewRoundUtils";

interface PreviewRecipient {
  id: string;
  email: string;
  name: string;
  optedOut: boolean;
  deadline: string | null;
  productCount: number;
}

interface SendRoundStartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  round: ReviewRound;
}

const DEFAULT_INTRO =
  "The new DLinRT.eu review round has started and your products are ready for review. Please check each entry against its sources and update or confirm the information.";

async function errorText(error: unknown): Promise<string> {
  if (error instanceof FunctionsHttpError) return error.context.text();
  return error instanceof Error ? error.message : String(error);
}

export function SendRoundStartDialog({ open, onOpenChange, round }: SendRoundStartDialogProps) {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [recipients, setRecipients] = useState<PreviewRecipient[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [intro, setIntro] = useState(DEFAULT_INTRO);

  const productNames = useMemo(
    () => Object.fromEntries(ALL_PRODUCTS.map((p) => [String(p.id), `${p.name}${p.company ? ` (${p.company})` : ""}`])),
    [],
  );

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    supabase.functions
      .invoke("send-round-start-email", { body: { round_id: round.id, dry_run: true } })
      .then(async ({ data, error }) => {
        if (error) {
          toast.error(`Could not load reviewers: ${await errorText(error)}`);
          return;
        }
        const list = (data?.recipients ?? []) as PreviewRecipient[];
        setRecipients(list);
        setSelected(new Set(list.filter((r) => !r.optedOut).map((r) => r.id)));
      })
      .finally(() => setLoading(false));
  }, [open, round.id]);

  const toggle = (id: string, checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });

  const handleSend = async () => {
    if (selected.size === 0) return;
    setSending(true);
    const { data, error } = await supabase.functions.invoke("send-round-start-email", {
      body: { round_id: round.id, intro, product_names: productNames, reviewer_ids: Array.from(selected) },
    });
    setSending(false);
    if (error) {
      toast.error(`Sending failed: ${await errorText(error)}`);
      return;
    }
    toast.success(`Sent ${data.sent} email(s)${data.skipped ? `, ${data.skipped} skipped` : ""}${data.failed ? `, ${data.failed} failed` : ""}.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Notify reviewers: round started</DialogTitle>
          <DialogDescription>
            Each reviewer gets their deadline, their assigned products with links, and a link to the Reviewer Guide.
            Reviewers who turned off assignment emails are skipped.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="round-start-intro">Opening message</Label>
          <Textarea id="round-start-intro" rows={4} value={intro} onChange={(e) => setIntro(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Recipients ({selected.size} selected)</Label>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading reviewers…
            </div>
          ) : recipients.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assigned reviewers in this round.</p>
          ) : (
            <ul className="divide-y rounded-md border">
              {recipients.map((r) => (
                <li key={r.id} className="flex items-center gap-3 p-2 text-sm">
                  <Checkbox
                    checked={selected.has(r.id)}
                    disabled={r.optedOut}
                    onCheckedChange={(c) => toggle(r.id, c === true)}
                    aria-label={`Send to ${r.name}`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{r.name || r.email}</div>
                    <div className="text-muted-foreground">
                      {r.productCount} product(s) · deadline {r.deadline ?? "not set"}
                      {r.optedOut && " · opted out"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>Cancel</Button>
          <Button onClick={handleSend} disabled={sending || loading || selected.size === 0}>
            {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send to {selected.size}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
