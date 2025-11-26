import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReviewerWorkload {
  reviewer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  pending: number;
  in_progress: number;
  completed: number;
  total_assigned: number;
}

export const ReviewerWorkloadCard: React.FC = () => {
  const [reviewers, setReviewers] = useState<ReviewerWorkload[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviewerWorkload();
  }, []);

  const fetchReviewerWorkload = async () => {
    try {
      const { data, error } = await supabase.rpc('get_reviewers_with_workload_admin');
      
      if (error) throw error;
      
      setReviewers(data || []);
    } catch (error) {
      console.error('Error fetching reviewer workload:', error);
      toast({
        title: "Failed to load reviewer workload",
        description: "Could not fetch reviewer statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Reviewer Workload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Reviewer Workload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviewers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviewers assigned yet</p>
          ) : (
            reviewers.map((reviewer) => (
              <div 
                key={reviewer.reviewer_id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">
                    {reviewer.first_name} {reviewer.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{reviewer.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {reviewer.pending}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {reviewer.in_progress}
                  </Badge>
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {reviewer.completed}
                  </Badge>
                  <span className="text-sm font-medium ml-2">
                    Total: {reviewer.total_assigned}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
