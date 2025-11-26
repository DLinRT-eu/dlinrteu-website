import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, MoreVertical, UserCog, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface BulkActionsMenuProps {
  selectedIds: string[];
  reviewers: Reviewer[];
  onUpdate: () => void;
  onClearSelection: () => void;
}

export function BulkActionsMenu({ 
  selectedIds, 
  reviewers, 
  onUpdate, 
  onClearSelection 
}: BulkActionsMenuProps) {
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [newReviewerId, setNewReviewerId] = useState<string>("");
  const [newStatus, setNewStatus] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  const handleBulkReassign = async () => {
    if (!newReviewerId) {
      toast.error("Please select a reviewer");
      return;
    }

    setProcessing(true);
    try {
      let successCount = 0;
      let failCount = 0;

      for (const reviewId of selectedIds) {
        const { data, error } = await supabase.rpc('reassign_product_review_admin', {
          p_review_id: reviewId,
          p_new_reviewer_id: newReviewerId,
          p_reason: `Bulk reassignment (${selectedIds.length} assignments)`
        });

        if (error || !(data as any)?.success) {
          console.error('Failed to reassign:', reviewId, error);
          failCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully reassigned ${successCount} review(s)`);
      }
      if (failCount > 0) {
        toast.error(`Failed to reassign ${failCount} review(s)`);
      }

      setShowReassignDialog(false);
      setNewReviewerId("");
      onUpdate();
      onClearSelection();
    } catch (error) {
      console.error('Error in bulk reassign:', error);
      toast.error('Failed to complete bulk reassignment');
    } finally {
      setProcessing(false);
    }
  };

  const handleBulkStatusChange = async () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    setProcessing(true);
    try {
      let successCount = 0;
      let failCount = 0;

      for (const reviewId of selectedIds) {
        const { data, error } = await supabase.rpc('update_product_review_admin', {
          p_review_id: reviewId,
          p_status: newStatus
        });

        if (error || !(data as any)?.success) {
          console.error('Failed to update status:', reviewId, error);
          failCount++;
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully updated ${successCount} review(s)`);
      }
      if (failCount > 0) {
        toast.error(`Failed to update ${failCount} review(s)`);
      }

      setShowStatusDialog(false);
      setNewStatus("");
      onUpdate();
      onClearSelection();
    } catch (error) {
      console.error('Error in bulk status change:', error);
      toast.error('Failed to complete bulk status change');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-md">
        <span className="text-sm font-medium">
          {selectedIds.length} selected
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowReassignDialog(true)}>
              <UserCog className="h-4 w-4 mr-2" />
              Reassign to Reviewer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowStatusDialog(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearSelection}
          className="ml-auto"
        >
          Clear Selection
        </Button>
      </div>

      {/* Reassign Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Reassign Reviews</DialogTitle>
            <DialogDescription>
              Reassign {selectedIds.length} selected review(s) to a new reviewer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Reviewer</Label>
              <Select value={newReviewerId} onValueChange={setNewReviewerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {reviewers.map((reviewer) => (
                    <SelectItem key={reviewer.id} value={reviewer.id}>
                      {reviewer.first_name} {reviewer.last_name} ({reviewer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReassignDialog(false);
                setNewReviewerId("");
              }}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button onClick={handleBulkReassign} disabled={processing || !newReviewerId}>
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Reassign {selectedIds.length} Review(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Change Status</DialogTitle>
            <DialogDescription>
              Change status for {selectedIds.length} selected review(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusDialog(false);
                setNewStatus("");
              }}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button onClick={handleBulkStatusChange} disabled={processing || !newStatus}>
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update {selectedIds.length} Review(s)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
