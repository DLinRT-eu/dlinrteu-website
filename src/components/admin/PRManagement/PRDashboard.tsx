import React, { useState, useMemo } from 'react';
import { useGitHubPullRequests, PullRequest } from '@/hooks/useGitHubPullRequests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  RefreshCw,
  GitPullRequest,
  Search,
  AlertCircle,
  ExternalLink,
  Github,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
} from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PRCard from './PRCard';

type Priority = 'high' | 'medium' | 'low' | null;
type ReviewFilter = 'all' | 'approved' | 'changes_requested' | 'pending' | 'reviewed';
type SortOption = 'newest' | 'oldest' | 'most_changes' | 'priority';

export default function PRDashboard() {
  const { data, isLoading, error, refetch, isFetching } = useGitHubPullRequests();
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priorities, setPriorities] = useState<Record<number, Priority>>({});

  // Load priorities from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('pr-priorities');
    if (saved) {
      try {
        setPriorities(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save priorities to localStorage when changed
  const handlePriorityChange = (prNumber: number, priority: Priority) => {
    setPriorities((prev) => {
      const updated = { ...prev };
      if (priority === null) {
        delete updated[prNumber];
      } else {
        updated[prNumber] = priority;
      }
      localStorage.setItem('pr-priorities', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter and sort PRs
  const filteredPRs = useMemo(() => {
    if (!data?.pullRequests) return [];

    let filtered = data.pullRequests.filter((pr) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = pr.title.toLowerCase().includes(query);
        const matchesAuthor = pr.user.login.toLowerCase().includes(query);
        const matchesNumber = pr.number.toString().includes(query);
        const matchesLabel = pr.labels.some((l) => l.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesAuthor && !matchesNumber && !matchesLabel) {
          return false;
        }
      }

      // Review status filter
      if (reviewFilter !== 'all' && pr.review_status !== reviewFilter) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2, null: 3 };
        const aPriority = priorities[a.number] ?? null;
        const bPriority = priorities[b.number] ?? null;
        const aOrder = priorityOrder[aPriority as keyof typeof priorityOrder] ?? 3;
        const bOrder = priorityOrder[bPriority as keyof typeof priorityOrder] ?? 3;
        if (aOrder !== bOrder) return aOrder - bOrder;
        // Fall back to newest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }

      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }

      if (sortBy === 'most_changes') {
        return b.files_changed - a.files_changed;
      }

      // Default: newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return filtered;
  }, [data?.pullRequests, searchQuery, reviewFilter, sortBy, priorities]);

  // Stats
  const stats = useMemo(() => {
    if (!data?.pullRequests) return { total: 0, approved: 0, changesRequested: 0, pending: 0 };
    
    return {
      total: data.pullRequests.length,
      approved: data.pullRequests.filter((pr) => pr.review_status === 'approved').length,
      changesRequested: data.pullRequests.filter((pr) => pr.review_status === 'changes_requested').length,
      pending: data.pullRequests.filter((pr) => pr.review_status === 'pending').length,
    };
  }, [data?.pullRequests]);

  if (isLoading) {
    return <LoadingSpinner text="Loading pull requests..." />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading pull requests</AlertTitle>
        <AlertDescription>
          {error.message}
          <Button variant="outline" size="sm" className="ml-4" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Github className="h-6 w-6" />
            Pull Requests
          </h2>
          <p className="text-muted-foreground text-sm">
            {data?.meta?.repository || 'DLinRT-eu/dlinrteu-website'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {data?.meta && !data.meta.has_token && (
            <Badge variant="outline" className="text-xs text-yellow-600 dark:text-yellow-400">
              Rate limited (no token)
            </Badge>
          )}
          {data?.meta?.rate_limit?.remaining && (
            <Badge variant="secondary" className="text-xs">
              API: {data.meta.rate_limit.remaining}/{data.meta.rate_limit.limit}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/DLinRT-eu/dlinrteu-website/pulls"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              Open PRs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Changes Requested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.changesRequested}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or #number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={reviewFilter} onValueChange={(v) => setReviewFilter(v as ReviewFilter)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Review Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="changes_requested">Changes Requested</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="reviewed">In Review</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most_changes">Most Changes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* PR List */}
      {filteredPRs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GitPullRequest className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No pull requests found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery || reviewFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'There are no open pull requests at the moment'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPRs.map((pr) => (
            <PRCard
              key={pr.number}
              pr={pr}
              priority={priorities[pr.number] ?? null}
              onPriorityChange={(priority) => handlePriorityChange(pr.number, priority)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
