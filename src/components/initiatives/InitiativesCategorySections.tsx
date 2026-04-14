
import React from 'react';
import { Brain, Server } from 'lucide-react';
import CategorySection from './CategorySection';
import { Initiative } from '@/types/initiative';

interface InitiativesCategorySectionsProps {
  challenges: Initiative[];
  datasets: Initiative[];
  modelZoos: Initiative[];
  llmPlatforms: Initiative[];
  filteredInitiatives: Initiative[];
}

const InitiativesCategorySections = ({
  challenges,
  datasets,
  modelZoos,
  llmPlatforms,
  filteredInitiatives
}: InitiativesCategorySectionsProps) => {
  return (
    <>
      <CategorySection title="Grand Challenges" initiatives={challenges} />
      <CategorySection title="Open Datasets" initiatives={datasets} />
      <CategorySection title="Model Zoos" initiatives={modelZoos} icon={<Brain className="h-5 w-5 text-[#00A6D6]" />} />
      <CategorySection title="LLM Inference Platforms" initiatives={llmPlatforms} icon={<Server className="h-5 w-5 text-[#00A6D6]" />} />

      {filteredInitiatives.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-700">No initiatives found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search terms or filters to see more results.</p>
        </div>
      )}
    </>
  );
};

export default InitiativesCategorySections;
