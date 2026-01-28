import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useProductEdit } from './ProductEditContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, X, Plus, Check } from 'lucide-react';

interface EditableFieldProps {
  fieldPath: string;
  value: any;
  type?: 'text' | 'textarea' | 'array' | 'date' | 'url';
  label?: string;
  placeholder?: string;
  className?: string;
  renderDisplay?: (value: any) => React.ReactNode;
  children?: React.ReactNode;
}

export function EditableField({
  fieldPath,
  value,
  type = 'text',
  label,
  placeholder,
  className,
  renderDisplay,
  children
}: EditableFieldProps) {
  const { isEditMode, changedFields, updateField, canEdit } = useProductEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  const isChanged = changedFields.includes(fieldPath);
  const showEditControls = isEditMode && canEdit;
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleSave = () => {
    updateField(fieldPath, localValue);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  // Render children as-is when not in edit mode
  if (!showEditControls) {
    return <>{children || renderDisplay?.(value) || value}</>;
  }
  
  // Text / URL fields
  if (type === 'text' || type === 'url') {
    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={localValue || ''}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            type={type === 'url' ? 'url' : 'text'}
            className="h-8"
          />
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }
    
    return (
      <span
        className={cn(
          "group inline-flex items-center gap-1 cursor-pointer rounded px-1 -mx-1 transition-colors",
          "hover:bg-muted/50",
          isChanged && "ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20",
          className
        )}
        onClick={() => setIsEditing(true)}
      >
        {children || renderDisplay?.(value) || value || <span className="text-muted-foreground italic">{placeholder || 'Click to edit'}</span>}
        <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    );
  }
  
  // Textarea
  if (type === 'textarea') {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue || ''}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholder}
            rows={4}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div
        className={cn(
          "group cursor-pointer rounded p-2 -m-2 transition-colors",
          "hover:bg-muted/50",
          isChanged && "ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20",
          className
        )}
        onClick={() => setIsEditing(true)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {children || renderDisplay?.(value) || value || <span className="text-muted-foreground italic">{placeholder || 'Click to edit'}</span>}
          </div>
          <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>
      </div>
    );
  }
  
  // Array field (tags)
  if (type === 'array') {
    const items = Array.isArray(localValue) ? localValue : [];
    
    return (
      <ArrayFieldEditor
        items={items}
        onChange={(newItems) => {
          setLocalValue(newItems);
          updateField(fieldPath, newItems);
        }}
        isChanged={isChanged}
        placeholder={placeholder}
        className={className}
      />
    );
  }
  
  // Date field
  if (type === 'date') {
    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="date"
            value={localValue || ''}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 w-auto"
          />
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }
    
    return (
      <span
        className={cn(
          "group inline-flex items-center gap-1 cursor-pointer rounded px-1 -mx-1 transition-colors",
          "hover:bg-muted/50",
          isChanged && "ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20",
          className
        )}
        onClick={() => setIsEditing(true)}
      >
        {children || renderDisplay?.(value) || value || <span className="text-muted-foreground italic">{placeholder || 'Select date'}</span>}
        <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </span>
    );
  }
  
  return <>{children || value}</>;
}

// Sub-component for array editing
interface ArrayFieldEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  isChanged: boolean;
  placeholder?: string;
  className?: string;
}

function ArrayFieldEditor({ items, onChange, isChanged, placeholder, className }: ArrayFieldEditorProps) {
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
      setIsAdding(false);
    }
  };
  
  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };
  
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 rounded p-1 -m-1 transition-colors",
        isChanged && "ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20",
        className
      )}
    >
      {items.map((item, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="group flex items-center gap-1 pr-1"
        >
          {item}
          <button
            onClick={() => handleRemove(index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
              if (e.key === 'Escape') setIsAdding(false);
            }}
            placeholder={placeholder || 'Add item...'}
            className="h-6 w-32 text-xs"
            autoFocus
          />
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={handleAdd}>
            <Check className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setIsAdding(false)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      )}
    </div>
  );
}
