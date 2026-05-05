import { useState } from 'react';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getCompanyIdByName } from '@/utils/companyUtils';

interface CompanyProduct {
  id: string;
  name: string;
  company: string;
}

interface EvidenceLink {
  type: string;
  description: string;
  link: string;
}

const evidenceSchema = z.object({
  type: z.string().trim().min(1).max(80),
  description: z.string().trim().max(300).optional().or(z.literal('')),
  link: z.string().trim().url({ message: 'Must be a valid URL' }).max(500),
});

interface FormProps {
  companyProducts: CompanyProduct[];
  productId: string;
  onProductChange: (id: string) => void;
  onSubmitted: () => void;
  onCancel: () => void;
}

export function StructuredCertificationForm({
  companyProducts,
  productId,
  onProductChange,
  onSubmitted,
  onCancel,
}: FormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [version, setVersion] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [ceStatus, setCeStatus] = useState('');
  const [ceClass, setCeClass] = useState('');
  const [notifiedBody, setNotifiedBody] = useState('');
  const [fdaStatus, setFdaStatus] = useState('');
  const [fdaClearance, setFdaClearance] = useState('');
  const [fdaDate, setFdaDate] = useState('');
  const [evidence, setEvidence] = useState<EvidenceLink[]>([{ type: '', description: '', link: '' }]);
  const [notes, setNotes] = useState('');

  const reset = () => {
    setVersion(''); setReleaseDate('');
    setCeStatus(''); setCeClass(''); setNotifiedBody('');
    setFdaStatus(''); setFdaClearance(''); setFdaDate('');
    setEvidence([{ type: '', description: '', link: '' }]);
    setNotes('');
  };

  const updateEvidence = (i: number, key: keyof EvidenceLink, value: string) => {
    setEvidence(prev => prev.map((e, idx) => idx === i ? { ...e, [key]: value } : e));
  };

  const handleSubmit = async () => {
    const product = companyProducts.find(p => p.id === productId);
    if (!product) {
      toast({ title: 'Select a product', variant: 'destructive' });
      return;
    }

    const cleanedEvidence = evidence.filter(e => e.link.trim() || e.type.trim() || e.description.trim());
    for (const e of cleanedEvidence) {
      const parsed = evidenceSchema.safeParse(e);
      if (!parsed.success) {
        toast({ title: 'Invalid evidence entry', description: parsed.error.errors[0]?.message ?? 'Check fields', variant: 'destructive' });
        return;
      }
    }

    const fieldUpdates: Record<string, unknown> = {};
    if (version.trim()) fieldUpdates.version = version.trim();
    if (releaseDate) fieldUpdates.releaseDate = releaseDate;

    const ce: Record<string, string> = {};
    if (ceStatus.trim()) ce.status = ceStatus.trim();
    if (ceClass.trim()) ce.class = ceClass.trim();
    if (notifiedBody.trim()) ce.notifiedBody = notifiedBody.trim();
    const fda: Record<string, string> = {};
    if (fdaStatus.trim()) fda.status = fdaStatus.trim();
    if (fdaClearance.trim()) fda.clearanceNumber = fdaClearance.trim();
    if (fdaDate) fda.decisionDate = fdaDate;
    if (Object.keys(ce).length || Object.keys(fda).length) {
      fieldUpdates.regulatory = {
        ...(Object.keys(ce).length ? { ce } : {}),
        ...(Object.keys(fda).length ? { fda } : {}),
      };
    }
    if (cleanedEvidence.length) fieldUpdates.evidence = cleanedEvidence;
    if (notes.trim()) fieldUpdates.notes = notes.trim();

    if (Object.keys(fieldUpdates).length === 0) {
      toast({ title: 'Nothing to submit', description: 'Fill in at least one field.', variant: 'destructive' });
      return;
    }

    const summaryParts: string[] = [];
    if (fieldUpdates.version) summaryParts.push(`version → ${fieldUpdates.version}`);
    if (fieldUpdates.regulatory) summaryParts.push('regulatory info');
    if (fieldUpdates.evidence) summaryParts.push(`${cleanedEvidence.length} evidence link(s)`);
    if (fieldUpdates.notes) summaryParts.push('notes');
    const changesSummary = `Structured certification update for ${product.name}: ${summaryParts.join(', ')}.`;

    setSubmitting(true);
    try {
      const companyId = getCompanyIdByName(product.company);
      const { data, error } = await supabase.rpc('create_company_revision', {
        p_product_id: productId,
        p_company_id: companyId,
        p_changes_summary: changesSummary,
        p_revision_date: new Date().toISOString().split('T')[0],
        p_field_updates: fieldUpdates as never,
        p_submission_type: 'structured',
      });
      if (error) throw error;
      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        toast({ title: 'Error', description: result.error || 'Failed to submit', variant: 'destructive' });
        return;
      }
      toast({ title: 'Submitted', description: 'Structured certification submitted for review' });
      reset();
      onSubmitted();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 py-2">
      <div className="space-y-2">
        <Label>Product</Label>
        <select
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={productId}
          onChange={(e) => onProductChange(e.target.value)}
        >
          <option value="">Select a product</option>
          {companyProducts.length === 0 ? (
            <option disabled>No products assigned to your company</option>
          ) : (
            companyProducts.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))
          )}
        </select>
      </div>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="text-sm font-semibold">Versioning</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Version</Label>
              <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g. 4.2.1" maxLength={50} />
            </div>
            <div className="space-y-1">
              <Label>Release date</Label>
              <Input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="text-sm font-semibold">CE Marking</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label>Status</Label>
              <Input value={ceStatus} onChange={(e) => setCeStatus(e.target.value)} placeholder="e.g. CE Marked" maxLength={80} />
            </div>
            <div className="space-y-1">
              <Label>Class</Label>
              <Input value={ceClass} onChange={(e) => setCeClass(e.target.value)} placeholder="e.g. Class IIa" maxLength={40} />
            </div>
            <div className="space-y-1">
              <Label>Notified body</Label>
              <Input value={notifiedBody} onChange={(e) => setNotifiedBody(e.target.value)} placeholder="e.g. TÜV SÜD (0123)" maxLength={120} />
            </div>
          </div>
          <div className="text-sm font-semibold pt-2">FDA Clearance</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label>Status</Label>
              <Input value={fdaStatus} onChange={(e) => setFdaStatus(e.target.value)} placeholder="e.g. 510(k) cleared" maxLength={80} />
            </div>
            <div className="space-y-1">
              <Label>Clearance #</Label>
              <Input value={fdaClearance} onChange={(e) => setFdaClearance(e.target.value)} placeholder="K-number" maxLength={40} />
            </div>
            <div className="space-y-1">
              <Label>Decision date</Label>
              <Input type="date" value={fdaDate} onChange={(e) => setFdaDate(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Evidence Links</div>
            <Button type="button" variant="outline" size="sm" onClick={() => setEvidence(prev => [...prev, { type: '', description: '', link: '' }])}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
          {evidence.map((e, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-start">
              <Input className="col-span-3" value={e.type} onChange={(ev) => updateEvidence(i, 'type', ev.target.value)} placeholder="Type (e.g. Peer-reviewed)" maxLength={80} />
              <Input className="col-span-4" value={e.description} onChange={(ev) => updateEvidence(i, 'description', ev.target.value)} placeholder="Short description" maxLength={300} />
              <Input className="col-span-4" value={e.link} onChange={(ev) => updateEvidence(i, 'link', ev.target.value)} placeholder="https://..." maxLength={500} />
              <Button type="button" variant="ghost" size="icon" className="col-span-1" onClick={() => setEvidence(prev => prev.filter((_, idx) => idx !== i))} disabled={evidence.length === 1}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Additional notes (optional)</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={2000} placeholder="Any context for the reviewer" />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit for Review'}
        </Button>
      </div>
    </div>
  );
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyProducts: CompanyProduct[];
  onSubmitted: () => void;
}

export function StructuredCertificationDialog({ open, onOpenChange, companyProducts, onSubmitted }: DialogProps) {
  const [productId, setProductId] = useState('');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Structured Certification Submission
          </DialogTitle>
          <DialogDescription>
            Submit version, regulatory and evidence information for one of your products. Reviewers will validate before publication.
          </DialogDescription>
        </DialogHeader>
        <StructuredCertificationForm
          companyProducts={companyProducts}
          productId={productId}
          onProductChange={setProductId}
          onSubmitted={() => { onOpenChange(false); onSubmitted(); }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
