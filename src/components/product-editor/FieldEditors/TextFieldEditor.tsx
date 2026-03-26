import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X, Pencil } from 'lucide-react';
import { ValidationIndicator } from '../ValidationIndicator';
import { ValidationStatus, ValidationSeverity } from '@/hooks/useProductValidation';

interface TextFieldEditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'url' | 'email';
  isChanged?: boolean;
  validationStatus?: ValidationStatus;
  validationMessage?: string;
  validationSeverity?: ValidationSeverity;
  className?: string;
  displayClassName?: string;
  children?: React.ReactNode;
}

export function TextFieldEditor({
  value,
  onChange,
  placeholder = 'Click to edit',
  type = 'text',
  isChanged = false,
  validationStatus,
  validationMessage,
  validationSeverity,
  className,
  displayClassName,
  children
}: TextFieldEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
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
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Input
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Small delay to allow button clicks to register
            setTimeout(() => {
              if (document.activeElement !== inputRef.current) {
                handleSave();
              }
            }, 150);
          }}
          placeholder={placeholder}
          type={type}
          className="h-8 flex-1"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className="h-8 w-8 p-0"
        >
          <Check className="h-4 w-4 text-green-600" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <span
      className={cn(
        'group inline-flex items-center gap-1.5 cursor-pointer rounded px-1.5 py-0.5 -mx-1.5 transition-all',
        'hover:bg-muted/60',
        isChanged && 'ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20',
        validationStatus === 'error' && 'ring-2 ring-red-400/50 bg-red-50/50 dark:bg-red-900/20',
        validationStatus === 'warning' && !isChanged && 'ring-1 ring-amber-300/50',
        className,
        displayClassName
      )}
      onClick={() => setIsEditing(true)}
    >
      {children || value || (
        <span className="text-muted-foreground italic">{placeholder}</span>
      )}
      {validationStatus && validationStatus !== 'valid' && (
        <ValidationIndicator
          status={validationStatus}
          severity={validationSeverity}
          message={validationMessage}
          size="sm"
        />
      )}
      <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </span>
  );
}
