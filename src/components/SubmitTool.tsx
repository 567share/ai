import React, { useState } from 'react';
import { X, Sparkles, Globe, Tag, Check, Loader2, Database } from 'lucide-react';
import { BadgeType, Tool } from '../types';
import { CATEGORIES } from '../data/tools';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface SubmitToolProps {
  isOpen: boolean;
  onClose: () => void;
  onToolSubmitted: (newTool: Tool) => void;
}

export const SubmitTool: React.FC<SubmitToolProps> = ({ isOpen, onClose, onToolSubmitted }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [badge, setBadge] = useState<BadgeType>('Freemium');
  const [category, setCategory] = useState(CATEGORIES[1]); // Default to 'Text & Coding'
  const [desc, setDesc] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide a tool name.');
      return;
    }
    if (!url.trim()) {
      setError('Please provide a valid website URL.');
      return;
    }
    if (!desc.trim()) {
      setError('Please provide a brief description.');
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      name: name.trim(),
      url: formattedUrl,
      badge,
      category,
      desc: desc.trim(),
      tags: tags.length > 0 ? tags : ['Community'],
      submitted_by: submittedBy.trim() || 'Anonymous Developer',
      upvotes: 1
    };

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured()) {
        // Real Supabase Insert
        const { data, error: dbError } = await supabase
          .from('tools')
          .insert([payload])
          .select();

        if (dbError) {
          console.error('Supabase insert error:', dbError);
          // Try inserting without tags or submitted_by in case schema is strictly standard columns
          const fallbackPayload = {
            name: name.trim(),
            url: formattedUrl,
            badge,
            category,
            desc: desc.trim()
          };
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('tools')
            .insert([fallbackPayload])
            .select();

          if (fallbackError) {
            throw new Error(dbError.message || fallbackError.message);
          }

          if (fallbackData && fallbackData.length > 0) {
            const inserted = fallbackData[0];
            onToolSubmitted({
              id: inserted.id || Date.now(),
              name: inserted.name,
              url: inserted.url,
              badge: inserted.badge as BadgeType,
              category: inserted.category,
              desc: inserted.desc || inserted.description || desc.trim(),
              upvotes: inserted.upvotes ?? 1,
              tags,
              submittedBy: submittedBy.trim() || 'Anonymous Developer'
            });
          }
        } else if (data && data.length > 0) {
          const inserted = data[0];
          onToolSubmitted({
            id: inserted.id || Date.now(),
            name: inserted.name,
            url: inserted.url,
            badge: inserted.badge as BadgeType,
            category: inserted.category,
            desc: inserted.desc || inserted.description || desc.trim(),
            upvotes: inserted.upvotes ?? 1,
            tags: inserted.tags || tags,
            submittedBy: inserted.submitted_by || inserted.submittedBy || 'Anonymous Developer'
          });
        } else {
          // Local fallback if no data returned
          onToolSubmitted({
            id: Date.now(),
            ...payload,
            submittedBy: payload.submitted_by
          });
        }
      } else {
        // Fallback for when Supabase env vars are placeholder
        onToolSubmitted({
          id: Date.now(),
          name: payload.name,
          url: payload.url,
          badge: payload.badge,
          category: payload.category,
          desc: payload.desc,
          tags: payload.tags,
          submittedBy: payload.submitted_by,
          upvotes: 1
        });
      }

      // Reset form
      setName('');
      setUrl('');
      setDesc('');
      setTagsInput('');
      setSubmittedBy('');
      setError('');
      onClose();
    } catch (err: any) {
      console.error('Failed to submit tool:', err);
      setError(err.message || 'Failed to insert tool into Supabase database. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-zinc-100 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Submit an AI Tool</h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Inserts directly into live Supabase <code className="text-blue-400">tools</code> table</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Tool Name <span className="text-blue-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Gemini Code Assistant"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Website URL <span className="text-blue-400">*</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Pricing Model</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as BadgeType)}
                disabled={isSubmitting}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3 py-2 text-sm text-white outline-none disabled:opacity-50"
              >
                <option value="Free">Free</option>
                <option value="Freemium">Freemium</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3 py-2 text-sm text-white outline-none disabled:opacity-50"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Description <span className="text-blue-400">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Explain what this tool does and key features..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl p-3 text-sm text-white placeholder-zinc-500 outline-none transition-all resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Tags (Comma Separated)</label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="e.g. LLM, Coding, API, Free Tier"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name / Handle (Optional)</label>
            <input
              type="text"
              placeholder="e.g. alex_dev"
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Inserting into Supabase...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Insert Tool</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const SubmitToolModal = SubmitTool;
