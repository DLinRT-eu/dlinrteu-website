import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Layers, Plus, Trash2, ChevronDown, ChevronRight, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntegratedModulesEditorProps {
  fieldPath: string;
  label?: string;
}

interface IntegratedModule {
  name: string;
  description: string;
  category: string;
  productUrl: string;
  keyFeatures?: string[];
}

export function IntegratedModulesEditor({ fieldPath, label = 'Integrated Modules' }: IntegratedModulesEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));
  const [newFeature, setNewFeature] = useState<Record<number, string>>({});

  if (!editedProduct || !isEditMode) return null;

  const modules: IntegratedModule[] = editedProduct.integratedModules || [];
  const isFieldChanged = changedFields.some(f => f.startsWith('integratedModules'));

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddModule = () => {
    const newModule: IntegratedModule = {
      name: '',
      description: '',
      category: '',
      productUrl: '',
      keyFeatures: []
    };
    updateField('integratedModules', [...modules, newModule]);
    setExpandedItems(new Set([...expandedItems, modules.length]));
  };

  const handleRemoveModule = (index: number) => {
    const updated = modules.filter((_, i) => i !== index);
    updateField('integratedModules', updated.length > 0 ? updated : undefined);
    expandedItems.delete(index);
    setExpandedItems(new Set(expandedItems));
  };

  const handleUpdateModule = (index: number, field: keyof IntegratedModule, value: string | string[]) => {
    const updated = modules.map((item, i) => 
      i === index ? { ...item, [field]: value || undefined } : item
    );
    updateField('integratedModules', updated);
  };

  const handleAddFeature = (moduleIndex: number) => {
    const feature = newFeature[moduleIndex]?.trim();
    if (!feature) return;
    
    const module = modules[moduleIndex];
    const updatedFeatures = [...(module.keyFeatures || []), feature];
    handleUpdateModule(moduleIndex, 'keyFeatures', updatedFeatures);
    setNewFeature({ ...newFeature, [moduleIndex]: '' });
  };

  const handleRemoveFeature = (moduleIndex: number, featureIndex: number) => {
    const module = modules[moduleIndex];
    const updatedFeatures = (module.keyFeatures || []).filter((_, i) => i !== featureIndex);
    handleUpdateModule(moduleIndex, 'keyFeatures', updatedFeatures);
  };

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
            <span className="text-sm font-normal text-muted-foreground">
              ({modules.length} modules)
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleAddModule}>
            <Plus className="h-4 w-4 mr-1" />
            Add Module
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {modules.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No integrated modules. Click "Add Module" to add one.
          </p>
        ) : (
          modules.map((module, index) => (
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
                    {module.name || `Module ${index + 1}`}
                  </span>
                  {module.category && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                      {module.category}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveModule(index);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-3 pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Module Name</Label>
                    <Input
                      value={module.name || ''}
                      onChange={(e) => handleUpdateModule(index, 'name', e.target.value)}
                      placeholder="e.g., Auto-Segmentation"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Category</Label>
                    <Input
                      value={module.category || ''}
                      onChange={(e) => handleUpdateModule(index, 'category', e.target.value)}
                      placeholder="e.g., AI-Powered"
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={module.description || ''}
                    onChange={(e) => handleUpdateModule(index, 'description', e.target.value)}
                    placeholder="Describe the module..."
                    rows={2}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Product URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={module.productUrl || ''}
                      onChange={(e) => handleUpdateModule(index, 'productUrl', e.target.value)}
                      placeholder="https://..."
                      className="bg-background flex-1"
                    />
                    {module.productUrl && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={module.productUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="space-y-2">
                  <Label className="text-xs">Key Features</Label>
                  <div className="flex flex-wrap gap-2">
                    {(module.keyFeatures || []).map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                      >
                        <span>{feature}</span>
                        <button
                          onClick={() => handleRemoveFeature(index, featureIndex)}
                          className="hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature[index] || ''}
                      onChange={(e) => setNewFeature({ ...newFeature, [index]: e.target.value })}
                      placeholder="Add feature"
                      className="bg-background flex-1 text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddFeature(index)}
                    />
                    <Button size="sm" variant="outline" onClick={() => handleAddFeature(index)}>
                      <Plus className="h-4 w-4" />
                    </Button>
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
