
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
          <div
            key={company.id}
            className="flex items-center justify-center"
            style={{ width: '128px', height: '128px' }}
          >
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={`${company.name} logo`}
                className="object-contain"
                crossOrigin="anonymous"
                style={{
                  objectFit: 'contain',
                  maxWidth: '128px',
                  maxHeight: '128px',
                  width: 'auto',
                  height: 'auto',
                }}
              />
            ) : (
              <div
                className="flex items-center justify-center bg-muted rounded-lg"
                style={{ width: '128px', height: '128px' }}
              >
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
