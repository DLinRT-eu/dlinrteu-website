import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GitBranch, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Globe, 
  FileCheck, 
  CheckSquare, 
  FileText, 
  Library,
  AlertTriangle
} from 'lucide-react';

interface IndexItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const indexItems: IndexItem[] = [
  { id: 'classification-taxonomy', label: 'Classification taxonomy', icon: GitBranch },
  { id: 'clinical-tasks', label: 'Clinical tasks glossary', icon: BookOpen },
  { id: 'evidence-levels', label: 'Evidence levels', icon: BarChart3 },
  { id: 'regulatory-overview', label: 'Regulatory overview', icon: Shield },
  { id: 'regulatory-landscape', label: 'Regulatory landscape', icon: Globe },
  { id: 'standards-guidelines', label: 'Standards & guidelines', icon: FileCheck },
  { id: 'compliance-checklist', label: 'Compliance checklist', icon: CheckSquare },
  { id: 'core-documents', label: 'Core documents', icon: FileText },
  { id: 'resources-library', label: 'Resources library', icon: Library },
  { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
];

const PageIndex = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card className="mb-12">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Quick navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {indexItems.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              className="justify-start gap-2 h-auto py-2 px-3 text-left"
              onClick={() => scrollToSection(item.id)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-sm truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageIndex;
