import React from "react";
import { ExternalLink, FlaskConical, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EVIDENCE_LEVELS, EVIDENCE_LEVEL_REFERENCE } from "@/data/evidence-levels";
import EvidenceLevelBadge from "@/components/product/EvidenceLevelBadge";
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
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead className="min-w-[250px]">Description</TableHead>
                <TableHead className="min-w-[200px]">RT Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {EVIDENCE_LEVELS.map((level) => (
                <TableRow key={level.level}>
                  <TableCell>
                    <EvidenceLevelBadge level={level.level} showTooltip={false} size="sm" />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {level.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {level.description}
                  </TableCell>
                  <TableCell className="text-sm">
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {level.radiotherapyExamples.slice(0, 2).map((example, idx) => (
                        <li key={idx} className="text-xs">{example}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Reference and links */}
        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Reference: </span>
            Adapted from van Leeuwen et al. Eur Radiol. 2021.{" "}
            <a
              href={`https://doi.org/${EVIDENCE_LEVEL_REFERENCE.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              DOI <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/evidence-impact-guide" className="inline-flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <Target className="h-4 w-4" />
                Dual-axis guide
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/evidence-levels" className="inline-flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Legacy methodology
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceLevelTable;
