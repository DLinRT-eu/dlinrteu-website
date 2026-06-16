import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileEdit, Clock, CheckCircle2, XCircle, AlertCircle, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface Draft {
  id: string;
  product_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  changed_fields: string[] | null;
  edit_summary: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_feedback: string | null;
  github_pr_url: string | null;
  github_synced_at: string | null;
  submitter_name: string;
  submitter_email: string | null;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge variant="outline"><FileEdit className="h-3 w-3 mr-1" />Draft</Badge>;
    case 'pending_review':
      return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
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

interface Props {
  productId: string;
}

const VisualEditHistory: React.FC<Props> = ({ productId }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error: rpcErr } = await supabase
        .rpc('get_product_edit_drafts_for_reviewer', { p_product_id: productId });
      if (rpcErr) {
        console.error('Failed to load visual edits', rpcErr);
        setError('Unable to load visual edit history');
      } else {
        setDrafts((data || []) as Draft[]);
      }
      setLoading(false);
    };
    load();
  }, [productId]);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const pending = drafts.filter((d) => d.status === 'pending_review').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileEdit className="h-5 w-5" />
            Visual Editor Submissions
          </CardTitle>
          <div className="flex items-center gap-2">
            {pending > 0 && (
              <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/30">{pending} pending</Badge>
            )}
            <Badge variant="outline">{drafts.length} total</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        ) : error ? (
          <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>
        ) : drafts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileEdit className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>No in-browser edits have been submitted for this product yet.</p>
          </div>
        ) : drafts.map((d) => (
          <Collapsible key={d.id} open={open.has(d.id)} onOpenChange={() => toggle(d.id)}>
            <div className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm flex items-center gap-1"><User className="h-3 w-3" />{d.submitter_name}</span>
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
                  {d.submitter_email && (
                    <p className="text-xs text-muted-foreground">{d.submitter_email}</p>
                  )}
                  {d.edit_summary && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Submitter summary</h4>
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
                  <div className="flex flex-wrap gap-2 pt-1">
                    {d.status === 'pending_review' && (
                      <Button asChild size="sm">
                        <Link to={`/admin/edit-approvals?draft=${d.id}`}>
                          Open in approval queue <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {d.github_pr_url && (
                      <Button asChild variant="outline" size="sm">
                        <a href={d.github_pr_url} target="_blank" rel="noopener noreferrer">View pull request</a>
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Submitted {format(new Date(d.created_at), 'MMM d, yyyy HH:mm')}
                    {d.reviewed_at && ` · Reviewed ${format(new Date(d.reviewed_at), 'MMM d, yyyy HH:mm')}`}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default VisualEditHistory;
