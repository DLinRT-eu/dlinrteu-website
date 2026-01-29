import React from "react";
import { Filter } from "lucide-react";
import { FilterSelect } from "../filters/FilterSelect";
import { useFilters } from "@/hooks/useFilters";
import { getPipelineFilterOptions } from "@/utils/filterOptions";
import type { FilterBarProps } from "@/types/filters";

const PipelineFilterBar = ({ onFiltersChange, onFilterUpdate }: FilterBarProps) => {
  const { filters, handleFilterChange } = useFilters(onFiltersChange, onFilterUpdate);

  return (
    <div className="flex flex-wrap gap-4 items-start mb-8 p-4 rounded-lg bg-violet-50/50 border border-violet-100">
      <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
        <Filter className="h-5 w-5 text-violet-600" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="w-full">
          <FilterSelect
            placeholder="Select tasks"
            options={getPipelineFilterOptions('category')}
            selectedValues={filters.tasks}
            onValueChange={(value) => handleFilterChange(value, 'tasks')}
          />
        </div>
        
        <div className="w-full">
          <FilterSelect
            placeholder="Select modality"
            options={getPipelineFilterOptions('modality')}
            selectedValues={filters.modalities}
            onValueChange={(value) => handleFilterChange(value, 'modalities')}
          />
        </div>

        <div className="w-full">
          <FilterSelect
            placeholder="Select anatomy"
            options={getPipelineFilterOptions('anatomicalLocation')}
            selectedValues={filters.locations}
            onValueChange={(value) => handleFilterChange(value, 'locations')}
          />
        </div>
      </div>
    </div>
  );
};

export default PipelineFilterBar;
