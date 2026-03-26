import React from 'react';
import { ProductDetails } from '@/types/productDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ArrowRight, Minus, Plus } from 'lucide-react';

interface DiffViewerProps {
  original: ProductDetails;
  edited: ProductDetails;
  changedFields: string[];
  className?: string;
}

type ChangeType = 'added' | 'removed' | 'modified';

interface FieldChange {
  path: string;
  label: string;
  originalValue: any;
  newValue: any;
  changeType: ChangeType;
}

// Convert field path to readable label
function pathToLabel(path: string): string {
  return path
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' → ')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}

// Get nested value from object using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

// Format value for display
function formatValue(value: any): string {
  if (value === null || value === undefined) return '(empty)';
  if (Array.isArray(value)) {
    if (value.length === 0) return '(empty array)';
    if (typeof value[0] === 'object') {
      return `${value.length} items`;
    }
    return value.join(', ');
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

// Determine if value is "empty"
function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  if (typeof value === 'string') return value.trim() === '';
  return false;
}

export function DiffViewer({ original, edited, changedFields, className }: DiffViewerProps) {
  const changes: FieldChange[] = changedFields.map(path => {
    const originalValue = getNestedValue(original, path);
    const newValue = getNestedValue(edited, path);
    
    let changeType: ChangeType = 'modified';
    if (isEmpty(originalValue) && !isEmpty(newValue)) {
      changeType = 'added';
    } else if (!isEmpty(originalValue) && isEmpty(newValue)) {
      changeType = 'removed';
    }
    
    return {
      path,
      label: pathToLabel(path),
      originalValue,
      newValue,
      changeType
    };
  });

  if (changes.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center text-muted-foreground">
          No changes detected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          Changes Summary
          <Badge variant="secondary">{changes.length} field(s)</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-96">
          <div className="space-y-3">
            {changes.map((change, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg border",
                  change.changeType === 'added' && "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30",
                  change.changeType === 'removed' && "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30",
                  change.changeType === 'modified' && "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {change.changeType === 'added' && <Plus className="h-4 w-4 text-green-600" />}
                  {change.changeType === 'removed' && <Minus className="h-4 w-4 text-red-600" />}
                  {change.changeType === 'modified' && <ArrowRight className="h-4 w-4 text-amber-600" />}
                  <span className="font-medium text-sm">{change.label}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs ml-auto",
                      change.changeType === 'added' && "text-green-700 border-green-300",
                      change.changeType === 'removed' && "text-red-700 border-red-300",
                      change.changeType === 'modified' && "text-amber-700 border-amber-300"
                    )}
                  >
                    {change.changeType}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground block">Before</span>
                    <div className={cn(
                      "p-2 rounded bg-background border font-mono text-xs whitespace-pre-wrap break-all",
                      change.changeType === 'removed' && "line-through text-red-600"
                    )}>
                      {formatValue(change.originalValue)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground block">After</span>
                    <div className={cn(
                      "p-2 rounded bg-background border font-mono text-xs whitespace-pre-wrap break-all",
                      change.changeType === 'added' && "text-green-600"
                    )}>
                      {formatValue(change.newValue)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

// Compact version for inline display
export function DiffViewerCompact({ changedFields }: { changedFields: string[] }) {
  if (changedFields.length === 0) return null;
  
  return (
    <div className="text-xs text-muted-foreground">
      <span className="font-medium">{changedFields.length} changed:</span>{' '}
      {changedFields.slice(0, 5).map(pathToLabel).join(', ')}
      {changedFields.length > 5 && ` +${changedFields.length - 5} more`}
    </div>
  );
}
