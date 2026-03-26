import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, UserCog, Trash2, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import { 
  updateProductReviewAdmin, 
  reassignProductReviewAdmin, 
  removeProductReviewAdmin 
} from "@/utils/reviewRoundUtils";

interface Assignment {
  id: string;
  product_id: string;
  status: string;
  reviewer_profile?: {
    first_name: string;
    last_name: string;
  };
}

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AssignmentActionsMenuProps {
  assignment: Assignment;
  reviewers: Reviewer[];
  onUpdate: () => void;
}

export function AssignmentActionsMenu({ assignment, reviewers, onUpdate }: AssignmentActionsMenuProps) {
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [reassigning, setReassigning] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
  const [reason, setReason] = useState('');

  const handleStatusChange = async (newStatus: string) => {
    const result = await updateProductReviewAdmin(assignment.id, { status: newStatus });
    if (result.success) {
      toast.success(`Status changed to ${newStatus.replace('_', ' ')}`);
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to update status');
    }
  };

  const handleReassign = async () => {
    if (!selectedReviewer) {
      toast.error('Please select a reviewer');
      return;
    }

    setReassigning(true);
    try {
      const result = await reassignProductReviewAdmin(
        assignment.id,
        selectedReviewer,
        reason || undefined
      );

      if (result.success) {
        toast.success('Assignment reassigned successfully');
        setShowReassignDialog(false);
        setSelectedReviewer('');
        setReason('');
        onUpdate();
      } else {
        toast.error(result.error || 'Failed to reassign');
      }
    } finally {
      setReassigning(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const result = await removeProductReviewAdmin(
        assignment.id,
        reason || undefined
      );

      if (result.success) {
        toast.success('Assignment removed successfully');
        setShowRemoveDialog(false);
        setReason('');
        onUpdate();
      } else {
        toast.error(result.error || 'Failed to remove assignment');
      }
    } finally {
      setRemoving(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Clock className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                <Clock className="h-4 w-4 mr-2" />
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in_progress')}>
                <PlayCircle className="h-4 w-4 mr-2" />
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuItem onClick={() => setShowReassignDialog(true)}>
            <UserCog className="h-4 w-4 mr-2" />
            Reassign
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowRemoveDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reassign Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reassign Review</DialogTitle>
            <DialogDescription>
              Assign this product review to a different reviewer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reviewer">Select Reviewer *</Label>
              <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  {reviewers.map((reviewer) => (
                    <SelectItem key={reviewer.id} value={reviewer.id}>
                      {reviewer.first_name} {reviewer.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this being reassigned?"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReassign} disabled={reassigning}>
              {reassigning ? 'Reassigning...' : 'Reassign'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Assignment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the assignment for this product. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-2">
            <Label htmlFor="removeReason">Reason (Optional)</Label>
            <Textarea
              id="removeReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this being removed?"
              rows={3}
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReason('')}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              disabled={removing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removing ? 'Removing...' : 'Remove Assignment'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
