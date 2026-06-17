import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AUTO_CONTOURING_PRODUCTS } from "@/data/products/auto-contouring";
import { hasRegulatoryApproval } from "@/utils/productFilters";
import { ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "What is AI auto-contouring in radiotherapy?",
    a: "AI auto-contouring uses deep-learning models to automatically delineate organs at risk (OARs) and target volumes on CT, MR, or CBCT images. Output is written as a DICOM-RTSTRUCT object that integrates directly into the treatment-planning workflow, replacing or accelerating manual contouring.",
  },
  {
    q: "Are AI auto-contouring tools FDA-cleared or CE-marked?",
    a: "Most clinical-grade tools listed on DLinRT.eu carry CE (MDR), FDA 510(k), or equivalent clearance from NMPA, TGA, PMDA, MFDS, Health Canada, ANVISA, MHRA/UKCA. Regulatory class and intended use vary — always check the product's official Instructions for Use.",
  },
  {
    q: "How accurate are AI-generated contours compared with manual delineation?",
    a: "Reported Dice similarity coefficients are typically 0.80–0.95 for well-defined OARs (lungs, liver, kidneys) and lower for variable structures (lymph node levels, GTV). DLinRT.eu rates the rigor of the evidence on an E0–E3 scale and its clinical impact on an I0–I5 scale; see the Evidence & Impact Guide.",
  },
  {
    q: "Which anatomical structures can AI auto-contouring tools segment?",
    a: "Coverage spans head & neck, thorax, breast, abdomen, pelvis, and CNS. Some vendors specialise (e.g. prostate-only or brain-only); others provide a broad multi-site library. The Structure Comparison tool lets you compare exact structure lists side-by-side.",
  },
  {
    q: "Can AI auto-contouring be used clinically without human review?",
    a: "No. Every CE/FDA-cleared product is indicated as a decision-support tool that requires review and, when needed, correction by a qualified clinician before use in treatment planning.",
  },
  {
    q: "What's the difference between atlas-based and deep-learning auto-contouring?",
    a: "Atlas-based methods deform reference contours from a library of prior cases onto the new patient. Deep-learning methods use convolutional or transformer networks trained on large annotated datasets, generally yielding faster and more robust results — especially on anatomy that varies widely between patients. DLinRT.eu lists only AI/DL-based tools.",
  },
  {
    q: "How do I compare evidence quality across vendors?",
    a: "Use the dual-axis system: Evidence Rigor (E0–E3) measures methodological strength (vendor-independent, multi-center, multi-national, prospective, external validation); Clinical Impact (I0–I5) measures the demonstrated effect on clinical workflow or outcomes.",
  },
  {
    q: "Does AI auto-contouring work on MR and CBCT, or only CT?",
    a: "Many products support MR (essential for MR-Linac workflows) and CBCT (for online adaptive radiotherapy), in addition to planning CT. Modality support is listed per product on DLinRT.eu.",
  },
];

const AiAutoContouringComparison = () => {
  const products = AUTO_CONTOURING_PRODUCTS.filter((p) => hasRegulatoryApproval(p));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "AI Auto-Contouring Tools for Radiotherapy: 2026 Comparison Guide",
        description:
          "Compare CE/FDA-cleared AI auto-contouring software for radiotherapy by vendor, supported structures, evidence rigor, and regulatory status.",
        author: { "@type": "Organization", name: "DLinRT.eu" },
        publisher: { "@type": "Organization", name: "DLinRT.eu" },
        datePublished: "2026-06-10",
        mainEntityOfPage: "https://dlinrt.eu/guides/ai-auto-contouring-comparison",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <PageLayout
      title="AI Auto-Contouring Tools Compared (2026)"
      description="Compare CE/FDA-cleared AI auto-contouring software for radiotherapy: vendors, supported structures, evidence rigor, and regulatory status."
      canonical="https://dlinrt.eu/guides/ai-auto-contouring-comparison"
      structuredData={structuredData}
    >
      <article className="container max-w-4xl py-12">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-wide text-[#5090D0] mb-2">DLinRT Guide</p>
          <h1 className="text-4xl font-bold text-[#1a1a2e] mb-4">
            AI Auto-Contouring Tools for Radiotherapy: 2026 Comparison Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            A vendor-neutral overview of deep-learning auto-contouring software cleared for clinical use
            in radiation oncology — what to compare, how the evidence stacks up, and how to choose a tool
            for your workflow.
          </p>
        </header>

        <section className="prose prose-slate max-w-none mb-10">
          <p>
            Auto-contouring is the delineation of organs at risk and target volumes on planning images.
            Deep-learning models now perform this task in seconds, with growing regulatory backing and a
            rapidly maturing evidence base. DLinRT.eu catalogs every AI/DL product cleared for
            radiotherapy use; this guide summarises how to evaluate and compare them.
          </p>
          <p>
            All products referenced below are listed in the live{" "}
            <Link to="/products" className="text-[#5090D0] underline">DLinRT product catalog</Link>,
            which is peer-reviewed and updated continuously.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-4">How we evaluate auto-contouring tools</h2>
          <ul className="space-y-2 list-disc pl-6 text-slate-700">
            <li>
              <strong>Regulatory approval</strong> — CE (MDR), FDA 510(k), NMPA, TGA, TFDA, PMDA, MFDS,
              Health Canada, ANVISA, or MHRA/UKCA clearance is required for catalog inclusion.
            </li>
            <li>
              <strong>Evidence quality</strong> — dual-axis scoring of Rigor (E0–E3) and Clinical Impact
              (I0–I5). See the{" "}
              <Link to="/evidence-impact-guide" className="text-[#5090D0] underline">
                Evidence &amp; Impact Guide
              </Link>{" "}
              for the full rubric.
            </li>
            <li>
              <strong>Supported structures</strong> — DICOM-RTSTRUCT output, standardised to TG-263
              naming. Compare per-vendor lists with the{" "}
              <Link to="/compare/structures" className="text-[#5090D0] underline">
                Structure Comparison tool
              </Link>.
            </li>
            <li>
              <strong>Deployment &amp; integration</strong> — cloud vs on-premises, TPS/OIS connectivity,
              and DICOM compatibility.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-4">
            Cleared AI auto-contouring tools ({products.length})
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            All products listed below carry CE, FDA, or equivalent regulatory clearance. Click a product
            for full evidence, supported structures, and transparency data.
          </p>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Anatomy</TableHead>
                  <TableHead>Modality</TableHead>
                  <TableHead>Regulatory</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      <Link to={`/product/${p.id}`} className="text-[#5090D0] hover:underline">
                        {p.name}
                      </Link>
                    </TableCell>
                    <TableCell>{p.company}</TableCell>
                    <TableCell className="text-sm">
                      {Array.isArray(p.anatomicalLocation)
                        ? p.anatomicalLocation.slice(0, 3).join(", ")
                        : p.anatomicalLocation || "—"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {Array.isArray(p.modality) ? p.modality.join(", ") : p.modality || "—"}
                    </TableCell>
                    <TableCell className="text-sm">{p.certification || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-4">Key capabilities to compare</h2>

          <h3 className="text-lg font-semibold mt-6 mb-2">Structure coverage</h3>
          <p className="text-slate-700">
            Decide whether you need OAR-only coverage, target-volume support (GTV/CTV), or both. Confirm
            modality fit (CT, MR, CBCT) for your treatment sites and any MR-Linac or adaptive workflows.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Evidence quality</h3>
          <p className="text-slate-700">
            Prefer products with vendor-independent, multi-center, prospective evidence and explicit
            external validation. The Evidence Rigor score (E0–E3) summarises these attributes at a glance.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Workflow integration</h3>
          <p className="text-slate-700">
            Validate DICOM-RTSTRUCT compatibility with your TPS and OIS, supported deployment topology
            (cloud, on-prem, hybrid), and any structure-naming customisation needed for downstream tools.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Regulatory &amp; post-market quality</h3>
          <p className="text-slate-700">
            Check CE-MDR class and FDA 510(k) intended use, plus the vendor's documented post-market
            surveillance and safety corrective-action history (tracked on every DLinRT product page).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-4">Choosing a tool for your clinic</h2>
          <Card className="p-6 bg-slate-50">
            <ul className="space-y-2 list-disc pl-6 text-slate-700">
              <li>
                Match treatment-site mix to vendor specialisation — head &amp; neck, prostate, breast,
                and thorax differ widely in vendor coverage and evidence depth.
              </li>
              <li>
                For MR-Linac or online adaptive workflows, prioritize MR and CBCT support plus low
                inference latency.
              </li>
              <li>
                For research use, prefer tools with open APIs, structure-name customisation, and
                vendor-independent validation studies.
              </li>
              <li>
                For cloud-restricted sites (data-residency or air-gapped), filter to on-premises
                deployments only.
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-slate-700">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="flex flex-wrap gap-3 pt-6 border-t">
          <Button asChild className="bg-[#5090D0] hover:bg-[#3a78b8]">
            <Link to="/products">
              Browse all auto-contouring products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/compare/structures">Compare supported structures</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/evidence-impact-guide">Read the Evidence &amp; Impact Guide</Link>
          </Button>
        </div>
      </article>
    </PageLayout>
  );
};

export default AiAutoContouringComparison;
