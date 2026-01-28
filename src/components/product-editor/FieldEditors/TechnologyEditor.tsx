import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechnologyEditorProps {
  fieldPath: string;
  label?: string;
}

const INTEGRATION_OPTIONS = ['Standalone', 'Integrated', 'API', 'Plugin', 'DICOM', 'HL7'];
const DEPLOYMENT_OPTIONS = ['Local', 'Cloud', 'Hybrid', 'On-Premise', 'SaaS'];
const TRIGGER_OPTIONS = ['Manual', 'Automatic', 'On-Demand', 'Scheduled', 'Event-Driven'];

export function TechnologyEditor({ fieldPath, label = 'Technology' }: TechnologyEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [newIntegration, setNewIntegration] = useState('');
  const [newDeployment, setNewDeployment] = useState('');

  if (!editedProduct || !isEditMode) return null;

  const technology = editedProduct.technology || {};
  const integration = technology.integration || [];
  const deployment = technology.deployment || [];

  const isFieldChanged = (path: string) => changedFields.some(f => f.startsWith(path));

  const handleAddIntegration = (value: string) => {
    if (value && !integration.includes(value)) {
      updateField('technology.integration', [...integration, value]);
    }
    setNewIntegration('');
  };

  const handleRemoveIntegration = (value: string) => {
    updateField('technology.integration', integration.filter(i => i !== value));
  };

  const handleAddDeployment = (value: string) => {
    if (value && !deployment.includes(value)) {
      updateField('technology.deployment', [...deployment, value]);
    }
    setNewDeployment('');
  };

  const handleRemoveDeployment = (value: string) => {
    updateField('technology.deployment', deployment.filter(d => d !== value));
  };

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Integration */}
        <div className="space-y-2">
          <Label className={cn("text-sm font-medium", isFieldChanged('technology.integration') && 'text-amber-600')}>
            Integration
          </Label>
          <div className="flex flex-wrap gap-2">
            {integration.map((item, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1 pr-1">
                {item}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-destructive/20"
                  onClick={() => handleRemoveIntegration(item)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {INTEGRATION_OPTIONS.filter(opt => !integration.includes(opt)).map(opt => (
              <Button
                key={opt}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleAddIntegration(opt)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {opt}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newIntegration}
              onChange={(e) => setNewIntegration(e.target.value)}
              placeholder="Custom integration..."
              className="bg-background flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddIntegration(newIntegration)}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAddIntegration(newIntegration)}
              disabled={!newIntegration}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Deployment */}
        <div className="space-y-2">
          <Label className={cn("text-sm font-medium", isFieldChanged('technology.deployment') && 'text-amber-600')}>
            Deployment
          </Label>
          <div className="flex flex-wrap gap-2">
            {deployment.map((item, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1 pr-1">
                {item}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-destructive/20"
                  onClick={() => handleRemoveDeployment(item)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {DEPLOYMENT_OPTIONS.filter(opt => !deployment.includes(opt)).map(opt => (
              <Button
                key={opt}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleAddDeployment(opt)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {opt}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newDeployment}
              onChange={(e) => setNewDeployment(e.target.value)}
              placeholder="Custom deployment..."
              className="bg-background flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddDeployment(newDeployment)}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAddDeployment(newDeployment)}
              disabled={!newDeployment}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Trigger for Analysis */}
        <div className="space-y-2">
          <Label className={cn("text-sm font-medium", isFieldChanged('technology.triggerForAnalysis') && 'text-amber-600')}>
            Trigger for Analysis
          </Label>
          <div className="flex gap-2 flex-wrap">
            {TRIGGER_OPTIONS.map(opt => (
              <Button
                key={opt}
                variant={technology.triggerForAnalysis === opt ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => updateField('technology.triggerForAnalysis', opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>

        {/* Processing Time */}
        <div className="space-y-1">
          <Label className={cn("text-sm font-medium", isFieldChanged('technology.processingTime') && 'text-amber-600')}>
            Processing Time
          </Label>
          <Input
            value={technology.processingTime || ''}
            onChange={(e) => updateField('technology.processingTime', e.target.value || undefined)}
            placeholder="e.g., < 5 minutes, Real-time, 30-60 seconds"
            className="bg-background"
          />
        </div>
      </CardContent>
    </Card>
  );
}
