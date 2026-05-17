
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
  Wrench,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  ADOPTION_READINESS_LEVELS,
  EVIDENCE_IMPACT_REFERENCE,
  METHODOLOGY_REFERENCES,
  getEvidenceRigorColor,
  getClinicalImpactColor,
  getAdoptionReadinessColor,
} from "@/data/evidence-impact-levels";
import EvidenceImpactBadges from "@/components/product/EvidenceImpactBadges";
import EvidenceImpactMatrix from "@/components/resources/EvidenceImpactMatrix";
import SEO from "@/components/SEO";

const EvidenceImpactGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Tri-Axial Evidence & Readiness Classification"
        description="A tri-axial methodology separating evidence rigor (E), clinical impact (I), and implementation burden (Z) for evaluating radiotherapy AI products"
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
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 flex-wrap">
            <FlaskConical className="h-8 w-8 text-primary" />
            <span>×</span>
            <Target className="h-8 w-8 text-primary" />
            <span>×</span>
            <Wrench className="h-8 w-8 text-primary" />
            Tri-Axial Evidence &amp; Readiness Classification
          </h1>
          <p className="text-lg text-muted-foreground">
            Separating evidence rigor (E), clinical impact (I), and implementation burden (Z)
            for nuanced product evaluation
          </p>
        </div>

        {/* Why Two Axes Card */}
        <Card className="mb-8 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Lightbulb className="h-5 w-5" />
              Why Three Axes?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Traditional single-scale evidence hierarchies conflate three distinct concepts:
              <strong> how robust the evidence is</strong>, <strong>what clinical benefit it demonstrates</strong>,
              and <strong>how much residual effort adoption still requires</strong>.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Rigor without impact
                </h4>
                <p className="text-sm text-muted-foreground">
                  An AI predicting the patient's favorite color with 99.8% accuracy, backed by RCTs.
                  On a single scale this looks "Level 1" despite having the
                  <em> highest possible methodological rigor</em>.
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Impact without rigor
                </h4>
                <p className="text-sm text-muted-foreground">
                  A device claimed to save lives but with no publications yet. On a single scale this looks
                  "Level 0" despite having <em>high potential clinical impact</em>.
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Strong evidence, not deployable
                </h4>
                <p className="text-sm text-muted-foreground">
                  A multi-centre validated tool that requires heavy commissioning, vendor-specific QA, or
                  custom integration. Strong E and I, but a <em>high implementation burden</em> blocks routine adoption.
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mt-4">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                The Solution: Three Axes
              </h4>
              <p className="text-sm text-green-900 dark:text-green-100">
                By separating <strong>Evidence Rigor</strong> (E0–E3), <strong>Clinical Impact</strong> (I0–I5),
                and <strong>Implementation &amp; Assurance Burden</strong> (R5–R0), each dimension is rated
                independently and combined into a composite readiness signal. The favorite-color AI becomes
                E3/I0/R5 (rigorous, no clinical value, easy to deploy); a high-promise unproven device is
                E0/I4/R2 (claimed impact, evidence and integration both pending).
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
                    {level.frybackThornburyLevel && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 leading-tight text-muted-foreground">
                        F&T: {level.frybackThornburyLevel}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{level.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Z-Axis: Implementation & Assurance Burden */}
        <Card className="mb-8 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Adoption Readiness (R0–R5)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              The third axis captures how close a product is to clinical adoption for its intended use,
              after evidence (E) and clinical impact (I) have been assigned (a DLinRT extension).{" "}
              <strong>Higher R = lower residual effort = closer to adoption-ready.</strong>{" "}
              Missing national or international guidelines do not block adoption but delay it, and R surfaces that gap.
              Low R constrains the public readiness signal even when E and I appear favourable.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {ADOPTION_READINESS_LEVELS.map((level) => (
                <div key={level.level} className="p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getAdoptionReadinessColor(level.level)}>
                      {level.level}
                    </Badge>
                    <span className="font-medium text-sm">{level.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{level.description}</p>
                  <p className="text-xs">
                    <span className="font-medium">Readiness:</span>{" "}
                    <span className="text-muted-foreground">{level.readinessConsequence}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Composite Readiness Signal</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                The user-facing badge is computed from all three axes:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Adoption-grade</strong> — R5 with E≥E2 and I≥I2.</li>
                <li><strong>Deploy with monitoring</strong> — R4, or R3 with E≥E2 and I≥I2.</li>
                <li><strong>Conditional</strong> — R3 with weaker E or I.</li>
                <li><strong>Pilot only</strong> — R2 (structured pilot or sandbox).</li>
                <li><strong>Not adoption-ready</strong> — R1.</li>
                <li><strong>Blocked</strong> — R0 (horizon scanning only).</li>
              </ul>
              <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t">
                Internally proposed DLinRT extension; readiness consequences derived from the DLinRT.eu Evidence Matrix proposal.
              </p>
            </div>
          </CardContent>
        </Card>


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
                      <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I2" adoptionReadiness="R4" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Multi-center validation, light QA needed at deployment</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">QA/Monitoring tool</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I1" adoptionReadiness="R5" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Well-validated, plug-in monitoring with negligible burden</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Workflow-validated planning AI</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E2" clinicalImpact="I2" adoptionReadiness="R3" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Strong evidence but commissioning &amp; site-specific QA required</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">New AI with pilot study</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E1" clinicalImpact="I2" adoptionReadiness="R2" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Single-center workflow validation; structured pilot only</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Product with no publications</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E0" clinicalImpact="I0" adoptionReadiness="R1" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Vendor claims only, integration effort unknown</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">"Favorite color" AI (example)</td>
                    <td className="py-3 pr-4">
                      <EvidenceImpactBadges evidenceRigor="E3" clinicalImpact="I0" adoptionReadiness="R5" size="sm" showTooltip={false} />
                    </td>
                    <td className="py-3 text-muted-foreground">Highest rigor (RCTs), but no clinical benefit demonstrated</td>
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
                  <strong>Impact describes benefit, not validation method.</strong> "Accuracy" 
                  or "speed" are how you measure—the impact is what value that provides 
                  (e.g., faster contouring → I2 Workflow benefit).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">2</Badge>
                <span>
                  <strong>Assess both axes independently.</strong> A product can have high rigor 
                  but low impact, or vice versa. Both are valid and informative.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">3</Badge>
                <span>
                  <strong>QA tools matter.</strong> I1 (Quality Assurance) recognizes tools 
                  that monitor other AI systems—they enable safe use of AI even if they don't 
                  directly treat patients.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">4</Badge>
                <span>
                  <strong>E3 and I5 are rare.</strong> Most RT AI products occupy the E1-E2/I1-I2 zone. 
                  Don't penalize products for not having RCTs if their intended use doesn't require them.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">5</Badge>
                <span>
                  <strong>Document your reasoning.</strong> Use the notes fields to explain 
                  why you assigned specific rigor and impact levels.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Study Quality Sub-Attributes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Study Quality Sub-Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Alongside the evidence rigor scale (E0–E3), each product with peer-reviewed evidence is assessed on 
              five granular study quality dimensions. These complement the rigor level with specific methodological indicators.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Attribute</th>
                    <th className="text-left py-2 pr-4 font-medium">Description</th>
                    <th className="text-left py-2 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 pr-4 font-medium">Vendor Independent</td>
                    <td className="py-2 pr-4 text-muted-foreground">At least one study conducted by non-vendor authors</td>
                    <td className="py-2 text-muted-foreground">van Leeuwen 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Multi-Center</td>
                    <td className="py-2 pr-4 text-muted-foreground">Evidence from 3 or more clinical sites</td>
                    <td className="py-2 text-muted-foreground">van Leeuwen 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Multi-National</td>
                    <td className="py-2 pr-4 text-muted-foreground">Data collected from multiple countries</td>
                    <td className="py-2 text-muted-foreground">van Leeuwen 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Prospective</td>
                    <td className="py-2 pr-4 text-muted-foreground">At least one prospective study design</td>
                    <td className="py-2 text-muted-foreground">van Leeuwen 2025</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">External Validation</td>
                    <td className="py-2 pr-4 text-muted-foreground">Validated on an external (non-training) dataset</td>
                    <td className="py-2 text-muted-foreground">Pham 2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* References */}
        <Card>
          <CardHeader>
            <CardTitle>Methodology References</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{EVIDENCE_IMPACT_REFERENCE.description}</p>
            <p className="text-sm text-muted-foreground">{EVIDENCE_IMPACT_REFERENCE.rationale}</p>
            <div className="pt-4 border-t space-y-3">
              {/* Original reference */}
              <div>
                <p className="text-sm">{EVIDENCE_IMPACT_REFERENCE.originalReference.citation}</p>
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href={EVIDENCE_IMPACT_REFERENCE.originalReference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    DOI <ExternalLink className="h-3 w-3" />
                  </a>
                  <Badge variant="outline" className="text-xs">
                    PMID: {EVIDENCE_IMPACT_REFERENCE.originalReference.pmid}
                  </Badge>
                </div>
              </div>

              {/* Additional references */}
              {EVIDENCE_IMPACT_REFERENCE.additionalReferences.map((ref, i) => (
                <div key={i}>
                  <p className="text-sm">{ref.citation}</p>
                  {ref.notes && <p className="text-xs text-muted-foreground mt-0.5">{ref.notes}</p>}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    DOI <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}

              {/* Fryback & Thornbury */}
              <div>
                <p className="text-sm">{EVIDENCE_IMPACT_REFERENCE.frybackThornburyReference.citation}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{EVIDENCE_IMPACT_REFERENCE.frybackThornburyReference.notes}</p>
                <a
                  href={EVIDENCE_IMPACT_REFERENCE.frybackThornburyReference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                >
                  DOI <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extended methodology bibliography */}
        <Card>
          <CardHeader>
            <CardTitle>Extended methodology bibliography</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Grouped references underpinning the dual-axis (E / I) and implementation-burden (Z) framework.
              Each entry links to the canonical DOI or publisher source.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {METHODOLOGY_REFERENCES.map((group) => (
              <section key={group.id} id={`refs-${group.id}`} className="scroll-mt-20">
                <h3 className="font-semibold text-base">{group.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-3">{group.description}</p>
                <ol className="space-y-2 list-decimal pl-5 marker:text-muted-foreground">
                  {group.references.map((ref, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      <span>{ref.citation}</span>
                      {ref.notes && (
                        <span className="block text-xs text-muted-foreground mt-0.5">{ref.notes}</span>
                      )}
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                        >
                          {ref.doi ? `DOI: ${ref.doi}` : "Source"}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceImpactGuide;
