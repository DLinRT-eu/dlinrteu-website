import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText, Gavel, Shield, Globe } from 'lucide-react';
import VerifiedBadge from '@/components/resources/VerifiedBadge';
import { RESOURCES_LAST_AUDIT, type VerificationMeta } from '@/data/resources/verification';

interface CoreDocument extends Partial<VerificationMeta> {
  title: string;
  description: string;
  url: string;
  type: string;
  reference: string;
}

interface CoreDocumentCategory {
  title: string;
  icon: React.ReactNode;
  badge: string;
  documents: CoreDocument[];
}

const CoreDocuments = () => {
  const documentCategories: CoreDocumentCategory[] = [

    {
      title: "EU Regulatory Framework",
      icon: <Gavel className="h-5 w-5" />,
      badge: "Essential",
      documents: [
        {
          title: "MDR (Regulation EU 2017/745)",
          description: "Official Medical Device Regulation text",
          url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0745",
          type: "Official Text",
          reference: "[1]",
          version: "Regulation (EU) 2017/745 — consolidated",
          status: "in-force"
        },
        {
          title: "EU AI Act (Regulation 2024/1689)",
          description: "Official AI Act text governing high-risk AI systems",
          url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
          type: "Official Text",
          reference: "[2]",
          version: "Regulation (EU) 2024/1689, as amended by COM(2025) 836",
          status: "in-force",
          note: "Enforcement from 2 Aug 2026; Annex I high-risk from 2 Aug 2028."
        },
        {
          title: "MDCG 2025-6 - MDR/AI Act Interplay FAQ", 
          description: "Joint applicability guidance for medical device AI",
          url: "https://health.ec.europa.eu/latest-updates/mdcg-2025-6-faq-interplay-between-medical-devices-regulation-vitro-diagnostic-medical-devices-2025-06-19_en",
          type: "Guidance",
          reference: "[3]",
          version: "MDCG 2025-6 (19 June 2025)",
          status: "guidance"
        },
        {
          title: "EU AI Act Overview",
          description: "Commission guidance on AI in healthcare",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
          type: "Overview",
          reference: "[4]",
          version: "Commission policy page",
          status: "guidance"
        },
        {
          title: "Guidelines on Transparency of AI-generated Content (Art. 50)",
          description: "Transparency obligations applying from 2 August 2026, when AI Act enforcement begins",
          url: "https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content",
          type: "Guidance",
          reference: "[19]",
          version: "Article 50 guidelines (July 2026)",
          status: "guidance"
        },

        {
          title: "MDR/IVDR Simplification Proposal — COM(2025) 1023",
          description: "Commission proposal of 16 Dec 2025 amending MDR/IVDR, EMA expert-panel support and the AI Act Annex I list. Procedure 2025/0404(COD) — proposal, not in force.",
          url: "https://health.ec.europa.eu/publications/proposal-regulation-simplify-rules-medical-and-vitro-diagnostic-devices_en",
          type: "Proposal",
          reference: "[20]",
          version: "COM(2025) 1023 final — 2025/0404(COD)",
          status: "proposal",
          note: "First reading; MDR/IVDR apply unchanged."
        }


      ]
    },
    {
      title: "US FDA Framework",
      icon: <Shield className="h-5 w-5" />,
      badge: "US Market",
      documents: [
        {
          title: "AI/ML in Software as Medical Device",
          description: "FDA overview and guidance pages",
          url: "https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-software-medical-device",
          type: "Guidance",
          reference: "[5]"
        },
        {
          title: "PCCP Final Guidance (Dec 2024)",
          description: "Predetermined Change Control Plans for AI/ML devices",
          url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence",
          type: "Final Guidance",
          reference: "[6]"
        },
        {
          title: "AI-Enabled Device Software Functions",
          description: "Draft guidance on lifecycle and marketing submissions",
          url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing",
          type: "Draft Guidance",
          reference: "[7]"
        }
      ]
    },
    {
      title: "International Standards",
      icon: <Globe className="h-5 w-5" />,
      badge: "Global",
      documents: [
        {
          title: "ISO/IEC 42001:2023 - AI Management System",
          description: "Framework for AI management systems (supports AI Act compliance)",
          url: "https://www.iso.org/standard/81230.html",
          type: "Standard",
          reference: "[8]",
          version: "ISO/IEC 42001:2023",
          status: "standard"
        },
        {
          title: "IEC 82304-1 - Health Software Safety",
          description: "General requirements for health software product safety",
          url: "https://www.iso.org/standard/59543.html",
          type: "Standard",
          reference: "[9]",
          version: "IEC 82304-1:2016",
          status: "standard"
        },
        {
          title: "ISO 14971 - Risk Management",
          description: "Risk management process for medical devices",
          url: "https://www.iso.org/standard/72704.html",
          type: "Standard",
          reference: "[10]",
          version: "ISO 14971:2019 (Amd 1:2021)",
          status: "standard"
        }

      ]
    },
    {
      title: "Implementation Guidance",
      icon: <FileText className="h-5 w-5" />,
      badge: "Practical",
      documents: [
        {
          title: "MDCG Endorsed Guidance Hub",
          description: "Collection of MDCG guidance documents",
          url: "https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en",
          type: "Resource Hub",
          reference: "[11]"
        },
        {
          title: "ISO 13485 Quality Management",
          description: "Quality management systems for medical devices",
          url: "https://www.iso.org/standard/59752.html",
          type: "Standard",
          reference: "[12]"
        },
        {
          title: "IMDRF Good Machine Learning Practice",
          description: "International guiding principles for ML in medical devices",
          url: "https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles",
          type: "Guidance",
          reference: "[13]"
        }
      ]
    },
    {
      title: "Research & Evidence",
      icon: <Globe className="h-5 w-5" />,
      badge: "Academic",
      documents: [
        {
      title: "WHO Ethics and Governance of AI for Health",
          description: "Best practices for ethical AI development in healthcare",
          url: "https://www.who.int/publications/i/item/9789240029200",
          type: "Research",
          reference: "[14]"
        },
        {
          title: "Stanford AI Index Report 2025",
          description: "8th annual report from Stanford HAI on global AI trends, policy, and governance",
          url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
          type: "Annual Report",
          reference: "[15]"
        },
        {
          title: "The 2025 AI Agent Index (MIT)",
          description: "Benchmark of 30 deployed agentic AI systems: capabilities, safety features, and risks",
          url: "https://aiagentindex.mit.edu/",
          type: "Research",
          reference: "[16]"
        },
        {
          title: "International AI Safety Report 2025",
          description: "Multi-government report (Bengio et al.) on general-purpose AI risks and safeguards",
          url: "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025",
          type: "Safety Report",
          reference: "[17]"
        },
        {
          title: "WHO – AI readiness in EU health systems (2026)",
          description: "WHO assessment of AI readiness in EU health systems, based on the 2024–2025 survey on AI for health care in the WHO European Region",
          url: "https://www.who.int/europe/publications/i/item/WHO-EURO-2026-12707-52481-81471",
          type: "WHO Report",
          reference: "[18]"
        }
      ]
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Essential": return "default";
      case "US Market": return "secondary"; 
      case "Practical": return "outline";
      case "Academic": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {documentCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  {category.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {category.title}
                </CardTitle>
              </div>
              <Badge variant={getBadgeVariant(category.badge)}>
                {category.badge}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.documents.map((doc, docIndex) => (
                <div 
                  key={docIndex}
                  className="flex items-start justify-between gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-medium text-foreground">
                        {doc.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {doc.reference}
                      </span>
                      <VerifiedBadge
                        lastVerified={doc.lastVerified ?? RESOURCES_LAST_AUDIT}
                        version={doc.version}
                        status={doc.status}
                        note={doc.note}
                        compact
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    {doc.version && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span className="font-medium">Version:</span> {doc.version}
                      </p>
                    )}
                  </div>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-shrink-0"
                    asChild
                  >
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Open ${doc.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        ))}
      </div>

      {/* Reference Note */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Reference numbers [1] through [20] correspond to the footnote-style citations in the regulatory guidance.
            These documents represent the core starting points for understanding regulatory requirements for AI in medical devices.
            Each entry shows the date on which its link, version and status were last verified.
          </p>
        </CardContent>
      </Card>

    </div>
  );
};

export default CoreDocuments;