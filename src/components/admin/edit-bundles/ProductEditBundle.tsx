import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Download, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductBundle, BundledField, setAtPath, valuesEqual } from '@/utils/draftBundling';
import { validateField, worstLevel, FieldCheck, CheckLevel } from '@/utils/draftValidation';

export type FieldDecision = 'accept' | 'reject' | 'pending';

export interface BundleDecision {
  path: string;
  decision: FieldDecision;
  value: unknown;
  reason?: string;
  checks: FieldCheck[];
}

interface Props {
  bundle: ProductBundle;
  productName: string;
  currentProduct: Record<string, unknown> | undefined;
  submitting: boolean;
  onApprove: (merged: Record<string, unknown>, decisions: BundleDecision[]) => void;
}

const LEVEL_VARIANT: Record<CheckLevel, 'destructive' | 'secondary' | 'outline'> = {
  error: 'destructive',
  warn: 'secondary',
  ok: 'outline',
};

function show(v: unknown): string {
  if (v === undefined || v === null || v === '') return '—';
  if (typeof v === 'string') return v;
  if (Array.isArray(v) && v.length > 20) return `[${v.length} items] ${JSON.stringify(v.slice(0, 5))}…`;
  return JSON.stringify(v, null, 1);
}

function parseEdited(raw: string, original: unknown): unknown {
  if (typeof original === 'string') return raw;
  try { return JSON.parse(raw); } catch { return raw; }
}

export function ProductEditBundle({ bundle, productName, currentProduct, submitting, onApprove }: Props) {
  const [decisions, setDecisions] = useState<Record<string, FieldDecision>>({});
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const valueFor = (f: BundledField) => (f.path in edits ? parseEdited(edits[f.path], f.proposed) : f.proposed);

  const merged = useMemo(() => {
    const base: Record<string, unknown> = JSON.parse(JSON.stringify(currentProduct ?? {}));
    bundle.fields.forEach(f => {
      if (decisions[f.path] !== 'reject') setAtPath(base, f.path, valueFor(f));
    });
    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundle, currentProduct, decisions, edits]);

  const checks = useMemo(() => {
    const out: Record<string, FieldCheck[]> = {};
    bundle.fields.forEach(f => { out[f.path] = validateField(f.path, valueFor(f), f.current, merged); });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundle, merged, edits]);

  const setDecision = (path: string, d: FieldDecision) => setDecisions(prev => ({ ...prev, [path]: d }));

  const acceptAllPassing = () => {
    const next = { ...decisions };
    bundle.fields.forEach(f => {
      if (worstLevel(checks[f.path]) !== 'error' && next[f.path] !== 'reject') next[f.path] = 'accept';
    });
    setDecisions(next);
  };

  const buildDecisions = (): BundleDecision[] =>
    bundle.fields.map(f => ({
      path: f.path,
      decision: decisions[f.path] ?? 'pending',
      value: valueFor(f),
      reason: reasons[f.path],
      checks: checks[f.path],
    }));

  const undecided = bundle.fields.filter(f => !decisions[f.path] || decisions[f.path] === 'pending').length;
  const acceptedWithErrors = bundle.fields.filter(f => decisions[f.path] === 'accept' && worstLevel(checks[f.path]) === 'error').length;
  const acceptedCount = bundle.fields.filter(f => decisions[f.path] === 'accept').length;

  const approve = () => {
    const accepted: Record<string, unknown> = JSON.parse(JSON.stringify(currentProduct ?? {}));
    bundle.fields.forEach(f => { if (decisions[f.path] === 'accept') setAtPath(accepted, f.path, valueFor(f)); });
    onApprove(accepted, buildDecisions());
  };

  const downloadReport = () => {
    const lines = [
      `# Edit bundle review — ${productName} (${bundle.productId})`,
      `Generated: ${new Date().toISOString()}`,
      `Source drafts: ${bundle.drafts.map(d => d.id).join(', ')}`,
      '',
      '| Field | Current | Proposed | Decision | Checks | Reason |',
      '|---|---|---|---|---|---|',
      ...buildDecisions().map(d => {
        const f = bundle.fields.find(x => x.path === d.path)!;
        const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ').slice(0, 300);
        return `| ${d.path} | ${cell(show(f.current))} | ${cell(show(d.value))} | ${d.decision} | ${cell(d.checks.map(c => `${c.level}: ${c.message}`).join('; '))} | ${cell(d.reason ?? '')} |`;
      }),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edit-bundle-${bundle.productId}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const errorCount = bundle.fields.filter(f => worstLevel(checks[f.path]) === 'error').length;
  const warnCount = bundle.fields.filter(f => worstLevel(checks[f.path]) === 'warn').length;

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{productName}</CardTitle>
            <CardDescription>
              {bundle.drafts.length} pending edit{bundle.drafts.length > 1 ? 's' : ''} · {bundle.fields.length} field{bundle.fields.length > 1 ? 's' : ''} changed
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {errorCount > 0 && <Badge variant="destructive">{errorCount} error</Badge>}
            {warnCount > 0 && <Badge variant="secondary">{warnCount} warn</Badge>}
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={acceptAllPassing}>Accept all passing</Button>
            <Button size="sm" variant="outline" onClick={downloadReport}><Download className="h-4 w-4 mr-1" />Review report</Button>
          </div>

          {bundle.fields.map(f => {
            const fc = checks[f.path];
            const d = decisions[f.path] ?? 'pending';
            const hasError = worstLevel(fc) === 'error';
            const superseded = f.history.slice(0, -1).filter(h => !valuesEqual(h.value, f.proposed));
            return (
              <div key={f.path} className="border rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <code className="text-sm font-semibold">{f.path}</code>
                  <div className="flex gap-1">
                    <Button size="sm" variant={d === 'accept' ? 'default' : 'outline'} disabled={hasError} onClick={() => setDecision(f.path, 'accept')}>
                      <CheckCircle className="h-4 w-4 mr-1" />Accept
                    </Button>
                    <Button size="sm" variant={d === 'reject' ? 'destructive' : 'outline'} onClick={() => setDecision(f.path, 'reject')}>
                      <XCircle className="h-4 w-4 mr-1" />Reject
                    </Button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Current</div>
                    <pre className="bg-muted rounded p-2 whitespace-pre-wrap break-words max-h-40 overflow-auto">{show(f.current)}</pre>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Proposed (editable)</div>
                    <Textarea
                      className="text-xs font-mono min-h-[5rem]"
                      value={f.path in edits ? edits[f.path] : typeof f.proposed === 'string' ? f.proposed : JSON.stringify(f.proposed, null, 1)}
                      onChange={e => setEdits(prev => ({ ...prev, [f.path]: e.target.value }))}
                    />
                  </div>
                </div>
                {superseded.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Replaced earlier values:{' '}
                    {superseded.map(h => <span key={h.draftId} className="line-through mr-2">{show(h.value).slice(0, 80)}</span>)}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Touched by: {f.history.map(h => `${h.author ?? 'unknown'} (${format(new Date(h.updatedAt), 'dd MMM HH:mm')})`).join(', ')}
                </div>
                <div className="flex flex-wrap gap-1">
                  {fc.map((c, i) => <Badge key={i} variant={LEVEL_VARIANT[c.level]} className="text-xs font-normal">{c.message}</Badge>)}
                </div>
                {d === 'reject' && (
                  <Input placeholder="Reason for rejection (sent to the representative)" value={reasons[f.path] ?? ''} onChange={e => setReasons(prev => ({ ...prev, [f.path]: e.target.value }))} />
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-2 flex-wrap border-t pt-3">
            <span className="text-sm text-muted-foreground">
              {acceptedCount} accepted · {undecided} undecided
            </span>
            <Button onClick={approve} disabled={submitting || undecided > 0 || acceptedWithErrors > 0 || acceptedCount === 0}>
              {submitting && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Approve bundle & open PR
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
