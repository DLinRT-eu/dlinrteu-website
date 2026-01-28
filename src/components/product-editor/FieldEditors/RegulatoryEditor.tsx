import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegulatoryEditorProps {
  fieldPath: string;
  label?: string;
}

const STATUS_OPTIONS = [
  'Approved',
  'Cleared',
  'Pending',
  'Not Submitted',
  'Not Available',
  'Research Only'
];

const CE_CLASS_OPTIONS = ['I', 'IIa', 'IIb', 'III'];
const FDA_CLASS_OPTIONS = ['I', 'II', 'III'];

interface CEInfo {
  status?: string;
  class?: string;
  type?: string;
  notifiedBody?: string;
  certificateNumber?: string;
  regulation?: string;
  notes?: string;
}

interface FDAInfo {
  status?: string;
  class?: string;
  clearanceNumber?: string;
  regulationNumber?: string;
  productCode?: string;
  type?: string;
  decisionDate?: string;
  notes?: string;
}

interface TGAInfo {
  status?: string;
  notes?: string;
}

export function RegulatoryEditor({ fieldPath, label = 'Regulatory Information' }: RegulatoryEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [ceOpen, setCeOpen] = useState(true);
  const [fdaOpen, setFdaOpen] = useState(true);
  const [tgaOpen, setTgaOpen] = useState(false);

  if (!editedProduct) return null;

  const regulatory = editedProduct.regulatory || {};
  const ce: CEInfo = regulatory.ce || {};
  const fda: FDAInfo = typeof regulatory.fda === 'object' && regulatory.fda !== null ? regulatory.fda : {};
  const tga: TGAInfo = regulatory.tga || {};

  const isFieldChanged = (path: string) => changedFields.some(f => f.startsWith(path));

  const handleCeChange = (field: string, value: string) => {
    updateField(`regulatory.ce.${field}`, value || undefined);
  };

  const handleFdaChange = (field: string, value: string) => {
    updateField(`regulatory.fda.${field}`, value || undefined);
  };

  const handleTgaChange = (field: string, value: string) => {
    updateField(`regulatory.tga.${field}`, value || undefined);
  };

  const handleIntendedUseChange = (value: string) => {
    updateField('regulatory.intendedUseStatement', value || undefined);
  };

  if (!isEditMode) {
    return null; // Don't render editor in view mode
  }

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* CE Marking Section */}
        <Collapsible open={ceOpen} onOpenChange={setCeOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left font-medium hover:text-primary">
            {ceOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className={cn(isFieldChanged('regulatory.ce') && 'text-amber-600')}>
              CE Marking (EU)
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select value={ce.status || ''} onValueChange={(v) => handleCeChange('status', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {STATUS_OPTIONS.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Class</Label>
                <Select value={ce.class || ''} onValueChange={(v) => handleCeChange('class', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {CE_CLASS_OPTIONS.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Certificate Number</Label>
                <Input
                  value={ce.certificateNumber || ''}
                  onChange={(e) => handleCeChange('certificateNumber', e.target.value)}
                  placeholder="e.g., CE-12345"
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Notified Body</Label>
                <Input
                  value={ce.notifiedBody || ''}
                  onChange={(e) => handleCeChange('notifiedBody', e.target.value)}
                  placeholder="e.g., TÜV SÜD"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Regulation</Label>
              <Input
                value={ce.regulation || ''}
                onChange={(e) => handleCeChange('regulation', e.target.value)}
                placeholder="e.g., MDR 2017/745"
                className="bg-background"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Notes</Label>
              <Textarea
                value={ce.notes || ''}
                onChange={(e) => handleCeChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={2}
                className="bg-background"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* FDA Section */}
        <Collapsible open={fdaOpen} onOpenChange={setFdaOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left font-medium hover:text-primary">
            {fdaOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className={cn(isFieldChanged('regulatory.fda') && 'text-amber-600')}>
              FDA (USA)
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <Select value={fda.status || ''} onValueChange={(v) => handleFdaChange('status', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {STATUS_OPTIONS.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Class</Label>
                <Select value={fda.class || ''} onValueChange={(v) => handleFdaChange('class', v)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {FDA_CLASS_OPTIONS.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Clearance Number</Label>
                <Input
                  value={fda.clearanceNumber || ''}
                  onChange={(e) => handleFdaChange('clearanceNumber', e.target.value)}
                  placeholder="e.g., K212274"
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Decision Date</Label>
                <Input
                  type="date"
                  value={fda.decisionDate || ''}
                  onChange={(e) => handleFdaChange('decisionDate', e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Product Code</Label>
                <Input
                  value={fda.productCode || ''}
                  onChange={(e) => handleFdaChange('productCode', e.target.value)}
                  placeholder="e.g., LLZ"
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Type</Label>
                <Input
                  value={fda.type || ''}
                  onChange={(e) => handleFdaChange('type', e.target.value)}
                  placeholder="e.g., 510(k), De Novo"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Notes</Label>
              <Textarea
                value={fda.notes || ''}
                onChange={(e) => handleFdaChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={2}
                className="bg-background"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* TGA Section */}
        <Collapsible open={tgaOpen} onOpenChange={setTgaOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left font-medium hover:text-primary">
            {tgaOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className={cn(isFieldChanged('regulatory.tga') && 'text-amber-600')}>
              TGA (Australia)
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <Select value={tga.status || ''} onValueChange={(v) => handleTgaChange('status', v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {STATUS_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Notes</Label>
              <Textarea
                value={tga.notes || ''}
                onChange={(e) => handleTgaChange('notes', e.target.value)}
                placeholder="Additional notes..."
                rows={2}
                className="bg-background"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Intended Use Statement */}
        <div className="pt-2 border-t">
          <div className="space-y-1">
            <Label className={cn("text-sm font-medium", isFieldChanged('regulatory.intendedUseStatement') && 'text-amber-600')}>
              Intended Use Statement
            </Label>
            <Textarea
              value={regulatory.intendedUseStatement || ''}
              onChange={(e) => handleIntendedUseChange(e.target.value)}
              placeholder="Enter the official intended use statement..."
              rows={3}
              className="bg-background"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
