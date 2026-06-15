import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronDown, FileEdit, Clock, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface Draft {
  id: string;
  product_id: string;
  status: string;
  changed_fields: string[] | null;
  edit_summary: string | null;
  review_feedback: string | null;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  github_pr_url: string | null;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge variant="outline"><FileEdit className="h-3 w-3 mr-1" />Draft</Badge>;
    case 'pending_review':
      return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pending review</Badge>;
    case 'approved':
      return <Badge className="bg-green-500/10 text-green-700 border-green-500/30"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>;
    case 'rejected':
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
    case 'applied':
      return <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/30"><CheckCircle2 className="h-3 w-3 mr-1" />Applied</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const MySubmissions: React.FC = () => {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_edit_drafts')
        .select('id, product_id, status, changed_fields, edit_summary, review_feedback, created_at, updated_at, reviewed_at, github_pr_url')
        .eq('created_by', user.id)
        .order('updated_at', { ascending: false });
      if (error) {
        setError('Unable to load your submissions');
      } else {
        setDrafts((data || []) as Draft[]);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const pending = drafts.filter((d) => d.status === 'pending_review').length;
  const approved = drafts.filter((d) => d.status === 'approved' || d.status === 'applied').length;
  const rejected = drafts.filter((d) => d.status === 'rejected').length;

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><span className="text-foreground">My Submissions</span></BreadcrumbItem>
      </Breadcrumb>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">My Submissions</h1>
        <p className="text-muted-foreground">
          A log of in-browser product edits you've saved and submitted via the Visual Editor.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">{pending}</div><div className="text-sm text-muted-foreground">Pending review</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">{approved}</div><div className="text-sm text-muted-foreground">Approved / applied</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">{rejected}</div><div className="text-sm text-muted-foreground">Rejected</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All submissions ({drafts.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </>
          ) : error ? (
            <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>
          ) : drafts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <FileEdit className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You haven't submitted any edits yet.</p>
              <p className="text-sm mt-2">Open any product page and use the "Edit" button to suggest changes.</p>
            </div>
          ) : drafts.map((d) => (
            <Collapsible key={d.id} open={open.has(d.id)} onOpenChange={() => toggle(d.id)}>
              <div className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium">{d.product_id}</span>
                      {statusBadge(d.status)}
                      <Badge variant="outline" className="text-xs">
                        {(d.changed_fields?.length || 0)} field{(d.changed_fields?.length || 0) !== 1 ? 's' : ''}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(d.updated_at), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${open.has(d.id) ? 'rotate-180' : ''}`} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 border-t bg-muted/30 space-y-3">
                    {d.edit_summary && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Your summary</h4>
                        <p className="text-sm text-muted-foreground bg-background p-3 rounded-md border whitespace-pre-wrap">{d.edit_summary}</p>
                      </div>
                    )}
                    {d.changed_fields && d.changed_fields.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Changed fields</h4>
                        <div className="flex flex-wrap gap-1">
                          {d.changed_fields.map((f) => (
                            <Badge key={f} variant="secondary" className="text-xs font-mono">{f}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {d.review_feedback && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Reviewer feedback</h4>
                        <p className="text-sm text-muted-foreground bg-background p-3 rounded-md border whitespace-pre-wrap">{d.review_feedback}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/product/${d.product_id}`}>View product</Link>
                      </Button>
                      {d.github_pr_url && (
                        <Button asChild variant="outline" size="sm">
                          <a href={d.github_pr_url} target="_blank" rel="noopener noreferrer">
                            View pull request <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Reference ID: <span className="font-mono">{d.id}</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MySubmissions;
