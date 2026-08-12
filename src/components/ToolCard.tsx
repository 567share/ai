import React, { useState } from 'react';
import { ArrowRight, Bookmark, Plus, Sparkles, ThumbsUp } from 'lucide-react';
import { Tool, cleanTags } from '../types';
import { Language, translations } from '../lib/i18n';
import { translateCategory, translateBadge, translateTag } from '../data/toolTranslations';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
  onUpvote: (e: React.MouseEvent, id: number) => void;
  isUpvoted: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: number) => void;
  isBookmarked: boolean;
  language?: Language;
  onAddTag?: (toolId: number, tag: string) => Promise<boolean>;
  onSelectTag?: (tag: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onSelect,
  onUpvote,
  isUpvoted,
  onToggleBookmark,
  isBookmarked,
  language = 'en',
  onAddTag,
  onSelectTag
}) => {
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isSubmittingTag, setIsSubmittingTag] = useState(false);
  const t = translations[language] || translations.en;

  const handleInlineTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tagInput.trim() || !onAddTag || isSubmittingTag) return;

    setIsSubmittingTag(true);
    try {
      const success = await onAddTag(tool.id, tagInput.trim());
      if (success) {
        setTagInput('');
        setShowTagInput(false);
      }
    } finally {
      setIsSubmittingTag(false);
    }
  };

  const getTranslatedBadge = (badge: string) => translateBadge(badge, language);
  const getTranslatedCategory = (cat: string) => translateCategory(cat, language);

  return (
    <article 
      onClick={() => onSelect(tool)}
      className="group p-5 border border-zinc-900 bg-zinc-900/30 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/70 transition-all flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex items-center gap-2">
            {tool.featured && (
              <span className="p-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-md" title={t.featured}>
                <Sparkles className="w-3 h-3" />
              </span>
            )}
            <h3 className="text-white font-bold tracking-tight text-base group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
              tool.badge === 'Free' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
              tool.badge === 'Freemium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {getTranslatedBadge(tool.badge)}
            </span>

            <button
              onClick={(e) => onToggleBookmark(e, tool.id)}
              className={`p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors ${
                isBookmarked ? 'text-amber-400 bg-amber-500/10' : 'hover:bg-zinc-800'
              }`}
              title={isBookmarked ? "Remove bookmark" : "Save bookmark"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {tool.desc}
        </p>

        <div className="flex flex-wrap gap-1 items-center mb-4 min-h-[24px]">
          {cleanTags(tool.tags).slice(0, 3).map((tag, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                if (onSelectTag) {
                  e.stopPropagation();
                  onSelectTag(tag);
                }
              }}
              className="text-[10px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 font-medium bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800 transition-colors"
            >
              #{translateTag(tag, language)}
            </button>
          ))}
          {cleanTags(tool.tags).length > 3 && (
            <span className="text-[10px] text-zinc-600 bg-zinc-900/50 px-1.5 py-0.5 rounded">
              +{cleanTags(tool.tags).length - 3}
            </span>
          )}

          {onAddTag && !showTagInput && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTagInput(true);
              }}
              className="text-[10px] text-zinc-500 hover:text-blue-400 bg-zinc-900/50 hover:bg-zinc-800/80 px-1.5 py-0.5 rounded border border-dashed border-zinc-800 hover:border-blue-500/40 flex items-center gap-0.5 transition-colors"
              title={t.addTag}
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{t.addTag}</span>
            </button>
          )}

          {onAddTag && showTagInput && (
            <form onSubmit={handleInlineTagSubmit} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
              <input
                type="text"
                placeholder={t.addTagPlaceholder}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                disabled={isSubmittingTag}
                autoFocus
                className="text-[10px] bg-zinc-950 border border-zinc-700 focus:border-blue-500 focus:outline-none rounded px-1.5 py-0.5 text-white placeholder:text-zinc-600 w-24"
              />
              <button
                type="submit"
                disabled={isSubmittingTag || !tagInput.trim()}
                className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-medium px-1.5 py-0.5 rounded disabled:opacity-50"
              >
                {isSubmittingTag ? '...' : t.addTagBtn}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-900/80 pt-4 mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-zinc-500 bg-zinc-900 px-2 py-1 rounded">
            {getTranslatedCategory(tool.category)}
          </span>

          <button
            onClick={(e) => onUpvote(e, tool.id)}
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-all border ${
              isUpvoted 
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30 font-semibold' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <ThumbsUp className={`w-3 h-3 ${isUpvoted ? 'fill-blue-400' : ''}`} />
            <span>{tool.upvotes}</span>
          </button>
        </div>

        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-semibold text-blue-400 flex items-center hover:text-blue-300 group-hover:translate-x-0.5 transition-transform"
        >
          {t.visitWebsite} <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </a>
      </div>
    </article>
  );
};
