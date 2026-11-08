import { useCallback, useEffect, useMemo, useState } from 'react';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inbox, Paperclip, RefreshCw, Reply, ReplyAll, Search, Send, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Folder = 'inbox' | 'sent';

interface MailSummary {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string | null;
  created_at: string;
  attachments?: { id: string; filename: string }[];
}

interface MailDetail extends MailSummary {
  html?: string | null;
  text?: string | null;
  message_id?: string | null;
  reply_to?: string[];
  attachments?: { id: string; filename: string; size?: number; content_disposition?: string }[];
}

const INBOX = 'info@dlinrt.eu';
const READ_KEY = 'dlinrt-admin-inbox-read';

const readSet = (): Set<string> => {
  try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) ?? '[]')); } catch { return new Set(); }
};
const saveRead = (s: Set<string>) => localStorage.setItem(READ_KEY, JSON.stringify([...s].slice(-2000)));
const addr = (raw: string) => (raw.match(/<([^>]+)>/)?.[1] ?? raw).trim().toLowerCase();

async function callInbox<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('admin-inbox', { body });
  if (error) {
    const details = error instanceof FunctionsHttpError ? await error.context.json().catch(() => null) : null;
    throw new Error(details?.error ?? 'Could not reach the mailbox');
  }
  return data as T;
}

function buildSrcDoc(html: string, allowImages: boolean): string {
  const img = allowImages ? 'img-src * data: cid:;' : 'img-src data:;';
  return `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; ${img}"><base target="_blank"></head><body style="font-family:Arial,sans-serif;font-size:14px;margin:12px">${html}</body></html>`;
}

export default function AdminInbox() {
  const { toast } = useToast();
  const [folder, setFolder] = useState<Folder>('inbox');
  const [items, setItems] = useState<MailSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MailDetail | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [read, setRead] = useState<Set<string>>(readSet);
  const [allowImages, setAllowImages] = useState(false);
  const [reply, setReply] = useState<{ to: string; cc: string; subject: string; body: string } | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setSelected(null);
    try {
      const res = await callInbox<{ items: MailSummary[] }>({ action: 'list', folder });
      setItems(res.items ?? []);
    } catch (e) {
      toast({ title: 'Inbox unavailable', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [folder, toast]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((m) => `${m.from} ${m.to.join(' ')} ${m.subject ?? ''}`.toLowerCase().includes(q));
  }, [items, search]);

  const setReadState = (id: string, isRead: boolean) => {
    const next = new Set(read);
    if (isRead) next.add(id); else next.delete(id);
    setRead(next);
    saveRead(next);
  };

  const open = async (m: MailSummary) => {
    setLoadingMsg(true);
    setReply(null);
    setAllowImages(false);
    try {
      const detail = await callInbox<MailDetail>({ action: 'get', id: m.id, folder });
      setSelected(detail);
      if (folder === 'inbox') setReadState(m.id, true);
    } catch (e) {
      toast({ title: 'Could not open message', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setLoadingMsg(false);
    }
  };

  const startReply = (all: boolean) => {
    if (!selected) return;
    const replyTo = selected.reply_to?.length ? selected.reply_to : [selected.from];
    const others = all ? [...selected.to, ...(selected.cc ?? [])].map(addr).filter((a) => a !== INBOX) : [];
    const subject = /^re:/i.test(selected.subject ?? '') ? selected.subject ?? '' : `Re: ${selected.subject ?? ''}`;
    const quoted = (selected.text ?? '').split('\n').map((l) => `> ${l}`).join('\n');
    const date = new Date(selected.created_at).toLocaleString('en-GB');
    setReply({ to: replyTo.map(addr).join(', '), cc: others.join(', '), subject, body: `\n\nOn ${date}, ${selected.from} wrote:\n${quoted}` });
  };

  const sendReply = async () => {
    if (!selected || !reply) return;
    setSending(true);
    try {
      const split = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);
      await callInbox({ action: 'reply', id: selected.id, to: split(reply.to), cc: split(reply.cc), subject: reply.subject, body: reply.body });
      toast({ title: 'Reply sent', description: `Sent from ${INBOX}` });
      setReply(null);
    } catch (e) {
      toast({ title: 'Reply not sent', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const downloadAttachment = async (attId: string) => {
    if (!selected) return;
    try {
      const res = await callInbox<{ download_url?: string }>({ action: 'attachment', id: selected.id, attachment_id: attId });
      if (res.download_url) window.open(res.download_url, '_blank', 'noopener');
    } catch (e) {
      toast({ title: 'Download failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const unread = folder === 'inbox' ? items.filter((m) => !read.has(m.id)).length : 0;

  return (
    <PageLayout>
      <div className="container max-w-7xl py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold"><Inbox className="h-7 w-7 text-primary" /> Inbox</h1>
            <p className="text-muted-foreground">Mail received at {INBOX}. Replies are sent from the same address.</p>
          </div>
          <Button variant="outline" onClick={load} disabled={loading}><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Card>
            <CardHeader className="space-y-3">
              <Tabs value={folder} onValueChange={(v) => setFolder(v as Folder)}>
                <TabsList>
                  <TabsTrigger value="inbox">Inbox {unread > 0 && <Badge className="ml-2">{unread}</Badge>}</TabsTrigger>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search sender or subject" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent className="max-h-[70vh] overflow-y-auto p-0">
              {loading ? <div className="p-6"><LoadingSpinner /></div> : filtered.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">No messages.</p>
              ) : filtered.map((m) => {
                const isUnread = folder === 'inbox' && !read.has(m.id);
                return (
                  <button key={m.id} onClick={() => open(m)}
                    className={`block w-full border-b px-4 py-3 text-left transition-colors hover:bg-muted ${selected?.id === m.id ? 'bg-muted' : ''}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`truncate text-sm ${isUnread ? 'font-semibold' : ''}`}>
                        {isUnread && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />}
                        {folder === 'inbox' ? m.from : m.to.join(', ')}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className={`truncate text-sm ${isUnread ? 'font-medium' : 'text-muted-foreground'}`}>
                      {m.subject || '(no subject)'}{m.attachments?.length ? <Paperclip className="ml-1 inline h-3 w-3" /> : null}
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            {loadingMsg ? <CardContent className="p-6"><LoadingSpinner /></CardContent> : !selected ? (
              <CardContent className="p-6 text-sm text-muted-foreground">Select a message to read it.</CardContent>
            ) : (
              <>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl">{selected.subject || '(no subject)'}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <div><span className="font-medium text-foreground">From:</span> {selected.from}</div>
                    <div><span className="font-medium text-foreground">To:</span> {selected.to.join(', ')}</div>
                    {selected.cc?.length ? <div><span className="font-medium text-foreground">Cc:</span> {selected.cc.join(', ')}</div> : null}
                    <div>{new Date(selected.created_at).toLocaleString('en-GB')}</div>
                  </div>
                  {folder === 'inbox' && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button size="sm" onClick={() => startReply(false)}><Reply className="mr-2 h-4 w-4" /> Reply</Button>
                      <Button size="sm" variant="outline" onClick={() => startReply(true)}><ReplyAll className="mr-2 h-4 w-4" /> Reply all</Button>
                      <Button size="sm" variant="ghost" onClick={() => setReadState(selected.id, false)}>Mark unread</Button>
                      {selected.html && !allowImages && (
                        <Button size="sm" variant="ghost" onClick={() => setAllowImages(true)}><ImageIcon className="mr-2 h-4 w-4" /> Load images</Button>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {reply && (
                    <div className="space-y-2 rounded-md border p-3">
                      <Input aria-label="To" placeholder="To" value={reply.to} onChange={(e) => setReply({ ...reply, to: e.target.value })} />
                      <Input aria-label="Cc" placeholder="Cc" value={reply.cc} onChange={(e) => setReply({ ...reply, cc: e.target.value })} />
                      <Input aria-label="Subject" value={reply.subject} maxLength={200} onChange={(e) => setReply({ ...reply, subject: e.target.value })} />
                      <Textarea aria-label="Message" rows={10} maxLength={20000} value={reply.body} onChange={(e) => setReply({ ...reply, body: e.target.value })} />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setReply(null)}>Cancel</Button>
                        <Button onClick={sendReply} disabled={sending}><Send className="mr-2 h-4 w-4" /> {sending ? 'Sending…' : 'Send'}</Button>
                      </div>
                    </div>
                  )}
                  {selected.html ? (
                    <iframe title="Message" sandbox="allow-popups allow-popups-to-escape-sandbox" className="h-[55vh] w-full rounded-md border bg-background"
                      srcDoc={buildSrcDoc(selected.html, allowImages)} />
                  ) : (
                    <pre className="whitespace-pre-wrap break-words font-sans text-sm">{selected.text || '(empty message)'}</pre>
                  )}
                  {selected.attachments?.filter((a) => a.content_disposition !== 'inline').length ? (
                    <div className="flex flex-wrap gap-2">
                      {selected.attachments.filter((a) => a.content_disposition !== 'inline').map((a) => (
                        <Button key={a.id} size="sm" variant="outline" onClick={() => downloadAttachment(a.id)}>
                          <Paperclip className="mr-2 h-4 w-4" /> {a.filename}
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
