import PptxGenJS from "pptxgenjs";
import dataService from "@/services/DataService";
import { transformTaskData, transformLocationData, transformModalityData, transformStructureData, transformStructureTypeData } from "@/utils/chartDataTransformation";

export interface PresentationData {
  totalCompanies: number;
  totalProducts: number;
  totalCategories: number;
  companyLogos: Array<{ name: string; logo: string }>;
  categoryBreakdown: Array<{ name: string; count: number }>;
  productsByCategory: Array<{
    category: string;
    products: Array<{
      name: string;
      company: string;
      modality: string;
      certification: string;
      companyLogo: string;
    }>;
  }>;
  modalityBreakdown: Array<{ name: string; count: number }>;
  locationBreakdown: Array<{ name: string; count: number }>;
  certificationBreakdown: Array<{ name: string; count: number }>;
  taskData: Array<{ name: string; value: number; fill: string }>;
  companyData: Array<{ name: string; value: number; products: string[] }>;
  structureData: Array<{ name: string; value: number }>;
  structureTypeData: Array<{ 
    productName: string; 
    companyName: string; 
    OARs: number; 
    Targets: number; 
    Elective: number; 
    total: number 
  }>;
  analyticsData: {
    totalProducts: number;
    totalCompanies: number;
    totalCategories: number;
    certificationBreakdown: Array<{ name: string; count: number }>;
    categoryBreakdown: Array<{ name: string; count: number }>;
  };
  contactInfo: {
    email: string;
    githubUrl: string;
    newsletterSignups: number;
    rssSubscribers: number;
  };
  companyLogosByTask?: Array<{
    task: string;
    companies: Array<{ name: string; logo: string }>;
    products?: Array<{
      name: string;
      company: string;
      modality: string;
      ceStatus: string;
      fdaStatus: string;
      productUrl: string;
      anatomy: string;
    }>;
  }>;
}

export class PptxExporter {
  private pptx: PptxGenJS;
  private brandColors = {
    primary: "#1c2937", // hsl(222.2 47.4% 11.2%) converted to hex
    primaryLight: "#3b82f6", // For charts and accents
    secondary: "#64748b", // muted-foreground equivalent
    accent: "#f1f5f9", // secondary background
    text: "#0f172a", // foreground
    background: "#ffffff", // background
    muted: "#f8fafc" // muted background
  };

  // Layout constants for better positioning
  private layout = {
    slideWidth: 13.33,
    slideHeight: 7.5,
    margin: {
      left: 1.0,
      right: 1.0,
      top: 0.5,
      bottom: 0.5
    }
  };

  constructor() {
    this.pptx = new PptxGenJS();
    this.setupPresentationDefaults();
  }

  private getContentWidth(): number {
    return this.layout.slideWidth - this.layout.margin.left - this.layout.margin.right;
  }

  private getContentHeight(): number {
    return this.layout.slideHeight - this.layout.margin.top - this.layout.margin.bottom;
  }

  private async fetchImageAsBase64(url: string): Promise<{ data: string; width: number; height: number } | null> {
    try {
      const fullUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url;
      const response = await fetch(fullUrl);
      if (!response.ok) return null;
      const blob = await response.blob();
      
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const dims = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = reject;
        img.src = dataUrl;
      });

      return { data: dataUrl, width: dims.width, height: dims.height };
    } catch (error) {
      console.warn('Failed to fetch image as base64:', url, error);
      return null;
    }
  }

  private async safeAddImage(slide: any, imageConfig: any): Promise<void> {
    try {
      const imgUrl = imageConfig.path || imageConfig.data;
      if (!imgUrl) return;

      // Validate coordinates are within bounds
      if (imageConfig.x < 0 || imageConfig.y < 0 || 
          imageConfig.x + imageConfig.w > this.layout.slideWidth ||
          imageConfig.y + imageConfig.h > this.layout.slideHeight) {
        console.warn('Image coordinates out of bounds, skipping:', imageConfig);
        return;
      }

      // Convert to base64 if it's a URL/path
      if (imageConfig.path) {
        const imageData = await this.fetchImageAsBase64(imageConfig.path);
        if (!imageData) return;

        // Calculate fitted dimensions preserving aspect ratio
        const targetW = imageConfig.w;
        const targetH = imageConfig.h;
        const imgAspect = imageData.width / imageData.height;
        const boxAspect = targetW / targetH;
        let fitW = targetW;
        let fitH = targetH;
        if (imgAspect > boxAspect) {
          fitH = targetW / imgAspect;
        } else {
          fitW = targetH * imgAspect;
        }

        delete imageConfig.path;
        imageConfig.data = imageData.data;
        imageConfig.w = fitW;
        imageConfig.h = fitH;
        // Center within original bounding box
        imageConfig.x += (targetW - fitW) / 2;
        imageConfig.y += (targetH - fitH) / 2;
        delete imageConfig.sizing;
      }
      
      slide.addImage(imageConfig);
    } catch (error) {
      console.warn('Failed to add image:', error, imageConfig);
    }
  }

  private setupPresentationDefaults() {
    this.pptx.layout = "LAYOUT_WIDE";
    this.pptx.author = "DLinRT.eu";
    this.pptx.company = "DLinRT.eu Initiative";
    this.pptx.subject = "Deep Learning in Radiotherapy Directory Overview";
    this.pptx.title = "DLinRT.eu Platform Overview";
  }

  private async addTitleSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    slide.addText("DLinRT.eu", {
      x: this.layout.margin.left,
      y: 1.5,
      w: contentWidth,
      h: 1.5,
      fontSize: 48,
      color: this.brandColors.primary,
      bold: true,
      align: "center",
      fontFace: "Arial"
    });
    
    slide.addText("Deep Learning in Radiotherapy Directory", {
      x: this.layout.margin.left,
      y: 3.2,
      w: contentWidth,
      h: 1,
      fontSize: 24,
      color: this.brandColors.secondary,
      align: "center",
      fontFace: "Arial"
    });
    
    const logoConfig = {
      path: "/LogoDLinRT.eu.png",
      x: this.layout.margin.left + (contentWidth - 1.5) / 2,
      y: 4.5,
      w: 1.5,
      h: 1.2,
    };
    
    await this.safeAddImage(slide, logoConfig);
  }

  private addMissionVisionSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    const halfWidth = (contentWidth - 0.5) / 2;
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Mission & Vision", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Mission
    slide.addText("Mission", {
      x: this.layout.margin.left,
      y: 1.8,
      w: halfWidth,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Arial"
    });
    
    slide.addText("To create a comprehensive, curated directory of deep learning solutions in radiotherapy, promoting transparency, innovation, and evidence-based adoption.", {
      x: this.layout.margin.left,
      y: 2.5,
      w: halfWidth,
      h: 2.5,
      fontSize: 16,
      color: this.brandColors.text,
      fontFace: "Arial"
    });
    
    // Vision
    slide.addText("Vision", {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 1.8,
      w: halfWidth,
      h: 0.6,
      fontSize: 20,
      color: this.brandColors.text,
      bold: true,
      fontFace: "Arial"
    });
    
    slide.addText("To become the leading global resource for radiotherapy professionals seeking reliable information about AI solutions, fostering collaboration and advancing patient care.", {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 2.5,
      w: halfWidth,
      h: 2.5,
      fontSize: 16,
      color: this.brandColors.text,
      fontFace: "Arial"
    });
  }

  private addOverviewSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Platform Overview", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Stats cards - better positioned and sized
    const cardWidth = 2.8;
    const cardSpacing = 0.4;
    const totalCardsWidth = 3 * cardWidth + 2 * cardSpacing;
    const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
    
    const stats = [
      { label: "Partner Companies", value: data.totalCompanies?.toString() || "0", x: startX },
      { label: "AI Products", value: data.totalProducts?.toString() || "0", x: startX + cardWidth + cardSpacing },
      { label: "Clinical Categories", value: data.totalCategories?.toString() || "0", x: startX + 2 * (cardWidth + cardSpacing) }
    ];
    
    stats.forEach(stat => {
      // Card background
      slide.addShape("roundRect", {
        x: stat.x,
        y: 2.2,
        w: cardWidth,
        h: 2.3,
        fill: { color: this.brandColors.accent },
        line: { color: this.brandColors.secondary, width: 1 }
      });
      
      // Value
      slide.addText(stat.value, {
        x: stat.x,
        y: 2.7,
        w: cardWidth,
        h: 0.8,
        fontSize: 38,
        color: this.brandColors.primary,
        bold: true,
        align: "center",
        fontFace: "Arial"
      });
      
      // Label
      slide.addText(stat.label, {
        x: stat.x,
        y: 3.6,
        w: cardWidth,
        h: 0.6,
        fontSize: 16,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    });
    
    // Brief description
    slide.addText("Comprehensive directory of regulatory-approved deep learning solutions in radiotherapy", {
      x: this.layout.margin.left,
      y: 5.2,
      w: contentWidth,
      h: 1,
      fontSize: 16,
      color: this.brandColors.text,
      align: "center",
      fontFace: "Arial"
    });
  }

  private async addCompanyLogosSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Our Partner Companies", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const validLogos = data.companyLogos?.filter(company => 
      company && company.name && company.logo
    ).slice(0, 32) || [];
    
    if (validLogos.length === 0) {
      slide.addText("No company logos available", {
        x: this.layout.margin.left,
        y: 3,
        w: contentWidth,
        h: 1,
        fontSize: 18,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
      return;
    }
    
    const totalLogos = validLogos.length;
    const cols = Math.min(8, Math.ceil(Math.sqrt(totalLogos * 1.2)));
    const rows = Math.ceil(totalLogos / cols);
    const availableHeight = 5.8;
    const logoMaxWidth = Math.min(1.2, contentWidth / cols);
    const logoMaxHeight = Math.min(0.8, availableHeight / (rows * 1.4));
    const startX = this.layout.margin.left + (contentWidth - (cols * logoMaxWidth)) / 2;
    const startY = 1.6;

    for (let index = 0; index < validLogos.length; index++) {
      const company = validLogos[index];
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + (col * logoMaxWidth);
      const y = startY + (row * (logoMaxHeight * 1.4));
      
      if (company.logo) {
        await this.safeAddImage(slide, {
          path: company.logo,
          x,
          y,
          w: logoMaxWidth * 0.8,
          h: logoMaxHeight * 0.8,
        });
      }
      
      slide.addText(company.name, {
        x: x - logoMaxWidth * 0.1,
        y: y + logoMaxHeight * 0.85,
        w: logoMaxWidth,
        h: logoMaxHeight * 0.4,
        fontSize: Math.max(8, Math.min(10, logoMaxHeight * 15)),
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    }
  }

  private addCategoryBreakdownSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    const halfWidth = (contentWidth - 0.5) / 2;
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("AI Solution Categories in Radiotherapy", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Validate chart data
    const validCategoryData = data.categoryBreakdown?.filter(item => 
      item && item.name && typeof item.count === 'number' && item.count > 0
    ) || [];
    
    if (validCategoryData.length === 0) {
      slide.addText("No category data available", {
        x: this.layout.margin.left,
        y: 3,
        w: contentWidth,
        h: 1,
        fontSize: 18,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
      return;
    }
    
    // Create chart data with proper validation
    const chartData = validCategoryData.map(item => ({
      name: item.name,
      labels: [item.name],
      values: [item.count]
    }));
    
    try {
      // Add chart - better positioned
      slide.addChart("pie", chartData, {
        x: this.layout.margin.left,
        y: 1.8,
        w: halfWidth,
        h: 4.5,
        showTitle: false,
        showLegend: true,
        legendPos: "r",
        chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]
      });
    } catch (error) {
      console.warn('Failed to add chart:', error);
    }
    
    // Add table with details - better positioned
    const totalProducts = data.totalProducts || validCategoryData.reduce((sum, item) => sum + item.count, 0);
    const tableData = [
      [
        { text: "Category", options: { bold: true, fontSize: 14 } },
        { text: "Products", options: { bold: true, fontSize: 14 } },
        { text: "Share", options: { bold: true, fontSize: 14 } }
      ],
      ...validCategoryData.map(item => [
        { text: item.name, options: { fontSize: 12 } },
        { text: item.count.toString(), options: { fontSize: 12 } },
        { text: `${Math.round((item.count / totalProducts) * 100)}%`, options: { fontSize: 12 } }
      ])
    ];
    
    slide.addTable(tableData, {
      x: this.layout.margin.left + halfWidth + 0.5,
      y: 1.8,
      w: halfWidth,
      h: 4.5,
      fontSize: 12,
      fontFace: "Arial",
      border: { pt: 1, color: this.brandColors.secondary }
    });
  }

  private addGovernanceSlide() {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Governance & Values", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Core Values
    const values = [
      "Transparency: Open access to validated information",
      "Quality: Rigorous review and validation processes",
      "Community: Collaborative platform for knowledge sharing",
      "Innovation: Supporting advancement in radiotherapy AI",
      "Evidence: Focus on clinically validated solutions"
    ];
    
    values.forEach((value, index) => {
      slide.addText(`• ${value}`, {
        x: this.layout.margin.left,
        y: 2 + (index * 0.9),
        w: contentWidth,
        h: 0.8,
        fontSize: 18,
        color: this.brandColors.text,
        fontFace: "Arial"
      });
    });
  }

  private async addProductGridSlides(data: PresentationData) {
    if (!data.productsByCategory || data.productsByCategory.length === 0) {
      return;
    }

    for (const categoryData of data.productsByCategory) {
      if (!categoryData || !categoryData.products || categoryData.products.length === 0) {
        continue;
      }

      const slide = this.pptx.addSlide();
      const contentWidth = this.getContentWidth();
      
      slide.background = { color: this.brandColors.background };
      
      slide.addText(`${categoryData.category} Solutions`, {
        x: this.layout.margin.left,
        y: this.layout.margin.top,
        w: contentWidth,
        h: 1,
        fontSize: 28,
        color: this.brandColors.primary,
        bold: true,
        fontFace: "Arial"
      });
      
      const cols = 4;
      const cardWidth = 2.6;
      const cardHeight = 1.6;
      const cardSpacing = 0.2;
      const totalCardsWidth = cols * cardWidth + (cols - 1) * cardSpacing;
      const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
      const startY = 1.7;
      const spacingX = cardWidth + cardSpacing;
      const spacingY = 2.1;
      
      const validProducts = categoryData.products.filter(p => p && p.name).slice(0, 12);
      
      for (let index = 0; index < validProducts.length; index++) {
        const product = validProducts[index];
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = startX + (col * spacingX);
        const y = startY + (row * spacingY);
        
        slide.addShape("roundRect", {
          x, y, w: cardWidth, h: cardHeight,
          fill: { color: this.brandColors.accent },
          line: { color: this.brandColors.secondary, width: 1 }
        });
        
        if (product.companyLogo) {
          await this.safeAddImage(slide, {
            path: product.companyLogo,
            x: x + 0.1, y: y + 0.1,
            w: 0.3, h: 0.2,
          });
        }
        
        slide.addText(product.name || "Unknown Product", {
          x: x + 0.1, y: y + 0.5, w: cardWidth - 0.2, h: 0.4,
          fontSize: 11, color: this.brandColors.text, bold: true, fontFace: "Arial"
        });
        
        slide.addText(product.company || "Unknown Company", {
          x: x + 0.1, y: y + 0.9, w: cardWidth - 0.2, h: 0.3,
          fontSize: 9, color: this.brandColors.secondary, fontFace: "Arial"
        });
        
        if (product.certification) {
          slide.addText(product.certification, {
            x: x + 0.1, y: y + 1.2, w: cardWidth - 0.2, h: 0.2,
            fontSize: 8, color: this.brandColors.primary, fontFace: "Arial"
          });
        }
      }
    }
  }

  private addAnalyticsOverviewSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    
    slide.background = { color: this.brandColors.background };
    
    // Title
    slide.addText("Platform Content Summary", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    // Stats cards - real content metrics
    const cardWidth = 2.8;
    const cardSpacing = 0.4;
    const totalCardsWidth = 3 * cardWidth + 2 * cardSpacing;
    const startX = this.layout.margin.left + (contentWidth - totalCardsWidth) / 2;
    
    const stats = [
      { label: "AI Products", value: (data.analyticsData.totalProducts || data.totalProducts)?.toString() || "0", x: startX },
      { label: "Companies", value: (data.analyticsData.totalCompanies || data.totalCompanies)?.toString() || "0", x: startX + cardWidth + cardSpacing },
      { label: "Clinical Categories", value: (data.analyticsData.totalCategories || data.totalCategories)?.toString() || "0", x: startX + 2 * (cardWidth + cardSpacing) }
    ];
    
    stats.forEach(stat => {
      slide.addShape("roundRect", {
        x: stat.x,
        y: 1.8,
        w: cardWidth,
        h: 1.8,
        fill: { color: this.brandColors.accent },
        line: { color: this.brandColors.secondary, width: 1 }
      });
      
      slide.addText(stat.value, {
        x: stat.x,
        y: 2.1,
        w: cardWidth,
        h: 0.7,
        fontSize: 24,
        color: this.brandColors.primary,
        bold: true,
        align: "center",
        fontFace: "Arial"
      });
      
      slide.addText(stat.label, {
        x: stat.x,
        y: 2.8,
        w: cardWidth,
        h: 0.5,
        fontSize: 12,
        color: this.brandColors.secondary,
        align: "center",
        fontFace: "Arial"
      });
    });
    
    // Products by Category table (real data)
    const validCategories = (data.analyticsData.categoryBreakdown || data.categoryBreakdown || []).slice(0, 8);
    if (validCategories.length > 0) {
      const tableData = [
        [
          { text: "Category", options: { bold: true, fontSize: 14 } },
          { text: "Products", options: { bold: true, fontSize: 14 } },
          { text: "Share", options: { bold: true, fontSize: 14 } }
        ],
        ...validCategories.map(item => [
          { text: item.name || "Unknown", options: { fontSize: 12 } },
          { text: item.count.toString(), options: { fontSize: 12 } },
          { text: `${Math.round((item.count / (data.totalProducts || 1)) * 100)}%`, options: { fontSize: 12 } }
        ])
      ];
      
      slide.addTable(tableData, {
        x: this.layout.margin.left,
        y: 4,
        w: contentWidth * 0.5,
        h: 2.8,
        fontSize: 12,
        fontFace: "Arial",
        border: { pt: 1, color: this.brandColors.secondary }
      });
    }
    
    // Certification breakdown chart (real data)
    const validCerts = (data.analyticsData.certificationBreakdown || data.certificationBreakdown || []).filter(c => c.count > 0);
    if (validCerts.length > 0) {
      const chartData = [{
        name: "Certifications",
        labels: validCerts.map(c => c.name),
        values: validCerts.map(c => c.count)
      }];
      
      try {
        slide.addChart("pie", chartData, {
          x: this.layout.margin.left + contentWidth * 0.55,
          y: 4,
          w: contentWidth * 0.45,
          h: 2.8,
          showTitle: false,
          showLegend: true,
          legendPos: "b",
          chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B", "#10B981", "#EF4444"]
        });
      } catch (error) {
        console.warn('Failed to add certification chart:', error);
      }
    }
  }

  // Dashboard chart slides
  private addTaskDistributionSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Task Distribution Analysis", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const chartData = [{
      name: "Products by Task",
      labels: data.taskData.map(item => item.name),
      values: data.taskData.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: false,
      showValue: true,
      chartColors: data.taskData.map(item => item.fill)
    });
  }

  private addCompanyDistributionSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Company Distribution Analysis", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const topCompanies = data.companyData.slice(0, 15);
    const chartData = [{
      name: "Products by Company",
      labels: topCompanies.map(item => item.name),
      values: topCompanies.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: false,
      showValue: true,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addLocationAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Anatomical Location Coverage", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const topLocations = data.locationBreakdown.slice(0, 12);
    const chartData = [{
      name: "Products by Location",
      labels: topLocations.map(item => item.name),
      values: topLocations.map(item => item.count)
    }];
    
    slide.addChart("pie", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: true,
      legendPos: "r",
      chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#A855F7", "#EAB308"]
    });
  }

  private addModalityAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Imaging Modality Coverage", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const chartData = [{
      name: "Products by Modality",
      labels: data.modalityBreakdown.map(item => item.name),
      values: data.modalityBreakdown.map(item => item.count)
    }];
    
    slide.addChart("bar", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: false,
      showValue: true,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addStructureAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Auto-Contouring: Supported Structures", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const topStructures = data.structureData.slice(0, 15);
    const chartData = [{
      name: "Structures Supported",
      labels: topStructures.map(item => item.name),
      values: topStructures.map(item => item.value)
    }];
    
    slide.addChart("bar", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: false,
      showValue: true,
      chartColors: [this.brandColors.primaryLight]
    });
  }

  private addStructureTypeAnalysisSlide(data: PresentationData) {
    const slide = this.pptx.addSlide();
    const contentWidth = this.getContentWidth();
    slide.background = { color: this.brandColors.background };
    
    slide.addText("Auto-Contouring: Structure Type Distribution", {
      x: this.layout.margin.left,
      y: this.layout.margin.top,
      w: contentWidth,
      h: 1,
      fontSize: 32,
      color: this.brandColors.primary,
      bold: true,
      fontFace: "Arial"
    });
    
    const totalOARs = data.structureTypeData.reduce((sum, item) => sum + item.OARs, 0);
    const totalTargets = data.structureTypeData.reduce((sum, item) => sum + item.Targets, 0);
    const totalElective = data.structureTypeData.reduce((sum, item) => sum + item.Elective, 0);
    
    const chartData = [{
      name: "Structure Types",
      labels: ["OARs", "Targets", "Elective"],
      values: [totalOARs, totalTargets, totalElective]
    }];
    
    slide.addChart("pie", chartData, {
      x: this.layout.margin.left,
      y: 1.6,
      w: contentWidth,
      h: 5.2,
      showTitle: false,
      showLegend: true,
      legendPos: "r",
      chartColors: [this.brandColors.primaryLight, this.brandColors.secondary, "#F59E0B"]
     });
   }

   private addContactEngagementSlide(data: PresentationData) {
     const slide = this.pptx.addSlide();
     const contentWidth = this.getContentWidth();
     const halfWidth = (contentWidth - 0.5) / 2;
     slide.background = { color: this.brandColors.background };
    
     slide.addText("Get Involved & Stay Connected", {
       x: this.layout.margin.left,
       y: this.layout.margin.top,
       w: contentWidth,
       h: 1,
       fontSize: 32,
       color: this.brandColors.primary,
       bold: true,
       fontFace: "Arial"
     });
     
     // Newsletter section
     slide.addText("📧 Newsletter", {
       x: this.layout.margin.left,
       y: 1.9,
       w: halfWidth,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Arial"
     });
     
     slide.addText(`${data.contactInfo.newsletterSignups} subscribers\nStay updated with latest AI solutions and research`, {
       x: this.layout.margin.left,
       y: 2.6,
       w: halfWidth,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Arial"
     });
     
     // GitHub section
     slide.addText("💻 Contribute", {
       x: this.layout.margin.left + halfWidth + 0.5,
       y: 1.9,
       w: halfWidth,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Arial"
     });
     
     slide.addText(`GitHub: ${data.contactInfo.githubUrl}\nHelp improve our open-source platform`, {
       x: this.layout.margin.left + halfWidth + 0.5,
       y: 2.6,
       w: halfWidth,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Arial"
     });
     
     // Contact section
     slide.addText("📬 Contact Us", {
       x: this.layout.margin.left,
       y: 4.2,
       w: halfWidth,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Arial"
     });
     
     slide.addText(`Email: ${data.contactInfo.email}\nFor partnerships, questions, or suggestions`, {
       x: this.layout.margin.left,
       y: 4.9,
       w: halfWidth,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Arial"
     });
     
     // Review process
     slide.addText("📝 Review Process", {
       x: this.layout.margin.left + halfWidth + 0.5,
       y: 4.2,
       w: halfWidth,
       h: 0.6,
       fontSize: 20,
       color: this.brandColors.text,
       bold: true,
       fontFace: "Arial"
     });
     
     slide.addText("Help validate AI solutions through our\npeer-review process and quality assurance", {
       x: this.layout.margin.left + halfWidth + 0.5,
       y: 4.9,
       w: halfWidth,
       h: 1.2,
       fontSize: 14,
       color: this.brandColors.secondary,
       fontFace: "Arial"
     });
  }

  private addTaskProductTableSlides(group: { task: string; products?: Array<{ name: string; company: string; modality: string; ceStatus: string; fdaStatus: string; productUrl: string; anatomy: string }> }) {
    const products = group.products || [];
    if (products.length === 0) return;

    const contentWidth = this.getContentWidth();
    const rowsPerSlide = 12;
    const pages = Math.ceil(products.length / rowsPerSlide);

    for (let page = 0; page < pages; page++) {
      const slide = this.pptx.addSlide();
      slide.background = { color: this.brandColors.background };

      const pageLabel = pages > 1 ? ` (${page + 1}/${pages})` : '';
      slide.addText(`${group.task} — Products Overview${pageLabel}`, {
        x: this.layout.margin.left,
        y: this.layout.margin.top,
        w: contentWidth,
        h: 0.7,
        fontSize: 22,
        color: this.brandColors.primary,
        bold: true,
        fontFace: "Arial"
      });

      const pageProducts = products.slice(page * rowsPerSlide, (page + 1) * rowsPerSlide);

      const headerRow = [
        { text: "Product", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "Company", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "Modality", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "CE", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "FDA", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "Anatomy", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
        { text: "Link", options: { bold: true, fontSize: 9, fill: { color: this.brandColors.primary }, color: "FFFFFF", fontFace: "Arial" } },
      ];

      const dataRows = pageProducts.map((p, i) => {
        const rowFill = i % 2 === 0 ? this.brandColors.muted : this.brandColors.background;
        const baseOpts = { fontSize: 8, fontFace: "Arial" as const, fill: { color: rowFill } };
        return [
          { text: p.name, options: { ...baseOpts, bold: true } },
          { text: p.company, options: baseOpts },
          { text: p.modality, options: baseOpts },
          { text: p.ceStatus, options: baseOpts },
          { text: p.fdaStatus, options: baseOpts },
          { text: p.anatomy, options: baseOpts },
          p.productUrl
            ? { text: "🔗", options: { ...baseOpts, hyperlink: { url: p.productUrl } } }
            : { text: "", options: baseOpts },
        ];
      });

      slide.addTable([headerRow, ...dataRows], {
        x: this.layout.margin.left,
        y: 1.3,
        w: contentWidth,
        colW: [contentWidth * 0.2, contentWidth * 0.15, contentWidth * 0.12, contentWidth * 0.1, contentWidth * 0.1, contentWidth * 0.23, contentWidth * 0.1],
        fontSize: 8,
        fontFace: "Arial",
        border: { pt: 0.5, color: this.brandColors.secondary },
        autoPage: false,
      });
    }
  }

  private async addCompanyLogosByTaskSlides(data: PresentationData) {
    if (!data.companyLogosByTask?.length) return;

    const contentWidth = this.getContentWidth();

    for (const group of data.companyLogosByTask) {
      // Logo slide
      const slide = this.pptx.addSlide();
      slide.background = { color: this.brandColors.background };

      slide.addText(`${group.task} Companies`, {
        x: this.layout.margin.left,
        y: this.layout.margin.top,
        w: contentWidth,
        h: 1,
        fontSize: 28,
        color: this.brandColors.primary,
        bold: true,
        fontFace: "Arial"
      });

      const validLogos = group.companies.filter(c => c.logo).slice(0, 32);
      if (validLogos.length > 0) {
        const cols = Math.min(8, Math.ceil(Math.sqrt(validLogos.length * 1.2)));
        const rows = Math.ceil(validLogos.length / cols);
        const availableHeight = 5.8;
        const logoMaxWidth = Math.min(1.2, contentWidth / cols);
        const logoMaxHeight = Math.min(0.8, availableHeight / (rows * 1.4));
        const startX = this.layout.margin.left + (contentWidth - (cols * logoMaxWidth)) / 2;
        const startY = 1.6;

        for (let index = 0; index < validLogos.length; index++) {
          const company = validLogos[index];
          const row = Math.floor(index / cols);
          const col = index % cols;
          const x = startX + col * logoMaxWidth;
          const y = startY + row * (logoMaxHeight * 1.4);

          await this.safeAddImage(slide, {
            path: company.logo,
            x, y,
            w: logoMaxWidth * 0.8,
            h: logoMaxHeight * 0.8,
          });
        }
      }

      // Product table slide(s) right after the logo slide
      this.addTaskProductTableSlides(group);
    }
  }

  public async generatePresentation(data: PresentationData): Promise<void> {
    try {
      if (!data) {
        throw new Error('No presentation data provided');
      }

      // Section 1: Introduction (async for image loading)
      await this.addTitleSlide();
      this.addMissionVisionSlide();
      this.addOverviewSlide(data);
      await this.addCompanyLogosSlide(data);
      await this.addCompanyLogosByTaskSlides(data);
      
      // Section 2: Analytics & Charts
      this.addCategoryBreakdownSlide(data);
      this.addTaskDistributionSlide(data);
      this.addCompanyDistributionSlide(data);
      this.addLocationAnalysisSlide(data);
      this.addModalityAnalysisSlide(data);
      this.addStructureAnalysisSlide(data);
      this.addStructureTypeAnalysisSlide(data);
      
      // Section 3: Products (async for image loading)
      await this.addProductGridSlides(data);
      
      // Section 4: Engagement & Closing
      this.addAnalyticsOverviewSlide(data);
      this.addContactEngagementSlide(data);
      this.addGovernanceSlide();

      await this.pptx.writeFile({ fileName: `DLinRT-Overview-${new Date().toISOString().split('T')[0]}.pptx` });
      
    } catch (error) {
      console.error('Error generating presentation:', error);
      throw new Error(`Failed to generate presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const exportToPptx = async (): Promise<void> => {
  try {
    const data = await dataService.getPresentationData();
    
    if (!data) {
      throw new Error('Failed to fetch presentation data');
    }
    
    const exporter = new PptxExporter();
    await exporter.generatePresentation(data);
    
  } catch (error) {
    console.error('PPTX Export Error:', error);
    throw new Error(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};