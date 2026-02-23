
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanyLogo {
  id: string;
  name: string;
  logoUrl?: string;
}

interface CompanyLogoGridProps {
  companies: CompanyLogo[];
  taskFilter?: string;
}

const CompanyLogoGrid = ({ companies, taskFilter }: CompanyLogoGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleExportImage = async () => {
    if (!gridRef.current) return;
    try {
      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      const suffix = taskFilter && taskFilter !== 'all' ? `-${taskFilter.toLowerCase().replace(/\s+/g, '-')}` : '';
      link.download = `company-logos${suffix}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast({ title: 'Export successful', description: 'Logo grid saved as PNG.' });
    } catch (error) {
      console.error('Export error:', error);
      toast({ title: 'Export failed', description: 'Could not export the logo grid.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button variant="outline" onClick={handleExportImage}>
          <Download className="h-4 w-4 mr-2" />
          Export as Image
        </Button>
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 bg-white"
      >
        {companies.map((company) => (
          <div key={company.id} className="flex items-center justify-center">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={`${company.name} logo`}
                className="w-32 h-32 object-contain"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-muted rounded-lg">
                <span className="text-xs text-muted-foreground text-center px-2">{company.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogoGrid;
