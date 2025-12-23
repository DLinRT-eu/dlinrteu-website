import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, Clock, Eye, User, Search, Filter, CalendarIcon, X } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data';
import { format } from 'date-fns';

interface SubmitterProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface CompanyRevision {
  id: string;
  product_id: string;
  company_id: string;
  revision_date: string;
  changes_summary: string;
  verification_status: string;
  revised_by: string;
  reviewer_feedback: string | null;
  priority: string;
  created_at: string;
  profiles?: SubmitterProfile;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'needs-info', label: 'Needs Info' },
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const truncateText = (text: string, maxLength: number = 200): string => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
};

export default function RevisionApprovalManager() {
  const { user } = useAuth();
  const { isReviewer, isAdmin } = useRoles();
  const { toast } = useToast();
  const [revisions, setRevisions] = useState<CompanyRevision[]>([]);
  const [selectedRevision, setSelectedRevision] = useState<CompanyRevision | null>(null);
  const [feedback, setFeedback] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingRevision, setViewingRevision] = useState<CompanyRevision | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  // Get unique companies from revisions for the filter dropdown
  const uniqueCompanies = useMemo(() => {
    const companies = [...new Set(revisions.map(r => r.company_id))];
    return companies.sort();
  }, [revisions]);

  // Filtered revisions
  const filteredRevisions = useMemo(() => {
    return revisions.filter(revision => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const product = ALL_PRODUCTS.find(p => p.id === revision.product_id);
        const matchesSearch = 
          revision.changes_summary?.toLowerCase().includes(query) ||
          revision.company_id?.toLowerCase().includes(query) ||
          revision.product_id?.toLowerCase().includes(query) ||
          product?.name?.toLowerCase().includes(query) ||
          revision.profiles?.first_name?.toLowerCase().includes(query) ||
          revision.profiles?.last_name?.toLowerCase().includes(query) ||
          revision.profiles?.email?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Priority filter
      if (priorityFilter !== 'all' && revision.priority !== priorityFilter) {
        return false;
      }

      // Company filter
      if (companyFilter !== 'all' && revision.company_id !== companyFilter) {
        return false;
      }

      // Date range filter
      const revisionDate = new Date(revision.created_at);
      if (dateFrom && revisionDate < dateFrom) {
        return false;
      }
      if (dateTo) {
        const endOfDay = new Date(dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        if (revisionDate > endOfDay) {
          return false;
        }
      }

      return true;
    });
  }, [revisions, searchQuery, priorityFilter, companyFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearchQuery('');
    setPriorityFilter('all');
    setCompanyFilter('all');
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const hasActiveFilters = searchQuery || priorityFilter !== 'all' || companyFilter !== 'all' || dateFrom || dateTo;

  useEffect(() => {
    if (user && (isReviewer || isAdmin)) {
      fetchPendingRevisions();
    }
  }, [user, isReviewer, isAdmin]);

  const fetchPendingRevisions = async () => {
    // Fetch revisions
    const { data: revisionsData } = await supabase
      .from('company_revisions')
      .select('*')
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false });

    if (!revisionsData) {
      setRevisions([]);
      return;
    }

    // Fetch profile info for each revision
    const userIds = [...new Set(revisionsData.map(r => r.revised_by))];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, email')
      .in('id', userIds);

    const profilesMap = new Map(profilesData?.map(p => [p.id, p]) || []);

    const revisionsWithProfiles = revisionsData.map(revision => ({
      ...revision,
      profiles: profilesMap.get(revision.revised_by) as SubmitterProfile | undefined,
    }));

    setRevisions(revisionsWithProfiles);
  };

  const handleViewDetails = (revision: CompanyRevision) => {
    setViewingRevision(revision);
    setViewDialogOpen(true);
  };

  const handleStatusChange = async (revision: CompanyRevision, newStatus: string) => {
    const { error } = await supabase
      .from('company_revisions')
      .update({
        verification_status: newStatus,
        verified_by: user?.id,
        verified_at: new Date().toISOString(),
      })
      .eq('id', revision.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Status Updated',
        description: `Revision status changed to ${newStatus}`,
      });
      fetchPendingRevisions();
    }
  };

  const handleOpenDialog = (revision: CompanyRevision, action: 'approve' | 'reject') => {
    setSelectedRevision(revision);
    setActionType(action);
    setFeedback('');
    setDialogOpen(true);
  };

  const handleSubmitDecision = async () => {
    if (!selectedRevision || !user) return;

    const { error } = await supabase
      .from('company_revisions')
      .update({
        verification_status: actionType === 'approve' ? 'approved' : 'rejected',
        verified_by: user.id,
        verified_at: new Date().toISOString(),
        reviewer_feedback: feedback || null,
      })
      .eq('id', selectedRevision.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Revision ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`,
      });
      setDialogOpen(false);
      fetchPendingRevisions();
    }
  };

  const getPriorityColor = (priority: string): 'default' | 'destructive' | 'outline' | 'secondary' => {
    const colors: { [key: string]: 'default' | 'destructive' | 'outline' | 'secondary' } = {
      critical: 'destructive',
      high: 'default',
      medium: 'secondary',
      low: 'outline',
    };
    return colors[priority] || 'outline';
  };

  if (!isReviewer && !isAdmin) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Company Revisions</CardTitle>
          <CardDescription>Review and approve product information updates from companies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters Section */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content, company, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Priority Filter */}
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Company Filter */}
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {uniqueCompanies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Range */}
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, 'MMM d') : 'From'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, 'MMM d') : 'To'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredRevisions.length} of {revisions.length} revisions
            </div>
          </div>

          {filteredRevisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{hasActiveFilters ? 'No revisions match your filters' : 'No pending revisions to review'}</p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            filteredRevisions.map((revision) => {
              const product = ALL_PRODUCTS.find(p => p.id === revision.product_id);
              const submitterName = revision.profiles 
                ? `${revision.profiles.first_name} ${revision.profiles.last_name}`
                : 'Unknown';
              const isLongSummary = revision.changes_summary && revision.changes_summary.length > 200;
              
              return (
                <Card key={revision.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          {product?.name || revision.product_id}
                        </CardTitle>
                        <CardDescription>
                          Company: {revision.company_id}
                        </CardDescription>
                      </div>
                      <Badge variant={getPriorityColor(revision.priority)}>
                        {revision.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Submitter Info */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>Submitted by: <strong>{submitterName}</strong></span>
                      {revision.profiles?.email && (
                        <span className="text-xs">({revision.profiles.email})</span>
                      )}
                    </div>

                    {/* Truncated Changes Summary */}
                    <div>
                      <Label className="text-sm font-medium">Changes Summary:</Label>
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                        {truncateText(revision.changes_summary, 200)}
                      </p>
                      {isLongSummary && (
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="px-0 h-auto text-primary"
                          onClick={() => handleViewDetails(revision)}
                        >
                          View full details...
                        </Button>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Submitted: {new Date(revision.created_at).toLocaleString()}
                    </div>

                    {/* Status Change Dropdown (Admin only) */}
                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Status:</Label>
                        <Select
                          value={revision.verification_status}
                          onValueChange={(value) => handleStatusChange(revision, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(revision)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleOpenDialog(revision, 'approve')}
                        className="gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleOpenDialog(revision, 'reject')}
                        className="gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      {product && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        >
                          View Product
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Approve/Reject Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve' : 'Reject'} Revision
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Confirm that the changes are accurate and complete.'
                : 'Provide feedback explaining why this revision is being rejected.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                {actionType === 'approve' ? 'Reviewer Notes (Optional)' : 'Rejection Reason'}
              </Label>
              <Textarea
                placeholder={actionType === 'approve' 
                  ? 'Add any notes about this approval...'
                  : 'Explain what needs to be corrected...'}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                required={actionType === 'reject'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === 'approve' ? 'default' : 'destructive'}
              onClick={handleSubmitDecision}
              disabled={actionType === 'reject' && !feedback.trim()}
            >
              {actionType === 'approve' ? 'Approve Revision' : 'Reject Revision'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Revision Details</DialogTitle>
            <DialogDescription>
              Full details of the submitted revision
            </DialogDescription>
          </DialogHeader>
          
          {viewingRevision && (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Product Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Product</Label>
                    <p className="text-sm mt-1">
                      {ALL_PRODUCTS.find(p => p.id === viewingRevision.product_id)?.name || viewingRevision.product_id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Company</Label>
                    <p className="text-sm mt-1">{viewingRevision.company_id}</p>
                  </div>
                </div>

                {/* Submitter Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Submitted By</Label>
                    <p className="text-sm mt-1">
                      {viewingRevision.profiles 
                        ? `${viewingRevision.profiles.first_name} ${viewingRevision.profiles.last_name}`
                        : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-sm mt-1">{viewingRevision.profiles?.email || 'N/A'}</p>
                  </div>
                </div>

                {/* Date and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Submitted On</Label>
                    <p className="text-sm mt-1">{new Date(viewingRevision.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                    <Badge variant={getPriorityColor(viewingRevision.priority)} className="mt-1">
                      {viewingRevision.priority}
                    </Badge>
                  </div>
                </div>

                {/* Full Changes Summary */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Changes Summary</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {viewingRevision.changes_summary}
                    </pre>
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                  <Badge variant="secondary" className="mt-1">
                    {viewingRevision.verification_status}
                  </Badge>
                </div>
              </div>
            </ScrollArea>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setViewDialogOpen(false);
                if (viewingRevision) handleOpenDialog(viewingRevision, 'approve');
              }}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setViewDialogOpen(false);
                if (viewingRevision) handleOpenDialog(viewingRevision, 'reject');
              }}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
