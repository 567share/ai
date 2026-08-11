"use client";
import React, { useState } from 'react';

// Seed data for your AI directory
const INITIAL_TOOLS = [
  { id: 1, name: "Google AI Studio", url: "https://google.com", badge: "Free", desc: "Access Gemini models with massive context windows for prototyping.", category: "Text & Coding" },
  { id: 2, name: "Vercel v0", url: "https://v0.dev", badge: "Freemium", desc: "Generate complete frontend UI layouts and code components using text prompts.", category: "Design & UI" },
  { id: 3, name: "Hugging Face Spaces", url: "https://huggingface.co", badge: "Free", desc: "Explore and test thousands of community-hosted open-source AI models.", category: "Developer Tools" },
  { id: 4, name: "Photoroom", url: "https://photoroom.com", badge: "Freemium", desc: "Studio-quality background removal and batch asset editing in seconds.", category: "Images & Creative" },
  { id: 5, name: "Cursor", url: "https://cursor.com", badge: "Freemium", desc: "AI-first code editor designed for pair programming and codebase indexing.", category: "Text & Coding" },
  { id: 6, name: "Midjourney", url: "https://midjourney.com", badge: "Paid", desc: "State-of-the-art text-to-image generator via Discord and web app dashboards.", category: "Images & Creative" }
];

const CATEGORIES = ["All", "Text & Coding", "Images & Creative", "Design & UI", "Developer Tools"];

export default function AIDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering logic
  const filteredTools = INITIAL_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500 selection:text-white antialiased">
      {/* Structural Top Banner */}
      <header className="border-b border-zinc-900 bg-zinc-900/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">AI</div>
            <span className="font-bold tracking-tight text-lg">ai.56701234.xyz</span>
          </div>
          <a href="#submit" className="text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg transition-colors border border-zinc-700/50">
            Submit a Tool
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Value Proposition Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            The Ultimate AI Toolkit
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            A highly curated repository of top-tier AI applications, developer SDKs, and workflow tools designed to maximize your efficiency.
          </p>
        </section>

        {/* Dynamic Controls Grid */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-zinc-900">
          {/* Search Field */}
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Search tools or features..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-zinc-500 text-white"
            />
          </div>

          {/* Inline Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap border ${
                  selectedCategory === category 
                    ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/10" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Primary Layout Engine */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <article 
                key={tool.id} 
                className="group p-5 border border-zinc-900 bg-zinc-900/30 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-bold tracking-tight text-base group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      tool.badge === 'Free' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      tool.badge === 'Freemium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-900/80 pt-4 mt-auto">
                  <span className="text-[11px] font-medium text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-semibold text-blue-400 flex items-center group-hover:translate-x-0.5 transition-transform"
                  >
                    Open Application <span className="ml-1 text-sm font-light">→</span>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-sm">No matching tools discovered. Try resetting your active filters.</p>
            </div>
          )}
        </section>

        {/* Future Expansion Callout */}
        <section id="submit" className="mt-24 p-8 border border-zinc-900 bg-gradient-to-b from-zinc-900/40 to-transparent rounded-2xl max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Have a Tool to Feature?</h2>
          <p className="text-zinc-400 text-xs leading-relaxed mb-5">
            Submit a GitHub link or production landing page to expand the index. All software must offer open APIs or clear developer utility rules.
          </p>
          <button onClick={() => alert("Submission integration coming soon!")} className="w-full sm:w-auto bg-white text-zinc-950 font-semibold text-xs px-6 py-2.5 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg">
            Submit Application Details
          </button>
        </section>
      </main>
    </div>
  );
}