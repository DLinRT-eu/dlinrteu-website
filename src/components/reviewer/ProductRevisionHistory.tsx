import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  User,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface Revision {
  id: string;
  product_id: string;
  company_id: string;
  revision_date: string;
  changes_summary: string | null;
  verification_status: string | null;
  verified_by: string | null;
  verified_at: string | null;
  reviewer_feedback: string | null;
  priority: string | null;
  created_at: string;
  revised_by: string;
  revised_by_name: string;
  revised_by_email: string | null;
}

interface ProductRevisionHistoryProps {
  productId: string;
}

const ProductRevisionHistory: React.FC<ProductRevisionHistoryProps> = ({ productId }) => {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchRevisions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: rpcError } = await supabase
          .rpc('get_product_revisions_for_reviewer', { p_product_id: productId });
        
        if (rpcError) {
          console.error('Error fetching revisions:', rpcError);
          setError('Unable to load revision history');
          return;
        }
        
        setRevisions(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRevisions();
  }, [productId]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string | null) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Medium Priority</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Company Revisions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Company Revisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (revisions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Company Revisions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No revisions have been submitted for this product yet.</p>
            <p className="text-sm mt-2">
              Company representatives can submit revisions when product information needs to be updated.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const pendingCount = revisions.filter(r => r.verification_status === 'pending').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Company Revisions
          </CardTitle>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                {pendingCount} pending
              </Badge>
            )}
            <Badge variant="outline">{revisions.length} total</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingCount > 0 && (
          <Alert className="border-yellow-500/20 bg-yellow-500/5">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-600">
              There are {pendingCount} pending revision(s) that may require your attention during this review.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {revisions.map((revision) => (
            <Collapsible
              key={revision.id}
              open={openItems.has(revision.id)}
              onOpenChange={() => toggleItem(revision.id)}
            >
              <div className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(revision.revision_date), 'MMM d, yyyy')}
                      </div>
                      {getStatusBadge(revision.verification_status)}
                      {getPriorityBadge(revision.priority)}
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-muted-foreground transition-transform ${
                        openItems.has(revision.id) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 border-t bg-muted/30 space-y-4">
                    {/* Submitted by */}
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submitted by:</span>
                      <span className="font-medium">{revision.revised_by_name}</span>
                      {revision.revised_by_email && (
                        <span className="text-muted-foreground">({revision.revised_by_email})</span>
                      )}
                    </div>

                    {/* Changes Summary */}
                    {revision.changes_summary && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Changes Summary</h4>
                        <p className="text-sm text-muted-foreground bg-background p-3 rounded-md border">
                          {revision.changes_summary}
                        </p>
                      </div>
                    )}

                    {/* Reviewer Feedback */}
                    {revision.reviewer_feedback && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Reviewer Feedback</h4>
                        <p className="text-sm text-muted-foreground bg-background p-3 rounded-md border">
                          {revision.reviewer_feedback}
                        </p>
                      </div>
                    )}

                    {/* Verification info */}
                    {revision.verified_at && (
                      <div className="text-sm text-muted-foreground">
                        Verified on {format(new Date(revision.verified_at), 'MMM d, yyyy \'at\' HH:mm')}
                      </div>
                    )}

                    {/* Submission date */}
                    <div className="text-xs text-muted-foreground">
                      Submitted on {format(new Date(revision.created_at), 'MMM d, yyyy \'at\' HH:mm')}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRevisionHistory;
