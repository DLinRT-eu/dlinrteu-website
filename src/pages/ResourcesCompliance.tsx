import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import TaxonomyDiagram from '@/components/resources/TaxonomyDiagram';
import ClinicalTasksGlossary from '@/components/resources/ClinicalTasksGlossary';
import EvidenceLevelTable from '@/components/resources/EvidenceLevelTable';
import EvidencePyramid from '@/components/resources/EvidencePyramid';
import PurposeSection from '@/components/resources/PurposeSection';
import RegulatoryLandscape from '@/components/resources/RegulatoryLandscape';
import StandardsGuidelines from '@/components/resources/StandardsGuidelines';
import ComplianceChecklist from '@/components/resources/ComplianceChecklist';
import CoreDocuments from '@/components/resources/CoreDocuments';
import ResourceLinks from '@/components/resources/ResourceLinks';
import DisclaimerBox from '@/components/resources/DisclaimerBox';
import PageIndex from '@/components/resources/PageIndex';

const ResourcesCompliance = () => {
  return (
    <PageLayout
      title="Resources & compliance"
      description="Access regulatory guidance for deploying AI in radiotherapy. Explore EU MDR, AI Act, FDA pathways, compliance checklists, and standards for clinical deep learning deployment."
      canonical="https://dlinrt.eu/resources-compliance"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Resources & compliance - DLinRT.eu",
        "description": "Essential regulatory and practical resources for deploying deep-learning solutions in clinical radiotherapy workflows",
        "url": "https://dlinrt.eu/resources-compliance"
      }}
    >
      <div className="bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Resources & compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This page provides both foundational knowledge and practical compliance guidance for AI in radiotherapy. 
              Learn about our classification taxonomy, understand clinical tasks, and access essential regulatory 
              resources for deploying deep-learning solutions in clinical workflows.
            </p>
          </div>

          {/* Quick Navigation Index */}
          <PageIndex />

          {/* Platform Scope Note */}
          <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-5 text-sm text-gray-700">
            <p>
              <strong>Platform scope:</strong> DLinRT catalogues products that use AI/Deep Learning (neural networks) 
              for core clinical functions in radiotherapy, including QA tools that explicitly reference AI-generated outputs. 
              See the full{' '}
              <Link to="/products" className="text-[#00A6D6] hover:underline font-medium">
                inclusion criteria on the Products page
              </Link>.
            </p>
          </div>

          {/* Classification Taxonomy Section */}
          <section id="classification-taxonomy" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our classification taxonomy
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              How we organize AI solutions in radiotherapy
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              To help you navigate the landscape, we categorize solutions based on a multi-layered 
              taxonomy. This allows for precise filtering and discovery.
            </p>
            <TaxonomyDiagram />
          </section>

          {/* Clinical Tasks Glossary */}
          <section id="clinical-tasks" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Glossary of clinical tasks
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Defining AI's role in the clinic
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              AI applications are defined by the clinical task they perform. Below is a glossary 
              of common tasks you will encounter on our platform.
            </p>
            <ClinicalTasksGlossary />
          </section>

          {/* Evidence Level Classification */}
          <section id="evidence-levels" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Evidence level classification
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Evaluating scientific evidence for radiotherapy AI
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We classify products using a dual-axis system adapted from van Leeuwen et al. (2021, updated 2025), 
              separating <strong>evidence rigor</strong> (E0–E3) from <strong>clinical impact</strong> (I0–I5). 
              The clinical impact axis is cross-referenced with the Fryback &amp; Thornbury hierarchy of diagnostic efficacy (1991). 
              Each product is further assessed on five granular study quality sub-attributes — vendor independence, 
              multi-center, multi-national, prospective design, and external validation — per Pham (2023) and van Leeuwen (2025).
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              As an internally proposed DLinRT extension, the matrix is augmented with a <strong>third axis — Implementation &amp; Assurance Burden (Z0–Z5)</strong> — 
              capturing the residual effort required for clinical adoption (commissioning, local validation, workflow redesign, monitoring, governance).
              Lower Z indicates higher readiness. Toggle the visualisation below between <strong>2D</strong> (Rigor × Impact) and <strong>3D</strong> (Rigor × Impact × Burden) to explore the full E/I/Z framework.
            </p>
            
            {/* Pyramid Visualization */}
            <div className="mb-10">
              <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Evidence Hierarchy Pyramid</h4>
              <EvidencePyramid />
            </div>
            
            {/* Detailed Table */}
            <h4 className="text-lg font-semibold text-foreground mb-4">Detailed Level Definitions</h4>
            <EvidenceLevelTable />
          </section>

          {/* Purpose & Regulatory Summary */}
          <section id="regulatory-overview" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Regulatory overview
            </h2>
            <PurposeSection />
          </section>

          {/* Regulatory Landscape Quick Guide */}
          <section id="regulatory-landscape" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Regulatory landscape — quick guide
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              EU and US regulatory pathways for medical AI
            </h3>
            <RegulatoryLandscape />
          </section>

          {/* Standards & Guidelines */}
          <section id="standards-guidelines" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Standards, guidelines & principles
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Practical targets for implementation
            </h3>
            <StandardsGuidelines />
          </section>

          {/* HTA Guidance */}
          <section id="hta-guidance" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              HTA guidance for AI in radiotherapy
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Preparing for Joint Clinical Assessment under EU HTAR (2021/2282)
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Health Technology Assessment (HTA) bodies evaluate AI tools across more dimensions than regulators do.
              Beyond CE/FDA clearance, an HTA dossier must answer questions about <strong>clinical effectiveness</strong>,
              <strong> safety</strong>, <strong>organisational impact</strong>, <strong>ethical/legal aspects</strong> and
              <strong> costs</strong>. The EU HTA Regulation (HTAR, 2021/2282) introduced the
              {' '}<strong>Joint Clinical Assessment (JCA)</strong> at EU level — staged scope covers oncology medicines
              and ATMPs from January 2025, with medical devices (including AI/SaMD) following.
            </p>

            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">How DLinRT fields map to EUnetHTA Core Model domains</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-4 font-semibold">Domain</th>
                      <th className="py-2 pr-4 font-semibold">DLinRT fields</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="py-2 pr-4 font-mono text-xs">CUR</td><td className="py-2 pr-4">Intended use, target indication, anatomy, modality, clinical task</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">TEC</td><td className="py-2 pr-4">Key features, technical specs, AI/model details, dose prediction models</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">EFF</td><td className="py-2 pr-4">Evidence rigor (E0–E3), clinical impact (I0–I5), evaluation dataset, study quality</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">SAF</td><td className="py-2 pr-4">Supported structures (with status flags), limitations, safety/corrective actions</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">ETH</td><td className="py-2 pr-4">Training data sources, demographics, public datasets, disclosure level</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">ORG</td><td className="py-2 pr-4">Deployment model, integration, market presence</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs">LEG</td><td className="py-2 pr-4">CE / FDA / TGA / TFDA status, MDR class, intended use statement, guidelines</td></tr>
                    <tr><td className="py-2 pr-4 font-mono text-xs text-muted-foreground">ECO</td><td className="py-2 pr-4 text-muted-foreground">Not collected — combine with vendor quotations and local cost data</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 underline"
                >
                  Download an HTA dossier from the Products page →
                </Link>
                <span className="text-muted-foreground">|</span>
                <a
                  href="#resources-library"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 underline"
                >
                  Browse HTA resources below
                </a>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Note:</strong> DLinRT does not collect pricing or budget-impact data. The HTA dossier export is
              informational only and does not substitute for an official JCA submission or national HTA dossier.
            </div>
          </section>

          {/* Practical Compliance Checklist */}
          <section id="compliance-checklist" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Practical compliance checklist
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              For DL teams preparing clinical deployment
            </h3>
            <ComplianceChecklist />
          </section>

          {/* Core Documents & References */}
          <section id="core-documents" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Core documents & references
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Essential starting points — start here
            </h3>
            <CoreDocuments />
          </section>

          {/* Extended Resources Library */}
          <section id="resources-library" className="mb-16 scroll-mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Extended resources library
            </h2>
            <h3 className="text-xl text-muted-foreground mb-8">
              Comprehensive collection of authoritative sources
            </h3>
            <ResourceLinks />
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="scroll-mt-20">
            <DisclaimerBox />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourcesCompliance;