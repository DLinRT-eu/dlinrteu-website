import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Archive, Settings, FileDown, Loader2 } from "lucide-react";
import { fetchSelectedRoundAssignments, exportToCSV, exportToExcel } from "@/utils/exportReviewRounds";

interface RoundsBulkActionsMenuProps {
  selectedRoundIds: string[];
  onUpdate: () => void;
  onClearSelection: () => void;
}

export function RoundsBulkActionsMenu({
  selectedRoundIds,
  onUpdate,
  onClearSelection,
}: RoundsBulkActionsMenuProps) {
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  const handleBulkArchive = async () => {
    setProcessing(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const roundId of selectedRoundIds) {
        const { data, error } = await supabase.rpc('update_round_status_admin', {
          p_round_id: roundId,
          p_status: 'archived'
        });

        const result = data as { success: boolean; error?: string } | null;
        if (error || !result?.success) {
          errorCount++;
          console.error(`Failed to archive round ${roundId}:`, error || result?.error);
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully archived ${successCount} round${successCount > 1 ? 's' : ''}`);
      }
      if (errorCount > 0) {
        toast.error(`Failed to archive ${errorCount} round${errorCount > 1 ? 's' : ''}`);
      }

      setShowArchiveDialog(false);
      onClearSelection();
      onUpdate();
    } catch (error) {
      console.error('Error archiving rounds:', error);
      toast.error('Failed to archive rounds');
    } finally {
      setProcessing(false);
    }
  };

  const handleBulkStatusChange = async () => {
    if (!selectedStatus) {
      toast.error('Please select a status');
      return;
    }

    setProcessing(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const roundId of selectedRoundIds) {
        const { data, error } = await supabase.rpc('update_round_status_admin', {
          p_round_id: roundId,
          p_status: selectedStatus
        });

        const result = data as { success: boolean; error?: string } | null;
        if (error || !result?.success) {
          errorCount++;
          console.error(`Failed to update round ${roundId}:`, error || result?.error);
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully updated ${successCount} round${successCount > 1 ? 's' : ''}`);
      }
      if (errorCount > 0) {
        toast.error(`Failed to update ${errorCount} round${errorCount > 1 ? 's' : ''}`);
      }

      setShowStatusDialog(false);
      setSelectedStatus("");
      onClearSelection();
      onUpdate();
    } catch (error) {
      console.error('Error updating rounds:', error);
      toast.error('Failed to update rounds');
    } finally {
      setProcessing(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      toast.loading('Preparing CSV export...');
      const data = await fetchSelectedRoundAssignments(selectedRoundIds);
      exportToCSV(data, `review-rounds-${new Date().toISOString().split('T')[0]}.csv`);
      toast.dismiss();
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.dismiss();
      console.error('Error exporting CSV:', error);
      toast.error('Failed to export CSV');
    }
  };

  const handleExportExcel = async () => {
    try {
      toast.loading('Preparing Excel export...');
      const data = await fetchSelectedRoundAssignments(selectedRoundIds);
      exportToExcel(data, `review-rounds-${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.dismiss();
      toast.success('Excel exported successfully');
    } catch (error) {
      toast.dismiss();
      console.error('Error exporting Excel:', error);
      toast.error('Failed to export Excel');
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-muted/50 border-b">
        <span className="text-sm font-medium">
          {selectedRoundIds.length} selected
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setShowArchiveDialog(true)}>
              <Archive className="h-4 w-4 mr-2" />
              Archive Selected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowStatusDialog(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Change Status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FileDown className="h-4 w-4 mr-2" />
                Export Selected
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={handleExportCSV}>
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel}>
                  Export as Excel
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
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

      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive Review Rounds</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive {selectedRoundIds.length} review round{selectedRoundIds.length > 1 ? 's' : ''}?
              This will change their status to "archived".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowArchiveDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkArchive}
              disabled={processing}
            >
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
            <DialogDescription>
              Select a new status for {selectedRoundIds.length} selected round{selectedRoundIds.length > 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusDialog(false);
                setSelectedStatus("");
              }}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkStatusChange}
              disabled={processing || !selectedStatus}
            >
              {processing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
