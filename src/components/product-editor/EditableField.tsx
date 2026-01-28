import React from 'react';
import { cn } from '@/lib/utils';
import { useProductEdit } from './ProductEditContext';
import { useProductValidation, ValidationStatus } from '@/hooks/useProductValidation';
import { TextFieldEditor } from './FieldEditors/TextFieldEditor';
import { TextareaFieldEditor } from './FieldEditors/TextareaFieldEditor';
import { ArrayFieldEditor } from './FieldEditors/ArrayFieldEditor';
import { DateFieldEditor } from './FieldEditors/DateFieldEditor';

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
  const { isEditMode, editedProduct, changedFields, updateField, canEdit } = useProductEdit();
  const validation = useProductValidation(editedProduct);
  
  const isChanged = changedFields.includes(fieldPath);
  const showEditControls = isEditMode && canEdit;
  
  // Get validation status for this field
  const fieldValidation = validation.getFieldStatus(fieldPath);
  const validationStatus: ValidationStatus | undefined = fieldValidation?.status;
  const validationMessage = fieldValidation?.message;
  const validationSeverity = fieldValidation?.severity;
  
  // Render children as-is when not in edit mode
  if (!showEditControls) {
    return <>{children || renderDisplay?.(value) || value}</>;
  }
  
  // Text / URL fields
  if (type === 'text' || type === 'url') {
    return (
      <TextFieldEditor
        value={value}
        onChange={(newValue) => updateField(fieldPath, newValue)}
        placeholder={placeholder}
        type={type}
        isChanged={isChanged}
        validationStatus={validationStatus}
        validationMessage={validationMessage}
        validationSeverity={validationSeverity}
        className={className}
      >
        {children || renderDisplay?.(value)}
      </TextFieldEditor>
    );
  }
  
  // Textarea
  if (type === 'textarea') {
    return (
      <TextareaFieldEditor
        value={value}
        onChange={(newValue) => updateField(fieldPath, newValue)}
        placeholder={placeholder}
        isChanged={isChanged}
        validationStatus={validationStatus}
        validationMessage={validationMessage}
        validationSeverity={validationSeverity}
        className={className}
      >
        {children || renderDisplay?.(value)}
      </TextareaFieldEditor>
    );
  }
  
  // Array field (tags)
  if (type === 'array') {
    const items = Array.isArray(value) ? value : [];
    
    return (
      <ArrayFieldEditor
        items={items}
        onChange={(newItems) => updateField(fieldPath, newItems)}
        placeholder={placeholder}
        isChanged={isChanged}
        validationStatus={validationStatus}
        validationMessage={validationMessage}
        validationSeverity={validationSeverity}
        className={className}
      />
    );
  }
  
  // Date field
  if (type === 'date') {
    return (
      <DateFieldEditor
        value={value}
        onChange={(newValue) => updateField(fieldPath, newValue)}
        placeholder={placeholder}
        isChanged={isChanged}
        validationStatus={validationStatus}
        validationMessage={validationMessage}
        validationSeverity={validationSeverity}
        className={className}
      >
        {children || renderDisplay?.(value)}
      </DateFieldEditor>
    );
  }
  
  return <>{children || value}</>;
}
