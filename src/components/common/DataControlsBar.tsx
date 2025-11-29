import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, ArrowDownAZ, ArrowDownZA, Download, X } from 'lucide-react';

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  value: string;
  label: string;
}

export interface DataControlsBarProps {
  // Search
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  // Sort
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  sortDirection?: SortDirection;
  onSortDirectionChange?: (direction: SortDirection) => void;
  
  // Filter
  showFilterButton?: boolean;
  onFilterToggle?: () => void;
  activeFilterCount?: number;
  
  // Export
  showExportButton?: boolean;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
  onExportJSON?: () => void;
  
  // Clear
  onClearFilters?: () => void;
}

export function DataControlsBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  sortOptions = [],
  sortValue,
  onSortChange,
  sortDirection = 'asc',
  onSortDirectionChange,
  showFilterButton = false,
  onFilterToggle,
  activeFilterCount = 0,
  showExportButton = false,
  onExportCSV,
  onExportExcel,
  onExportJSON,
  onClearFilters,
}: DataControlsBarProps) {
  const hasActiveFilters = activeFilterCount > 0 || searchValue.length > 0;

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background"
        />
      </div>

      {/* Filter Button */}
      {showFilterButton && onFilterToggle && (
        <Button variant="outline" size="sm" onClick={onFilterToggle} className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      )}

      {/* Sort Controls */}
      {sortOptions.length > 0 && onSortChange && (
        <>
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {onSortDirectionChange && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSortDirectionChange(sortDirection === 'asc' ? 'desc' : 'asc')}
              title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortDirection === 'asc' ? (
                <ArrowDownAZ className="h-4 w-4" />
              ) : (
                <ArrowDownZA className="h-4 w-4" />
              )}
            </Button>
          )}
        </>
      )}

      {/* Export Button */}
      {showExportButton && (onExportCSV || onExportExcel || onExportJSON) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onExportCSV && (
              <DropdownMenuItem onClick={onExportCSV}>
                Export as CSV
              </DropdownMenuItem>
            )}
            {onExportExcel && (
              <DropdownMenuItem onClick={onExportExcel}>
                Export as Excel
              </DropdownMenuItem>
            )}
            {onExportJSON && (
              <DropdownMenuItem onClick={onExportJSON}>
                Export as JSON
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && onClearFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
