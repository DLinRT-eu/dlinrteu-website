
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft, FlaskConical, BookOpen, Target, AlertCircle } from "lucide-react";
import { EVIDENCE_LEVELS, EVIDENCE_LEVEL_REFERENCE, getEvidenceLevelColor } from "@/data/evidence-levels";
import EvidenceLevelBadge from "@/components/product/EvidenceLevelBadge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SEO from "@/components/SEO";

const EvidenceLevels = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Evidence Level Classification (Legacy)"
        description="Single-axis evidence hierarchy for radiotherapy AI products - see dual-axis guide for improved methodology"
        canonical="https://dlinrt.eu/evidence-levels"
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
            Evidence Level Classification
            <Badge variant="outline" className="text-sm">Legacy</Badge>
          </h1>
          <p className="text-lg text-muted-foreground">
            Single-axis evidence hierarchy for radiotherapy AI products
          </p>
        </div>

        {/* Upgrade Notice */}
        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <Target className="h-4 w-4" />
          <AlertTitle>New: Dual-Axis Classification Available</AlertTitle>
          <AlertDescription className="mt-2">
            We've improved our evidence classification by separating <strong>evidence rigor</strong> (study quality) 
            from <strong>clinical impact</strong> (what outcomes are measured). This provides more nuanced 
            evaluation of AI products.
            <div className="mt-3">
              <Button asChild size="sm">
                <Link to="/evidence-impact-guide" className="inline-flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  <span>×</span>
                  <Target className="h-4 w-4" />
                  View Dual-Axis Guide
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Methodology Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Methodology (Single-Axis)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This classification system is adapted from the evidence hierarchy proposed by van Leeuwen et al. (2021), 
              which evaluated 100 commercially available AI products in radiology. We have modified the framework 
              specifically for radiotherapy applications, maintaining the core hierarchical structure while incorporating 
              radiotherapy-specific examples and metrics.
            </p>
            <p>
              The hierarchy follows the Fryback-Thornbury efficacy model, progressing from technical validation 
              through to societal impact. Higher levels represent stronger evidence of clinical utility, but 
              <strong> all levels are valuable</strong> — products at Level 2 (stand-alone performance) with robust 
              multi-center validation may be more reliable than those claiming Level 3 with weak methodology.
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-sm">
              <strong>Note:</strong> This single-axis system conflates evidence rigor with clinical impact. 
              Consider using the <Link to="/evidence-impact-guide" className="text-primary hover:underline">dual-axis classification</Link> for 
              more nuanced assessment.
            </div>
            <div className="flex items-center gap-3 pt-4 border-t">
              <span className="text-sm font-medium">Reference:</span>
              <a 
                href={EVIDENCE_LEVEL_REFERENCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                van Leeuwen KG, et al. Eur Radiol. 2021;31(6):3797-3804
                <ExternalLink className="h-3 w-3" />
              </a>
              <Badge variant="outline" className="text-xs">
                PMID: {EVIDENCE_LEVEL_REFERENCE.pmid}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Levels Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Evidence Level Definitions</h2>
          
          {EVIDENCE_LEVELS.map((level) => (
            <Card key={level.level} className="overflow-hidden">
              <div className={`h-1.5 ${
                level.color === 'gray' ? 'bg-gray-400' :
                level.color === 'slate' ? 'bg-slate-400' :
                level.color === 'blue' ? 'bg-blue-500' :
                level.color === 'green' ? 'bg-green-500' :
                level.color === 'teal' ? 'bg-teal-500' :
                level.color === 'orange' ? 'bg-orange-500' :
                level.color === 'purple' ? 'bg-purple-500' :
                'bg-rose-500'
              }`} />
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <EvidenceLevelBadge level={level.level} showTooltip={false} size="lg" />
                    <h3 className="text-lg font-semibold">{level.name}</h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{level.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Typical Measures</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {level.typicalMeasures.map((measure, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Radiotherapy Examples</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {level.radiotherapyExamples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/50" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Considerations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Key Considerations for Reviewers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">1</Badge>
                <span>
                  <strong>Assign the highest level with robust evidence.</strong> A product needs only one 
                  well-designed study at a level to qualify, but the study methodology must be sound.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">2</Badge>
                <span>
                  <strong>Vendor white papers are Level 0.</strong> Internal validation studies without 
                  peer review do not count as published evidence.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">3</Badge>
                <span>
                  <strong>Multi-center studies strengthen claims.</strong> Single-center studies at Level 2 
                  may be noted as preliminary; multi-center validation is stronger.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">4</Badge>
                <span>
                  <strong>Document the justification.</strong> Use the <code>evidenceLevelNotes</code> field 
                  to cite the key publication(s) supporting the assigned level.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Badge className="mt-0.5 shrink-0">5</Badge>
                <span>
                  <strong>Levels 5-6 are rare.</strong> Few radiotherapy AI products have prospective outcome 
                  studies or health economic analyses. Most products will be Level 0-3.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Visual Hierarchy */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Evidence Hierarchy Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-1 py-4">
              {[...EVIDENCE_LEVELS].reverse().map((level, index) => {
                const width = 100 - (index * 10);
                return (
                  <div 
                    key={level.level}
                    className={`flex items-center justify-center py-2 rounded text-sm font-medium transition-all ${getEvidenceLevelColor(level.level)}`}
                    style={{ width: `${width}%` }}
                  >
                    Level {level.level}: {level.name}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Pyramid structure: fewer products achieve higher evidence levels
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceLevels;
