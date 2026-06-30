import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Mail, Link2, Search, Copy, Loader2 } from 'lucide-react';

interface ProfileRow {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  institution: string | null;
}

type PendingAction = { user: ProfileRow; mode: 'email' | 'link' } | null;

export default function AdminPasswordReset() {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [results, setResults] = useState<ProfileRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [pending, setPending] = useState<PendingAction>(null);
  const [submitting, setSubmitting] = useState(false);
  const [linkDialog, setLinkDialog] = useState<{ email: string; url: string } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    (async () => {
      setSearching(true);
      const like = `%${debounced}%`;
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, institution')
        .or(
          `email.ilike.${like},first_name.ilike.${like},last_name.ilike.${like},institution.ilike.${like}`,
        )
        .limit(25);
      if (cancelled) return;
      if (error) {
        toast({ title: 'Search failed', description: error.message, variant: 'destructive' });
        setResults([]);
      } else {
        setResults((data as ProfileRow[]) || []);
      }
      setSearching(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [debounced, toast]);

  const runAction = async () => {
    if (!pending) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-reset-user-password', {
        body: { userId: pending.user.id, mode: pending.mode },
      });
      if (error) throw error;
      if (pending.mode === 'email') {
        toast({
          title: 'Reset email sent',
          description: `A password reset link was sent to ${pending.user.email}.`,
        });
      } else {
        setLinkDialog({ email: data.targetEmail, url: data.resetUrl });
      }
      setPending(null);
    } catch (err: any) {
      toast({
        title: 'Action failed',
        description: err?.message || 'Could not generate reset link.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = async () => {
    if (!linkDialog) return;
    try {
      await navigator.clipboard.writeText(linkDialog.url);
      toast({ title: 'Copied', description: 'Reset link copied to clipboard.' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  return (
    <>
      <SEO
        title="Admin · Password Reset"
        description="Admin-initiated password reset for DLinRT users."
        noindex
      />
      <div className="container mx-auto py-8 max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Password Reset</h1>
            <p className="text-sm text-muted-foreground">
              Search for a user and trigger a fresh password reset link.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Find user</CardTitle>
            <CardDescription>Search by email, name, or institution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-search"
                  className="pl-9"
                  placeholder="e.g. theju@accuray.com or Accuray"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searching && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                        Searching…
                      </TableCell>
                    </TableRow>
                  )}
                  {!searching && debounced.length < 2 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Type at least 2 characters to search.
                      </TableCell>
                    </TableRow>
                  )}
                  {!searching && debounced.length >= 2 && results.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No users matched.
                      </TableCell>
                    </TableRow>
                  )}
                  {!searching &&
                    results.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          {[u.first_name, u.last_name].filter(Boolean).join(' ') || '—'}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{u.email}</TableCell>
                        <TableCell>{u.institution || '—'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPending({ user: u, mode: 'email' })}
                          >
                            <Mail className="h-4 w-4 mr-1" /> Send email
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setPending({ user: u, mode: 'link' })}
                          >
                            <Link2 className="h-4 w-4 mr-1" /> Get link
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-xs text-muted-foreground">
              Generated links are valid for ~1 hour and redirect to <code>/update-password</code>.
              All actions are written to the admin audit log.
            </p>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!pending} onOpenChange={(o) => !o && !submitting && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending?.mode === 'email' ? 'Send reset email?' : 'Generate reset link?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.mode === 'email'
                ? `A password reset email will be sent to ${pending?.user.email}.`
                : `A single-use recovery link will be generated for ${pending?.user.email}. Deliver it through a secure channel.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={runAction} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Working…
                </>
              ) : (
                'Confirm'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!linkDialog} onOpenChange={(o) => !o && setLinkDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recovery link generated</DialogTitle>
            <DialogDescription>
              For {linkDialog?.email}. The link expires in about 1 hour and can be used once.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border bg-muted p-3 text-xs break-all font-mono">
            {linkDialog?.url}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setLinkDialog(null)}>
              Close
            </Button>
            <Button onClick={copyLink}>
              <Copy className="h-4 w-4 mr-2" /> Copy link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
