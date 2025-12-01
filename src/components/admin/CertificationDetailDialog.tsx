import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Copy, ExternalLink, FileText, User, Calendar, Hash } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { ProductDetails } from '@/types/productDetails';
import type { Tables } from '@/integrations/supabase/types';
import { HashStatusBadge, type HashStatus } from './HashStatusBadge';

type CertificationRecord = Tables<'company_product_verifications'>;

interface CertificationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductDetails;
  certificationRecord?: CertificationRecord;
  hashStatus: HashStatus;
  currentHash?: string;
}

export function CertificationDetailDialog({
  open,
  onOpenChange,
  product,
  certificationRecord,
  hashStatus,
  currentHash,
}: CertificationDetailDialogProps) {
  const [copying, setCopying] = useState<'stored' | 'current' | null>(null);

  const copyToClipboard = async (text: string, type: 'stored' | 'current') => {
    setCopying(type);
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Hash copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy hash');
    } finally {
      setTimeout(() => setCopying(null), 1000);
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Certification Details</DialogTitle>
          <DialogDescription>
            View certification information and content hash validation status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Information */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Product Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Product Name</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Company</p>
                <p className="font-medium">{product.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Revised</p>
                <p className="font-medium">
                  {product.lastRevised
                    ? format(new Date(product.lastRevised), 'MMM dd, yyyy')
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Certification Status */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Certification Status
            </h3>
            <div className="flex items-center gap-2">
              <HashStatusBadge status={hashStatus} />
            </div>
          </div>

          {certificationRecord ? (
            <>
              <Separator />

              {/* Certification Details */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Certification Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Certified Date</p>
                    <p className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(certificationRecord.verified_at!), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Company ID</p>
                    <p className="font-medium">{certificationRecord.company_id}</p>
                  </div>
                </div>

                {certificationRecord.verification_notes && (
                  <div className="mt-3">
                    <p className="text-muted-foreground">Notes</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                      {certificationRecord.verification_notes}
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Content Hash Comparison */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Content Hash Comparison
                </h3>

                {certificationRecord.content_hash ? (
                  <div className="space-y-3">
                    {/* Stored Hash */}
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Stored Hash (at certification)</p>
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md font-mono text-xs">
                        <span className="flex-1 break-all">
                          {certificationRecord.content_hash}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(certificationRecord.content_hash!, 'stored')}
                          disabled={copying === 'stored'}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Current Hash */}
                    {currentHash && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Current Hash</p>
                        <div className="flex items-center gap-2 p-3 bg-muted rounded-md font-mono text-xs">
                          <span className="flex-1 break-all">{currentHash}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(currentHash, 'current')}
                            disabled={copying === 'current'}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Comparison Result */}
                    <div className="p-4 rounded-lg bg-muted/50">
                      {hashStatus === 'valid' && (
                        <div className="flex items-start gap-2">
                          <Badge variant="success" className="mt-0.5">Match</Badge>
                          <p className="text-sm">
                            The content hash matches. The product content has not changed since
                            certification.
                          </p>
                        </div>
                      )}
                      {hashStatus === 'mismatch' && (
                        <div className="flex items-start gap-2">
                          <Badge variant="warning" className="mt-0.5">Mismatch</Badge>
                          <p className="text-sm">
                            The content hash does not match. The product content has been modified
                            since certification. Re-certification is recommended.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="mt-0.5">Legacy</Badge>
                      <p className="text-sm">
                        This is a legacy certification created before content hash tracking was
                        implemented. Status is determined by comparing dates only.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>This product has never been certified.</p>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => window.open(`/product/${product.id}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Product Page
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
