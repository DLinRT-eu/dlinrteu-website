import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { Zap, Plus, Trash2, ChevronDown, ChevronRight, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANATOMY_TAGS } from '@/config/tags';

interface DosePredictionModelsEditorProps {
  fieldPath: string;
  label?: string;
}

const TECHNIQUE_OPTIONS = [
  'VMAT',
  'IMRT',
  'PBS',
  '3DCRT',
  'SBRT',
  'SRS',
  'Tomotherapy',
  'Electrons',
  'Mixed'
];

const INTENT_OPTIONS = [
  'Curative',
  'Palliative',
  'SBRT',
  'SRS',
  'Definitive',
  'Adjuvant'
];

const STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved' },
  { value: 'investigational', label: 'Investigational' }
];

interface DosePredictionModel {
  name: string;
  anatomicalSite: string;
  technique: string;
  intent?: string;
  description?: string;
  status?: 'approved' | 'investigational';
}

export function DosePredictionModelsEditor({ fieldPath, label = 'Dose Prediction Models' }: DosePredictionModelsEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  if (!editedProduct || !isEditMode) return null;

  const models: DosePredictionModel[] = editedProduct.dosePredictionModels || [];
  const isFieldChanged = changedFields.some(f => f.startsWith('dosePredictionModels'));

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddModel = () => {
    const newModel: DosePredictionModel = {
      name: '',
      anatomicalSite: '',
      technique: 'VMAT',
      status: 'approved'
    };
    updateField('dosePredictionModels', [...models, newModel]);
    setExpandedItems(new Set([...expandedItems, models.length]));
  };

  const handleRemoveModel = (index: number) => {
    const updated = models.filter((_, i) => i !== index);
    updateField('dosePredictionModels', updated.length > 0 ? updated : undefined);
    expandedItems.delete(index);
    setExpandedItems(new Set(expandedItems));
  };

  const handleUpdateModel = (index: number, field: keyof DosePredictionModel, value: string) => {
    const updated = models.map((item, i) => 
      i === index ? { ...item, [field]: value || undefined } : item
    );
    updateField('dosePredictionModels', updated);
  };

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
            <span className="text-sm font-normal text-muted-foreground">
              ({models.length} models)
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleAddModel}>
            <Plus className="h-4 w-4 mr-1" />
            Add Model
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {models.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No dose prediction models. Click "Add Model" to add one.
          </p>
        ) : (
          models.map((model, index) => (
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
                  <Brain className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-sm">
                    {model.name || `Model ${index + 1}`}
                  </span>
                  {model.anatomicalSite && (
                    <span className="text-xs text-muted-foreground">
                      ({model.anatomicalSite})
                    </span>
                  )}
                  {model.status === 'investigational' && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      investigational
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveModel(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Model Name</Label>
                    <Input
                      value={model.name || ''}
                      onChange={(e) => handleUpdateModel(index, 'name', e.target.value)}
                      placeholder="e.g., H&N VMAT"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Anatomical Site</Label>
                    <Select
                      value={model.anatomicalSite || ''}
                      onValueChange={(v) => handleUpdateModel(index, 'anatomicalSite', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select site" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {ANATOMY_TAGS.map(site => (
                          <SelectItem key={site} value={site}>{site}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Technique</Label>
                    <Select
                      value={model.technique || ''}
                      onValueChange={(v) => handleUpdateModel(index, 'technique', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select technique" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {TECHNIQUE_OPTIONS.map(tech => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Intent</Label>
                    <Select
                      value={model.intent || ''}
                      onValueChange={(v) => handleUpdateModel(index, 'intent', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select intent" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {INTENT_OPTIONS.map(intent => (
                          <SelectItem key={intent} value={intent}>{intent}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Status</Label>
                    <Select
                      value={model.status || 'approved'}
                      onValueChange={(v) => handleUpdateModel(index, 'status', v)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-50">
                        {STATUS_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={model.description || ''}
                    onChange={(e) => handleUpdateModel(index, 'description', e.target.value)}
                    placeholder="Brief description of the model..."
                    rows={2}
                    className="bg-background"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </CardContent>
    </Card>
  );
}
