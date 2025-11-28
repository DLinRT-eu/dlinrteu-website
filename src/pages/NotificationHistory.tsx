import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Trash2, CheckCircle2, Bell, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import SortableHeader from '@/components/revision/table/SortableHeader';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

export default function NotificationHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [sortConfig, setSortConfig] = useState<{
    field: 'created_at' | 'title' | 'type' | 'read';
    direction: 'asc' | 'desc';
  }>({ field: 'created_at', direction: 'desc' });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchNotifications();
  }, [user, navigate]);

  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } else {
      setNotifications(data || []);
    }
    setLoading(false);
  };

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field: field as any,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedNotifications = notifications
    .filter(n => {
      if (filterType !== 'all' && n.type !== filterType) return false;
      if (filterRead === 'read' && !n.read) return false;
      if (filterRead === 'unread' && n.read) return false;
      if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.field) {
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'read':
          comparison = (a.read ? 1 : 0) - (b.read ? 1 : 0);
          break;
      }
      
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredAndSortedNotifications.map(n => n.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    const newSet = new Set(selectedIds);
    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }
    setSelectedIds(newSet);
  };

  const handleMarkAsRead = async (ids: string[]) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .in('id', ids);

    if (error) {
      toast.error('Failed to mark as read');
    } else {
      toast.success(`Marked ${ids.length} notification(s) as read`);
      fetchNotifications();
      setSelectedIds(new Set());
    }
  };

  const handleDelete = async (ids: string[]) => {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .in('id', ids);

    if (error) {
      toast.error('Failed to delete notifications');
    } else {
      toast.success(`Deleted ${ids.length} notification(s)`);
      fetchNotifications();
      setSelectedIds(new Set());
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notification.id);
      fetchNotifications();
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getTypeIcon = (type: string) => {
    const colors = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
    };
    return colors[type as keyof typeof colors] || 'text-muted-foreground';
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      success: 'default' as const,
      error: 'destructive' as const,
      warning: 'secondary' as const,
      info: 'outline' as const,
    };
    return variants[type as keyof typeof variants] || 'outline';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notification History
          </h1>
          <p className="text-muted-foreground mt-1">
            {notifications.length} total notifications ({unreadCount} unread)
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle>Filters</CardTitle>
              {selectedIds.size > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(Array.from(selectedIds))}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Read ({selectedIds.size})
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(Array.from(selectedIds))}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedIds.size})
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread Only</SelectItem>
                  <SelectItem value="read">Read Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAndSortedNotifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No notifications found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.size === filteredAndSortedNotifications.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <SortableHeader
                    field="read"
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                    onSort={handleSort}
                    className="w-12"
                  >
                    Status
                  </SortableHeader>
                  <SortableHeader
                    field="type"
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                    onSort={handleSort}
                  >
                    Type
                  </SortableHeader>
                  <SortableHeader
                    field="title"
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                    onSort={handleSort}
                  >
                    Title
                  </SortableHeader>
                  <TableHead>Message</TableHead>
                  <SortableHeader
                    field="created_at"
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                    onSort={handleSort}
                  >
                    Date
                  </SortableHeader>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedNotifications.map((notification) => (
                  <TableRow 
                    key={notification.id}
                    className={!notification.read ? 'bg-accent/50' : ''}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(notification.id)}
                        onCheckedChange={(checked) => handleSelect(notification.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadge(notification.type)}>
                        {notification.type}
                      </Badge>
                    </TableCell>
                    <TableCell 
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {notification.title}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {notification.message}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead([notification.id])}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete([notification.id])}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
