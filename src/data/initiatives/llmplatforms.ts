import { Initiative } from "@/types/initiative";

export const LLM_PLATFORM_INITIATIVES: Initiative[] = [
  {
    id: "vllm",
    name: "vLLM",
    category: "LLM Inference Platform",
    description: "A high-throughput and memory-efficient inference engine for large language models. vLLM uses PagedAttention for efficient memory management, enabling fast serving of LLMs for clinical NLP, radiology report generation, and medical AI research applications.",
    website: "https://github.com/vllm-project/vllm",
    organization: "vLLM Project (UC Berkeley)",
    status: "Active",
    tags: ["LLM", "Inference", "Open Source", "GPU Optimization", "Python", "High-Throughput"],
    features: [
      "PagedAttention for efficient KV cache management",
      "OpenAI-compatible API server",
      "Supports 50+ model architectures (LLaMA, Mistral, etc.)",
      "Continuous batching for high throughput",
      "Tensor and pipeline parallelism for multi-GPU"
    ],
    dataAccess: "Freely available via pip install",
    participationInfo: "Open source under Apache 2.0 license"
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "LLM Inference Platform",
    description: "A lightweight framework to run open large language models locally. Ollama simplifies local deployment of LLMs for medical text analysis, clinical decision support, and radiotherapy research, with easy model management and a simple API.",
    website: "https://ollama.com/",
    organization: "Ollama",
    status: "Active",
    tags: ["LLM", "Local Deployment", "Open Source", "Privacy", "Easy Setup", "Cross-Platform"],
    features: [
      "One-command model download and run",
      "Runs LLMs locally for data privacy",
      "REST API for integration",
      "Supports LLaMA, Mistral, Gemma, and many more",
      "Available on macOS, Linux, and Windows"
    ],
    dataAccess: "Freely available; models downloaded on demand",
    participationInfo: "Open source under MIT license"
  }
];
