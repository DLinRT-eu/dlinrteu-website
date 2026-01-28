import React, { useState } from 'react';
import { useProductEdit } from '../ProductEditContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Target, CircleDot, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ANATOMY_TAGS } from '@/config/tags';

interface StructuresEditorProps {
  fieldPath: string;
  label?: string;
}

const STRUCTURE_TYPES = ['OAR', 'GTV', 'Elective'];

interface StructureEntry {
  region: string;
  name: string;
  type: 'OAR' | 'GTV' | 'Elective';
  isInvestigational: boolean;
}

export function StructuresEditor({ fieldPath, label = 'Supported Structures' }: StructuresEditorProps) {
  const { isEditMode, editedProduct, updateField, changedFields } = useProductEdit();
  const [newRegion, setNewRegion] = useState('');
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'OAR' | 'GTV' | 'Elective'>('OAR');
  const [newInvestigational, setNewInvestigational] = useState(false);

  if (!editedProduct || !isEditMode) return null;

  const rawStructures = editedProduct.supportedStructures || [];
  const isFieldChanged = changedFields.some(f => f.startsWith('supportedStructures'));

  // Parse existing structures
  const parseStructures = (): StructureEntry[] => {
    return rawStructures.map((structure: string | object) => {
      if (typeof structure === 'object' && structure !== null) {
        const obj = structure as { name: string; type?: string };
        return {
          region: 'Default',
          name: obj.name,
          type: (obj.type as 'OAR' | 'GTV' | 'Elective') || 'OAR',
          isInvestigational: false
        };
      }
      
      const str = String(structure);
      const parts = str.split(':');
      const isInvestigational = str.includes('(investigational)');
      
      if (parts.length > 1) {
        const name = parts[1].trim().replace('(investigational)', '').trim();
        // Determine type from name
        let type: 'OAR' | 'GTV' | 'Elective' = 'OAR';
        if (name.toLowerCase().includes('gtv') || name.toLowerCase().includes('ctv')) {
          type = 'GTV';
        } else if (name.toLowerCase().includes('ptv') || name.toLowerCase().includes('elective')) {
          type = 'Elective';
        }
        
        return {
          region: parts[0].trim(),
          name,
          type,
          isInvestigational
        };
      }
      
      return {
        region: 'Default',
        name: str.replace('(investigational)', '').trim(),
        type: 'OAR' as const,
        isInvestigational
      };
    });
  };

  const structures = parseStructures();

  const handleAddStructure = () => {
    if (!newName.trim()) return;
    
    const region = newRegion.trim() || 'Default';
    let structureString = `${region}: ${newName.trim()}`;
    if (newInvestigational) {
      structureString += ' (investigational)';
    }
    
    updateField('supportedStructures', [...rawStructures, structureString]);
    setNewName('');
    setNewRegion('');
    setNewType('OAR');
    setNewInvestigational(false);
  };

  const handleRemoveStructure = (index: number) => {
    const updated = rawStructures.filter((_: unknown, i: number) => i !== index);
    updateField('supportedStructures', updated.length > 0 ? updated : undefined);
  };

  const getTypeIcon = (type: string, isInvestigational: boolean) => {
    if (isInvestigational) {
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    }
    switch (type) {
      case 'GTV':
        return <Target className="h-4 w-4 text-red-600" />;
      case 'Elective':
        return <CircleDot className="h-4 w-4 text-purple-600" />;
      default:
        return <Shield className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeBadgeClass = (type: string, isInvestigational: boolean) => {
    if (isInvestigational) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    switch (type) {
      case 'GTV':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'Elective':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  // Group by region
  const groupedByRegion: Record<string, StructureEntry[]> = {};
  structures.forEach((s, index) => {
    if (!groupedByRegion[s.region]) {
      groupedByRegion[s.region] = [];
    }
    groupedByRegion[s.region].push({ ...s, index } as StructureEntry & { index: number });
  });

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span className={cn(isFieldChanged && 'text-amber-600')}>{label}</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({structures.length} structures)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new structure form */}
        <div className="p-3 border rounded-lg bg-muted/30 space-y-3">
          <Label className="text-sm font-medium">Add Structure</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Region</Label>
              <Select value={newRegion} onValueChange={setNewRegion}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {ANATOMY_TAGS.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <Select value={newType} onValueChange={(v) => setNewType(v as 'OAR' | 'GTV' | 'Elective')}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {STRUCTURE_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Structure name"
              className="bg-background flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddStructure()}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewInvestigational(!newInvestigational)}
              className={cn(
                "text-xs",
                newInvestigational && "bg-amber-100 text-amber-800 border-amber-300"
              )}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Inv.
            </Button>
            <Button onClick={handleAddStructure} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Existing structures grouped by region */}
        {Object.entries(groupedByRegion).map(([region, regionStructures]) => (
          <div key={region} className="space-y-2">
            <Label className="text-sm font-medium">{region}</Label>
            <div className="flex flex-wrap gap-2">
              {(regionStructures as (StructureEntry & { index: number })[]).map((structure) => (
                <div
                  key={structure.index}
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold gap-1 group",
                    getTypeBadgeClass(structure.type, structure.isInvestigational)
                  )}
                >
                  {getTypeIcon(structure.type, structure.isInvestigational)}
                  <span>{structure.name}</span>
                  <button
                    onClick={() => handleRemoveStructure(structure.index)}
                    className="opacity-0 group-hover:opacity-100 ml-1 hover:text-destructive transition-opacity"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {structures.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No structures added. Use the form above to add structures.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
