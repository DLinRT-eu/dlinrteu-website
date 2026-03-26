import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { UserPlus, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Reviewer {
  reviewer_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface InlineAssignmentCellProps {
  productId: string;
  productName: string;
  currentAssignee?: string;
  currentDeadline?: string;
  onAssignmentChange: () => void;
}

export const InlineAssignmentCell: React.FC<InlineAssignmentCellProps> = ({
  productId,
  productName,
  currentAssignee,
  currentDeadline,
  onAssignmentChange
}) => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | undefined>(
    currentDeadline ? new Date(currentDeadline) : undefined
  );
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviewers();
  }, []);

  const fetchReviewers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_reviewers_with_workload_admin');
      if (error) throw error;
      setReviewers(data || []);
    } catch (error) {
      console.error('Error fetching reviewers:', error);
    }
  };

  const handleAssign = async () => {
    if (!selectedReviewer) {
      toast({
        title: "No reviewer selected",
        description: "Please select a reviewer",
        variant: "destructive"
      });
      return;
    }

    setIsAssigning(true);
    try {
      const { data, error } = await supabase.rpc('quick_assign_products', {
        p_product_ids: [productId],
        p_reviewer_id: selectedReviewer,
        p_deadline: deadline ? format(deadline, 'yyyy-MM-dd') : null
      });

      if (error) throw error;

      toast({
        title: "Assignment successful",
        description: `${productName} assigned to reviewer`
      });

      onAssignmentChange();
    } catch (error: any) {
      console.error('Error assigning product:', error);
      toast({
        title: "Assignment failed",
        description: error.message || "Failed to assign product",
        variant: "destructive"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  if (currentAssignee) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{currentAssignee}</span>
        {currentDeadline && (
          <span className="text-xs text-muted-foreground">
            Due: {format(new Date(currentDeadline), 'MMM d, yyyy')}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select reviewer" />
        </SelectTrigger>
        <SelectContent>
          {reviewers.map((reviewer) => (
            <SelectItem key={reviewer.reviewer_id} value={reviewer.reviewer_id}>
              {reviewer.first_name} {reviewer.last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={deadline}
            onSelect={setDeadline}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button 
        size="sm" 
        onClick={handleAssign}
        disabled={isAssigning || !selectedReviewer}
      >
        <UserPlus className="h-4 w-4" />
      </Button>
    </div>
  );
};
