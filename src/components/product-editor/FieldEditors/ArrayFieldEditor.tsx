import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Check } from 'lucide-react';
import { ValidationIndicator } from '../ValidationIndicator';
import { ValidationStatus, ValidationSeverity } from '@/hooks/useProductValidation';

interface ArrayFieldEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  isChanged?: boolean;
  validationStatus?: ValidationStatus;
  validationMessage?: string;
  validationSeverity?: ValidationSeverity;
  maxItems?: number;
  className?: string;
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export function ArrayFieldEditor({
  items,
  onChange,
  placeholder = 'Add item...',
  isChanged = false,
  validationStatus,
  validationMessage,
  validationSeverity,
  maxItems,
  className,
  badgeVariant = 'secondary'
}: ArrayFieldEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewItem('');
    }
  };

  const canAddMore = !maxItems || items.length < maxItems;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 rounded-md p-1.5 -m-1.5 transition-all min-h-[32px]',
        isChanged && 'ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20',
        validationStatus === 'error' && 'ring-2 ring-red-400/50 bg-red-50/50 dark:bg-red-900/20',
        validationStatus === 'warning' && !isChanged && 'ring-1 ring-amber-300/50',
        className
      )}
    >
      {items.map((item, index) => (
        <Badge
          key={`${item}-${index}`}
          variant={badgeVariant}
          className="group flex items-center gap-1 pr-1 hover:pr-1"
        >
          <span>{item}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(index);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive ml-0.5"
            aria-label={`Remove ${item}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {isAdding ? (
        <div className="flex items-center gap-1">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setTimeout(() => {
                if (!newItem.trim()) {
                  setIsAdding(false);
                }
              }, 150);
            }}
            placeholder={placeholder}
            className="h-6 w-32 text-xs"
            autoFocus
          />
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={handleAdd}
            disabled={!newItem.trim()}
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => {
              setIsAdding(false);
              setNewItem('');
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : canAddMore ? (
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs gap-1"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-3 w-3" />
          Add
        </Button>
      ) : null}

      {validationStatus && validationStatus !== 'valid' && items.length === 0 && (
        <ValidationIndicator
          status={validationStatus}
          severity={validationSeverity}
          message={validationMessage}
          size="sm"
        />
      )}
    </div>
  );
}
