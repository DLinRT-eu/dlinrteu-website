import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ValidationStatus, ValidationSeverity } from '@/hooks/useProductValidation';

interface ValidationIndicatorProps {
  status: ValidationStatus;
  severity?: ValidationSeverity;
  message?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  valid: {
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    label: 'Valid'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    label: 'Warning'
  },
  error: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    label: 'Error'
  }
};

const sizeConfig = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
};

export function ValidationIndicator({
  status,
  severity,
  message,
  showLabel = false,
  size = 'sm',
  className
}: ValidationIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const indicator = (
    <div className={cn(
      'inline-flex items-center gap-1',
      className
    )}>
      <Icon className={cn(sizeConfig[size], config.color)} />
      {showLabel && (
        <span className={cn('text-xs font-medium', config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );

  if (!message) {
    return indicator;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {indicator}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{message}</p>
          {severity && (
            <p className="text-xs text-muted-foreground mt-1">
              Severity: {severity}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ValidationSummaryProps {
  errorCount: number;
  warningCount: number;
  validCount: number;
  totalChecks: number;
  compact?: boolean;
  className?: string;
}

export function ValidationSummary({
  errorCount,
  warningCount,
  validCount,
  totalChecks,
  compact = false,
  className
}: ValidationSummaryProps) {
  const isAllValid = errorCount === 0 && warningCount === 0;
  
  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {errorCount > 0 && (
          <div className="flex items-center gap-1">
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">{errorCount}</span>
          </div>
        )}
        {warningCount > 0 && (
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{warningCount}</span>
          </div>
        )}
        {isAllValid && (
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">All valid</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-lg border p-3',
      isAllValid 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : errorCount > 0 
          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAllValid ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : errorCount > 0 ? (
            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          )}
          <span className="font-medium text-sm">
            {isAllValid 
              ? 'All validation checks passed'
              : errorCount > 0 
                ? `${errorCount} error${errorCount > 1 ? 's' : ''} found`
                : `${warningCount} warning${warningCount > 1 ? 's' : ''}`
            }
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          {validCount}/{totalChecks} checks passed
        </div>
      </div>
    </div>
  );
}
