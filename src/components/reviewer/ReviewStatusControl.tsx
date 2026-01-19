import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Play, CheckCircle2, Loader2 } from 'lucide-react';

interface ReviewStatusControlProps {
  reviewId: string;
  status: 'pending' | 'in_progress' | 'completed';
  onStatusChange: () => void;
}

export default function ReviewStatusControl({ reviewId, status, onStatusChange }: ReviewStatusControlProps) {
  const [loading, setLoading] = useState(false);

  const handleStartReview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('start_review_secure', {
        review_id: reviewId
      });

      if (error) throw error;

      const result = data as { success?: boolean; error?: string } | null;
      if (result?.success) {
        toast.success('Review started');
        onStatusChange();
      } else {
        toast.error(result?.error || 'Failed to start review');
      }
    } catch (error: any) {
      console.error('Error starting review:', error);
      toast.error(error.message || 'Failed to start review');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteReview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('complete_review_secure', {
        review_id: reviewId
      });

      if (error) throw error;

      const result = data as { success?: boolean; error?: string } | null;
      if (result?.success) {
        toast.success('Review completed');
        onStatusChange();
      } else {
        toast.error(result?.error || 'Failed to complete review');
      }
    } catch (error: any) {
      console.error('Error completing review:', error);
      toast.error(error.message || 'Failed to complete review');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'completed') {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle2 className="h-4 w-4" />
        <span className="text-sm font-medium">Completed</span>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <Button 
        size="sm" 
        onClick={handleStartReview}
        disabled={loading}
        className="gap-2"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        Start Review
      </Button>
    );
  }

  if (status === 'in_progress') {
    return (
      <Button 
        size="sm" 
        variant="default"
        onClick={handleCompleteReview}
        disabled={loading}
        className="gap-2 bg-green-600 hover:bg-green-700"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        Complete Review
      </Button>
    );
  }

  return null;
}
