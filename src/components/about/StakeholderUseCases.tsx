import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Coins, Factory, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

interface UseCase {
  icon: React.ElementType;
  audience: string;
  description: string;
  question: string;
  view: string;
  viewLink?: string;
  thresholds: string;
  extra?: string;
}

const USE_CASES: UseCase[] = [
  {
    icon: Stethoscope,
    audience: "Clinician",
    description: "Radiation oncologists, medical physicists, RTTs evaluating tools for their department.",
    question: "Is this product safe and mature enough to use on my patients?",
    view: "Product page + Evidence/Impact badges",
    viewLink: "/products",
    thresholds: "Aim for ≥E2, ≥I2, ≥R4",
  },
  {
    icon: Coins,
    audience: "HTA / Payer",
    description: "Health technology assessors, hospital procurement, payers framing reimbursement.",
    question: "Where are the evidence and guideline gaps that delay adoption?",
    view: "Evidence × Impact × Readiness matrix (3D)",
    viewLink: "/dashboard",
    thresholds: "Inspect R3–R4 cluster: R flags the guideline-gap signal — adoption is delayed, not blocked.",
    extra: "Missing national/international guidelines surface as low R even when E and I are strong.",
  },
  {
    icon: Factory,
    audience: "Vendor",
    description: "Manufacturers benchmarking their portfolio against the field.",
    question: "What evidence and readiness do I need to be competitive in my task?",
    view: "Evidence/Impact scatter — New vendor / Gap analysis preset",
    viewLink: "/dashboard",
    thresholds: "Target the per-task median (E,I,R); aim ≥E2 ∧ ≥I2 ∧ ≥R3 to enter the field.",
  },
  {
    icon: Microscope,
    audience: "Researcher",
    description: "Academics and clinical scientists planning validation or comparative studies.",
    question: "Which products lack independent or multi-centre validation?",
    view: "Evidence Rigor filters + study-quality sub-attributes",
    viewLink: "/products",
    thresholds: "Filter E0–E1 with vendorIndependent=false to surface validation opportunities.",
  },
];

const StakeholderUseCases = () => {
  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Who DLinRT.eu Helps & How</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The catalogue answers different questions for different stakeholders. Below are the four
            primary audiences, the questions they bring, and the view that best answers them.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto mt-2">
            Evidence (E0–E3), Clinical Impact (I0–I5) and Adoption Readiness (R0–R5) are explained in
            the{" "}
            <Link to="/evidence-impact-guide" className="text-primary hover:underline">
              Evidence & Impact Guide
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map(({ icon: Icon, audience, description, question, view, viewLink, thresholds, extra }) => (
            <Card key={audience} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{audience}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <Badge variant="secondary" className="mb-1">Typical question</Badge>
                  <p className="text-foreground">{question}</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Best view</Badge>
                  <p>
                    {viewLink ? (
                      <Link to={viewLink} className="text-primary hover:underline">
                        {view}
                      </Link>
                    ) : (
                      <span className="text-foreground">{view}</span>
                    )}
                  </p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1">Suggested thresholds</Badge>
                  <p className="text-muted-foreground">{thresholds}</p>
                </div>
                {extra && (
                  <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                    {extra}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StakeholderUseCases;
