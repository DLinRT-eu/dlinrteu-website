import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Database, Shield, Users, Globe, BookOpen, Award, Building, Stethoscope } from 'lucide-react';
import VerifiedBadge from '@/components/resources/VerifiedBadge';
import { RESOURCES_LAST_AUDIT, type VerificationMeta } from '@/data/resources/verification';

interface ResourceEntry extends Partial<VerificationMeta> {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const ResourceLinks = () => {
  const resources: ResourceEntry[] = [

    // Regulatory Bodies - EU
    {
      title: "European Medical Device Regulation (MDR)",
      description: "Official text of EU Regulation 2017/745 governing medical devices in Europe",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745",
      icon: FileText,
      category: "EU Regulation",
      version: "Regulation (EU) 2017/745 — consolidated text",
      status: "in-force"
    },
    {
      title: "MDR/IVDR Simplification Proposal — procedure 2025/0404(COD)",
      description: "EUR-Lex procedure file for COM(2025) 1023 (16 Dec 2025), amending MDR, IVDR, Reg. 2022/123 and the AI Act Annex I list — ongoing, first reading",
      url: "https://eur-lex.europa.eu/procedure/EN/2025_404",
      icon: FileText,
      category: "EU Regulation",
      version: "2025/0404(COD) — first reading",
      status: "proposal",
      note: "MDR 2017/745 and IVDR 2017/746 continue to apply unchanged."
    },
    {
      title: "Proposal to simplify medical device rules (Commission)",
      description: "Commission publication page with the full text and annexes of the MDR/IVDR simplification proposal",
      url: "https://health.ec.europa.eu/publications/proposal-regulation-simplify-rules-medical-and-vitro-diagnostic-devices_en",
      icon: FileText,
      category: "EU Regulation",
      version: "COM(2025) 1023 final, 16 Dec 2025",
      status: "proposal"
    },
    {
      title: "EPRS briefing PE 785.663 — Medical devices: Simplifying the rules",
      description: "European Parliament Research Service briefing (March 2026) tracking the legislative progress of 2025/0404(COD)",
      url: "https://www.europarl.europa.eu/RegData/etudes/BRIE/2026/785663/EPRS_BRI(2026)785663_EN.pdf",
      icon: BookOpen,
      category: "EU Regulation",
      version: "PE 785.663 (March 2026)",
      status: "guidance"
    },


    {
      title: "EU AI Act (Regulation 2024/1689)",
      description: "Comprehensive EU regulation on artificial intelligence systems including medical AI",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      icon: FileText,
      category: "EU Regulation",
      version: "Regulation (EU) 2024/1689, as amended by the AI Omnibus COM(2025) 836",
      status: "in-force",
      note: "Enforcement from 2 Aug 2026; Annex I high-risk obligations from 2 Aug 2028."
    },
    {
      title: "Enforcement of the AI Act",
      description: "Commission page on who enforces what from 2 August 2026 (AI Office, national competent authorities, EDPS), plus complaint and whistleblower tools",
      url: "https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act",
      icon: Shield,
      category: "EU Regulation",
      version: "Commission policy page (July 2026)",
      status: "guidance"
    },
    {
      title: "Guidelines on Transparency of AI-generated Content (Art. 50)",
      description: "Commission guidelines on the transparency obligations applying from 2 August 2026: AI-interaction disclosure, deepfake labelling and machine-readable marking",
      url: "https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content",
      icon: FileText,
      category: "EU Regulation",
      version: "Article 50 guidelines (July 2026)",
      status: "guidance"
    },
    {
      title: "Code of Practice on Transparency of AI-Generated Content",
      description: "Voluntary code operationalising Article 50, signed by 180+ organisations as of July 2026",
      url: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
      icon: BookOpen,
      category: "EU Regulation",
      version: "Voluntary code (July 2026)",
      status: "guidance"
    },
    {
      title: "AI Act Service Desk (FAQ)",
      description: "Official helpdesk and FAQ for interpreting AI Act obligations",
      url: "https://ai-act-service-desk.ec.europa.eu/en/faq",
      icon: Users,
      category: "EU Regulation",
      version: "Living FAQ — continuously updated",
      status: "guidance"
    },
    {
      title: "Press release IP/26/1714 — enforcement starts 2 August 2026",
      description: "Commission announcement that AI Act enforcement and the new transparency requirements start on 2 August 2026 (30 July 2026)",
      url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1714",
      icon: Globe,
      category: "EU Regulation",
      version: "IP/26/1714, 30 July 2026",
      status: "in-force"
    },


    {
      title: "European Database on Medical Devices (EUDAMED)",
      description: "Official EU database for medical device registration and regulatory information",
      url: "https://ec.europa.eu/tools/eudamed/",
      icon: Database,
      category: "EU Database"
    },

    // EU HTA
    {
      title: "EU Health Technology Assessment — Overview",
      description: "European Commission overview of the HTA framework, JCA and JSC procedures, scope and timelines",
      url: "https://health.ec.europa.eu/health-technology-assessment/overview_en",
      icon: Award,
      category: "EU HTA"
    },
    {
      title: "Regulation (EU) 2021/2282 on HTA",
      description: "Official text establishing Joint Clinical Assessments and Joint Scientific Consultations at EU level",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2282",
      icon: FileText,
      category: "EU HTA"
    },
    {
      title: "EUnetHTA 21 — Methodological deliverables",
      description: "PICO framework, evidence submission templates and methodological guidance for joint assessments",
      url: "https://www.eunethta.eu/jointhtawork/",
      icon: BookOpen,
      category: "EU HTA"
    },
    {
      title: "Member State Coordination Group on HTA",
      description: "Governance body coordinating JCAs/JSCs and adopting methodological and procedural guidance under HTAR",
      url: "https://health.ec.europa.eu/health-technology-assessment/implementation-regulation-health-technology-assessment/member-state-coordination-group-hta-htacg_en",
      icon: Users,
      category: "EU HTA"
    },

    // UK Regulation
    {
      title: "MHRA - Software and AI as a Medical Device",
      description: "UK MHRA publication hub on software and AI as a medical device, including UKCA expectations and the Change Programme",
      url: "https://www.gov.uk/government/publications/software-and-artificial-intelligence-ai-as-a-medical-device",
      icon: Shield,
      category: "UK Regulation",
      version: "MHRA publication hub",
      status: "guidance",
      note: "Replaces the retired gov.uk standalone-software guidance URL (404)."
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
      title: "FDA AI-Enabled Medical Devices",
      description: "FDA hub for AI-enabled medical devices, including the authorised device list and current guidance",
      url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices",
      icon: Shield,
      category: "FDA Guidance",
      version: "FDA CDRH resource page",
      status: "guidance",
      note: "Replaces an earlier FDA guidance URL that now returns 404."
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

    // AI/ML Guidelines (NEW CATEGORY)
    {
      title: "AAPM TG-273: AI/ML Best Practices in CAD",
      description: "AAPM task group report on best practices for AI and machine learning in computer-aided diagnosis (2023)",
      url: "https://doi.org/10.1002/mp.16188",
      icon: BookOpen,
      category: "AI/ML Guidelines"
    },
    {
      title: "AAPM TG-211: Auto-Segmentation for PET",
      description: "Task group report on automated segmentation methods for PET imaging applications (2017)",
      url: "https://doi.org/10.1002/mp.12078",
      icon: BookOpen,
      category: "AI/ML Guidelines"
    },
    {
      title: "EU AI Act High-Risk AI Requirements",
      description: "Detailed requirements for high-risk AI systems under the EU AI Act including medical devices",
      url: "https://artificialintelligenceact.eu/article/6/",
      icon: Shield,
      category: "AI/ML Guidelines"
    },
    {
      title: "Stanford AI Index Report 2025",
      description: "8th annual report from Stanford HAI tracking AI trends, policy, governance, and societal impact worldwide",
      url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
      icon: BookOpen,
      category: "AI/ML Guidelines"
    },
    {
      title: "The 2025 AI Agent Index (MIT)",
      description: "MIT benchmark documenting technical capabilities and safety features of 30 deployed agentic AI systems",
      url: "https://aiagentindex.mit.edu/",
      icon: BookOpen,
      category: "AI/ML Guidelines"
    },
    {
      title: "International AI Safety Report 2025",
      description: "Multi-government commissioned report (Bengio et al.) on risks and safeguards for general-purpose AI",
      url: "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025",
      icon: Shield,
      category: "AI/ML Guidelines"
    },
    {
      title: "AID-RT: Standardised AI Documentation in Radiotherapy",
      description: "Domain-specific model card standard for AI in radiotherapy (Phys. Imaging Radiat. Oncol. 2026). Defines a structured 6-section schema covering model info, architecture, training and evaluation data methodology",
      url: "https://doi.org/10.1016/j.phro.2026.100940",
      icon: BookOpen,
      category: "AI/ML Guidelines"
    },
    {
      title: "AID-RT Model Card Writing Tool",
      description: "Interactive Streamlit app for creating standardised AI model cards following the AID-RT schema. Export model cards in JSON format compatible with the AID-RT standard",
      url: "https://rt-modelcard.streamlit.app/",
      icon: FileText,
      category: "AI/ML Guidelines"
    },
    {
      title: "DLinRT Model Card Schema (JSON)",
      description: "Machine-readable JSON schema defining all DLinRT product fields with required/optional status, types, and AID-RT field mappings",
      url: "/schemas/dlinrt-model-card-schema.json",
      icon: Database,
      category: "AI/ML Guidelines"
    },
    {
      title: "AID-RT Model Card Schema (JSON)",
      description: "Simplified AID-RT schema JSON with field metadata — use alongside the DLinRT schema to compare nomenclature and coverage",
      url: "/schemas/aidrt-model-card-schema.json",
      icon: Database,
      category: "AI/ML Guidelines"
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

    // Radiotherapy Guidelines (NEW CATEGORY)
    {
      title: "ICRU Report 97: MRI-Guided Radiotherapy",
      description: "Comprehensive guidance on MRI-guided radiation therapy techniques and applications (2022)",
      url: "https://doi.org/10.1177/14736691221141950",
      icon: BookOpen,
      category: "Radiotherapy Guidelines"
    },
    {
      title: "AAPM TG-302: Surface Guided Radiotherapy",
      description: "Task group report on surface-guided radiation therapy implementation and QA (2022)",
      url: "https://doi.org/10.1002/mp.15532",
      icon: BookOpen,
      category: "Radiotherapy Guidelines"
    },
    {
      title: "SBRT-PATHY Guidelines",
      description: "Consensus guidelines for stereotactic body radiotherapy and partial tumor irradiation (2024)",
      url: "https://doi.org/10.1016/j.radonc.2024.110183",
      icon: BookOpen,
      category: "Radiotherapy Guidelines"
    },
    
    // Standards Organizations
    {
      title: "IEC 62304 - Medical Device Software Lifecycle",
      description: "International standard for medical device software development and maintenance",
      url: "https://www.iso.org/standard/64686.html",
      icon: FileText,
      category: "Standards",
      version: "IEC 62304:2006/AMD1:2015",
      status: "standard"
    },
    {
      title: "ISO 13485 - Medical Device Quality Management",
      description: "International standard for quality management systems in medical device manufacturing",
      url: "https://www.iso.org/standard/59752.html",
      icon: Award,
      category: "Standards",
      version: "ISO 13485:2016 (Amd 1:2021)",
      status: "standard"
    },
    {
      title: "ISO/IEC 42001:2023 - AI Management System",
      description: "Framework for establishing AI management systems (supports AI Act compliance)",
      url: "https://www.iso.org/standard/81230.html",
      icon: Award,
      category: "Standards",
      version: "ISO/IEC 42001:2023",
      status: "standard"
    },
    {
      title: "IEC 82304-1 - Health Software Safety",
      description: "General requirements for health software product safety",
      url: "https://www.iso.org/standard/59543.html",
      icon: Award,
      category: "Standards",
      version: "IEC 82304-1:2016",
      status: "standard"
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
    {
      title: "OMOP Common Data Model",
      description: "Standardized data model for observational health data analytics and research",
      url: "https://ohdsi.github.io/CommonDataModel/",
      icon: Database,
      category: "Data Standards"
    },
    {
      title: "RTOG Contouring Atlases",
      description: "NRG Oncology standardized contouring atlases for radiotherapy target delineation",
      url: "https://www.nrgoncology.org/content-block-tag/contouring-atlases/",
      icon: BookOpen,
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
      title: "WHO – AI is reshaping health systems: state of readiness across the EU (2026)",
      description: "WHO focused assessment of AI readiness in EU health systems, drawing on the 2024–2025 survey on AI for health care in the WHO European Region — context for AI Act implementation.",
      url: "https://www.who.int/europe/publications/i/item/WHO-EURO-2026-12707-52481-81471",
      icon: BookOpen,
      category: "Ethics Guidelines"
    },
    {
      title: "WHO – AI readiness across the WHO European Region (2025)",
      description: "First WHO assessment of AI integration across the whole WHO European Region (53 countries) based on the 2024–2025 survey on AI for health care.",
      url: "https://www.who.int/europe/publications/i/item/WHO-EURO-2025-12707-52481-81028",
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
                  <div className="pt-1">
                    <VerifiedBadge
                      lastVerified={resource.lastVerified ?? RESOURCES_LAST_AUDIT}
                      version={resource.version}
                      status={resource.status}
                      note={resource.note}
                    />
                  </div>
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