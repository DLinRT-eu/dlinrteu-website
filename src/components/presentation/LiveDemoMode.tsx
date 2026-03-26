import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePresentationNavigation } from "@/hooks/usePresentationNavigation";
import { DemoNavBar } from "./DemoNavBar";
import { SlideContent } from "./SlideContent";
import { DemoFigures } from "./DemoFigures";
import dataService from "@/services/DataService";
import {
  Home, BarChart3, Package, Layers, Building2, GitCompare,
  Calendar, BookOpen, Globe,
  FlaskConical, Newspaper, TrendingUp,
} from "lucide-react";

const createSlides = () => {
  const data = dataService.getPresentationData();

  // Pre-compute some values for figures
  const topTasks = data.taskData?.slice(0, 3) || [];
  const ceCount = data.certificationBreakdown?.find(c => c.name?.includes("CE"))?.count || 0;
  const fdaCount = data.certificationBreakdown?.find(c => c.name?.includes("FDA"))?.count || 0;
  const topCompany = data.companyData?.[0];

  return [
    {
      id: "welcome",
      title: "DLinRT.eu",
      subtitle: "Deep Learning in Radiation Therapy",
      description: "An independent European platform cataloguing AI solutions for radiotherapy",
      keyPoints: [
        "Vendor-neutral product directory",
        "Regulatory compliance information (CE, FDA, TGA)",
        "Clinical task categorization",
        "Open-source community project",
      ],
      liveLink: "/",
      icon: <Home className="h-8 w-8" />,
      stats: [
        { label: "Companies", value: data.totalCompanies.toString() },
        { label: "Products", value: data.totalProducts.toString() },
        { label: "Categories", value: data.totalCategories.toString() },
        { label: "Certifications", value: (data.certificationBreakdown?.length || 0).toString() },
      ],
    },
    {
      id: "mission",
      title: "Mission, Governance & Vision",
      subtitle: "Promoting transparency and evidence-based adoption",
      description: "Our purpose, principles and strategic direction",
      keyPoints: [
        "Comprehensive, curated directory of deep learning solutions",
        "Transparency, independence and quality assurance",
        "Evidence-based information for clinical adoption",
        "Community-driven, open-source development",
      ],
      liveLink: "/about",
      icon: <Globe className="h-8 w-8" />,
    },
    {
      id: "dashboard",
      title: "Platform Analytics",
      subtitle: "Interactive dashboard with real-time statistics",
      description: "Comprehensive analytics on AI adoption in radiotherapy",
      keyPoints: [
        "Task distribution across clinical workflows",
        "Anatomical location coverage analysis",
        "Modality breakdown (CT, MRI, PET, etc.)",
        "Company and product growth trends",
      ],
      liveLink: "/analytics",
      icon: <BarChart3 className="h-8 w-8" />,
      figureComponent: <DemoFigures.TaskBars tasks={topTasks} />,
    },
    {
      id: "products",
      title: "Product Directory",
      subtitle: `Browse ${data.totalProducts} AI-powered radiotherapy solutions`,
      description: "Searchable database of commercial AI products",
      keyPoints: [
        "Filter by task, modality, anatomical location",
        "Detailed product specifications",
        "Regulatory status and certifications",
        "Export data in multiple formats",
      ],
      liveLink: "/products",
      icon: <Package className="h-8 w-8" />,
      highlights: [
        { label: "Total Products", value: data.totalProducts.toString() },
        { label: "CE Marked", value: ceCount.toString() },
        { label: "FDA Cleared", value: fdaCount.toString() },
      ],
    },
    {
      id: "pipeline",
      title: "Product Pipeline",
      subtitle: "Upcoming and pre-certification AI products",
      description: "Track products in development or awaiting regulatory approval",
      keyPoints: [
        "Pre-market AI solutions in development",
        "Expected certification timelines",
        "Early access and beta programs",
        "Research-to-market transition tracking",
      ],
      liveLink: "/products/pipeline",
      icon: <FlaskConical className="h-8 w-8" />,
    },
    {
      id: "auto-contouring",
      title: "Auto-Contouring",
      subtitle: "AI-powered organ and target delineation",
      description: "The largest category of AI solutions in radiotherapy",
      keyPoints: [
        "Automatic organ-at-risk segmentation",
        "Target volume delineation assistance",
        "Multi-organ atlas-based solutions",
        "Deep learning structure prediction",
      ],
      liveLink: "/categories/auto-contouring",
      icon: <Layers className="h-8 w-8" />,
    },
    {
      id: "companies",
      title: "Company Directory",
      subtitle: `${data.totalCompanies} companies developing AI for radiotherapy`,
      description: "Comprehensive listing of AI solution providers",
      keyPoints: [
        "Company profiles and product portfolios",
        "Contact information and websites",
        "Market presence and certifications",
        "Filter by region and specialization",
      ],
      liveLink: "/companies",
      icon: <Building2 className="h-8 w-8" />,
      highlights: [
        { label: "Total Companies", value: data.totalCompanies.toString() },
        ...(topCompany ? [{ label: `Top: ${topCompany.name}`, value: topCompany.value?.toString() || "0" }] : []),
      ],
    },
    {
      id: "compare",
      title: "Product Comparison",
      subtitle: "Side-by-side feature analysis",
      description: "Compare up to 4 products simultaneously",
      keyPoints: [
        "Feature-by-feature comparison",
        "Regulatory status comparison",
        "Technical specifications",
        "Export comparison as PDF or Excel",
      ],
      liveLink: "/compare",
      icon: <GitCompare className="h-8 w-8" />,
    },
    {
      id: "timeline",
      title: "Product Timeline",
      subtitle: "Historical view of AI product releases",
      description: "Track the evolution of AI in radiotherapy",
      keyPoints: [
        "Interactive timeline visualization",
        "Filter by task and modality",
        "Key milestones and trends",
        "Regulatory approval dates",
      ],
      liveLink: "/timeline",
      icon: <Calendar className="h-8 w-8" />,
    },
    {
      id: "resources",
      title: "Resources, Compliance & Security",
      subtitle: "Regulatory guidance, standards and data privacy",
      description: "Essential information for AI implementation and GDPR compliance",
      keyPoints: [
        "CE MDR classification and FDA 510(k) guidance",
        "AAPM and ESTRO guidelines",
        "GDPR-compliant design — no patient data collected",
        "Open-source codebase with transparent data practices",
      ],
      liveLink: "/resources-compliance",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      id: "evidence-impact",
      title: "Evidence & Impact",
      subtitle: "Dual-axis scoring framework for AI products",
      description: "Evaluate clinical evidence and workflow impact",
      keyPoints: [
        "Evidence levels: E0 (no data) → E3 (multi-centre RCTs)",
        "Impact levels: I0 (no workflow change) → I5 (full automation)",
        "Systematic evaluation methodology",
        "Guidance for procurement decisions",
      ],
      liveLink: "/evidence-impact-guide",
      icon: <TrendingUp className="h-8 w-8" />,
      figureComponent: <DemoFigures.EvidenceImpactSummary />,
    },
    {
      id: "news-community",
      title: "News & Get Involved",
      subtitle: "Latest updates and how to contribute",
      description: "Stay informed and join the DLinRT.eu community",
      keyPoints: [
        "Platform feature announcements and regulatory updates",
        "Submit product information or suggest corrections",
        "Join as a reviewer or contributor",
        "Open-source development on GitHub",
      ],
      liveLink: "/news",
      icon: <Newspaper className="h-8 w-8" />,
    },
  ];
};

export function LiveDemoMode() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slides] = useState(createSlides);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleGoToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate("/presentation");
  }, [navigate]);

  const handleGoLive = useCallback(() => {
    const slide = slides[currentSlide];
    window.open(slide.liveLink, "_blank");
  }, [currentSlide, slides]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  usePresentationNavigation({
    currentSlide,
    totalSlides: slides.length,
    onNext: handleNext,
    onPrev: handlePrev,
    onGoToSlide: handleGoToSlide,
    onExit: handleExit,
    onGoLive: handleGoLive,
    onToggleFullscreen: handleToggleFullscreen,
  });

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background">
      <DemoNavBar
        currentSlide={currentSlide}
        totalSlides={slides.length}
        slides={slides}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoToSlide={handleGoToSlide}
        onExit={handleExit}
        onGoLive={handleGoLive}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      <SlideContent slide={currentSlideData} onGoLive={handleGoLive} />

      {/* Slide indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
