import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VerifiedBadge from '@/components/resources/VerifiedBadge';
import { RESOURCES_LAST_AUDIT, type VerificationMeta } from '@/data/resources/verification';

interface StandardItem extends Partial<VerificationMeta> {
  standard: string;
  description: string;
  scope: string;
}

interface StandardCategory {
  category: string;
  items: StandardItem[];
}

const StandardsGuidelines = () => {
  const standards: StandardCategory[] = [
    {
      category: "Quality & Software Lifecycle",
      items: [
        {
          standard: "ISO 13485",
          description: "Quality Management System for medical devices",
          scope: "Mandatory QMS framework for medical device manufacturers",
          version: "ISO 13485:2016 (Amd 1:2021)",
          status: "standard"
        },
        {
          standard: "IEC 62304",
          description: "Medical device software lifecycle processes",
          scope: "Software development and maintenance requirements",
          version: "IEC 62304:2006 + AMD1:2015",
          status: "standard"
        },
        {
          standard: "IEC 82304-1",
          description: "Health software product safety requirements",
          scope: "General safety requirements for health software products",
          version: "IEC 82304-1:2016",
          status: "standard"
        }
      ]
    },
    {
      category: "Good Machine Learning Practice",
      items: [
        {
          standard: "GMLP / IMDRF",
          description: "Best practices for dataset use, validation, continuous monitoring",
          scope: "International harmonized guidance for ML in medical devices",
          version: "IMDRF/AIML WG N88",
          status: "guidance"
        },
        {
          standard: "ISO/IEC 42001",
          description: "AI management system standard",
          scope: "Framework for establishing AI management systems (supports AI Act)",
          version: "ISO/IEC 42001:2023",
          status: "standard"
        },
        {
          standard: "ISO/IEC 23894",
          description: "Guidance on AI risk management",
          scope: "Risk management principles for AI systems (companion to ISO 31000)",
          version: "ISO/IEC 23894:2023",
          status: "standard",
          note: "Previously listed here as ISO/IEC 23053, which instead defines an ML framework."
        }
      ]
    },
    {
      category: "Regulatory Guidance",
      items: [
        {
          standard: "MDCG Guidelines",
          description: "MDR/AI Act intersection and harmonised expectations",
          scope: "European guidance for medical device AI compliance",
          version: "MDCG 2025-6 and related endorsed documents",
          status: "guidance"
        },
        {
          standard: "FDA AI Guidance",
          description: "Lifecycle management and marketing submission expectations",
          scope: "US regulatory pathway for AI-enabled medical devices",
          version: "AI-enabled device software functions — draft guidance (Jan 2025)",
          status: "guidance"
        },
        {
          standard: "FDA PCCP",
          description: "Predetermined Change Control Plans for iterative AI",
          scope: "Framework for managing AI/ML device modifications",
          version: "Final guidance, December 2024",
          status: "guidance"
        }
      ]
    },
    {
      category: "International Harmonization",
      items: [
        {
          standard: "IMDRF GMLP Principles",
          description: "Harmonized guiding principles for ML in medical device development",
          scope: "International best practices adopted by FDA, TGA, Health Canada",
          version: "IMDRF N88 guiding principles",
          status: "guidance"
        },
        {
          standard: "IMDRF SaMD Framework",
          description: "Software as a Medical Device risk characterization",
          scope: "Classification and clinical evaluation framework for SaMD",
          version: "IMDRF SaMD N12/N23 series",
          status: "guidance"
        }
      ]
    },
    {
      category: "Cybersecurity & Privacy",
      items: [
        {
          standard: "ISO/IEC 27001",
          description: "Information security management systems",
          scope: "Cybersecurity framework for healthcare organizations",
          version: "ISO/IEC 27001:2022 (Amd 1:2024)",
          status: "standard"
        },
        {
          standard: "GDPR",
          description: "General Data Protection Regulation",
          scope: "Data privacy and protection requirements in EU",
          version: "Regulation (EU) 2016/679",
          status: "in-force"
        }
      ]
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {standards.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
              {category.category}
              <Badge variant="outline" className="text-xs">
                {category.items.length} standards
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="font-mono text-xs whitespace-nowrap">
                      {item.standard}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">
                        {item.description}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.scope}
                      </p>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <VerifiedBadge
                          lastVerified={item.lastVerified ?? RESOURCES_LAST_AUDIT}
                          version={item.version}
                          status={item.status}
                          note={item.note}
                          compact
                        />
                        {item.version && (
                          <span className="text-xs text-muted-foreground">{item.version}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {itemIndex < category.items.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StandardsGuidelines;
