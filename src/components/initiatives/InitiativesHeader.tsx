import React from 'react';
import { Beaker, Info } from 'lucide-react';
import SEO from '@/components/SEO';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const InitiativesHeader = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Research Initiatives in Radiotherapy",
    "description": "Explore research initiatives, open datasets, model zoos, and grand challenges in radiotherapy.",
    "url": "https://dlinrt.eu/initiatives",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    }
  };
  return <>
      <SEO title="Research Initiatives & Open Datasets - AI Radiotherapy Resources" description="Discover research initiatives, open datasets, model zoos, and grand challenges for radiotherapy AI. Access resources to accelerate deep learning innovation." canonical="https://dlinrt.eu/initiatives" structuredData={structuredData} />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Beaker className="h-8 w-8 text-[#9b87f5]" />
          <h1 className="text-3xl font-bold text-gray-900">Research Initiatives</h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl">Discover resources for AI/Deep Learning development in radiotherapy: grand challenges with standardized benchmarks, open datasets with RT structures and dose distributions, and model zoos with pre-trained models or frameworks to facilitate model preparation. All resources are freely accessible for research.</p>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Info className="h-4 w-4" />
            <span className="underline underline-offset-2">Inclusion criteria</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground max-w-3xl space-y-2">
              <p><strong className="text-foreground">Grand Challenges:</strong> Competitive benchmarks targeting radiotherapy AI tasks (segmentation, treatment planning, image synthesis, dose prediction) with standardized evaluation and published results, organized by recognized scientific bodies (MICCAI, ESTRO, AAPM, or equivalent).</p>
              <p><strong className="text-foreground">Open Datasets:</strong> Freely accessible datasets containing radiotherapy-specific data (RT structures, dose distributions, treatment plans) or imaging data explicitly intended for RT AI development.</p>
              <p><strong className="text-foreground">Model Zoos:</strong> Collections of multiple pre-trained models (not single models or training frameworks) applicable to medical imaging tasks relevant to radiotherapy, openly accessible for research use.</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>;
};
export default InitiativesHeader;
