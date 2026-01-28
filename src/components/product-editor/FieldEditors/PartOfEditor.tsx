import React from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ExternalLink, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartOfEditorProps {
  fieldPath: string;
  label?: string;
}

const RELATIONSHIP_OPTIONS = [
  'Module',
  'Feature',
  'Add-on',
  'Component',
  'Extension',
  'Plugin'
];

interface PartOfInfo {
  name: string;
  version?: string;
  productUrl?: string;
  relationship?: string;
}

export function PartOfEditor({ fieldPath, label = 'Part Of (Parent System)' }: PartOfEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();

  if (!editedProduct || !isEditMode) return null;

  const partOf: PartOfInfo | undefined = editedProduct.partOf;
  const isFieldChanged = changedFields.some(f => f.startsWith('partOf'));

  const handleUpdate = (field: keyof PartOfInfo, value: string) => {
    const current = partOf || { name: '' };
    updateField('partOf', { ...current, [field]: value || undefined });
  };

  const handleClear = () => {
    updateField('partOf', undefined);
  };

  const handleCreate = () => {
    updateField('partOf', { name: '', relationship: 'Module' });
  };

  if (!partOf) {
    return (
      <Card className="border-2 border-dashed border-primary/30">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-5 w-5" />
              <span>This product is not part of a larger system</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleCreate}>
              Add Parent System
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={handleClear}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Parent Product Name</Label>
            <Input
              value={partOf.name || ''}
              onChange={(e) => handleUpdate('name', e.target.value)}
              placeholder="e.g., Workspace+"
              className="bg-background"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Relationship</Label>
            <Select
              value={partOf.relationship || ''}
              onValueChange={(v) => handleUpdate('relationship', v)}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {RELATIONSHIP_OPTIONS.map(rel => (
                  <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Minimum Version</Label>
            <Input
              value={partOf.version || ''}
              onChange={(e) => handleUpdate('version', e.target.value)}
              placeholder="e.g., 2.0"
              className="bg-background"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Product URL</Label>
            <div className="flex gap-2">
              <Input
                value={partOf.productUrl || ''}
                onChange={(e) => handleUpdate('productUrl', e.target.value)}
                placeholder="https://..."
                className="bg-background flex-1"
              />
              {partOf.productUrl && (
                <Button variant="outline" size="icon" asChild>
                  <a href={partOf.productUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
