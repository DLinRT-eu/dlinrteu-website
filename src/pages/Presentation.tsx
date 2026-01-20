import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Users, Package, BarChart3, Building2, Globe, Presentation as PresentationIcon, Play, MonitorPlay } from "lucide-react";
import { exportToPptx } from "@/utils/pptxExport";
import dataService from "@/services/DataService";
import SEO from "@/components/SEO";
import { toast } from "sonner";

export default function Presentation() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const presentationData = dataService.getPresentationData();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPptx();
      toast.success("Presentation exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export presentation. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleStartDemo = () => {
    navigate("/presentation/demo");
  };

  const slidePreviewData = [
    {
      title: "Welcome",
      description: "DLinRT.eu introduction and platform overview",
      icon: PresentationIcon,
    },
    {
      title: "Platform Analytics",
      description: "Interactive dashboard with real-time statistics",
      icon: BarChart3,
    },
    {
      title: "Product Directory",
      description: `Browse ${presentationData.totalProducts} AI products`,
      icon: Package,
    },
    {
      title: "Auto-Contouring",
      description: "AI-powered organ and target delineation",
      icon: FileText,
    },
    {
      title: "Company Directory",
      description: `${presentationData.totalCompanies} companies developing AI`,
      icon: Building2,
    },
    {
      title: "Product Comparison",
      description: "Side-by-side feature analysis tool",
      icon: Package,
    },
    {
      title: "Product Timeline",
      description: "Historical view of AI product releases",
      icon: BarChart3,
    },
    {
      title: "Resources & Compliance",
      description: "Regulatory guidance and standards",
      icon: Globe,
    },
    {
      title: "Data Security",
      description: "GDPR-compliant platform design",
      icon: FileText,
    },
    {
      title: "Get Involved",
      description: "Community engagement opportunities",
      icon: Users,
    },
  ];

  return (
    <>
      <SEO 
        title="Presentation Center - DLinRT.eu"
        description="Create presentations about DLinRT.eu - download PowerPoint or start an interactive live demo for conferences and meetings."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Presentation Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Create professional presentations about DLinRT.eu for conferences, meetings, 
              and educational sessions. Choose between a downloadable PowerPoint or an 
              interactive live demo mode.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalCompanies}
                </CardTitle>
                <CardDescription>Companies</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalProducts}
                </CardTitle>
                <CardDescription>Products</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.totalCategories}
                </CardTitle>
                <CardDescription>Categories</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">
                  {presentationData.analyticsData.totalViews.toLocaleString()}
                </CardTitle>
                <CardDescription>Total Views</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Download PPTX Card */}
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Download PowerPoint</CardTitle>
                    <CardDescription>Offline presentation file</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export a professionally formatted PowerPoint presentation with all platform 
                  statistics, charts, company logos, and governance information. Perfect for 
                  offline presentations and sharing.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Complete dashboard analytics</li>
                  <li>• Company directory with logos</li>
                  <li>• Product category breakdown</li>
                  <li>• Governance overview</li>
                </ul>
                <Button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full"
                >
                  {isExporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download PPTX
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Live Demo Card */}
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MonitorPlay className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Interactive Live Demo</CardTitle>
                    <CardDescription>Navigate the platform live</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Start an interactive presentation mode that guides you through the platform 
                  with the ability to navigate to live pages. Ideal for conferences, webinars, 
                  and hands-on demonstrations.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Keyboard navigation (arrows, numbers)</li>
                  <li>• "Go Live" button on each slide</li>
                  <li>• Built-in timer for pacing</li>
                  <li>• Full-screen support</li>
                </ul>
                <Button 
                  onClick={handleStartDemo}
                  variant="default"
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Live Demo
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Slide Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Presentation Slides</CardTitle>
              <CardDescription>
                Both formats include these {slidePreviewData.length} slides covering all aspects of DLinRT.eu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {slidePreviewData.map((slide, index) => {
                  const IconComponent = slide.icon;
                  return (
                    <div 
                      key={index}
                      className="flex flex-col items-center p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <Badge variant="secondary" className="mb-2">
                        {index + 1}
                      </Badge>
                      <IconComponent className="h-5 w-5 text-primary mb-2" />
                      <h4 className="text-xs font-medium text-foreground text-center">
                        {slide.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium text-foreground mb-3">Live Demo Keyboard Shortcuts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background rounded border text-xs">←</kbd>
                <kbd className="px-2 py-1 bg-background rounded border text-xs">→</kbd>
                <span className="text-muted-foreground">Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background rounded border text-xs">1-9</kbd>
                <span className="text-muted-foreground">Jump to slide</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background rounded border text-xs">F</kbd>
                <span className="text-muted-foreground">Fullscreen</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-background rounded border text-xs">G</kbd>
                <span className="text-muted-foreground">Go Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
