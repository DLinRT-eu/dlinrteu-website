import React from "react";
import { ExternalLink, FlaskConical, Target, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  EVIDENCE_IMPACT_REFERENCE,
  getEvidenceRigorColor,
  getClinicalImpactColor,
} from "@/data/evidence-impact-levels";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EvidenceLevelTable = () => {
  const allReferences = [
    { ...EVIDENCE_IMPACT_REFERENCE.originalReference, notes: "Original dual-axis evidence classification framework for radiology AI." },
    ...EVIDENCE_IMPACT_REFERENCE.additionalReferences,
    EVIDENCE_IMPACT_REFERENCE.frybackThornburyReference,
  ];

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Evidence Rigor Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-600" />
              Evidence Rigor (E0-E3)
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Level</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVIDENCE_RIGOR_LEVELS.map((level) => (
                    <TableRow key={level.level}>
                      <TableCell>
                        <Badge className={getEvidenceRigorColor(level.level)}>
                          {level.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{level.name}</span>
                        <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Clinical Impact Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-teal-600" />
              Clinical Impact (I0-I5)
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Level</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TooltipProvider>
                    {CLINICAL_IMPACT_LEVELS.map((level) => (
                      <TableRow key={level.level}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Badge className={getClinicalImpactColor(level.level)}>
                              {level.level}
                            </Badge>
                            {level.frybackThornburyLevel && (
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="text-[10px] px-1 py-0 leading-tight cursor-help">
                                    F&T
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="max-w-[220px]">
                                  <p className="text-xs font-medium">Fryback & Thornbury</p>
                                  <p className="text-xs">{level.frybackThornburyLevel}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{level.name}</span>
                          <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TooltipProvider>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Study Quality Sub-Attributes Note */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ClipboardCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <p>
              <span className="font-medium text-foreground">Study quality sub-attributes: </span>
              Beyond evidence rigor (E0–E3), each product is assessed on five granular quality dimensions: 
              vendor independence, multi-center (3+ sites), multi-national, prospective design, and external validation 
              (per van Leeuwen 2025 & Pham 2023).
            </p>
          </div>
        </div>

        {/* References */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs font-medium text-foreground mb-2">References</p>
          <ul className="space-y-1.5">
            {allReferences.map((ref, i) => (
              <li key={i} className="text-xs text-muted-foreground">
                <span>{ref.citation}</span>{" "}
                {ref.doi && (
                  <a
                    href={`https://doi.org/${ref.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-0.5"
                  >
                    DOI <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Link to full guide */}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link to="/evidence-impact-guide" className="inline-flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <Target className="h-4 w-4" />
              Full methodology guide
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceLevelTable;
