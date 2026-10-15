export const PRODUCT_ALIASES: Readonly<Record<string, string>> = {
  "therapanacea-art-plan": "therapanacea-art-plan-segmentation",
  "therapanacea-annotate": "therapanacea-art-plan-segmentation",
  "therapanacea-tumorbox": "therapanacea-art-plan-segmentation",
  "therapanacea-brachybox": "therapanacea-art-plan-segmentation",
  "mr-box-synthetic": "therapanacea-art-plan-segmentation",
  "therapanacea-smartfuse": "therapanacea-art-plan-segmentation",
  "therapanacea-smartplan": "therapanacea-art-plan-planning",
  "therapanacea-adaptbox": "therapanacea-art-plan-adaptive",
  "therapanacea-tumorbox-pipeline": "therapanacea-art-plan-segmentation",
  "therapanacea-brachybox-pipeline": "therapanacea-art-plan-segmentation",
  "therapanacea-smartplan-pipeline": "therapanacea-art-plan-planning",
};

export const resolveProductId = (id: string): string => PRODUCT_ALIASES[id] ?? id;