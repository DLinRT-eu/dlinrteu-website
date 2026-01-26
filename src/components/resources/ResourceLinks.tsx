import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Database, Shield, Users, Globe, BookOpen, Award, Building, Stethoscope } from 'lucide-react';

const ResourceLinks = () => {
  const resources = [
    // Regulatory Bodies - EU
    {
      title: "European Medical Device Regulation (MDR)",
      description: "Official text of EU Regulation 2017/745 governing medical devices in Europe",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745",
      icon: FileText,
      category: "EU Regulation"
    },
    {
      title: "EU AI Act (Regulation 2024/1689)",
      description: "Comprehensive EU regulation on artificial intelligence systems including medical AI",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      icon: FileText,
      category: "EU Regulation"
    },
    {
      title: "European Database on Medical Devices (EUDAMED)",
      description: "Official EU database for medical device registration and regulatory information",
      url: "https://ec.europa.eu/tools/eudamed/",
      icon: Database,
      category: "EU Database"
    },

    // UK Regulation
    {
      title: "MHRA - Software and AI as Medical Devices",
      description: "UK MHRA guidance on standalone software including AI/ML-based medical devices (UKCA)",
      url: "https://www.gov.uk/guidance/medical-device-standalone-software-including-apps-including-ivdmds",
      icon: Shield,
      category: "UK Regulation"
    },

    // Australia Regulation
    {
      title: "TGA - AI Software as Medical Devices",
      description: "Australian TGA evidence requirements and regulatory pathway for AI-enabled medical devices",
      url: "https://www.tga.gov.au/how-we-regulate/manufacturing-and-quality/manufacturing-premises-and-regulatory-requirements/manufacture-specific-types-medical-devices/software-and-ai-medical-devices",
      icon: Shield,
      category: "Australia Regulation"
    },

    // FDA Resources
    {
      title: "FDA Medical Device Database",
      description: "US FDA database of approved and cleared medical devices including AI/ML software",
      url: "https://www.fda.gov/medical-devices/device-approvals-denials-and-clearances/510k-clearances",
      icon: Shield,
      category: "FDA Resources"
    },
    {
      title: "FDA AI/ML Software as Medical Device Guidance",
      description: "FDA guidance on artificial intelligence and machine learning-based software as medical devices",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices",
      icon: Shield,
      category: "FDA Guidance"
    },
    {
      title: "FDA PCCP Final Guidance (Dec 2024)",
      description: "Predetermined Change Control Plans for AI/ML-enabled device software functions",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence",
      icon: Shield,
      category: "FDA Guidance"
    },
    {
      title: "FDA Transparency for ML Devices (June 2024)",
      description: "Guiding principles for transparency in machine learning-enabled medical devices",
      url: "https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles",
      icon: Shield,
      category: "FDA Guidance"
    },
    {
      title: "Health Canada Medical Device License Database",
      description: "Canadian database of licensed medical devices and regulatory information",
      url: "https://health-products.canada.ca/mdall-limh/index-eng.jsp",
      icon: Globe,
      category: "Health Canada"
    },

    // International Harmonization
    {
      title: "IMDRF Good Machine Learning Practice (GMLP)",
      description: "International harmonized guiding principles for ML in medical device development (N88 Final 2025)",
      url: "https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles",
      icon: Globe,
      category: "International Harmonization"
    },
    {
      title: "IMDRF SaMD Framework",
      description: "Software as a Medical Device risk characterization and clinical evaluation framework",
      url: "https://www.imdrf.org/documents/software-medical-device-samd-application-quality-management-system",
      icon: Globe,
      category: "International Harmonization"
    },
    
    // Professional Organizations
    {
      title: "ESTRO - European Society for Radiotherapy & Oncology",
      description: "Professional guidelines, education, and research in radiotherapy and oncology",
      url: "https://www.estro.org/",
      icon: Users,
      category: "Professional Society"
    },
    {
      title: "AAPM - American Association of Physicists in Medicine",
      description: "Professional organization for medical physicists with AI guidance and resources",
      url: "https://www.aapm.org/",
      icon: Users,
      category: "Professional Society"
    },
    {
      title: "EFOMP - European Federation of Medical Physics",
      description: "European professional organization for medical physics with AI position papers",
      url: "https://www.efomp.org/",
      icon: Users,
      category: "Professional Society"
    },
    {
      title: "IAEA - International Atomic Energy Agency",
      description: "Global guidance on radiation safety and quality assurance in medical applications",
      url: "https://www.iaea.org/topics/radiation-protection-of-patients",
      icon: Globe,
      category: "International Agency"
    },
    {
      title: "ICRU - International Commission on Radiation Units",
      description: "International standards for radiation measurements and clinical applications",
      url: "https://www.icru.org/",
      icon: Award,
      category: "Standards Body"
    },
    
    // Standards Organizations
    {
      title: "IEC 62304 - Medical Device Software Lifecycle",
      description: "International standard for medical device software development and maintenance",
      url: "https://www.iso.org/standard/64686.html",
      icon: FileText,
      category: "Standards"
    },
    {
      title: "ISO 13485 - Medical Device Quality Management",
      description: "International standard for quality management systems in medical device manufacturing",
      url: "https://www.iso.org/standard/59752.html",
      icon: Award,
      category: "Standards"
    },
    {
      title: "ISO/IEC 42001:2023 - AI Management System",
      description: "Framework for establishing AI management systems (supports AI Act compliance)",
      url: "https://www.iso.org/standard/81230.html",
      icon: Award,
      category: "Standards"
    },
    {
      title: "IEC 82304-1 - Health Software Safety",
      description: "General requirements for health software product safety",
      url: "https://www.iso.org/standard/59543.html",
      icon: Award,
      category: "Standards"
    },
    {
      title: "DICOM Standards Committee",
      description: "Digital Imaging and Communications in Medicine standards for medical imaging",
      url: "https://www.dicomstandard.org/",
      icon: Database,
      category: "Technical Standards"
    },
    {
      title: "HL7 FHIR - Healthcare Data Exchange",
      description: "Fast Healthcare Interoperability Resources for health information exchange",
      url: "https://www.hl7.org/fhir/",
      icon: Database,
      category: "Data Standards"
    },
    
    // Research & Innovation
    {
      title: "WHO Ethics and Governance of AI for Health",
      description: "World Health Organization guidance on ethical AI development in healthcare",
      url: "https://www.who.int/publications/i/item/9789240029200",
      icon: BookOpen,
      category: "Ethics Guidelines"
    },
    {
      title: "Horizon Europe - Digital Health Programme",
      description: "EU research and innovation programme funding digital health and AI projects",
      url: "https://ec.europa.eu/info/research-and-innovation/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en",
      icon: Building,
      category: "Research Funding"
    },
    {
      title: "NIH/NCI Cancer Research Data Commons",
      description: "US National Cancer Institute data and research resources for cancer AI development",
      url: "https://datacommons.cancer.gov/",
      icon: Database,
      category: "Research Data"
    },
    {
      title: "European Cancer Patient Coalition",
      description: "Patient advocacy organization promoting access to innovative cancer treatments",
      url: "https://ecpc.org/",
      icon: Stethoscope,
      category: "Patient Advocacy"
    },

    // Quality Assurance
    {
      title: "IAEA Quality Assurance Guidelines",
      description: "Comprehensive quality assurance guidance for radiotherapy equipment and procedures",
      url: "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
      icon: Shield,
      category: "QA Guidelines"
    },
    {
      title: "ESTRO Consensus Guidelines",
      description: "Professional consensus statements on radiotherapy techniques and quality standards",
      url: "https://doi.org/10.1016/j.radonc.2024.110345",
      icon: Users,
      category: "Clinical Guidelines"
    }
  ];

  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <div key={category}>
          <h4 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
            {category}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <resource.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed flex-1">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    asChild 
                    className="w-full group"
                    variant="outline"
                    size="sm"
                  >
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visit resource
                      <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceLinks;