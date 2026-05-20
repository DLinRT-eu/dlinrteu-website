import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { updateRoundDeadlineAdmin, type ReviewRound } from "@/utils/reviewRoundUtils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  round: ReviewRound;
  onUpdate: () => void;
}

export function EditRoundDeadlineDialog({ open, onOpenChange, round, onUpdate }: Props) {
  const [date, setDate] = useState<Date | undefined>(
    round.default_deadline ? new Date(round.default_deadline) : undefined
  );
  const [propagate, setPropagate] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setDate(round.default_deadline ? new Date(round.default_deadline) : undefined);
      setPropagate(true);
    }
  }, [open, round.default_deadline]);

  const handleSave = async () => {
    if (!date) {
      toast.error("Please pick a deadline date");
      return;
    }
    setSaving(true);
    try {
      const iso = format(date, "yyyy-MM-dd");
      const result = await updateRoundDeadlineAdmin(round.id, iso, propagate);
      if (!result.success) {
        toast.error(result.error || "Failed to update deadline");
        return;
      }
      const n = (result as any).updated_assignments ?? 0;
      toast.success(
        propagate
          ? `Deadline updated. ${n} product assignment${n === 1 ? "" : "s"} updated.`
          : "Round deadline updated."
      );
      onOpenChange(false);
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to update deadline");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Set Round Deadline</DialogTitle>
          <DialogDescription>
            Change the default deadline for "{round.name}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <Checkbox
              checked={propagate}
              onCheckedChange={(v) => setPropagate(v === true)}
              className="mt-0.5"
            />
            <span>
              Apply this deadline to all assigned products in this round
              <span className="block text-xs text-muted-foreground">
                Updates every product review in this round to match the new deadline.
              </span>
            </span>
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !date}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
