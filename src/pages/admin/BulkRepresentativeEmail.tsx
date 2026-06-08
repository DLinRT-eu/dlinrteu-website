import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRoles } from '@/contexts/RoleContext';
import { supabase } from '@/integrations/supabase/client';
import { COMPANIES } from '@/data';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Mail, Send, Eye, Save, Plus, Trash2, ChevronDown, Search, Users, Monitor, Smartphone } from 'lucide-react';
import {
  AVAILABLE_TOKENS, buildPreviewHtml, SITE_URL, substitute,
} from '@/utils/email/bulkRepEmailTemplate';

interface Representative {
  id: string;
  company_id: string;
  company_name: string;
  position: string | null;
  user_id: string;
  profiles: { first_name: string | null; last_name: string | null; email: string };
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body_markdown: string;
}

const companyDisplayName = (id: string, fallback: string) =>
  COMPANIES.find((c) => c.id === id)?.name || fallback;

export default function BulkRepresentativeEmail() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin } = useRoles();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [reps, setReps] = useState<Representative[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

  const [subject, setSubject] = useState('');
  const [bodyMarkdown, setBodyMarkdown] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  // Recipient selection
  const [mode, setMode] = useState<'all' | 'companies' | 'pick'>('all');
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<Set<string>>(new Set());
  const [selectedRepIds, setSelectedRepIds] = useState<Set<string>>(new Set());
  const [repSearch, setRepSearch] = useState('');

  // Preview
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) { navigate('/'); return; }
    void load();
  }, [user, isAdmin, authLoading, navigate]);

  const load = async () => {
    try {
      setLoading(true);
      const [repsRes, tplRes] = await Promise.all([
        supabase
          .from('company_representatives')
          .select('id, company_id, company_name, position, user_id, profiles!inner(first_name, last_name, email)')
          .eq('verified', true)
          .neq('company_id', 'admin_all_companies'),
        supabase
          .from('admin_email_templates')
          .select('id, name, subject, body_markdown')
          .order('name', { ascending: true }),
      ]);
      if (repsRes.error) throw repsRes.error;
      if (tplRes.error) throw tplRes.error;
      setReps((repsRes.data || []) as any);
      setTemplates((tplRes.data || []) as any);
    } catch (e: any) {
      toast.error(e.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const recipients = useMemo(() => {
    let list = reps;
    if (mode === 'companies') {
      list = list.filter((r) => selectedCompanyIds.has(r.company_id));
    } else if (mode === 'pick') {
      list = list.filter((r) => selectedRepIds.has(r.id));
    }
    // dedupe by email
    const seen = new Set<string>();
    return list.filter((r) => {
      const e = r.profiles?.email?.toLowerCase();
      if (!e || seen.has(e)) return false;
      seen.add(e);
      return true;
    });
  }, [reps, mode, selectedCompanyIds, selectedRepIds]);

  const filteredRepsForPicker = useMemo(() => {
    const q = repSearch.toLowerCase().trim();
    if (!q) return reps;
    return reps.filter((r) => {
      const name = `${r.profiles?.first_name || ''} ${r.profiles?.last_name || ''}`.toLowerCase();
      return (
        name.includes(q) ||
        (r.profiles?.email || '').toLowerCase().includes(q) ||
        (r.company_name || '').toLowerCase().includes(q)
      );
    });
  }, [reps, repSearch]);

  const companyOptions = useMemo(() => {
    const ids = new Set(reps.map((r) => r.company_id));
    return Array.from(ids)
      .map((id) => {
        const rep = reps.find((r) => r.company_id === id);
        return { id, name: companyDisplayName(id, rep?.company_name || id) };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [reps]);

  const sampleRep = recipients[0] || reps[0];
  const previewVars = useMemo(() => {
    const r = sampleRep;
    const cname = r ? companyDisplayName(r.company_id, r.company_name) : 'Sample Company';
    const cid = r?.company_id || 'sample';
    return {
      first_name: r?.profiles?.first_name || 'Alex',
      last_name: r?.profiles?.last_name || 'Doe',
      full_name: `${r?.profiles?.first_name || 'Alex'} ${r?.profiles?.last_name || 'Doe'}`.trim(),
      company_name: cname,
      company_url: `${SITE_URL}/products/company/${encodeURIComponent(cid)}`,
      rep_position: r?.position || 'Representative',
      sender_name: user?.email || 'admin@dlinrt.eu',
      today: new Date().toISOString().slice(0, 10),
    };
  }, [sampleRep, user]);

  const previewHtml = useMemo(
    () =>
      buildPreviewHtml({
        bodyMarkdown,
        companyName: previewVars.company_name,
        companyUrl: previewVars.company_url,
        vars: previewVars,
      }),
    [bodyMarkdown, previewVars]
  );

  const previewSubject = substitute(subject, previewVars);

  const insertToken = (token: string) => {
    const ta = bodyRef.current;
    if (!ta) { setBodyMarkdown((b) => b + token); return; }
    const start = ta.selectionStart ?? bodyMarkdown.length;
    const end = ta.selectionEnd ?? bodyMarkdown.length;
    const next = bodyMarkdown.slice(0, start) + token + bodyMarkdown.slice(end);
    setBodyMarkdown(next);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + token.length, start + token.length); }, 0);
  };

  const loadTemplate = (id: string) => {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    setSelectedTemplateId(id);
    setSubject(t.subject);
    setBodyMarkdown(t.body_markdown);
  };

  const saveTemplate = async () => {
    if (!newTemplateName.trim() || !subject.trim() || !bodyMarkdown.trim()) {
      toast.error('Name, subject and body are required');
      return;
    }
    const { error } = await supabase.from('admin_email_templates').insert({
      name: newTemplateName.trim(),
      subject,
      body_markdown: bodyMarkdown,
      created_by: user?.id,
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Template saved');
    setSaveOpen(false);
    setNewTemplateName('');
    void load();
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm('Delete this template?')) return;
    const { error } = await supabase.from('admin_email_templates').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Template deleted');
    if (selectedTemplateId === id) setSelectedTemplateId('');
    void load();
  };

  const buildPayload = (testEmail?: string) => ({
    subject,
    bodyMarkdown,
    testEmail,
    recipientIds: mode === 'pick' ? Array.from(selectedRepIds) : undefined,
    recipientFilter:
      mode === 'companies'
        ? { companyIds: Array.from(selectedCompanyIds) }
        : mode === 'all'
        ? { allVerified: true }
        : undefined,
    companies: COMPANIES.map((c) => ({ id: c.id, name: c.name })),
  });

  const sendTest = async () => {
    if (!user?.email) { toast.error('Missing your email'); return; }
    if (!subject.trim() || !bodyMarkdown.trim()) { toast.error('Subject and body are required'); return; }
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-bulk-representative-email', {
        body: buildPayload(user.email),
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast.success(`Test email sent to ${user.email}`);
    } catch (e: any) {
      toast.error(e.message || 'Failed to send test');
    } finally { setSending(false); }
  };

  const sendBulk = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-bulk-representative-email', {
        body: buildPayload(),
      });
      if (error) throw error;
      const d: any = data;
      if (d?.error) throw new Error(d.error);
      toast.success(`Sent ${d.successCount}/${d.recipientCount}` + (d.failureCount ? ` (${d.failureCount} failed)` : ''));
      setConfirmOpen(false);
    } catch (e: any) {
      toast.error(e.message || 'Failed to send');
    } finally { setSending(false); }
  };

  if (authLoading || loading) {
    return <PageLayout><div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div></PageLayout>;
  }

  const canSend = subject.trim().length > 0 && bodyMarkdown.trim().length > 0 && recipients.length > 0;

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2"><Mail className="h-8 w-8" /> Bulk Email to Representatives</h1>
          <p className="text-muted-foreground mt-2">Compose, preview and send a personalised email to verified company representatives.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Composer */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recipients</span>
                  <Badge variant="secondary" className="flex items-center gap-1"><Users className="h-3 w-3" />{recipients.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All verified</TabsTrigger>
                    <TabsTrigger value="companies">By company</TabsTrigger>
                    <TabsTrigger value="pick">Pick individuals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="text-sm text-muted-foreground pt-2">
                    Sends to every verified representative ({reps.length} total, admins excluded server-side).
                  </TabsContent>
                  <TabsContent value="companies" className="space-y-2 pt-2">
                    <div className="max-h-52 overflow-y-auto border rounded-md p-2 space-y-1">
                      {companyOptions.map((c) => (
                        <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={selectedCompanyIds.has(c.id)}
                            onCheckedChange={(v) => {
                              const next = new Set(selectedCompanyIds);
                              v ? next.add(c.id) : next.delete(c.id);
                              setSelectedCompanyIds(next);
                            }}
                          />
                          {c.name}
                        </label>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="pick" className="space-y-2 pt-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search reps..." value={repSearch} onChange={(e) => setRepSearch(e.target.value)} className="pl-9" />
                    </div>
                    <div className="max-h-64 overflow-y-auto border rounded-md p-2 space-y-1">
                      {filteredRepsForPicker.map((r) => (
                        <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <Checkbox
                            checked={selectedRepIds.has(r.id)}
                            onCheckedChange={(v) => {
                              const next = new Set(selectedRepIds);
                              v ? next.add(r.id) : next.delete(r.id);
                              setSelectedRepIds(next);
                            }}
                          />
                          <span className="flex-1">
                            {r.profiles?.first_name} {r.profiles?.last_name}
                            <span className="text-muted-foreground"> — {companyDisplayName(r.company_id, r.company_name)}</span>
                          </span>
                          <span className="text-xs text-muted-foreground">{r.profiles?.email}</span>
                        </label>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Template</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSaveOpen(true)} disabled={!subject || !bodyMarkdown}>
                      <Save className="h-4 w-4 mr-1" /> Save as
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Reuse, edit and personalise your message.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2 items-center">
                  <Select value={selectedTemplateId} onValueChange={loadTemplate}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Load a saved template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTemplateId && (
                    <Button size="icon" variant="outline" onClick={() => deleteTemplate(selectedTemplateId)} title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Update on {{company_name}}" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Message (Markdown)</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" />Insert token <ChevronDown className="h-3 w-3 ml-1" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="max-w-xs">
                        {AVAILABLE_TOKENS.map((t) => (
                          <DropdownMenuItem key={t.token} onClick={() => insertToken(t.token)}>
                            <div>
                              <div className="font-mono text-xs">{t.token}</div>
                              <div className="text-xs text-muted-foreground">{t.description}</div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Textarea
                    ref={bodyRef}
                    value={bodyMarkdown}
                    onChange={(e) => setBodyMarkdown(e.target.value)}
                    rows={14}
                    placeholder="Dear {{first_name}}, ..."
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports <code>**bold**</code>, <code>*italic*</code>, <code>[link](url)</code>, <code>- bullet lists</code>, and paragraphs.
                    A button linking to the company catalogue page is automatically appended.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <Button variant="outline" onClick={sendTest} disabled={sending || !subject || !bodyMarkdown}>
                    <Eye className="h-4 w-4 mr-2" /> Send test to me
                  </Button>
                  <Button onClick={() => setConfirmOpen(true)} disabled={!canSend || sending}>
                    <Send className="h-4 w-4 mr-2" /> Send to {recipients.length} recipient{recipients.length === 1 ? '' : 's'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card className="lg:sticky lg:top-4 self-start">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live preview</span>
                <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="desktop"><Monitor className="h-4 w-4" /></TabsTrigger>
                    <TabsTrigger value="mobile"><Smartphone className="h-4 w-4" /></TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardTitle>
              <CardDescription>
                Rendered with sample recipient: <strong>{previewVars.full_name}</strong> — {previewVars.company_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-md p-3 mb-2 text-sm">
                <div><span className="text-muted-foreground">From:</span> DLinRT.eu &lt;noreply@dlinrt.eu&gt;</div>
                <div><span className="text-muted-foreground">Subject:</span> <strong>{previewSubject || <em className="text-muted-foreground">(empty)</em>}</strong></div>
              </div>
              <div className={`mx-auto border rounded-md overflow-hidden bg-white transition-all ${previewMode === 'mobile' ? 'max-w-[380px]' : 'max-w-full'}`}>
                <div className="max-h-[640px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save-template dialog */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as template</DialogTitle>
            <DialogDescription>Save the current subject and body as a reusable template.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Template name</Label>
            <Input value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} placeholder="e.g. Q1 catalogue review" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveOpen(false)}>Cancel</Button>
            <Button onClick={saveTemplate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm bulk send */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send to {recipients.length} representative{recipients.length === 1 ? '' : 's'}?</DialogTitle>
            <DialogDescription>
              Each recipient will receive a personalised version of the email with a link to their company's catalogue page.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={sending}>Cancel</Button>
            <Button onClick={sendBulk} disabled={sending}>
              {sending ? 'Sending...' : `Send ${recipients.length} email${recipients.length === 1 ? '' : 's'}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
