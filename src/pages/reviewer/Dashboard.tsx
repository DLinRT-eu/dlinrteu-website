import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, Clock, AlertCircle, CheckCircle2, Play, BookOpen, Package, FileEdit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import RevisionApprovalManager from '@/components/company/RevisionApprovalManager';
import OnboardingChecklist from '@/components/reviewer/OnboardingChecklist';
import BulkReviewerActions from '@/components/reviewer/BulkReviewerActions';
import ReviewStatusControl from '@/components/reviewer/ReviewStatusControl';
import { useToast } from '@/hooks/use-toast';
import { ALL_PRODUCTS } from '@/data';

const getProductName = (productId: string): string => {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  return product?.name || productId;
};

interface ReviewAssignment {
  id: string;
  product_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'company_reviewed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string | null;
  assigned_at: string;
  started_at: string | null;
  completed_at: string | null;
  notes: string | null;
  review_round_id?: string | null;
}

interface ReviewRound {
  id: string;
  name: string;
  description?: string;
  round_number: number;
  status: string;
  default_deadline?: string;
}

export default function ReviewerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isReviewer, isAdmin, loading: rolesLoading } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = user?.id ?? null;
  const [reviews, setReviews] = useState<ReviewAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [rounds, setRounds] = useState<ReviewRound[]>([]);
  const [hasExpertise, setHasExpertise] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pendingRevisionsCount, setPendingRevisionsCount] = useState(0);

  const handleToggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAllInTab = (tabReviews: ReviewAssignment[]) => {
    const allSelected = tabReviews.every(r => selectedIds.has(r.id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        tabReviews.forEach(r => next.delete(r.id));
      } else {
        tabReviews.forEach(r => next.add(r.id));
      }
      return next;
    });
  };

  const handleClearSelection = () => setSelectedIds(new Set());

  const checkExpertise = useCallback(async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('reviewer_expertise')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (!error) {
      setHasExpertise((data?.length || 0) > 0);
    }
  }, [userId]);

  const fetchReviews = useCallback(async () => {
    if (!userId) {
      console.log('[Dashboard] No user, skipping fetch');
      return;
    }

    console.log('[Dashboard] Fetching reviews for user:', userId);
    console.log('[Dashboard] isReviewer:', isReviewer, 'isAdmin:', isAdmin);

    try {
      // Phase 1: Try secure RPC first (bypasses potential RLS issues)
      console.log('[Dashboard] Attempting RPC call: get_my_reviews_secure');
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_my_reviews_secure');

      if (!rpcError && rpcData) {
        console.log('[Dashboard] ✅ RPC successful:', rpcData.length, 'reviews');
        // Map RPC data to full ReviewAssignment structure with defaults
        const mappedReviews: ReviewAssignment[] = rpcData.map(r => ({
          id: r.id,
          product_id: r.product_id,
          status: r.status as ReviewAssignment['status'],
          priority: 'medium' as ReviewAssignment['priority'],
          deadline: null,
          assigned_at: r.assigned_at,
          started_at: null,
          completed_at: r.completed_at,
          notes: null,
          review_round_id: r.review_round_id
        }));
        setReviews(mappedReviews);
        setLoading(false);
        return;
      }

      console.warn('[Dashboard] ⚠️ RPC failed, trying direct query:', rpcError?.message);

      // Phase 2: Fallback to direct query with detailed logging
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('assigned_to', userId)
        .order('deadline', { ascending: true, nullsFirst: false });

      if (!error && data) {
        console.log('[Dashboard] ✅ Direct query successful:', data.length, 'reviews');
        setReviews(data as ReviewAssignment[]);
      } else {
        console.error('[Dashboard] ❌ Both RPC and direct query failed:', error?.message);
        
        // Phase 3: Debug diagnostics
        const { data: debugData, error: debugError } = await supabase
          .rpc('debug_reviewer_access', { reviewer_id: userId });
        
        if (!debugError) {
          console.log('[Dashboard] 🔍 Debug info:', debugData);
        }
      }
    } catch (error) {
      console.error('[Dashboard] ❌ Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, isReviewer, isAdmin]);

  const fetchRounds = useCallback(async () => {
    try {
      // Use secure RPC that bypasses RLS
      const { data, error } = await supabase
        .rpc('get_active_rounds_for_reviewer');

      if (error) throw error;
      setRounds(data || []);
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
  }, []);

  const fetchPendingRevisionsCount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_pending_revisions_count_for_reviewer');

      if (error) {
        console.error('Error fetching pending revisions count:', error);
        return;
      }
      setPendingRevisionsCount(data || 0);
    } catch (error) {
      console.error('Error fetching pending revisions count:', error);
    }
  }, []);

  useEffect(() => {
    if (authLoading || rolesLoading) return;

    if (!userId || (!isReviewer && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchReviews();
    fetchRounds();
    checkExpertise();
    fetchPendingRevisionsCount();
  }, [authLoading, rolesLoading, userId, isReviewer, isAdmin, navigate, fetchReviews, fetchRounds, checkExpertise, fetchPendingRevisionsCount]);

  const handleStartReview = useCallback(async (reviewId: string) => {
    try {
      console.log('[Dashboard] Starting review:', reviewId);
      
      const { data, error } = await supabase
        .rpc('start_review_secure', { review_id: reviewId });

      if (error) {
        console.error('[Dashboard] RPC error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to start review',
          variant: 'destructive',
        });
        return;
      }

      const result = data as { success: boolean; error?: string; message?: string };
      
      if (!result.success) {
        console.error('[Dashboard] Review start failed:', result.error);
        toast({
          title: 'Cannot Start Review',
          description: result.error || 'Failed to start review',
          variant: 'destructive',
        });
        return;
      }

      console.log('[Dashboard] Review started successfully');
      toast({
        title: 'Success',
        description: 'Review started successfully',
      });
      
      fetchReviews();
    } catch (error: any) {
      console.error('[Dashboard] Unexpected error:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  }, [toast, fetchReviews]);

  const handleCompleteReview = useCallback(async (reviewId: string) => {
    try {
      console.log('[Dashboard] Completing review:', reviewId);
      
      const { data, error } = await supabase
        .rpc('complete_review_secure', { 
          review_id: reviewId,
          completion_notes: null 
        });

      if (error) {
        console.error('[Dashboard] RPC error:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to complete review',
          variant: 'destructive',
        });
        return;
      }

      const result = data as { success: boolean; error?: string; message?: string };
      
      if (!result.success) {
        console.error('[Dashboard] Review completion failed:', result.error);
        toast({
          title: 'Cannot Complete Review',
          description: result.error || 'Failed to complete review',
          variant: 'destructive',
        });
        return;
      }

      console.log('[Dashboard] Review completed successfully');
      toast({
        title: 'Success',
        description: 'Review completed successfully',
      });
      
      fetchReviews();
    } catch (error: any) {
      console.error('[Dashboard] Unexpected error:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  }, [toast, fetchReviews]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-500';
      case 'in_progress': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'company_reviewed': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return { text: 'No deadline', color: 'text-muted-foreground' };

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { text: 'Overdue', color: 'text-destructive' };
    if (daysUntil === 0) return { text: 'Due today', color: 'text-destructive' };
    if (daysUntil <= 3) return { text: `Due in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`, color: 'text-orange-500' };
    return { text: `Due in ${daysUntil} days`, color: 'text-muted-foreground' };
  };

  const ReviewCard = ({ review }: { review: ReviewAssignment }) => {
    const deadlineStatus = getDeadlineStatus(review.deadline);
    const isSelected = selectedIds.has(review.id);
    const productName = getProductName(review.product_id);

    return (
      <Card className={`hover:shadow-md transition-shadow ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleToggleSelection(review.id)}
                className="mt-1"
              />
              <div className="space-y-1">
                <CardTitle className="text-lg">{productName}</CardTitle>
                <CardDescription className="text-xs">ID: {review.product_id}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Assigned {formatDistanceToNow(new Date(review.assigned_at), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            <Badge variant={getPriorityColor(review.priority)}>
              {review.priority}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${getStatusColor(review.status)}`}>
              {review.status.replace('_', ' ').toUpperCase()}
            </span>
            {review.deadline && (
              <span className={`flex items-center gap-1 ${deadlineStatus.color}`}>
                <Clock className="h-4 w-4" />
                {deadlineStatus.text}
              </span>
            )}
          </div>

          {review.notes && (
            <p className="text-sm text-muted-foreground">{review.notes}</p>
          )}

          <div className="flex flex-col gap-3">
            <ReviewStatusControl
              reviewId={review.id}
              status={review.status}
              onStatusChange={fetchReviews}
            />
            <Button
              size="sm"
              variant="outline"
              asChild
              className="w-full"
            >
              <Link to={`/review/${review.product_id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filterReviews = (status: string) => {
    if (status === 'all') return reviews;
    return reviews.filter(r => r.status === status);
  };

  const pendingReviews = filterReviews('pending');
  const inProgressReviews = filterReviews('in_progress');
  const completedReviews = filterReviews('completed');

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Reviews</h1>
            <p className="text-muted-foreground mt-2">Manage your assigned product reviews</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/reviewer/guide">
                <BookOpen className="mr-2 h-4 w-4" />
                Review Guide
              </Link>
            </Button>
            <Button asChild>
              <Link to="/reviewer/due-reviews">View Due Reviews</Link>
            </Button>
          </div>
        </div>

        {/* Onboarding Checklist */}
        <div className="mb-8">
          <OnboardingChecklist />
        </div>

        {/* Active Review Rounds */}
        {rounds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {rounds.map((round) => (
              <Card key={round.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge>{`Round #${round.round_number}`}</Badge>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg mt-2">{round.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {round.description || 'Active review round'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {round.default_deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline: {format(new Date(round.default_deadline), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{pendingReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{inProgressReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{completedReviews.length}</div>
            </CardContent>
          </Card>
          <Card className={pendingRevisionsCount > 0 ? 'border-orange-500/50 bg-orange-500/5' : ''}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileEdit className="h-4 w-4" />
                Pending Revisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${pendingRevisionsCount > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                {pendingRevisionsCount}
              </div>
              {pendingRevisionsCount > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Company updates awaiting review
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Revision Approval */}
        <div className="mb-8">
          <RevisionApprovalManager />
        </div>

        {/* Reviews List */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All ({reviews.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingReviews.length})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({inProgressReviews.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedReviews.length})</TabsTrigger>
            </TabsList>
            {activeTab !== 'all' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const tabReviews = activeTab === 'pending' ? pendingReviews :
                                     activeTab === 'in_progress' ? inProgressReviews : completedReviews;
                  handleSelectAllInTab(tabReviews);
                }}
              >
                {(activeTab === 'pending' ? pendingReviews : activeTab === 'in_progress' ? inProgressReviews : completedReviews)
                  .every(r => selectedIds.has(r.id)) && 
                  (activeTab === 'pending' ? pendingReviews : activeTab === 'in_progress' ? inProgressReviews : completedReviews).length > 0
                  ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </div>

          <TabsContent value="all" className="space-y-4">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews assigned yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgressReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No reviews in progress</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedReviews.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed reviews</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <BulkReviewerActions
          selectedIds={selectedIds}
          reviews={reviews}
          onClearSelection={handleClearSelection}
          onOperationComplete={fetchReviews}
        />
      </div>
    </PageLayout>
  );
}
