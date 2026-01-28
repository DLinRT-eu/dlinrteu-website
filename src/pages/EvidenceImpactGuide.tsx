
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ArrowLeft,
  FlaskConical,
  Target,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  EVIDENCE_IMPACT_REFERENCE,
  getEvidenceRigorColor,
  getClinicalImpactColor,
} from "@/data/evidence-impact-levels";
import EvidenceImpactBadges from "@/components/product/EvidenceImpactBadges";
import EvidenceImpactMatrix from "@/components/resources/EvidenceImpactMatrix";
import SEO from "@/components/SEO";

const EvidenceImpactGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Dual-Axis Evidence Classification"
        description="A methodology separating evidence rigor from clinical impact for evaluating radiotherapy AI products"
        canonical="https://dlinrt.eu/evidence-impact-guide"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/resources">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-primary" />
            <span>×</span>
            <Target className="h-8 w-8 text-primary" />
            Dual-Axis Evidence Classification
          </h1>
          <p className="text-lg text-muted-foreground">
            Separating evidence rigor from clinical impact for more nuanced product evaluation
          </p>
        </div>

        {/* Why Two Axes Card */}
        <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Lightbulb className="h-5 w-5" />
              Why Two Axes?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Traditional single-scale evidence hierarchies conflate two distinct concepts: 
              <strong> how robust the evidence is</strong> and <strong>what clinical benefit it demonstrates</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  The Problem: Example 1
                </h4>
                <p className="text-sm text-muted-foreground">
                  An AI that predicts the patient's favorite color with 99.8% accuracy, 
                  backed by rigorous peer-reviewed RCTs. On a single scale, this would be 
                  "Level 1" (technical) despite having the <em>highest possible methodological rigor</em>.
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  The Problem: Example 2
                </h4>
                <p className="text-sm text-muted-foreground">
                  A device guaranteed to save lives but with no publications yet. 
                  On a single scale, this would be "Level 0" (no evidence) despite 
                  having <em>high potential clinical impact</em>.
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mt-4">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                The Solution: Two Axes
              </h4>
              <p className="text-sm text-green-900 dark:text-green-100">
                By separating <strong>Evidence Rigor</strong> (E0-E3) from <strong>Clinical Impact</strong> (I0-I5), 
                we can properly represent both dimensions. The favorite-color AI becomes E3/I0 
                (rigorous but no clinical value), while the life-saving device is E0/I4 
                (high claimed impact, needs evidence). Both ratings convey meaningful information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Evidence-Impact Matrix */}
        <EvidenceImpactMatrix className="mb-8" />

        {/* Two Axes Side by Side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Evidence Rigor Axis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-blue-600" />
                Evidence Rigor (E0-E3)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                How robust is the study methodology?
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {EVIDENCE_RIGOR_LEVELS.map((level) => (
                <div key={level.level} className="p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getEvidenceRigorColor(level.level)}>
                      {level.level}
                    </Badge>
                    <span className="font-medium text-sm">{level.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Clinical Impact Axis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-teal-600" />
                Clinical Impact (I0-I5)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                What outcomes does the evidence demonstrate?
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {CLINICAL_IMPACT_LEVELS.map((level) => (
                <div key={level.level} className="p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getClinicalImpactColor(level.level)}>
                      {level.level}
                    </Badge>
                    <span className="font-medium text-sm">{level.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Example Classifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Example Classifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4">Product Type</th>
                    <th className="text-left py-2 pr-4">Classification</th>
                    <th className="text-left py-2">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 pr-4">Mature auto-contouring tool</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I1" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Multi-center validation showing accuracy vs expert contours</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Workflow-validated planning AI</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I2" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Large studies showing time savings and reduced variability</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">New AI with pilot study</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E1" clinicalImpact="I1" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Single-center performance validation</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Product with no publications</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E0" clinicalImpact="I0" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Vendor claims only, no peer-reviewed evidence</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">"Favorite color" AI (example)</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E3" clinicalImpact="I0" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Highest rigor (RCTs), but technical only (no clinical value)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Considerations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Key Considerations for Reviewers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">1</Badge>
                <span>
                  <strong>Assess both axes independently.</strong> A product can have high rigor 
                  but low impact, or vice versa. Both are valid and informative.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">2</Badge>
                <span>
                  <strong>Match rigor to the study type.</strong> An E2-rated workflow study 
                  may be more useful than an E1-rated outcome study for a workflow-focused tool.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">3</Badge>
                <span>
                  <strong>E3 and I5 are rare.</strong> Most RT AI products occupy the E1-E2/I0-I2 zone. 
                  Don't penalize products for not having RCTs if their intended use doesn't require them.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">4</Badge>
                <span>
                  <strong>Document your reasoning.</strong> Use the notes fields to explain 
                  why you assigned specific rigor and impact levels.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Methodology Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{EVIDENCE_IMPACT_REFERENCE.description}</p>
            <p className="text-sm text-muted-foreground">{EVIDENCE_IMPACT_REFERENCE.rationale}</p>
            <div className="flex items-center gap-3 pt-4 border-t">
              <span className="text-sm font-medium">Original framework:</span>
              <a
                href={EVIDENCE_IMPACT_REFERENCE.originalReference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                van Leeuwen KG, et al. Eur Radiol. 2021
                <ExternalLink className="h-3 w-3" />
              </a>
              <Badge variant="outline" className="text-xs">
                PMID: {EVIDENCE_IMPACT_REFERENCE.originalReference.pmid}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground pt-2">
              <Link to="/evidence-levels" className="text-primary hover:underline">
                View legacy single-axis classification →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceImpactGuide;
