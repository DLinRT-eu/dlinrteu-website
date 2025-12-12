import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Mail,
  Search,
  Plus,
  Trash2,
  Download,
  RefreshCcw,
  Users,
  UserCheck,
  UserX,
  Clock,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  FileSpreadsheet,
  FileJson,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import PageLayout from '@/components/layout/PageLayout';
import { 
  NewsletterSubscriber, 
  exportNewsletterToCSV, 
  exportNewsletterToExcel, 
  exportNewsletterToJSON 
} from '@/utils/newsletterExport';

interface Stats {
  total: number;
  active: number;
  unsubscribed: number;
  recent: number;
}

export default function NewsletterManagement() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0, recent: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<NewsletterSubscriber | null>(null);

  // Add form state
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newConsentGiven, setNewConsentGiven] = useState(true);
  const [addLoading, setAddLoading] = useState(false);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: {
          action: 'list',
          search,
          status: statusFilter,
          page,
          limit: 20
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to fetch subscribers');
      }

      const result = response.data;
      setSubscribers(result.subscribers || []);
      setStats(result.stats || { total: 0, active: 0, unsubscribed: 0, recent: 0 });
      setTotalPages(result.totalPages || 1);
      setTotal(result.total || 0);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast.error('Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchSubscribers();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleAddSubscriber = async () => {
    if (!newEmail || !newFirstName || !newLastName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setAddLoading(true);
    try {
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: {
          action: 'add',
          email: newEmail,
          firstName: newFirstName,
          lastName: newLastName,
          consentGiven: newConsentGiven
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to add subscriber');
      }

      const result = response.data;
      if (result.error) {
        if (result.error === 'Email already subscribed') {
          toast.error('This email is already subscribed');
        } else {
          throw new Error(result.error);
        }
        return;
      }

      toast.success(result.action === 'resubscribed' ? 'Subscriber reactivated' : 'Subscriber added');
      setAddDialogOpen(false);
      setNewEmail('');
      setNewFirstName('');
      setNewLastName('');
      setNewConsentGiven(true);
      fetchSubscribers();
    } catch (error) {
      console.error('Error adding subscriber:', error);
      toast.error('Failed to add subscriber');
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteSubscriber = async () => {
    if (!subscriberToDelete) return;

    try {
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: { action: 'delete', id: subscriberToDelete.id }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to delete subscriber');
      }

      toast.success('Subscriber removed');
      setDeleteDialogOpen(false);
      setSubscriberToDelete(null);
      fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };

  const handleResubscribe = async (subscriber: NewsletterSubscriber) => {
    try {
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: { action: 'resubscribe', id: subscriber.id }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to resubscribe');
      }

      toast.success('Subscriber reactivated');
      fetchSubscribers();
    } catch (error) {
      console.error('Error resubscribing:', error);
      toast.error('Failed to reactivate subscriber');
    }
  };

  const handleExport = async (format: 'csv' | 'excel' | 'json') => {
    try {
      // Fetch all subscribers for export
      const response = await supabase.functions.invoke('admin-newsletter-management', {
        body: {
          action: 'list',
          search,
          status: statusFilter,
          page: 1,
          limit: 10000 // Get all for export
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to fetch subscribers for export');
      }

      const allSubscribers = response.data.subscribers || [];

      if (allSubscribers.length === 0) {
        toast.error('No subscribers to export');
        return;
      }

      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `newsletter_subscribers_${timestamp}`;

      switch (format) {
        case 'csv':
          exportNewsletterToCSV(allSubscribers, `${filename}.csv`);
          break;
        case 'excel':
          exportNewsletterToExcel(allSubscribers, `${filename}.xlsx`);
          break;
        case 'json':
          exportNewsletterToJSON(allSubscribers, `${filename}.json`);
          break;
      }

      toast.success(`Exported ${allSubscribers.length} subscribers to ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export subscribers');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEO 
        title="Newsletter Management | Admin | DLinRT.eu"
        description="Manage newsletter subscribers - search, add, remove, and export"
      />
      <PageLayout>
        <div className="container mx-auto py-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Mail className="h-8 w-8" />
                Newsletter Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your newsletter mailing list
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => fetchSubscribers()}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('excel')}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('json')}>
                    <FileJson className="h-4 w-4 mr-2" />
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
                <UserX className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.unsubscribed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.recent}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email or name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Subscribers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribers ({total})</CardTitle>
              <CardDescription>
                Manage newsletter subscribers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No subscribers found</p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Consent</TableHead>
                          <TableHead>Subscribed</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell className="font-medium">{subscriber.email}</TableCell>
                            <TableCell>
                              {subscriber.first_name} {subscriber.last_name}
                            </TableCell>
                            <TableCell>
                              {subscriber.unsubscribed_at ? (
                                <Badge variant="destructive">Unsubscribed</Badge>
                              ) : (
                                <Badge variant="default" className="bg-green-600">Active</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {subscriber.consent_given ? (
                                <Badge variant="outline" className="text-green-600 border-green-600">Yes</Badge>
                              ) : (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">No</Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(subscriber.created_at)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {subscriber.unsubscribed_at && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleResubscribe(subscriber)}
                                    title="Resubscribe"
                                  >
                                    <RotateCcw className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSubscriberToDelete(subscriber);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-destructive hover:text-destructive"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Page {page} of {totalPages}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Subscriber Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Subscriber</DialogTitle>
              <DialogDescription>
                Add a new subscriber to the newsletter mailing list.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="subscriber@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consent"
                  checked={newConsentGiven}
                  onCheckedChange={(checked) => setNewConsentGiven(checked === true)}
                />
                <Label htmlFor="consent" className="text-sm">
                  Consent given for newsletter communications
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubscriber} disabled={addLoading}>
                {addLoading ? 'Adding...' : 'Add Subscriber'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Subscriber</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove <strong>{subscriberToDelete?.email}</strong> from the newsletter?
                This action cannot be undone and will permanently delete their subscription data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSubscriberToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSubscriber}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageLayout>
    </>
  );
}
