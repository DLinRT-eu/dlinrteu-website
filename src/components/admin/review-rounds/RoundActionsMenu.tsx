import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, CheckCircle2, Archive, Copy, PlayCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateRoundStatusAdmin, cloneReviewRoundAdmin } from "@/utils/reviewRoundUtils";
import type { ReviewRound } from "@/utils/reviewRoundUtils";
import { supabase } from "@/integrations/supabase/client";
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

interface RoundActionsMenuProps {
  round: ReviewRound;
  onUpdate: () => void;
}

export function RoundActionsMenu({ round, onUpdate }: RoundActionsMenuProps) {
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cloning, setCloning] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [cloneData, setCloneData] = useState({
    name: `${round.name} (Copy)`,
    description: round.description || '',
    startDate: new Date().toISOString().split('T')[0],
    deadline: ''
  });

  const handleCompleteRound = async () => {
    const result = await updateRoundStatusAdmin(round.id, 'completed');
    if (result.success) {
      toast.success('Review round completed');
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to complete round');
    }
  };

  const handleArchiveRound = async () => {
    const result = await updateRoundStatusAdmin(round.id, 'archived');
    if (result.success) {
      toast.success('Review round archived');
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to archive round');
    }
  };

  const handleReactivateRound = async () => {
    const result = await updateRoundStatusAdmin(round.id, 'active');
    if (result.success) {
      toast.success('Review round reactivated');
      onUpdate();
    } else {
      toast.error(result.error || 'Failed to reactivate round');
    }
  };

  const handleCloneRound = async () => {
    if (!cloneData.name.trim()) {
      toast.error('Please enter a name for the new round');
      return;
    }

    setCloning(true);
    try {
      const result = await cloneReviewRoundAdmin(
        round.id,
        cloneData.name,
        cloneData.description,
        cloneData.startDate,
        cloneData.deadline || undefined
      );

      if (result.success) {
        toast.success(`Round cloned successfully`);
        setShowCloneDialog(false);
        onUpdate();
      } else {
        toast.error(result.error || 'Failed to clone round');
      }
    } finally {
      setCloning(false);
    }
  };

  const handleDeleteRound = async () => {
    setDeleting(true);
    try {
      // First, delete all associated product reviews
      const { error: reviewsError } = await supabase
        .from('product_reviews')
        .delete()
        .eq('review_round_id', round.id);

      if (reviewsError) throw reviewsError;

      // Then delete the review round itself
      const { error: roundError } = await supabase
        .from('review_rounds')
        .delete()
        .eq('id', round.id);

      if (roundError) throw roundError;

      toast.success('Review round deleted successfully');
      setShowDeleteDialog(false);
      onUpdate();
    } catch (error) {
      console.error('Error deleting round:', error);
      toast.error('Failed to delete review round');
    } finally {
      setDeleting(false);
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
          <DropdownMenuLabel>Round Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {round.status === 'active' && (
            <DropdownMenuItem onClick={handleCompleteRound}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Round
            </DropdownMenuItem>
          )}
          
          {round.status === 'completed' && (
            <DropdownMenuItem onClick={handleReactivateRound}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Reactivate Round
            </DropdownMenuItem>
          )}
          
          {(round.status === 'completed' || round.status === 'draft') && (
            <DropdownMenuItem onClick={handleArchiveRound}>
              <Archive className="h-4 w-4 mr-2" />
              Archive Round
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowCloneDialog(true)}>
            <Copy className="h-4 w-4 mr-2" />
            Clone Round
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Round
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clone Dialog */}
      <Dialog open={showCloneDialog} onOpenChange={setShowCloneDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Clone Review Round</DialogTitle>
            <DialogDescription>
              Create a new round with the same products and reviewers
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Round Name *</Label>
              <Input
                id="name"
                value={cloneData.name}
                onChange={(e) => setCloneData({ ...cloneData, name: e.target.value })}
                placeholder="Enter round name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={cloneData.description}
                onChange={(e) => setCloneData({ ...cloneData, description: e.target.value })}
                placeholder="Enter description (optional)"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={cloneData.startDate}
                  onChange={(e) => setCloneData({ ...cloneData, startDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Default Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={cloneData.deadline}
                  onChange={(e) => setCloneData({ ...cloneData, deadline: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloneDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCloneRound} disabled={cloning}>
              {cloning ? 'Cloning...' : 'Clone Round'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review Round?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{round.name}" and all {round.total_assignments || 0} associated 
              product review assignments. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRound}
              disabled={deleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete Round'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
