import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DiffViewer } from '@/components/product-editor/DiffViewer';
import { ALL_PRODUCTS } from '@/data';
import { ProductDetails } from '@/types/productDetails';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  FileEdit, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  ExternalLink,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditDraft {
  id: string;
  product_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  draft_data: ProductDetails;
  changed_fields: string[];
  edit_summary: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_feedback: string | null;
  github_pr_url: string | null;
  // Joined data
  creator_email?: string;
  creator_name?: string;
}

export default function EditApprovals() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<EditDraft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<EditDraft | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchDrafts();
  }, [user, isAdmin, authLoading, navigate]);

  const fetchDrafts = async () => {
    try {
      // Fetch all drafts
      const { data: draftsData, error } = await supabase
        .from('product_edit_drafts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch creator profiles
      const creatorIds = [...new Set(draftsData?.map(d => d.created_by) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', creatorIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]));

      const enrichedDrafts = (draftsData || []).map(draft => {
        const creator = profileMap.get(draft.created_by);
        return {
          ...draft,
          draft_data: draft.draft_data as unknown as ProductDetails,
          creator_email: creator?.email,
          creator_name: creator ? `${creator.first_name} ${creator.last_name}` : undefined
        };
      });

      setDrafts(enrichedDrafts);
    } catch (error: any) {
      console.error('Error fetching drafts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load edit drafts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = (draft: EditDraft, action: 'approve' | 'reject') => {
    setSelectedDraft(draft);
    setReviewAction(action);
    setReviewFeedback('');
    setReviewDialogOpen(true);
  };

  const submitReview = async () => {
    if (!selectedDraft || !user) return;
    
    setSubmitting(true);
    try {
      const newStatus = reviewAction === 'approve' ? 'approved' : 'rejected';
      
      const { error } = await supabase
        .from('product_edit_drafts')
        .update({
          status: newStatus,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          review_feedback: reviewFeedback || null
        })
        .eq('id', selectedDraft.id);

      if (error) throw error;

      toast({
        title: reviewAction === 'approve' ? 'Edit Approved' : 'Edit Rejected',
        description: reviewAction === 'approve' 
          ? 'The edit has been approved. It can now be synced to GitHub.'
          : 'The edit has been rejected. The author will be notified.'
      });

      setReviewDialogOpen(false);
      fetchDrafts();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit review',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getOriginalProduct = (productId: string): ProductDetails | undefined => {
    return ALL_PRODUCTS.find(p => p.id === productId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Draft</Badge>;
      case 'pending_review':
        return <Badge variant="default" className="bg-amber-500"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'applied':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Applied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const pendingDrafts = drafts.filter(d => d.status === 'pending_review');
  const approvedDrafts = drafts.filter(d => d.status === 'approved');
  const rejectedDrafts = drafts.filter(d => d.status === 'rejected');
  const allOtherDrafts = drafts.filter(d => !['pending_review', 'approved', 'rejected'].includes(d.status));

  if (loading || authLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container max-w-6xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileEdit className="h-8 w-8" />
            Product Edit Approvals
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and approve product edits submitted by reviewers and company representatives
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending Review
              {pendingDrafts.length > 0 && (
                <Badge variant="secondary" className="ml-1">{pendingDrafts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingDrafts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No edits pending review
                </CardContent>
              </Card>
            ) : (
              pendingDrafts.map(draft => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  originalProduct={getOriginalProduct(draft.product_id)}
                  onApprove={() => handleReviewAction(draft, 'approve')}
                  onReject={() => handleReviewAction(draft, 'reject')}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedDrafts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No approved edits
                </CardContent>
              </Card>
            ) : (
              approvedDrafts.map(draft => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  originalProduct={getOriginalProduct(draft.product_id)}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedDrafts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No rejected edits
                </CardContent>
              </Card>
            ) : (
              rejectedDrafts.map(draft => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  originalProduct={getOriginalProduct(draft.product_id)}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {drafts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No edit drafts found
                </CardContent>
              </Card>
            ) : (
              drafts.map(draft => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  originalProduct={getOriginalProduct(draft.product_id)}
                  onApprove={draft.status === 'pending_review' ? () => handleReviewAction(draft, 'approve') : undefined}
                  onReject={draft.status === 'pending_review' ? () => handleReviewAction(draft, 'reject') : undefined}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approve' ? 'Approve Edit' : 'Reject Edit'}
              </DialogTitle>
              <DialogDescription>
                {reviewAction === 'approve'
                  ? 'Approve this edit to allow it to be synced to GitHub.'
                  : 'Reject this edit and provide feedback to the author.'}
              </DialogDescription>
            </DialogHeader>

            {selectedDraft && (
              <div className="space-y-4">
                <div className="text-sm">
                  <p><strong>Product:</strong> {selectedDraft.draft_data.name}</p>
                  <p><strong>Author:</strong> {selectedDraft.creator_name || selectedDraft.creator_email}</p>
                  <p><strong>Changes:</strong> {selectedDraft.changed_fields.length} field(s)</p>
                </div>

                {selectedDraft.edit_summary && (
                  <div className="p-3 bg-muted rounded-lg">
                    <Label className="text-xs">Edit Summary</Label>
                    <p className="text-sm mt-1">{selectedDraft.edit_summary}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Feedback {reviewAction === 'reject' && '(Required)'}</Label>
                  <Textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder={reviewAction === 'approve' 
                      ? 'Optional feedback for the author...'
                      : 'Explain why this edit is being rejected...'}
                    rows={3}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={reviewAction === 'approve' ? 'default' : 'destructive'}
                onClick={submitReview}
                disabled={submitting || (reviewAction === 'reject' && !reviewFeedback.trim())}
              >
                {submitting ? 'Submitting...' : reviewAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}

interface DraftCardProps {
  draft: EditDraft;
  originalProduct?: ProductDetails;
  onApprove?: () => void;
  onReject?: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

function DraftCard({ draft, originalProduct, onApprove, onReject, getStatusBadge }: DraftCardProps) {
  const [showDiff, setShowDiff] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{draft.draft_data.name || draft.product_id}</CardTitle>
            <CardDescription className="flex items-center gap-4 mt-1">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {draft.creator_name || draft.creator_email || 'Unknown'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(draft.updated_at), 'PPp')}
              </span>
            </CardDescription>
          </div>
          {getStatusBadge(draft.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {draft.edit_summary && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{draft.edit_summary}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{draft.changed_fields.length} changes</Badge>
          <span>in {draft.changed_fields.slice(0, 3).join(', ')}</span>
          {draft.changed_fields.length > 3 && <span>+{draft.changed_fields.length - 3} more</span>}
        </div>

        {draft.review_feedback && (
          <div className={cn(
            "p-3 rounded-lg",
            draft.status === 'approved' ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          )}>
            <Label className="text-xs">Review Feedback</Label>
            <p className="text-sm mt-1">{draft.review_feedback}</p>
          </div>
        )}

        {draft.github_pr_url && (
          <Button variant="outline" size="sm" asChild>
            <a href={draft.github_pr_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Pull Request
            </a>
          </Button>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowDiff(!showDiff)}>
            <Eye className="h-4 w-4 mr-2" />
            {showDiff ? 'Hide Changes' : 'View Changes'}
          </Button>
          {onApprove && (
            <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          )}
          {onReject && (
            <Button variant="destructive" size="sm" onClick={onReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          )}
        </div>

        {showDiff && originalProduct && (
          <DiffViewer
            original={originalProduct}
            edited={draft.draft_data}
            changedFields={draft.changed_fields}
            className="mt-4"
          />
        )}
      </CardContent>
    </Card>
  );
}
