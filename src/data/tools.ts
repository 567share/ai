import { Tool } from '../types';

export const INITIAL_TOOLS: Tool[] = [
  {
    id: 1,
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    badge: "Free",
    desc: "Access Gemini models with massive context windows for rapid prototyping and app development.",
    category: "Text & Coding",
    upvotes: 342,
    tags: ["Gemini", "API", "LLM", "Multimodal"],
    featured: true
  },
  {
    id: 2,
    name: "Vercel v0",
    url: "https://v0.dev",
    badge: "Freemium",
    desc: "Generate complete frontend UI layouts and code components using text prompts and Shadcn UI.",
    category: "Design & UI",
    upvotes: 289,
    tags: ["React", "Tailwind", "UI Generation"],
    featured: true
  },
  {
    id: 3,
    name: "Hugging Face Spaces",
    url: "https://huggingface.co/spaces",
    badge: "Free",
    desc: "Explore and test thousands of community-hosted open-source AI models and interactive Gradio apps.",
    category: "Developer Tools",
    upvotes: 215,
    tags: ["Open Source", "Gradio", "PyTorch"],
    featured: false
  },
  {
    id: 4,
    name: "Photoroom",
    url: "https://photoroom.com",
    badge: "Freemium",
    desc: "Studio-quality background removal, automatic product staging, and batch asset editing in seconds.",
    category: "Images & Creative",
    upvotes: 178,
    tags: ["E-commerce", "Background Removal", "Assets"],
    featured: false
  },
  {
    id: 5,
    name: "Cursor",
    url: "https://cursor.com",
    badge: "Freemium",
    desc: "AI-first code editor designed for pair programming, codebase indexing, and instant multi-file editing.",
    category: "Text & Coding",
    upvotes: 412,
    tags: ["IDE", "VSCode", "Autocompletion"],
    featured: true
  },
  {
    id: 6,
    name: "Midjourney",
    url: "https://midjourney.com",
    badge: "Paid",
    desc: "State-of-the-art text-to-image generator via Discord and web app dashboards for photorealistic art.",
    category: "Images & Creative",
    upvotes: 356,
    tags: ["Image Generation", "Art", "Photorealism"],
    featured: true
  },
  {
    id: 7,
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    badge: "Freemium",
    desc: "Hyper-realistic AI voice generator, voice cloning, and text-to-speech engine across 30+ languages.",
    category: "Productivity & Audio",
    upvotes: 264,
    tags: ["Voice Synthesis", "TTS", "Audio"],
    featured: false
  },
  {
    id: 8,
    name: "Perplexity AI",
    url: "https://perplexity.ai",
    badge: "Freemium",
    desc: "Conversational answer engine delivering real-time web search with cited source references.",
    category: "Text & Coding",
    upvotes: 310,
    tags: ["Search", "Research", "Citations"],
    featured: false
  },
  {
    id: 9,
    name: "Replicate",
    url: "https://replicate.com",
    badge: "Freemium",
    desc: "Run open-source machine learning models in the cloud with a simple HTTP API endpoint.",
    category: "Developer Tools",
    upvotes: 195,
    tags: ["API", "Cloud Inference", "Llama"],
    featured: false
  }
];

export const CATEGORIES: string[] = [
  "All",
  "Text & Coding",
  "Images & Creative",
  "Design & UI",
  "Developer Tools",
  "Productivity & Audio"
];
