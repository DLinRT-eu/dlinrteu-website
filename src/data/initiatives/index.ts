
import { CHALLENGE_INITIATIVES } from './challenges';
import { DATASET_INITIATIVES } from './datasets';
import { MODEL_ZOO_INITIATIVES } from './modelzoo';
import { LLM_PLATFORM_INITIATIVES } from './llmplatforms';
import { Initiative } from '@/types/initiative';

export const ALL_INITIATIVES: Initiative[] = [
  ...CHALLENGE_INITIATIVES,
  ...DATASET_INITIATIVES,
  ...MODEL_ZOO_INITIATIVES,
  ...LLM_PLATFORM_INITIATIVES
];

export {
  CHALLENGE_INITIATIVES,
  DATASET_INITIATIVES,
  MODEL_ZOO_INITIATIVES,
  LLM_PLATFORM_INITIATIVES
};
