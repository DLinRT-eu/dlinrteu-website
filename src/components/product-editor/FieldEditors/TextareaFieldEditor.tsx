import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, X, Pencil } from 'lucide-react';
import { ValidationIndicator } from '../ValidationIndicator';
import { ValidationStatus, ValidationSeverity } from '@/hooks/useProductValidation';

interface TextareaFieldEditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  isChanged?: boolean;
  validationStatus?: ValidationStatus;
  validationMessage?: string;
  validationSeverity?: ValidationSeverity;
  className?: string;
  children?: React.ReactNode;
}

export function TextareaFieldEditor({
  value,
  onChange,
  placeholder = 'Click to edit',
  rows = 4,
  maxLength,
  isChanged = false,
  validationStatus,
  validationMessage,
  validationSeverity,
  className,
  children
}: TextareaFieldEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleSave = () => {
    onChange(localValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
    // Don't handle Enter for textarea - allow newlines
  };

  if (isEditing) {
    return (
      <div className={cn('space-y-2', className)}>
        <Textarea
          ref={textareaRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="min-h-[100px]"
        />
        {maxLength && (
          <div className="text-xs text-muted-foreground text-right">
            {localValue.length}/{maxLength}
          </div>
        )}
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="gap-1">
            <Check className="h-4 w-4" />
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
        'group cursor-pointer rounded-md p-2 -m-2 transition-all',
        'hover:bg-muted/60',
        isChanged && 'ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20',
        validationStatus === 'error' && 'ring-2 ring-red-400/50 bg-red-50/50 dark:bg-red-900/20',
        validationStatus === 'warning' && !isChanged && 'ring-1 ring-amber-300/50',
        className
      )}
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 whitespace-pre-wrap">
          {children || value || (
            <span className="text-muted-foreground italic">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {validationStatus && validationStatus !== 'valid' && (
            <ValidationIndicator
              status={validationStatus}
              severity={validationSeverity}
              message={validationMessage}
              size="sm"
            />
          )}
          <Pencil className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
