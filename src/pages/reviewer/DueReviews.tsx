import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import BulkReviewerActions from '@/components/reviewer/BulkReviewerActions';
import ReviewStatusControl from '@/components/reviewer/ReviewStatusControl';
import { Calendar, Clock, AlertCircle, FileCheck, BookOpen, ChevronRight, ClipboardList } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ALL_PRODUCTS } from '@/data';

interface ReviewAssignment {
  id: string;
  product_id: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string | null;
  assigned_at: string;
  notes: string | null;
  review_round_id: string | null;
  round_name: string | null;
  round_task: string | null;
}

// Helper to get product name from product ID
const getProductName = (productId: string): string => {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  return product?.name || productId;
};

// Helper to get product company from product ID
const getProductCompany = (productId: string): string | null => {
  const product = ALL_PRODUCTS.find(p => p.id === productId);
  return product?.company || null;
};

export default function DueReviews() {
  const { user } = useAuth();
  const { isReviewer, isAdmin, loading: rolesLoading } = useRoles();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const userId = user?.id ?? null;

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

  const handleSelectAll = () => {
    const allSelected = reviews.every(r => selectedIds.has(r.id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(reviews.map(r => r.id)));
    }
  };

  const handleClearSelection = () => setSelectedIds(new Set());

  const fetchReviews = useCallback(async () => {
    if (!userId) {
      console.log('[DueReviews] No user, skipping fetch');
      return;
    }

    console.log('[DueReviews] Fetching reviews for user:', userId);
    console.log('[DueReviews] isReviewer:', isReviewer, 'isAdmin:', isAdmin);

    try {
      // Phase 1: Try secure RPC first (bypasses potential RLS issues)
      console.log('[DueReviews] Attempting RPC call: get_my_reviews_secure');
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_my_reviews_secure');

      if (!rpcError && rpcData) {
        console.log('[DueReviews] ✅ RPC successful:', rpcData.length, 'reviews');
        // Map RPC data to full ReviewAssignment structure with defaults
        const mappedReviews: ReviewAssignment[] = rpcData.map(r => ({
          id: r.id,
          product_id: r.product_id,
          status: r.status as ReviewAssignment['status'],
          priority: 'medium' as ReviewAssignment['priority'],
          deadline: null,
          assigned_at: r.assigned_at,
          notes: null,
          review_round_id: r.review_round_id || null,
          round_name: r.round_name || null,
          round_task: null
        }));
        setReviews(mappedReviews);
        setLoading(false);
        return;
      }

      console.warn('[DueReviews] ⚠️ RPC failed, trying direct query:', rpcError?.message);

      // Phase 2: Fallback to direct query with review round info
      const { data, error } = await supabase
        .from('product_reviews')
        .select(`
          *,
          review_rounds!product_reviews_review_round_id_fkey (
            name,
            task
          )
        `)
        .eq('assigned_to', userId)
        .order('deadline', { ascending: true, nullsFirst: false });

      if (!error && data) {
        console.log('[DueReviews] ✅ Direct query successful:', data.length, 'reviews');
        const mappedReviews: ReviewAssignment[] = data.map((r: any) => ({
          id: r.id,
          product_id: r.product_id,
          status: r.status as ReviewAssignment['status'],
          priority: r.priority as ReviewAssignment['priority'] || 'medium',
          deadline: r.deadline,
          assigned_at: r.assigned_at,
          notes: r.notes,
          review_round_id: r.review_round_id,
          round_name: r.review_rounds?.name || null,
          round_task: r.review_rounds?.task || null
        }));
        setReviews(mappedReviews);
      } else {
        console.error('[DueReviews] ❌ Both RPC and direct query failed:', error?.message);
        
        // Phase 3: Debug diagnostics
        const { data: debugData, error: debugError } = await supabase
          .rpc('debug_reviewer_access', { reviewer_id: userId });
        
        if (!debugError) {
          console.log('[DueReviews] 🔍 Debug info:', debugData);
        }
      }
    } catch (error) {
      console.error('[DueReviews] ❌ Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, isReviewer, isAdmin]);

  useEffect(() => {
    if (rolesLoading) {
      return;
    }

    if (!userId || (!isReviewer && !isAdmin)) {
      navigate('/auth');
      return;
    }

    fetchReviews();
  }, [rolesLoading, userId, isReviewer, isAdmin, navigate, fetchReviews]);

  const getDeadlineStatus = (deadline: string | null) => {
    if (!deadline) return null;
    const daysUntil = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (daysUntil < 0) return { text: 'Overdue', variant: 'destructive' as const, days: daysUntil };
    if (daysUntil <= 3) return { text: `${daysUntil} days left`, variant: 'destructive' as const, days: daysUntil };
    if (daysUntil <= 7) return { text: `${daysUntil} days left`, variant: 'default' as const, days: daysUntil };
    return { text: `${daysUntil} days left`, variant: 'secondary' as const, days: daysUntil };
  };

  const overdueReviews = reviews.filter(r => {
    if (!r.deadline) return false;
    const status = getDeadlineStatus(r.deadline);
    return status && status.days < 0;
  });

  const dueSoonReviews = reviews.filter(r => {
    if (!r.deadline) return false;
    const status = getDeadlineStatus(r.deadline);
    return status && status.days >= 0 && status.days <= 7;
  });

  const handleCardClick = (productId: string) => {
    navigate(`/review/${productId}`);
  };

  if (loading) {
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
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Due Reviews</h1>
          <p className="text-muted-foreground">Manage your assigned reviews and deadlines</p>
        </div>

        {/* Alert for overdue/due soon */}
        {(overdueReviews.length > 0 || dueSoonReviews.length > 0) && (
          <Alert variant={overdueReviews.length > 0 ? 'destructive' : 'default'} className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              {overdueReviews.length > 0 && `${overdueReviews.length} overdue review(s). `}
              {dueSoonReviews.length > 0 && `${dueSoonReviews.length} review(s) due within 7 days.`}
            </AlertDescription>
          </Alert>
        )}

        {/* How to Review Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              How to Review a Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="guide">
                <AccordionTrigger>View Review Guidelines</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1. Technical Validation</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Verify regulatory certifications (CE/FDA)</li>
                      <li>Check clinical evidence documentation</li>
                      <li>Validate technical specifications</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Completeness Check</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>All required fields filled</li>
                      <li>Contact information verified</li>
                      <li>Market availability confirmed</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3. Quality Assessment</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Accuracy of information</li>
                      <li>Clarity of documentation</li>
                      <li>Consistency across fields</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4. Regulatory Compliance</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>MDR/IVDR compliance (EU)</li>
                      <li>FDA clearance status (US)</li>
                      <li>Post-market surveillance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">5. Final Steps</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>Add review notes</li>
                      <li>Set review score (1-10)</li>
                      <li>Mark complete or request changes</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{overdueReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{dueSoonReviews.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {reviews.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Reviews</h2>
            {reviews.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {reviews.every(r => selectedIds.has(r.id)) ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </div>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No reviews assigned yet</p>
              </CardContent>
            </Card>
          ) : (
            reviews.map(review => {
              const deadlineStatus = getDeadlineStatus(review.deadline);
              const isSelected = selectedIds.has(review.id);
              const productName = getProductName(review.product_id);
              const companyName = getProductCompany(review.product_id);
              
              return (
                <Card 
                  key={review.id} 
                  className={`hover:shadow-lg transition-all cursor-pointer group ${isSelected ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleCardClick(review.product_id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleToggleSelection(review.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1"
                        />
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg truncate">{productName}</CardTitle>
                            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </div>
                          {companyName && (
                            <p className="text-sm text-muted-foreground">{companyName}</p>
                          )}
                          
                          {/* Review Round Info */}
                          {review.round_name && (
                            <div className="flex items-center gap-2 text-sm">
                              <ClipboardList className="h-4 w-4 text-primary" />
                              <span className="font-medium text-primary">{review.round_name}</span>
                              {review.round_task && (
                                <span className="text-muted-foreground">• {review.round_task}</span>
                              )}
                            </div>
                          )}
                          
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Assigned {formatDistanceToNow(new Date(review.assigned_at), { addSuffix: true })}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex gap-2">
                          {review.priority && review.priority !== 'medium' && (
                            <Badge variant={review.priority === 'critical' || review.priority === 'high' ? 'destructive' : 'secondary'}>
                              {review.priority}
                            </Badge>
                          )}
                          <Badge variant={
                            review.status === 'completed' ? 'default' :
                            review.status === 'in_progress' ? 'secondary' : 'outline'
                          }>
                            {review.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        {review.deadline && deadlineStatus && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Badge variant={deadlineStatus.variant}>
                              {deadlineStatus.text}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-4">
                      {review.notes && (
                        <p className="text-sm text-muted-foreground flex-1 truncate">{review.notes}</p>
                      )}
                      <div className="flex items-center gap-3 ml-auto" onClick={(e) => e.stopPropagation()}>
                        <ReviewStatusControl
                          reviewId={review.id}
                          status={review.status}
                          onStatusChange={fetchReviews}
                        />
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/review/${review.product_id}`} onClick={(e) => e.stopPropagation()}>
                            Open Review
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

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
