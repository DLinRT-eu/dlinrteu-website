import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Users, Package, BarChart3, Building2, Globe, Presentation as PresentationIcon, Play, MonitorPlay } from "lucide-react";
import { exportToPptx, getPptxSlidePlan } from "@/utils/pptxExport";
import dataService from "@/services/DataService";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import OffscreenChartRenderer from "@/components/presentation/OffscreenChartRenderer";

export default function Presentation() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [showOffscreenCharts, setShowOffscreenCharts] = useState(false);
  const presentationData = dataService.getPresentationData();

  const handleChartsCaptured = useCallback(async (chartImages: Record<string, string>) => {
    try {
      console.log(`Captured ${Object.keys(chartImages).length} chart images for PPTX`);
      await exportToPptx(chartImages);
      toast.success("Presentation exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export presentation. Please try again.");
    } finally {
      setIsExporting(false);
      setShowOffscreenCharts(false);
    }
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    setShowOffscreenCharts(true);
  };

  const handleStartDemo = () => {
    navigate("/presentation/demo");
  };

  const pptxSlidePlan = getPptxSlidePlan(presentationData);
  const sectionOrder: Array<'Intro' | 'Analytics' | 'Deep Dive' | 'Closing'> = ['Intro', 'Analytics', 'Deep Dive', 'Closing'];
  const sectionIcons: Record<string, typeof FileText> = {
    Intro: FileText,
    Analytics: BarChart3,
    'Deep Dive': Package,
    Closing: Users,
  };
  const slidesBySection = sectionOrder.map(section => ({
    section,
    slides: pptxSlidePlan
      .map((slide, index) => ({ ...slide, number: index + 1 }))
      .filter(s => s.section === section),
  }));

  const liveDemoSlidePreviewData = [
    { title: "Welcome", description: "Platform introduction with stats", icon: PresentationIcon },
    { title: "Mission & Governance", description: "Purpose, principles and direction", icon: Globe },
    { title: "Platform Analytics", description: "Dashboard with top tasks figure", icon: BarChart3 },
    { title: "Product Directory", description: `${presentationData.totalProducts} products with cert stats`, icon: Package },
    { title: "Pipeline", description: "Pre-certification AI products", icon: Package },
    { title: "Auto-Contouring", description: "Organ delineation category", icon: FileText },
    { title: "Company Directory", description: `${presentationData.totalCompanies} companies`, icon: Building2 },
    { title: "Product Comparison", description: "Side-by-side analysis", icon: Package },
    { title: "Product Timeline", description: "Historical releases", icon: BarChart3 },
    { title: "Resources & Security", description: "Regulatory guidance & GDPR", icon: Globe },
    { title: "Evidence & Impact", description: "E/I scoring framework", icon: BarChart3 },
    { title: "News & Get Involved", description: "Updates and community", icon: Users },
  ];

  return (
    <>
      {showOffscreenCharts && (
        <OffscreenChartRenderer onReady={handleChartsCaptured} />
      )}
      <SEO
        title="Presentation Center - DLinRT.eu"
        description="Create presentations about DLinRT.eu - download PowerPoint or start an interactive live demo for conferences and meetings."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
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
                  {presentationData.certificationBreakdown?.length || 0}
                </CardTitle>
                <CardDescription>Certifications</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>ESTRO 2026 Flyers</CardTitle>
                  <CardDescription>Downloadable flyers for the ESTRO 2026 conference</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg border bg-card">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Community Flyer</h4>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    For clinicians & medical physicists — search, compare, and explore independent information on AI tools in radiotherapy.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="/flyers/DLinRT_Community_ESTRO2026.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg border bg-card">
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <h4 className="font-medium text-foreground mb-1">Companies Flyer</h4>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    For industry & manufacturers — claim your products and apply for free, independent verification.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="/flyers/DLinRT_Companies_ESTRO2026.pdf" download>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>PowerPoint Slides ({pptxSlidePlan.length} slides)</CardTitle>
                  <CardDescription>
                    Complete slides with all dashboard charts and analytics — slide numbers below match the exported file
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {slidesBySection.map(({ section, slides }) => {
                if (slides.length === 0) return null;
                const SectionIcon = sectionIcons[section];
                return (
                  <div key={section}>
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <SectionIcon className="h-4 w-4 text-primary" />
                      {section}
                      <span className="text-xs font-normal text-muted-foreground">({slides.length})</span>
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
                      {slides.map(slide => (
                        <div
                          key={slide.number}
                          className="flex flex-col items-center p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          title={slide.description}
                        >
                          <Badge variant="secondary" className="mb-1 text-xs">
                            {slide.number}
                          </Badge>
                          <SectionIcon className="h-4 w-4 text-primary mb-1" />
                          <h4 className="text-[10px] font-medium text-foreground text-center leading-tight">
                            {slide.title}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MonitorPlay className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Live Demo Slides ({liveDemoSlidePreviewData.length} slides)</CardTitle>
                  <CardDescription>
                    Interactive slides with "Go Live" navigation to actual pages
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {liveDemoSlidePreviewData.map((slide, index) => {
                  const IconComponent = slide.icon;
                  return (
                    <div 
                      key={index}
                      className="flex flex-col items-center p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      title={slide.description}
                    >
                      <Badge variant="secondary" className="mb-1 text-xs">
                        {index + 1}
                      </Badge>
                      <IconComponent className="h-4 w-4 text-primary mb-1" />
                      <h4 className="text-[10px] font-medium text-foreground text-center leading-tight">
                        {slide.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

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
