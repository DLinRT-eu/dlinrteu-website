import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FlaskConical, Plus, Trash2, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvidenceEditorProps {
  fieldPath: string;
  label?: string;
}

const EVIDENCE_TYPES = [
  'Clinical Study',
  'Peer-Reviewed Publication',
  'Conference Abstract',
  'White Paper',
  'Case Study',
  'Validation Study',
  'Multi-Site Study',
  'Retrospective Analysis',
  'Prospective Study',
  'Internal Validation'
];

const EVIDENCE_LEVELS = [
  { value: '0', label: '0 - No Evidence' },
  { value: '1t', label: '1t - Technical Efficacy' },
  { value: '1c', label: '1c - Clinical Efficacy (Potential)' },
  { value: '2', label: '2 - Stand-Alone Performance' },
  { value: '3', label: '3 - Workflow Efficacy' },
  { value: '4', label: '4 - Treatment Decision Efficacy' },
  { value: '5', label: '5 - Patient Outcome Efficacy' },
  { value: '6', label: '6 - Societal Efficacy' },
];

interface EvidenceItem {
  type: string;
  description: string;
  link: string;
  level?: string;
}

export function EvidenceEditor({ fieldPath, label = 'Clinical Evidence' }: EvidenceEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  if (!editedProduct || !isEditMode) return null;

  // Handle both string[] and object[] formats
  const rawEvidence = editedProduct.evidence || [];
  const evidence: EvidenceItem[] = Array.isArray(rawEvidence)
    ? rawEvidence.map(item => 
        typeof item === 'string' 
          ? { type: 'Publication', description: item, link: '' }
          : item as EvidenceItem
      )
    : [];

  const isFieldChanged = changedFields.some(f => f.startsWith('evidence'));

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddEvidence = () => {
    const newEvidence: EvidenceItem = {
      type: 'Clinical Study',
      description: '',
      link: '',
    };
    updateField('evidence', [...evidence, newEvidence]);
    setExpandedItems(new Set([...expandedItems, evidence.length]));
  };

  const handleRemoveEvidence = (index: number) => {
    const updated = evidence.filter((_, i) => i !== index);
    updateField('evidence', updated.length > 0 ? updated : undefined);
    expandedItems.delete(index);
    setExpandedItems(new Set(expandedItems));
  };

  const handleUpdateEvidence = (index: number, field: keyof EvidenceItem, value: string) => {
    const updated = evidence.map((item, i) => 
      i === index ? { ...item, [field]: value || undefined } : item
    );
    updateField('evidence', updated);
  };

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleAddEvidence}>
            <Plus className="h-4 w-4 mr-1" />
            Add Evidence
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {evidence.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No evidence items. Click "Add Evidence" to add one.
          </p>
        ) : (
          evidence.map((item, index) => (
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
                    {item.type || 'Evidence'} {index + 1}
                  </span>
                  {item.level && (
                    <span className="text-xs text-muted-foreground">
                      (Level {item.level})
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEvidence(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Type</Label>
                    <Select
                      value={item.type || ''}
                      onValueChange={(v) => handleUpdateEvidence(index, 'type', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {EVIDENCE_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Evidence Level</Label>
                    <Select
                      value={item.level || ''}
                      onValueChange={(v) => handleUpdateEvidence(index, 'level', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {EVIDENCE_LEVELS.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => handleUpdateEvidence(index, 'description', e.target.value)}
                    placeholder="Describe the evidence..."
                    rows={2}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Link</Label>
                  <div className="flex gap-2">
                    <Input
                      value={item.link || ''}
                      onChange={(e) => handleUpdateEvidence(index, 'link', e.target.value)}
                      placeholder="https://..."
                      className="bg-background flex-1"
                    />
                    {item.link && (
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </CardContent>
    </Card>
  );
}
