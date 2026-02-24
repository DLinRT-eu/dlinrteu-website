import React from 'react';
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
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We classify products using a dual-axis system adapted from van Leeuwen et al. (2021, updated 2025), 
              separating <strong>evidence rigor</strong> (E0–E3) from <strong>clinical impact</strong> (I0–I5). 
              The clinical impact axis is cross-referenced with the Fryback & Thornbury hierarchy of diagnostic efficacy (1991). 
              Each product is further assessed on five granular study quality sub-attributes — vendor independence, 
              multi-center, multi-national, prospective design, and external validation — per Pham (2023) and van Leeuwen (2025).
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