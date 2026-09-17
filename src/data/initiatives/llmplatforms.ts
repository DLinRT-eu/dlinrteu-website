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
    lastVerified: "2026-09-16",
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
    lastVerified: "2026-09-16",
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
  },
  {
    id: "huggingface-tgi",
    name: "Text Generation Inference (TGI)",
    category: "LLM Inference Platform",
    description: "Hugging Face's production-oriented serving toolkit for large language models. TGI deploys a wide range of open models from the Hugging Face Hub behind a single API, which suits on-premise hosting of clinical text and report-generation models.",
    website: "https://github.com/huggingface/text-generation-inference",
    organization: "Hugging Face",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["LLM", "Inference", "Open Source", "Serving", "Rust", "Hugging Face Hub"],
    features: [
      "Serves many open model architectures from the Hugging Face Hub",
      "Continuous batching of incoming requests",
      "Token streaming via Server-Sent Events",
      "Quantisation support (bitsandbytes, GPT-Q, AWQ)",
      "Tensor parallelism for multi-GPU deployment",
      "Prometheus metrics and OpenTelemetry tracing"
    ],
    dataAccess: "Freely available as source and prebuilt container images",
    participationInfo: "Open source under Apache 2.0 license"
  },
  {
    id: "llama-cpp",
    name: "llama.cpp",
    category: "LLM Inference Platform",
    description: "A portable C/C++ inference library for large language models in the GGUF format. It runs many open model families on CPU or GPU across common desktop and server hardware, which enables fully local, offline analysis of sensitive clinical text.",
    website: "https://github.com/ggml-org/llama.cpp",
    organization: "ggml.ai and contributors",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["LLM", "Local Deployment", "Open Source", "CPU Inference", "GGUF", "Quantization"],
    features: [
      "Supports many open model families through the GGUF format",
      "Runs on CPU only, or with CUDA, Metal, Vulkan and ROCm acceleration",
      "Integer quantisation to reduce memory footprint",
      "Built-in OpenAI-compatible HTTP server",
      "Minimal dependencies and cross-platform builds"
    ],
    dataAccess: "Freely available as source; models downloaded separately",
    participationInfo: "Open source under MIT license"
  },
  {
    id: "sglang",
    name: "SGLang",
    category: "LLM Inference Platform",
    description: "A serving runtime and programming interface for large language and vision-language models. SGLang hosts many open model architectures and targets structured, multi-step generation, which is useful for extraction and reporting tasks over clinical documents.",
    website: "https://github.com/sgl-project/sglang",
    organization: "SGLang Project (LMSYS and contributors)",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["LLM", "Inference", "Open Source", "Serving", "Vision-Language", "Structured Output"],
    features: [
      "Serves a broad set of open LLM and vision-language models",
      "RadixAttention prefix caching for repeated prompts",
      "Structured and constrained decoding (JSON, grammars)",
      "Continuous batching with tensor and data parallelism",
      "OpenAI-compatible API server"
    ],
    dataAccess: "Freely available via pip install and container images",
    participationInfo: "Open source under Apache 2.0 license"
  },
  {
    id: "lm-studio",
    name: "LM Studio",
    category: "LLM Inference Platform",
    description: "A desktop application for discovering, downloading and running open large language models locally. It provides a graphical interface and a local server, letting researchers evaluate several models on clinical text without sending data off the workstation.",
    website: "https://lmstudio.ai/",
    organization: "Element Labs (LM Studio)",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["LLM", "Local Deployment", "Privacy", "Desktop Application", "Cross-Platform", "Freeware"],
    features: [
      "Browse and download many open models from within the application",
      "Local OpenAI-compatible server for integration",
      "Runs GGUF and MLX model formats",
      "Chat interface with document attachment",
      "Available on macOS, Windows and Linux"
    ],
    dataAccess: "Free to download; closed-source application with an open-source CLI and SDKs",
    participationInfo: "Free for personal and, per the vendor's terms, work use"
  },
  {
    id: "nvidia-nim",
    name: "NVIDIA NIM",
    category: "LLM Inference Platform",
    description: "A set of containerised inference microservices for a catalogue of open and NVIDIA-optimised models, including language, vision and biomedical models. NIM containers can be self-hosted on local or institutional GPU infrastructure.",
    website: "https://developer.nvidia.com/nim",
    organization: "NVIDIA",
    status: "Active",
    lastVerified: "2026-09-16",
    tags: ["LLM", "Inference", "Containers", "GPU Optimization", "Commercial", "Self-Hosted"],
    features: [
      "Prebuilt containers for a catalogue of language, vision and biomedical models",
      "OpenAI-compatible API endpoints",
      "Optimised runtimes built on TensorRT-LLM and Triton",
      "Deployable on-premise or in the cloud via Kubernetes/Helm",
      "Hosted API endpoints for evaluation before self-hosting"
    ],
    dataAccess: "Free evaluation through the NVIDIA API catalogue; self-hosted deployment requires an NVIDIA AI Enterprise licence",
    participationInfo: "Commercial product; free for development use under the NVIDIA Developer Program terms"
  }
];
