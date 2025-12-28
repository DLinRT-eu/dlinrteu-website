import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Play, CheckCircle2, X, Loader2 } from 'lucide-react';

interface Review {
  id: string;
  status: string;
}

interface BulkReviewerActionsProps {
  selectedIds: Set<string>;
  reviews: Review[];
  onClearSelection: () => void;
  onOperationComplete: () => void;
}

export default function BulkReviewerActions({
  selectedIds,
  reviews,
  onClearSelection,
  onOperationComplete,
}: BulkReviewerActionsProps) {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);

  const selectedReviews = reviews.filter(r => selectedIds.has(r.id));
  const pendingSelected = selectedReviews.filter(r => r.status === 'pending');
  const inProgressSelected = selectedReviews.filter(r => r.status === 'in_progress');

  const handleBulkStart = async () => {
    if (pendingSelected.length === 0) return;
    
    setProcessing(true);
    let successCount = 0;
    let failCount = 0;

    for (const review of pendingSelected) {
      try {
        const { data, error } = await supabase.rpc('start_review_secure', {
          review_id: review.id,
        });

        if (error) {
          failCount++;
          continue;
        }

        const result = data as { success: boolean };
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      } catch {
        failCount++;
      }
    }

    setProcessing(false);

    if (successCount > 0) {
      toast({
        title: 'Bulk Start Complete',
        description: `Started ${successCount} review${successCount > 1 ? 's' : ''}${failCount > 0 ? `. ${failCount} failed.` : '.'}`,
      });
      onClearSelection();
      onOperationComplete();
    } else {
      toast({
        title: 'Bulk Start Failed',
        description: 'Could not start any selected reviews.',
        variant: 'destructive',
      });
    }
  };

  const handleBulkComplete = async () => {
    if (inProgressSelected.length === 0) return;
    
    setProcessing(true);
    let successCount = 0;
    let failCount = 0;

    for (const review of inProgressSelected) {
      try {
        const { data, error } = await supabase.rpc('complete_review_secure', {
          review_id: review.id,
          completion_notes: null,
        });

        if (error) {
          failCount++;
          continue;
        }

        const result = data as { success: boolean };
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      } catch {
        failCount++;
      }
    }

    setProcessing(false);

    if (successCount > 0) {
      toast({
        title: 'Bulk Complete',
        description: `Completed ${successCount} review${successCount > 1 ? 's' : ''}${failCount > 0 ? `. ${failCount} failed.` : '.'}`,
      });
      onClearSelection();
      onOperationComplete();
    } else {
      toast({
        title: 'Bulk Complete Failed',
        description: 'Could not complete any selected reviews.',
        variant: 'destructive',
      });
    }
  };

  if (selectedIds.size === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card border rounded-lg shadow-lg p-4 flex items-center gap-4">
      <span className="text-sm font-medium">
        {selectedIds.size} review{selectedIds.size > 1 ? 's' : ''} selected
      </span>

      {pendingSelected.length > 0 && (
        <Button
          size="sm"
          onClick={handleBulkStart}
          disabled={processing}
        >
          {processing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          Start {pendingSelected.length}
        </Button>
      )}

      {inProgressSelected.length > 0 && (
        <Button
          size="sm"
          onClick={handleBulkComplete}
          disabled={processing}
        >
          {processing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          Complete {inProgressSelected.length}
        </Button>
      )}

      <Button
        size="sm"
        variant="ghost"
        onClick={onClearSelection}
        disabled={processing}
      >
        <X className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  );
}
