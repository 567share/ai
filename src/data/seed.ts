import { supabase } from '../lib/supabase';

const EXPANDED_TOOLS = [
  // === Text & Coding ===
  {
    id: 1,
    name: "Google AI Studio",
    url: "https://google.com",
    badge: "Free",
    desc: "Access Gemini models with massive context windows for rapid prototyping and app development.",
    category: "Text & Coding",
    upvotes: 342,
    tags: ["Gemini", "API", "LLM", "Multimodal"],
    featured: true
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
    id: 10,
    name: "ChatGPT",
    url: "https://chatgpt.com",
    badge: "Freemium",
    desc: "OpenAI's flagship conversational interface powered by advanced Reasoning models for complex tasks.",
    category: "Text & Coding",
    upvotes: 520,
    tags: ["Chatbot", "GPT-4o", "Reasoning"],
    featured: true
  },
  {
    id: 11,
    name: "Claude AI",
    url: "https://claude.ai",
    badge: "Freemium",
    desc: "Anthropic's flagship chatbot known for advanced coding help, reasoning, and articulate writing.",
    category: "Text & Coding",
    upvotes: 489,
    tags: ["Anthropic", "Coding", "Writing"],
    featured: true
  },
  {
    id: 12,
    name: "DeepSeek",
    url: "https://deepseek.com",
    badge: "Free",
    desc: "Open-source reasoning models providing highly cost-efficient math, code, and logical analysis.",
    category: "Text & Coding",
    upvotes: 467,
    tags: ["OpenSource", "Reasoning", "Math"],
    featured: true
  },

  // === Design & UI ===
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
    id: 13,
    name: "Figma AI",
    url: "https://figma.com",
    badge: "Freemium",
    desc: "AI utility layer built inside Figma to generate wireframes, replace placeholder text, and automate layouts.",
    category: "Design & UI",
    upvotes: 198,
    tags: ["Design", "Prototyping", "UIUX"],
    featured: false
  },
  {
    id: 14,
    name: "Galileo AI",
    url: "https://usegalileo.ai",
    badge: "Freemium",
    desc: "Generates high-fidelity user interface screens and mobile apps instantly from text descriptions.",
    category: "Design & UI",
    upvotes: 243,
    tags: ["UI Generation", "Figma Export", "WebDesign"],
    featured: false
  },
  {
    id: 15,
    name: "Relume",
    url: "https://relume.io",
    badge: "Freemium",
    desc: "AI sitemap and wireframe layout builder built to design responsive web layouts in minutes.",
    category: "Design & UI",
    upvotes: 165,
    tags: ["Sitemaps", "Wireframes", "Webflow"],
    featured: false
  },

  // === Developer Tools ===
  {
    id: 3,
    name: "Hugging Face Spaces",
    url: "https://huggingface.co",
    badge: "Free",
    desc: "Explore and test thousands of community-hosted open-source AI models and interactive Gradio apps.",
    category: "Developer Tools",
    upvotes: 215,
    tags: ["Open Source", "Gradio", "PyTorch"],
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
  },
  {
    id: 16,
    name: "LangChain",
    url: "https://langchain.com",
    badge: "Free",
    desc: "Open-source developer framework designed to chain LLMs, memory architectures, and external vectors.",
    category: "Developer Tools",
    upvotes: 382,
    tags: ["Agents", "Chaining", "Python"],
    featured: true
  },
  {
    id: 17,
    name: "Ollama",
    url: "https://ollama.com",
    badge: "Free",
    desc: "Run powerful local open-source LLMs like Llama 3 and Mistral completely offline on your computer.",
    category: "Developer Tools",
    upvotes: 450,
    tags: ["LocalLLM", "Privacy", "MacWindows"],
    featured: true
  },
  {
    id: 18,
    name: "Pinecone",
    url: "https://pinecone.io",
    badge: "Freemium",
    desc: "Cloud-native vector database infrastructure built for fast RAG search and AI agent matching pipelines.",
    category: "Developer Tools",
    upvotes: 189,
    tags: ["VectorDB", "RAG", "Embeddings"],
    featured: false
  },
  {
    id: 19,
    name: "Groq",
    url: "https://groq.com",
    badge: "Freemium",
    desc: "LPU inference engine delivering lightning-fast token generation speeds for open-source intelligence.",
    category: "Developer Tools",
    upvotes: 394,
    tags: ["Hardware", "Speed", "Inference"],
    featured: true
  },

  // === Images & Creative ===
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
    id: 20,
    name: "Runway Gen-3",
    url: "https://runwayml.com",
    badge: "Paid",
    desc: "Next-generation video generation model producing hyper-realistic motion controls and film assets.",
    category: "Images & Creative",
    upvotes: 312,
    tags: ["VideoGen", "TextToVideo", "Cinematic"],
    featured: true
  },
  {
    id: 21,
    name: "Magnific AI",
    url: "https://magnific.ai",
    badge: "Paid",
    desc: "Advanced AI image upscaler and enhancer adding dramatic details and clarity to digital photos.",
    category: "Images & Creative",
    upvotes: 254,
    tags: ["Upscaling", "Enhancement", "Textures"],
    featured: false
  },
  {
    id: 22,
    name: "Krea AI",
    url: "https://krea.ai",
    badge: "Freemium",
    desc: "Real-time structural canvas image generation and screen-to-image styling pipelines.",
    category: "Images & Creative",
    upvotes: 210,
    tags: ["RealTime", "Canvas", "Creative"],
    featured: false
  },
  {
    id: 23,
    name: "Luma Dream Machine",
    url: "https://lumalabs.ai",
    badge: "Freemium",
    desc: "High-speed cinematic video generator that creates fluid camera pans and character animations.",
    category: "Images & Creative",
    upvotes: 295,
    tags: ["VideoGen", "Cinematic", "3DPhysics"],
    featured: false
  },

  // === Productivity & Audio ===
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
    id: 24,
    name: "Suno AI",
    url: "https://suno.com",
    badge: "Freemium",
    desc: "Generate complete, studio-quality songs with full vocals and instrumentation from a simple prompt.",
    category: "Productivity & Audio",
    upvotes: 415,
    tags: ["MusicGen", "Songwriting", "Vocals"],
    featured: true
  },
  {
    id: 25,
    name: "Udio",
    url: "https://udio.com",
    badge: "Freemium",
    desc: "Music generation system creating rich acoustic instrumentation, clean master tracks, and spatial mixes.",
    category: "Productivity & Audio",
    upvotes: 320,
    tags: ["Music", "Vocals", "Acoustics"],
    featured: false
  },
  {
    id: 26,
    name: "Notion AI",
    url: "https://notion.so",
    badge: "Paid",
    desc: "Integrated workspace helper that summarizes internal documents, schedules tasks, and answers page context queries.",
    category: "Productivity & Audio",
    upvotes: 184,
    tags: ["Workspace", "Summarization", "Notes"],
    featured: false
  },
  {
    id: 27,
    name: "v0.vc / Fireflies",
    url: "https://fireflies.ai",
    badge: "Freemium",
    desc: "Automated video call notebook tracking assistant that records, transcribes, and extracts key action items.",
    category: "Productivity & Audio",
    upvotes: 142,
    tags: ["MeetingNotes", "Transcription", "CRM"],
    featured: false
  },
  {
    id: 28,
    name: "Gamma",
    url: "https://gamma.app",
    badge: "Freemium",
    desc: "Generate beautiful modern document decks, interactive slide presentations, and webpages via text descriptions.",
    category: "Productivity & Audio",
    upvotes: 277,
    tags: ["Presentations", "Slides", "PitchDecks"],
    featured: false
  },
  {
    id: 29,
    name: "Otter.ai",
    url: "https://otter.ai",
    badge: "Freemium",
    desc: "Real-time speech to text layout engine featuring automated audio tag logs and speaker separation tracking.",
    category: "Productivity & Audio",
    upvotes: 168,
    tags: ["Audio", "Transcription", "Business"],
    featured: false
  },
  {
    id: 30,
    name: "AudioCraft",
    url: "https://meta.com",
    badge: "Free",
    desc: "Meta's open-source library utilizing generative deep learning audio models for sound effects and tracks.",
    category: "Productivity & Audio",
    upvotes: 153,
    tags: ["OpenSource", "SoundFX", "Meta"],
    featured: false
    }
];
async function seedDatabase() {
    console.log('🚀 Clearing old entries and uploading expanded seed list...');
    
// Clean up your database row space so it doesn't create duplicate ID blocks
await supabase.from('tools').delete().neq('id', 0);

const { data, error } = await supabase.from('tools').insert(EXPANDED_TOOLS);

if (error) {
    console.error('❌ Data seed failed:', error.message);
} else {
    console.log('✅ Success! 30 popular tools have been successfully uploaded to your table grid.');
}
}
seedDatabase();