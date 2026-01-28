import React from "react";
import { ExternalLink, FlaskConical, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
                  {CLINICAL_IMPACT_LEVELS.map((level) => (
                    <TableRow key={level.level}>
                      <TableCell>
                        <Badge className={getClinicalImpactColor(level.level)}>
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
        </div>

        {/* Reference and links */}
        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Reference: </span>
            Adapted from van Leeuwen et al. Eur Radiol. 2021.{" "}
            <a
              href={`https://doi.org/${EVIDENCE_IMPACT_REFERENCE.originalReference.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              DOI <ExternalLink className="h-3 w-3" />
            </a>
          </div>
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
