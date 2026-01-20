import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePresentationNavigation } from "@/hooks/usePresentationNavigation";
import { DemoNavBar } from "./DemoNavBar";
import { SlideContent } from "./SlideContent";
import dataService from "@/services/DataService";
import {
  Home,
  BarChart3,
  Package,
  Layers,
  Building2,
  GitCompare,
  Calendar,
  BookOpen,
  Users,
  Shield,
} from "lucide-react";

const createSlides = () => {
  const data = dataService.getPresentationData();
  
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
        { label: "Views", value: data.analyticsData.totalViews.toLocaleString() },
      ],
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
      title: "Resources & Compliance",
      subtitle: "Regulatory guidance and standards",
      description: "Essential information for AI implementation",
      keyPoints: [
        "CE MDR classification guidance",
        "FDA 510(k) requirements",
        "AAPM and ESTRO guidelines",
        "Implementation checklists",
      ],
      liveLink: "/resources-compliance",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      id: "security",
      title: "Data Security",
      subtitle: "GDPR-compliant platform design",
      description: "Privacy and security measures",
      keyPoints: [
        "No patient data collection",
        "Transparent data practices",
        "Open-source codebase",
        "Community-driven governance",
      ],
      liveLink: "/privacy-security",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      id: "community",
      title: "Get Involved",
      subtitle: "Join the DLinRT.eu community",
      description: "Contribute to the project",
      keyPoints: [
        "Submit product information",
        "Suggest corrections or updates",
        "Join as a reviewer",
        "Contribute to open-source development",
      ],
      liveLink: "/about",
      icon: <Users className="h-8 w-8" />,
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

  // Listen for fullscreen changes
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
