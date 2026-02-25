import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChartExportButtonProps {
  onExport: () => void;
  className?: string;
}

const ChartExportButton: React.FC<ChartExportButtonProps> = ({ onExport, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 text-muted-foreground hover:text-foreground ${className ?? ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onExport();
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Export as PNG</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChartExportButton;
