import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, MailWarning, RefreshCw, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailLogRow {
  id: string;
  created_at: string;
  recipient: string;
  subject: string | null;
  status: string;
  function_name: string | null;
  bounce_type: string | null;
  bounce_subtype: string | null;
  error: string | null;
}

const STATUS_FILTERS = ['all', 'sent', 'delivered', 'bounced', 'complained', 'suppressed', 'failed'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'delivered' || status === 'sent') return 'secondary';
  if (status === 'bounced' || status === 'complained' || status === 'failed') return 'destructive';
  return 'outline';
};

export default function EmailHealth() {
  const { toast } = useToast();
  const [rows, setRows] = useState<EmailLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('email_send_log')
      .select('id, created_at, recipient, subject, status, function_name, bounce_type, bounce_subtype, error')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      toast({ variant: 'destructive', title: 'Could not load email history', description: error.message });
      setRows([]);
    } else {
      setRows((data ?? []) as EmailLogRow[]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter(row => {
      if (status !== 'all' && row.status !== status) return false;
      if (!term) return true;
      return (
        row.recipient.toLowerCase().includes(term) ||
        (row.subject ?? '').toLowerCase().includes(term) ||
        (row.function_name ?? '').toLowerCase().includes(term)
      );
    });
  }, [rows, search, status]);

  const counts = useMemo(() => {
    const tally: Record<string, number> = {};
    rows.forEach(row => { tally[row.status] = (tally[row.status] ?? 0) + 1; });
    return tally;
  }, [rows]);

  const problemCount = (counts.bounced ?? 0) + (counts.complained ?? 0) + (counts.failed ?? 0);

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Email Health</h1>
            <p className="text-muted-foreground">
              Recent outgoing email with its delivery outcome. Addresses that hard-bounce or report spam
              are skipped automatically on later sends.
            </p>
          </div>
          <Button variant="outline" onClick={fetchRows} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {rows.length === 0 && !loading && (
          <Card className="mb-6 border-amber-300">
            <CardContent className="flex items-start gap-3 py-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                No delivery records yet. Delivery events only arrive once the Resend webhook is registered
                and its signing secret is configured; outgoing sends are recorded from now on.
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Records</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{rows.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Delivered</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{(counts.delivered ?? 0)}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Problems</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-destructive">{problemCount}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Skipped</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{(counts.suppressed ?? 0)}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailWarning className="h-5 w-5" />
              Delivery log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search recipient, subject or source"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map(value => (
                  <Button
                    key={value}
                    size="sm"
                    variant={status === value ? 'default' : 'outline'}
                    onClick={() => setStatus(value)}
                  >
                    {value === 'all' ? 'All' : value}
                  </Button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center"><LoadingSpinner /></div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>When</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No records match this filter.
                        </TableCell>
                      </TableRow>
                    ) : filtered.map(row => (
                      <TableRow key={row.id}>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(row.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm">{row.recipient}</TableCell>
                        <TableCell className="text-sm max-w-[280px] truncate">{row.subject ?? '—'}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{row.function_name ?? '—'}</TableCell>
                        <TableCell><Badge variant={statusVariant(row.status)}>{row.status}</Badge></TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[260px]">
                          {[row.bounce_type, row.bounce_subtype, row.error].filter(Boolean).join(' · ') || '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
