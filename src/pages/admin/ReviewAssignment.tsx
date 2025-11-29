import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UserPlus, Search, Filter } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';
import { DataControlsBar, SortDirection } from '@/components/common/DataControlsBar';
import { exportToCSV, exportToExcel, exportToJSON } from '@/utils/exportUtils';
import { toast as sonnerToast } from 'sonner';

type ReviewerWithWorkload = Database['public']['Functions']['get_reviewers_with_workload_admin']['Returns'][number];
type AdminSecureReview = Database['public']['Functions']['get_product_reviews_admin_secure']['Returns'][number];
type ProductReviewRow = Database['public']['Tables']['product_reviews']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  assignedCount: number;
}

interface ProductReview {
  id: string;
  product_id: string;
  assigned_to: string | null;
  status: string;
  priority: string;
  deadline: string | null;
  review_round_id: string | null;
  started_at: string | null;
  completed_at: string | null;
  reviewer?: {
    first_name: string;
    last_name: string;
  };
}

export default function ReviewAssignment() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: rolesLoading } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = user?.id ?? null;
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedReviewer, setSelectedReviewer] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');
  const [deadline, setDeadline] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('product_id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const products = ALL_PRODUCTS;

  const fetchReviewers = useCallback(async () => {
    const { data, error } = await supabase.rpc('get_reviewers_with_workload_admin');
    
    if (error) {
      console.error('Error fetching reviewers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load reviewers',
        variant: 'destructive',
      });
      return;
    }

    const reviewersWithCount = (data || []).map((reviewer: ReviewerWithWorkload) => ({
      id: reviewer.reviewer_id,
      first_name: reviewer.first_name,
      last_name: reviewer.last_name,
      email: reviewer.email,
      assignedCount: reviewer.total_assigned ?? 0,
    }));

    setReviewers(reviewersWithCount);
  }, [toast]);

  const fetchReviews = useCallback(async () => {
    try {
      // Try direct SELECT first
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .order('deadline', { ascending: true, nullsFirst: false });

      // If permission denied, try admin RPC fallback
      if (reviewsError && (reviewsError.code === '42501' || reviewsError.code === 'PGRST301')) {
        console.warn('Direct SELECT failed, trying admin RPC:', reviewsError);
        
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_product_reviews_admin_secure');

        if (rpcError) {
          throw new Error(`Admin RPC failed: ${rpcError.message}. Please check System Diagnostics.`);
        }

        // Map RPC results to expected format
        const reviewsWithReviewer = (rpcData || []).map((r: AdminSecureReview) => ({
          id: r.id,
          product_id: r.product_id,
          review_round_id: r.review_round_id,
          assigned_to: r.assigned_to,
          status: r.status,
          priority: r.priority,
          deadline: r.deadline,
          notes: r.notes,
          started_at: r.started_at,
          completed_at: r.completed_at,
          last_activity_at: r.last_activity_at,
          created_at: r.created_at,
          reviewer: r.assigned_to ? {
            first_name: r.reviewer_first_name,
            last_name: r.reviewer_last_name,
          } : null,
        }));

        setReviews(reviewsWithReviewer);
        return;
      }

      if (reviewsError) throw reviewsError;

      // Two-step fetch: collect assigned_to IDs and fetch profiles
      const assignedToIds = Array.from(
        new Set(
          (reviewsData || [])
            .map((review: ProductReviewRow) => review.assigned_to)
            .filter((id): id is string => Boolean(id))
        )
      );

      const profilesMap = new Map<string, Pick<ProfileRow, 'first_name' | 'last_name' | 'email'>>();
      if (assignedToIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', assignedToIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
        } else {
          profilesData?.forEach(p => {
            profilesMap.set(p.id, p);
          });
        }
      }

        const reviewsWithReviewer = (reviewsData || []).map((review: ProductReviewRow) => ({
        ...review,
        reviewer: review.assigned_to ? profilesMap.get(review.assigned_to) : null,
      }));

      setReviews(reviewsWithReviewer);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      const message = error instanceof Error ? error.message : 'Failed to load reviews. Please verify your admin role in System Diagnostics.';
      toast({
        title: 'Permission Denied',
        description: message,
        variant: 'destructive',
      });
      setReviews([]);
    }
  }, [toast]);

  useEffect(() => {
    if (authLoading || rolesLoading) {
      return;
    }

    if (!userId || !isAdmin) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchReviewers(), fetchReviews()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authLoading, rolesLoading, userId, isAdmin, navigate, fetchReviewers, fetchReviews]);

  const handleAssignReview = async () => {
    if (!selectedProduct || !selectedReviewer) {
      toast({
        title: 'Error',
        description: 'Please select both a product and a reviewer',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Use quick assign function with single product
      const { data, error } = await supabase.rpc('quick_assign_products', {
        p_product_ids: [selectedProduct],
        p_reviewer_id: selectedReviewer,
        p_deadline: deadline || null,
      });

      if (error) {
        console.error('Assignment RPC error:', error);
        throw new Error(`${error.message} (Code: ${error.code || 'unknown'})`);
      }

      toast({
        title: 'Success',
        description: 'Review assigned successfully',
      });

      setDialogOpen(false);
      setSelectedProduct('');
      setSelectedReviewer('');
      setPriority('medium');
      setDeadline('');
      
      fetchReviews();
      fetchReviewers();
    } catch (error) {
      console.error('Error assigning review:', error);
      const message = error instanceof Error ? error.message : 'Failed to assign review. Check console for details.';
      toast({
        title: 'Assignment Failed',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = async (reviewId: string, newStatus: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return;

    try {
      // Use admin RPC function to bypass RLS
      const { updateProductReviewAdmin } = await import('@/utils/reviewRoundUtils');
      const result = await updateProductReviewAdmin(reviewId, { status: newStatus });

      if (!result.success) {
        throw new Error(result.error || 'Failed to update status');
      }

      toast({ 
        title: 'Success', 
        description: `Review marked as ${newStatus.replace('_', ' ')}` 
      });
      fetchReviews();
      fetchReviewers();
    } catch (error) {
      console.error('Error updating status:', error);
      const message = error instanceof Error ? error.message : 'Failed to update status';
      toast({ 
        title: 'Error', 
        description: message, 
        variant: 'destructive' 
      });
    }
  };

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;

    try {
      // Use admin RPC function to bypass RLS
      const { removeProductReviewAdmin } = await import('@/utils/reviewRoundUtils');
      const result = await removeProductReviewAdmin(
        reviewToDelete,
        'Removed by admin via assignment manager'
      );

      if (!result.success) {
        throw new Error(result.error || 'Failed to remove assignment');
      }

      toast({
        title: 'Success',
        description: 'Assignment removed',
      });

      fetchReviews();
      fetchReviewers();
    } catch (error) {
      console.error('Error deleting review:', error);
      const message = error instanceof Error ? error.message : 'Failed to delete assignment';
      toast({
        title: 'Delete Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setConfirmDeleteOpen(false);
      setReviewToDelete(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (statusFilter === 'all') return true;
      return review.status === statusFilter;
    })
    .sort((a, b) => {
      let aVal: any, bVal: any;
      
      switch (sortBy) {
        case 'product_id':
          aVal = a.product_id;
          bVal = b.product_id;
          break;
        case 'reviewer':
          aVal = a.reviewer ? `${a.reviewer.first_name} ${a.reviewer.last_name}` : '';
          bVal = b.reviewer ? `${b.reviewer.first_name} ${b.reviewer.last_name}` : '';
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          aVal = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          bVal = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          break;
        case 'deadline':
          aVal = a.deadline || '';
          bVal = b.deadline || '';
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const handleExportCSV = () => {
    try {
      const data = filteredAndSortedReviews.map(review => ({
        'Product ID': review.product_id,
        'Reviewer': review.reviewer ? `${review.reviewer.first_name} ${review.reviewer.last_name}` : 'Unassigned',
        'Status': review.status,
        'Priority': review.priority,
        'Deadline': review.deadline || 'No deadline',
        'Started': review.started_at || 'Not started',
        'Completed': review.completed_at || 'Not completed',
      }));
      exportToCSV(data, 'review_assignments');
      sonnerToast.success('Exported to CSV');
    } catch (error) {
      sonnerToast.error('Failed to export');
    }
  };

  const handleExportExcel = () => {
    try {
      const data = filteredAndSortedReviews.map(review => ({
        'Product ID': review.product_id,
        'Reviewer': review.reviewer ? `${review.reviewer.first_name} ${review.reviewer.last_name}` : 'Unassigned',
        'Status': review.status,
        'Priority': review.priority,
        'Deadline': review.deadline || 'No deadline',
        'Started': review.started_at || 'Not started',
        'Completed': review.completed_at || 'Not completed',
      }));
      exportToExcel(data, 'review_assignments', 'Assignments');
      sonnerToast.success('Exported to Excel');
    } catch (error) {
      sonnerToast.error('Failed to export');
    }
  };

  const handleExportJSON = () => {
    try {
      exportToJSON(filteredAndSortedReviews, 'review_assignments');
      sonnerToast.success('Exported to JSON');
    } catch (error) {
      sonnerToast.error('Failed to export');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Review Assignments</h1>
            <p className="text-muted-foreground mt-2">Assign products to reviewers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/admin/review-rounds')}>
              <Calendar className="h-4 w-4" />
              Review Rounds
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Assign Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Assign Product Review</DialogTitle>
                <DialogDescription>
                  Select a product and assign it to a reviewer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Product</Label>
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredProducts.map(product => (
                          <SelectItem key={product.id} value={product.id!}>
                            {product.name} - {product.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reviewer</Label>
                  <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewers.map(reviewer => (
                        <SelectItem key={reviewer.id} value={reviewer.id}>
                          {reviewer.first_name} {reviewer.last_name} ({reviewer.assignedCount} active)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignReview}>
                  Assign Review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Reviewer Workload */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {reviewers.map(reviewer => (
            <Card key={reviewer.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {reviewer.first_name} {reviewer.last_name}
                </CardTitle>
                <CardDescription className="text-xs">{reviewer.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviewer.assignedCount}</div>
                <p className="text-xs text-muted-foreground">Active assignments</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assignments Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Assignments</CardTitle>
                  <CardDescription>Manage product review assignments</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <DataControlsBar
                  searchValue=""
                  onSearchChange={() => {}}
                  searchPlaceholder=""
                  sortOptions={[
                    { value: 'product_id', label: 'Product ID' },
                    { value: 'reviewer', label: 'Reviewer' },
                    { value: 'status', label: 'Status' },
                    { value: 'priority', label: 'Priority' },
                    { value: 'deadline', label: 'Deadline' },
                  ]}
                  sortValue={sortBy}
                  onSortChange={setSortBy}
                  sortDirection={sortDirection}
                  onSortDirectionChange={setSortDirection}
                  showExportButton
                  onExportCSV={handleExportCSV}
                  onExportExcel={handleExportExcel}
                  onExportJSON={handleExportJSON}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {reviews.length === 0 
                        ? "No assignments yet. Click 'Assign Review' to get started."
                        : `No ${statusFilter === 'all' ? '' : statusFilter.replace('_', ' ')} assignments found.`
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedReviews.map((review) => {
                    const product = products.find(p => p.id === review.product_id);
                    return (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {product?.name || review.product_id}
                        </TableCell>
                        <TableCell>
                          {review.reviewer 
                            ? `${review.reviewer.first_name} ${review.reviewer.last_name}`
                            : 'Unassigned'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(review.priority)}>
                            {review.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              review.status === 'completed' ? 'success' : 
                              review.status === 'in_progress' ? 'default' : 
                              'outline'
                            } 
                            className="capitalize"
                          >
                            {review.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {review.deadline ? (
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3 w-3" />
                              {new Date(review.deadline).toLocaleDateString()}
                            </div>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            {review.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateStatus(review.id, 'in_progress')}
                              >
                                Start
                              </Button>
                            )}
                            {review.status === 'in_progress' && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleUpdateStatus(review.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                            {review.status === 'completed' && (
                              <Badge variant="success" className="mr-2">✓ Done</Badge>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteClick(review.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove this assignment. The reviewer will no longer have access to this product review.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setReviewToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove Assignment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
}
