import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, Plus, Trash2, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuidelinesEditorProps {
  fieldPath: string;
  label?: string;
}

const COMMON_GUIDELINES = [
  'AAPM TG-263',
  'AAPM TG-275',
  'AAPM TG-211',
  'AAPM TG-273',
  'ESTRO Guidelines',
  'NCS Report 33',
  'RTOG',
  'ACR Guidelines',
  'ISO 13485',
  'IEC 62304',
  'EU AI Act'
];

const COMPLIANCE_OPTIONS = [
  { value: 'full', label: 'Full Compliance' },
  { value: 'partial', label: 'Partial Compliance' },
  { value: 'planned', label: 'Planned' }
];

interface GuidelineItem {
  name: string;
  version?: string;
  reference?: string;
  url?: string;
  compliance?: 'full' | 'partial' | 'planned';
}

export function GuidelinesEditor({ fieldPath, label = 'Guidelines & Standards' }: GuidelinesEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  if (!editedProduct || !isEditMode) return null;

  const guidelines: GuidelineItem[] = editedProduct.guidelines || [];
  const isFieldChanged = changedFields.some(f => f.startsWith('guidelines'));

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddGuideline = (name?: string) => {
    const newGuideline: GuidelineItem = {
      name: name || '',
      compliance: 'full'
    };
    updateField('guidelines', [...guidelines, newGuideline]);
    setExpandedItems(new Set([...expandedItems, guidelines.length]));
  };

  const handleRemoveGuideline = (index: number) => {
    const updated = guidelines.filter((_, i) => i !== index);
    updateField('guidelines', updated.length > 0 ? updated : undefined);
    expandedItems.delete(index);
    setExpandedItems(new Set(expandedItems));
  };

  const handleUpdateGuideline = (index: number, field: keyof GuidelineItem, value: string) => {
    const updated = guidelines.map((item, i) => 
      i === index ? { ...item, [field]: value || undefined } : item
    );
    updateField('guidelines', updated);
  };

  // Filter out already-added guidelines
  const availableGuidelines = COMMON_GUIDELINES.filter(
    g => !guidelines.some(existing => existing.name === g)
  );

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => handleAddGuideline()}>
            <Plus className="h-4 w-4 mr-1" />
            Add Custom
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Quick add common guidelines */}
        {availableGuidelines.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick Add</Label>
            <div className="flex flex-wrap gap-2">
              {availableGuidelines.slice(0, 6).map(guideline => (
                <Button
                  key={guideline}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleAddGuideline(guideline)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {guideline}
                </Button>
              ))}
            </div>
          </div>
        )}

        {guidelines.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No guidelines added. Use Quick Add or click "Add Custom".
          </p>
        ) : (
          <div className="space-y-2 pt-2 border-t">
            {guidelines.map((item, index) => (
              <Collapsible
                key={index}
                open={expandedItems.has(index)}
                onOpenChange={() => toggleExpanded(index)}
                className="border rounded-lg"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-accent/50">
                  <div className="flex items-center gap-2">
                    {expandedItems.has(index) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="font-medium text-sm">
                      {item.name || 'New Guideline'}
                    </span>
                    {item.compliance && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        item.compliance === 'full' && 'bg-green-100 text-green-700',
                        item.compliance === 'partial' && 'bg-amber-100 text-amber-700',
                        item.compliance === 'planned' && 'bg-blue-100 text-blue-700'
                      )}>
                        {item.compliance}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveGuideline(index);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3 pt-0 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={item.name || ''}
                        onChange={(e) => handleUpdateGuideline(index, 'name', e.target.value)}
                        placeholder="Guideline name"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Compliance</Label>
                      <Select
                        value={item.compliance || 'full'}
                        onValueChange={(v) => handleUpdateGuideline(index, 'compliance', v)}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          {COMPLIANCE_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Version</Label>
                      <Input
                        value={item.version || ''}
                        onChange={(e) => handleUpdateGuideline(index, 'version', e.target.value)}
                        placeholder="e.g., 2023"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Reference</Label>
                      <Input
                        value={item.reference || ''}
                        onChange={(e) => handleUpdateGuideline(index, 'reference', e.target.value)}
                        placeholder="Citation or reference"
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={item.url || ''}
                        onChange={(e) => handleUpdateGuideline(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="bg-background flex-1"
                      />
                      {item.url && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
