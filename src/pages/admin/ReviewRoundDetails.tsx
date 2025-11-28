import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowLeft, Clock, Users, Package, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import type { ReviewRound } from "@/utils/reviewRoundUtils";
import { ALL_PRODUCTS } from "@/data";
import { RoundActionsMenu } from "@/components/admin/review-rounds/RoundActionsMenu";
import { AssignmentActionsMenu } from "@/components/admin/review-rounds/AssignmentActionsMenu";
import { BulkActionsMenu } from "@/components/admin/review-rounds/BulkActionsMenu";
import { Checkbox } from "@/components/ui/checkbox";
import SortableHeader from "@/components/revision/table/SortableHeader";

interface AssignmentHistoryRecord {
  id: string;
  product_id: string;
  assigned_to: string | null;
  previous_assignee: string | null;
  changed_by: string;
  change_type: 'initial' | 'reassign' | 'remove';
  reason: string | null;
  created_at: string;
  changed_by_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  assigned_to_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  previous_assignee_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Reviewer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Assignment {
  id: string;
  product_id: string;
  assigned_to: string;
  status: string;
  deadline: string | null;
  assigned_at: string;
  reviewer_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function ReviewRoundDetails() {
  const { roundId } = useParams<{ roundId: string }>();
  const navigate = useNavigate();
  const [round, setRound] = useState<ReviewRound | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [history, setHistory] = useState<AssignmentHistoryRecord[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  
  // Sorting state for assignments table
  const [assignmentSort, setAssignmentSort] = useState<{
    field: 'product' | 'assignedTo' | 'status' | 'deadline' | 'assignedAt';
    direction: 'asc' | 'desc';
  }>({ field: 'assignedAt', direction: 'desc' });
  
  // Sorting state for history table
  const [historySort, setHistorySort] = useState<{
    field: 'date' | 'product' | 'action' | 'changedBy';
    direction: 'asc' | 'desc';
  }>({ field: 'date', direction: 'desc' });

  useEffect(() => {
    if (roundId) {
      fetchRoundDetails();
      fetchReviewers();
    }
  }, [roundId]);

  const fetchReviewers = async () => {
    try {
      const { data: reviewerRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'reviewer');

      if (rolesError) throw rolesError;

      const reviewerIds = reviewerRoles?.map(r => r.user_id) || [];

      if (reviewerIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', reviewerIds);

        if (profilesError) throw profilesError;
        setReviewers(profiles as Reviewer[]);
      }
    } catch (error) {
      console.error('Error fetching reviewers:', error);
    }
  };

  const fetchRoundDetails = async () => {
    if (!roundId) return;

    try {
      // Use RPC function to fetch all round details in one call
      const { data, error } = await supabase.rpc('get_review_round_details_admin', {
        p_round_id: roundId
      });

      if (error) throw error;
      
      const result = data as any;
      
      if (!result?.success) {
        throw new Error(result?.error || 'Failed to load round details');
      }

      setRound(result.round as ReviewRound);
      setAssignments(result.assignments || []);
      setHistory(result.history || []);
    } catch (error: any) {
      console.error('Error fetching round details:', error);
      toast.error(error.message || 'Failed to load round details');
    } finally {
      setLoading(false);
    }
  };

  const getProductName = (productId: string) => {
    return ALL_PRODUCTS.find(p => p.id === productId)?.name || productId;
  };

  const getChangeTypeBadge = (type: string) => {
    const variants = {
      initial: { variant: 'default' as const, label: 'Initial Assignment' },
      reassign: { variant: 'outline' as const, label: 'Reassigned' },
      remove: { variant: 'destructive' as const, label: 'Removed' }
    };
    const config = variants[type as keyof typeof variants] || variants.initial;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: 'secondary', label: 'Pending' },
      in_progress: { variant: 'default', label: 'In Progress' },
      completed: { variant: 'outline', label: 'Completed' }
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssignments(assignments.map(a => a.id));
    } else {
      setSelectedAssignments([]);
    }
  };

  const handleSelectAssignment = (assignmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssignments(prev => [...prev, assignmentId]);
    } else {
      setSelectedAssignments(prev => prev.filter(id => id !== assignmentId));
    }
  };

  // Sort handlers
  const handleAssignmentSort = (field: string) => {
    setAssignmentSort(prev => ({
      field: field as any,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleHistorySort = (field: string) => {
    setHistorySort(prev => ({
      field: field as any,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Sorted assignments
  const sortedAssignments = useMemo(() => {
    return [...assignments].sort((a, b) => {
      let comparison = 0;
      
      switch (assignmentSort.field) {
        case 'product':
          comparison = getProductName(a.product_id).localeCompare(getProductName(b.product_id));
          break;
        case 'assignedTo':
          const aName = a.reviewer_profile 
            ? `${a.reviewer_profile.first_name} ${a.reviewer_profile.last_name}`
            : '';
          const bName = b.reviewer_profile 
            ? `${b.reviewer_profile.first_name} ${b.reviewer_profile.last_name}`
            : '';
          comparison = aName.localeCompare(bName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'deadline':
          const aDeadline = a.deadline || '';
          const bDeadline = b.deadline || '';
          comparison = aDeadline.localeCompare(bDeadline);
          break;
        case 'assignedAt':
          comparison = new Date(a.assigned_at).getTime() - new Date(b.assigned_at).getTime();
          break;
      }
      
      return assignmentSort.direction === 'asc' ? comparison : -comparison;
    });
  }, [assignments, assignmentSort]);

  // Sorted history
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => {
      let comparison = 0;
      
      switch (historySort.field) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'product':
          comparison = getProductName(a.product_id).localeCompare(getProductName(b.product_id));
          break;
        case 'action':
          comparison = a.change_type.localeCompare(b.change_type);
          break;
        case 'changedBy':
          const aName = a.changed_by_profile 
            ? `${a.changed_by_profile.first_name} ${a.changed_by_profile.last_name}`
            : '';
          const bName = b.changed_by_profile 
            ? `${b.changed_by_profile.first_name} ${b.changed_by_profile.last_name}`
            : '';
          comparison = aName.localeCompare(bName);
          break;
      }
      
      return historySort.direction === 'asc' ? comparison : -comparison;
    });
  }, [history, historySort]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Round not found</p>
            <Button onClick={() => navigate('/admin/review-rounds')} className="mt-4">
              Back to Rounds
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate progress
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const progressPercent = assignments.length > 0 
    ? Math.round((completedCount / assignments.length) * 100) 
    : 0;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/review-rounds')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{round.name}</h1>
          {round.description && (
            <p className="text-muted-foreground mt-1">{round.description}</p>
          )}
        </div>
        <Badge variant={round.status === 'active' ? 'default' : 'secondary'}>
          {round.status}
        </Badge>
        <RoundActionsMenu round={round} onUpdate={fetchRoundDetails} />
      </div>

      {/* Progress Bar */}
      {assignments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Overall Progress</CardTitle>
              <span className="text-sm text-muted-foreground">
                {completedCount} of {assignments.length} completed ({progressPercent}%)
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Reviewers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(assignments.map(a => a.assigned_to)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History Records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{history.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList>
          <TabsTrigger value="assignments">
            Current Assignments ({assignments.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Assignment History ({history.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Assignments</CardTitle>
                  <CardDescription>All product assignments for this round</CardDescription>
                </div>
                {selectedAssignments.length > 0 && (
                  <BulkActionsMenu
                    selectedIds={selectedAssignments}
                    reviewers={reviewers}
                    onUpdate={fetchRoundDetails}
                    onClearSelection={() => setSelectedAssignments([])}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No assignments yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedAssignments.length === assignments.length}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <SortableHeader
                        field="product"
                        sortField={assignmentSort.field}
                        sortDirection={assignmentSort.direction}
                        onSort={handleAssignmentSort}
                      >
                        Product
                      </SortableHeader>
                      <SortableHeader
                        field="assignedTo"
                        sortField={assignmentSort.field}
                        sortDirection={assignmentSort.direction}
                        onSort={handleAssignmentSort}
                      >
                        Assigned To
                      </SortableHeader>
                      <SortableHeader
                        field="status"
                        sortField={assignmentSort.field}
                        sortDirection={assignmentSort.direction}
                        onSort={handleAssignmentSort}
                      >
                        Status
                      </SortableHeader>
                      <SortableHeader
                        field="deadline"
                        sortField={assignmentSort.field}
                        sortDirection={assignmentSort.direction}
                        onSort={handleAssignmentSort}
                      >
                        Deadline
                      </SortableHeader>
                      <SortableHeader
                        field="assignedAt"
                        sortField={assignmentSort.field}
                        sortDirection={assignmentSort.direction}
                        onSort={handleAssignmentSort}
                      >
                        Assigned At
                      </SortableHeader>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAssignments.map((assignment) => {
                      const isOverdue = assignment.deadline && 
                        assignment.status !== 'completed' && 
                        new Date(assignment.deadline) < new Date();
                      
                      return (
                        <TableRow key={assignment.id} className={isOverdue ? 'bg-destructive/5' : ''}>
                          <TableCell>
                            <Checkbox
                              checked={selectedAssignments.includes(assignment.id)}
                              onCheckedChange={(checked) => 
                                handleSelectAssignment(assignment.id, checked as boolean)
                              }
                              aria-label={`Select ${getProductName(assignment.product_id)}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {getProductName(assignment.product_id)}
                          </TableCell>
                          <TableCell>
                            {assignment.reviewer_profile ? (
                              <div>
                                <div>
                                  {assignment.reviewer_profile.first_name}{' '}
                                  {assignment.reviewer_profile.last_name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {assignment.reviewer_profile.email}
                                </div>
                              </div>
                            ) : (
                              'Unknown'
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                          <TableCell>
                            {assignment.deadline ? (
                              <div className={isOverdue ? 'text-destructive font-medium' : ''}>
                                {format(new Date(assignment.deadline), 'MMM d, yyyy')}
                                {isOverdue && ' (Overdue)'}
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {format(new Date(assignment.assigned_at), 'MMM d, yyyy HH:mm')}
                          </TableCell>
                          <TableCell>
                            <AssignmentActionsMenu
                              assignment={assignment}
                              reviewers={reviewers}
                              onUpdate={fetchRoundDetails}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment History</CardTitle>
              <CardDescription>
                Audit log of all assignment changes and who made them
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No history records yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortableHeader
                        field="date"
                        sortField={historySort.field}
                        sortDirection={historySort.direction}
                        onSort={handleHistorySort}
                      >
                        Date
                      </SortableHeader>
                      <SortableHeader
                        field="product"
                        sortField={historySort.field}
                        sortDirection={historySort.direction}
                        onSort={handleHistorySort}
                      >
                        Product
                      </SortableHeader>
                      <SortableHeader
                        field="action"
                        sortField={historySort.field}
                        sortDirection={historySort.direction}
                        onSort={handleHistorySort}
                      >
                        Action
                      </SortableHeader>
                      <TableHead>Details</TableHead>
                      <SortableHeader
                        field="changedBy"
                        sortField={historySort.field}
                        sortDirection={historySort.direction}
                        onSort={handleHistorySort}
                      >
                        Changed By
                      </SortableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(record.created_at), 'MMM d, yyyy HH:mm')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getProductName(record.product_id)}
                        </TableCell>
                        <TableCell>{getChangeTypeBadge(record.change_type)}</TableCell>
                        <TableCell>
                          {record.change_type === 'initial' && record.assigned_to_profile && (
                            <div>
                              Assigned to{' '}
                              <span className="font-medium">
                                {record.assigned_to_profile.first_name}{' '}
                                {record.assigned_to_profile.last_name}
                              </span>
                            </div>
                          )}
                          {record.change_type === 'reassign' && (
                            <div>
                              {record.previous_assignee_profile && (
                                <span>
                                  From{' '}
                                  <span className="font-medium">
                                    {record.previous_assignee_profile.first_name}{' '}
                                    {record.previous_assignee_profile.last_name}
                                  </span>
                                </span>
                              )}
                              {record.assigned_to_profile && (
                                <span>
                                  {' '}
                                  to{' '}
                                  <span className="font-medium">
                                    {record.assigned_to_profile.first_name}{' '}
                                    {record.assigned_to_profile.last_name}
                                  </span>
                                </span>
                              )}
                            </div>
                          )}
                          {record.change_type === 'remove' && record.previous_assignee_profile && (
                            <div>
                              Removed from{' '}
                              <span className="font-medium">
                                {record.previous_assignee_profile.first_name}{' '}
                                {record.previous_assignee_profile.last_name}
                              </span>
                            </div>
                          )}
                          {record.reason && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {record.reason}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.changed_by_profile ? (
                            <div>
                              <div>
                                {record.changed_by_profile.first_name}{' '}
                                {record.changed_by_profile.last_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {record.changed_by_profile.email}
                              </div>
                            </div>
                          ) : (
                            'System'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
