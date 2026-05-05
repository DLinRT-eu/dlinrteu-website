import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileCheck, FileEdit, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getCompanyIdByName } from '@/utils/companyUtils';
import { StructuredCertificationForm } from './StructuredCertificationDialog';

interface CompanyProduct {
  id: string;
  name: string;
  company: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyProducts: CompanyProduct[];
  onSubmitted: () => void;
}

export function UnifiedSubmissionDialog({ open, onOpenChange, companyProducts, onSubmitted }: Props) {
  const { toast } = useToast();
  const [tab, setTab] = useState('structured');
  const [productId, setProductId] = useState('');
  const [changesSummary, setChangesSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const close = () => {
    onOpenChange(false);
  };

  const handleFreeTextSubmit = async () => {
    if (!productId || !changesSummary.trim()) {
      toast({ title: 'Missing info', description: 'Select a product and describe the changes.', variant: 'destructive' });
      return;
    }
    const product = companyProducts.find(p => p.id === productId);
    if (!product) return;
    setSubmitting(true);
    try {
      const companyId = getCompanyIdByName(product.company);
      const { data, error } = await supabase.rpc('create_company_revision', {
        p_product_id: productId,
        p_company_id: companyId,
        p_changes_summary: changesSummary,
        p_revision_date: new Date().toISOString().split('T')[0],
      });
      if (error) throw error;
      const result = data as { success: boolean; error?: string };
      if (!result.success) {
        toast({ title: 'Error', description: result.error || 'Failed to submit', variant: 'destructive' });
        return;
      }
      toast({ title: 'Submitted', description: 'Revision submitted for verification' });
      setChangesSummary('');
      onSubmitted();
      close();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit an Update</DialogTitle>
          <DialogDescription>
            Choose how you want to submit information about your product. Reviewers verify all submissions before publication.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Structured</strong> is recommended for product facts (version, CE/FDA, evidence links) — it's faster to review and powers the verified badge.
            Use <strong>Free text</strong> only for narrative changes that don't fit a specific field.
          </AlertDescription>
        </Alert>

        {companyProducts.length === 0 && (
          <Alert variant="destructive">
            <AlertDescription>No products are assigned to your company yet. Contact an administrator.</AlertDescription>
          </Alert>
        )}

        <Tabs value={tab} onValueChange={setTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="structured" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Structured
              <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">Recommended</Badge>
            </TabsTrigger>
            <TabsTrigger value="freetext" className="gap-2">
              <FileEdit className="h-4 w-4" />
              Free text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="structured" className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Fill in the specific fields you want to update. Only filled fields are submitted.
            </p>
            <StructuredCertificationForm
              companyProducts={companyProducts}
              productId={productId}
              onProductChange={setProductId}
              onSubmitted={() => { onSubmitted(); close(); }}
              onCancel={close}
            />
          </TabsContent>

          <TabsContent value="freetext" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Use this when your update is narrative (e.g. clarifications, context, or changes that don't map to a specific field).
            </p>
            <div className="space-y-2">
              <Label>Product</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Select a product</option>
                {companyProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Changes summary</Label>
              <Textarea
                placeholder="Describe the changes you would like reviewers to apply…"
                value={changesSummary}
                onChange={(e) => setChangesSummary(e.target.value)}
                rows={6}
                maxLength={4000}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={close} disabled={submitting}>Cancel</Button>
              <Button onClick={handleFreeTextSubmit} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit for Review'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
