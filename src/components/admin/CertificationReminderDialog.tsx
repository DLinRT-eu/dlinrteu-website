import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Loader2,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { format, formatDistanceToNow } from 'date-fns';

const DEFAULT_SUBJECT =
  "Action Required: Certify Your Product Information on DLinRT.eu – {CompanyName}";

const DEFAULT_BODY =
  `We are reaching out regarding the DLinRT.eu Company Certification Program for {CompanyName}.

The certification portal is now open and we kindly invite you to review your company's product information and certify that everything is accurate and up to date.

Your participation helps maintain the quality and reliability of our platform for the entire radiotherapy community.`;

interface Recipient {
  id: string;
  user_id: string;
  company_name: string;
  position: string | null;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  roles: string[];
}

interface LogEntry {
  id: string;
  sent_at: string;
  subject: string;
  message_body: string;
  emails_sent: number;
  emails_failed: number;
  companies: string[];
  recipients: { email: string; name: string; company: string }[];
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent?: () => void;
}

export function CertificationReminderDialog({ open, onOpenChange, onSent }: Props) {
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [sending, setSending] = useState(false);

  // Load recipients and history when dialog opens
  useEffect(() => {
    if (!open) return;
    loadRecipients();
    loadLogs();
  }, [open]);

  const loadRecipients = async () => {
    setLoadingRecipients(true);
    try {
      // Fetch verified reps with profiles
      const { data: reps, error } = await supabase
        .from('company_representatives')
        .select(`
          id,
          user_id,
          company_name,
          position,
          profiles!inner (
            first_name,
            last_name,
            email
          )
        `)
        .eq('verified', true)
        .neq('company_id', 'admin_all_companies');

      if (error) throw error;

      // Fetch user roles for these reps to identify and exclude admins
      const userIds = (reps || []).map((r: any) => r.user_id);
      const { data: roleRows } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .in('user_id', userIds);

      const roleMap = new Map<string, string[]>();
      (roleRows || []).forEach((r: any) => {
        const existing = roleMap.get(r.user_id) || [];
        roleMap.set(r.user_id, [...existing, r.role]);
      });

      // Exclude admins (same logic as edge function)
      const filtered = (reps || []).filter((rep: any) => {
        const repRoles = roleMap.get(rep.user_id) || [];
        return !repRoles.includes('admin');
      });

      setRecipients(
        filtered.map((rep: any) => ({
          ...rep,
          roles: roleMap.get(rep.user_id) || [],
        }))
      );
    } catch (err: any) {
      console.error('Failed to load recipients:', err);
      toast.error('Could not load recipient list');
    } finally {
      setLoadingRecipients(false);
    }
  };

  const loadLogs = async () => {
    setLoadingLogs(true);
    try {
      const { data, error } = await supabase
        .from('certification_reminder_logs')
        .select('id, sent_at, subject, message_body, emails_sent, emails_failed, companies, recipients')
        .order('sent_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setLogs((data || []) as LogEntry[]);
    } catch (err: any) {
      console.error('Failed to load logs:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-certification-reminder', {
        body: {
          customSubject: subject !== DEFAULT_SUBJECT ? subject : undefined,
          customBody: body !== DEFAULT_BODY ? body : undefined,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Unknown error');

      toast.success(
        `Sent ${data.emailsSent} reminder email${data.emailsSent !== 1 ? 's' : ''} to ${data.companiesContacted} compan${data.companiesContacted !== 1 ? 'ies' : 'y'}`
      );

      // Refresh history and notify parent
      await loadLogs();
      onSent?.();
      onOpenChange(false);
    } catch (err: any) {
      console.error('Send error:', err);
      toast.error(`Failed to send reminders: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-primary" />
            Send Certification Reminders
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="compose" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="shrink-0">
            <TabsTrigger value="compose">
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="recipients">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              Recipients
              {!loadingRecipients && (
                <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0 h-4">
                  {recipients.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              History
            </TabsTrigger>
          </TabsList>

          {/* ── COMPOSE ── */}
          <TabsContent value="compose" className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1">
            <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Placeholders <code className="text-xs bg-muted px-1 py-0.5 rounded">{'{FirstName}'}</code> and{' '}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">{'{CompanyName}'}</code> will be substituted
              per recipient. The action checklist and CTA button are always included.
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-subject">Subject</Label>
              <Input
                id="reminder-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject…"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-body">Message body</Label>
              <Textarea
                id="reminder-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                placeholder="Email body…"
                className="font-mono text-sm leading-relaxed resize-y"
              />
            </div>
          </TabsContent>

          {/* ── RECIPIENTS ── */}
          <TabsContent value="recipients" className="flex-1 overflow-y-auto mt-4 pr-1">
            {loadingRecipients ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading recipients…
              </div>
            ) : recipients.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                <Users className="h-8 w-8 opacity-30" />
                <p className="text-sm">No eligible recipients found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {recipients.map((rep) => (
                  <div
                    key={rep.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {rep.profiles?.first_name} {rep.profiles?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {rep.profiles?.email}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span>{rep.company_name}</span>
                      </div>
                      {rep.roles.map((role) => (
                        <Badge
                          key={role}
                          variant={role === 'company' ? 'default' : 'secondary'}
                          className="text-xs px-1.5 py-0 h-5 capitalize"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── HISTORY ── */}
          <TabsContent value="history" className="flex-1 overflow-y-auto mt-4 pr-1">
            {loadingLogs ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading history…
              </div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                <Clock className="h-8 w-8 opacity-30" />
                <p className="text-sm">No reminders have been sent yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border border-border bg-card px-4 py-3 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {log.subject.replace(/\{CompanyName\}/g, '[Company]')}
                      </span>
                      <span
                        className="text-xs text-muted-foreground shrink-0"
                        title={format(new Date(log.sent_at), 'PPpp')}
                      >
                        {formatDistanceToNow(new Date(log.sent_at), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                        {log.emails_sent} sent
                      </span>
                      {log.emails_failed > 0 && (
                        <span className="flex items-center gap-1 text-destructive">
                          <AlertTriangle className="h-3 w-3" />
                          {log.emails_failed} failed
                        </span>
                      )}
                    </div>

                    {log.companies && log.companies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {log.companies.map((company) => (
                          <Badge
                            key={company}
                            variant="outline"
                            className="text-xs px-1.5 py-0 h-5"
                          >
                            {company}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="shrink-0 border-t border-border pt-4 mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending || recipients.length === 0}>
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send to {loadingRecipients ? '…' : recipients.length} recipient{recipients.length !== 1 ? 's' : ''} →
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
