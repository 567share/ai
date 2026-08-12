import React from 'react';
import { ArrowRight, Bookmark, Sparkles, ThumbsUp } from 'lucide-react';
import { Tool, cleanTags } from '../types';
import { Language, translations } from '../lib/i18n';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
  onUpvote: (e: React.MouseEvent, id: number) => void;
  isUpvoted: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: number) => void;
  isBookmarked: boolean;
  language?: Language;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onSelect,
  onUpvote,
  isUpvoted,
  onToggleBookmark,
  isBookmarked,
  language = 'en'
}) => {
  const t = translations[language] || translations.en;

  const getTranslatedBadge = (badge: string) => {
    if (badge === 'Free') return t.badgeFree;
    if (badge === 'Freemium') return t.badgeFreemium;
    if (badge === 'Paid') return t.badgePaid;
    return badge;
  };

  const getTranslatedCategory = (cat: string) => {
    switch (cat) {
      case 'All': return t.categoryAll;
      case 'Text & Coding': return t.categoryText;
      case 'Images & Creative': return t.categoryImages;
      case 'Design & UI': return t.categoryDesign;
      case 'Developer Tools': return t.categoryDev;
      case 'Productivity & Audio': return t.categoryProductivity;
      default: return cat;
    }
  };

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

        {cleanTags(tool.tags).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {cleanTags(tool.tags).slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] text-zinc-400 font-medium bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800">
                #{tag}
              </span>
            ))}
            {cleanTags(tool.tags).length > 3 && (
              <span className="text-[10px] text-zinc-600 bg-zinc-900/50 px-1.5 py-0.5 rounded">
                +{cleanTags(tool.tags).length - 3}
              </span>
            )}
          </div>
        )}
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
