import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X, Calendar } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { ValidationIndicator } from '../ValidationIndicator';
import { ValidationStatus, ValidationSeverity } from '@/hooks/useProductValidation';

interface DateFieldEditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  isChanged?: boolean;
  validationStatus?: ValidationStatus;
  validationMessage?: string;
  validationSeverity?: ValidationSeverity;
  displayFormat?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DateFieldEditor({
  value,
  onChange,
  placeholder = 'Select date',
  isChanged = false,
  validationStatus,
  validationMessage,
  validationSeverity,
  displayFormat = 'MMMM d, yyyy',
  className,
  children
}: DateFieldEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
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

  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr || dateStr === '0000-00-00') return '';
    try {
      const date = parseISO(dateStr);
      if (isValid(date)) {
        return format(date, displayFormat);
      }
    } catch {
      // Fall through to return original
    }
    return dateStr;
  };

  if (isEditing) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Input
          ref={inputRef}
          type="date"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-8 w-auto"
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

  const displayValue = formatDisplayDate(value || '');

  return (
    <span
      className={cn(
        'group inline-flex items-center gap-1.5 cursor-pointer rounded px-1.5 py-0.5 -mx-1.5 transition-all',
        'hover:bg-muted/60',
        isChanged && 'ring-2 ring-amber-400/50 bg-amber-50/50 dark:bg-amber-900/20',
        validationStatus === 'error' && 'ring-2 ring-red-400/50 bg-red-50/50 dark:bg-red-900/20',
        validationStatus === 'warning' && !isChanged && 'ring-1 ring-amber-300/50',
        className
      )}
      onClick={() => setIsEditing(true)}
    >
      {children || displayValue || (
        <span className="text-muted-foreground italic flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {placeholder}
        </span>
      )}
      {validationStatus && validationStatus !== 'valid' && (
        <ValidationIndicator
          status={validationStatus}
          severity={validationSeverity}
          message={validationMessage}
          size="sm"
        />
      )}
      <Calendar className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </span>
  );
}
