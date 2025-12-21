import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Shield, AlertTriangle, Activity, Lock, Key, CheckCircle, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface SecurityEvent {
  id: string;
  event_type: string;
  severity: string;
  created_at: string;
  details: any;
  resolved_at: string | null;
  notes: string | null;
}

interface SecurityStats {
  totalEvents24h: number;
  criticalEvents: number;
  highEvents: number;
  mfaEnrollment: number;
  totalUsers: number;
}

export default function SecurityDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useRoles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [stats, setStats] = useState<SecurityStats>({
    totalEvents24h: 0,
    criticalEvents: 0,
    highEvents: 0,
    mfaEnrollment: 0,
    totalUsers: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Don't check permissions while still loading auth
    if (authLoading) return;
    
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchSecurityData();
  }, [user, isAdmin, authLoading, navigate]);

  const fetchSecurityData = async () => {
    try {
      setLoading(true);
      
      const { data: eventsData, error: eventsError } = await supabase
        .rpc('get_security_events_admin', { last_n_days: 7 });

      if (eventsError) {
        console.error('RPC error loading security events:', eventsError);
        throw new Error(`${eventsError.message} (Code: ${eventsError.code || 'unknown'})`);
      }

      // Map the data from RPC response
      const mappedEvents: SecurityEvent[] = (eventsData || []).map(event => ({
        id: event.id,
        event_type: event.event_type,
        severity: event.severity,
        created_at: event.created_at,
        details: event.details,
        resolved_at: event.resolved_at || null,
        notes: event.notes || null
      }));

      setEvents(mappedEvents);

      // Calculate stats from events
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const events24h = eventsData?.filter(e => 
        new Date(e.created_at) >= yesterday
      ) || [];

      // Get MFA enrollment stats
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: mfaEnabled } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('mfa_enabled', true);

      setStats({
        totalEvents24h: events24h.length,
        criticalEvents: eventsData?.filter(e => e.severity === 'critical').length || 0,
        highEvents: eventsData?.filter(e => e.severity === 'high').length || 0,
        mfaEnrollment: Math.round(((mfaEnabled || 0) / (totalUsers || 1)) * 100),
        totalUsers: totalUsers || 0,
      });
    } catch (error: any) {
      console.error('Error fetching security data:', error);
      toast({
        title: 'Failed to Load Security Data',
        description: error.message || 'Check console for details',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (event: SecurityEvent) => {
    setSelectedEvent(event);
    setNotes(event.notes || '');
    setDialogOpen(true);
  };

  const submitResolve = async () => {
    if (!selectedEvent) return;
    
    setProcessing(true);
    try {
      const { data, error } = await supabase.rpc('resolve_security_event_admin', {
        p_event_id: selectedEvent.id,
        p_notes: notes || null
      });

      if (error) throw error;
      
      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        throw new Error(result.error || 'Failed to resolve event');
      }

      toast({
        title: 'Event Resolved',
        description: 'Security event has been marked as resolved',
      });

      setDialogOpen(false);
      setSelectedEvent(null);
      setNotes('');
      fetchSecurityData();
    } catch (error: any) {
      console.error('Error resolving event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to resolve event',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-orange-500">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

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
      <div className="container max-w-7xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Security Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Monitor security events and system health</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Events (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents24h}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Last 24 hours
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.criticalEvents}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Last 7 days
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Key className="h-4 w-4" />
                MFA Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.mfaEnrollment}%</div>
              <div className="text-xs text-muted-foreground mt-1">
                Of all users
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.highEvents}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Last 7 days
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>Events from the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No security events recorded
                    </TableCell>
                  </TableRow>
                )}
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-mono text-xs">
                      {format(new Date(event.created_at), 'MMM d, HH:mm:ss')}
                    </TableCell>
                    <TableCell>{event.event_type}</TableCell>
                    <TableCell>{getSeverityBadge(event.severity)}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {event.details?.message || JSON.stringify(event.details)}
                    </TableCell>
                    <TableCell>
                      {event.resolved_at ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                          Resolved
                        </Badge>
                      ) : (
                        <Badge variant="outline">Open</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!event.resolved_at && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResolve(event)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        {event.resolved_at && event.notes && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedEvent(event);
                              setNotes(event.notes || '');
                              setDialogOpen(true);
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Notes
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Resolve/Notes Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEvent?.resolved_at ? 'Event Notes' : 'Resolve Security Event'}
              </DialogTitle>
              <DialogDescription>
                {selectedEvent?.resolved_at 
                  ? 'View notes for this resolved event'
                  : 'Add notes about the investigation and resolution'}
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Event Type:</span>
                    <p className="font-medium">{selectedEvent.event_type}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Severity:</span>
                    <p>{getSeverityBadge(selectedEvent.severity)}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Details:</span>
                    <p className="font-medium">{selectedEvent.details?.message || JSON.stringify(selectedEvent.details)}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Resolution Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe the investigation findings and resolution..."
                    rows={4}
                    disabled={!!selectedEvent.resolved_at}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {selectedEvent?.resolved_at ? 'Close' : 'Cancel'}
              </Button>
              {!selectedEvent?.resolved_at && (
                <Button onClick={submitResolve} disabled={processing}>
                  {processing ? 'Resolving...' : 'Mark as Resolved'}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}
