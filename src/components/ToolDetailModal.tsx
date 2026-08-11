import React, { useState } from 'react';
import { X, ExternalLink, ThumbsUp, Bookmark, Share2, Check, Tag, Globe, Layers, User } from 'lucide-react';
import { Tool } from '../types';

interface ToolDetailModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onUpvote: (id: number) => void;
  isUpvoted: boolean;
  onToggleBookmark: (id: number) => void;
  isBookmarked: boolean;
  onShowToast: (msg: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  isOpen,
  onClose,
  onUpvote,
  isUpvoted,
  onToggleBookmark,
  isBookmarked,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !tool) return null;

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}?tool=${tool.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    onShowToast(`Link for ${tool.name} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
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

        <div className="flex items-start justify-between gap-4 mb-4 pr-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                tool.badge === 'Free' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                tool.badge === 'Freemium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {tool.badge}
              </span>
              <span className="text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
                {tool.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{tool.name}</h2>
          </div>
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed mb-6 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
          {tool.desc}
        </p>

        {tool.tags && tool.tags.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Tags & Features
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-700/50 px-2.5 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {tool.submittedBy && (
          <div className="mb-6 text-xs text-zinc-500 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-400" />
            Submitted by: <span className="text-zinc-300 font-medium">{tool.submittedBy}</span>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpvote(tool.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isUpvoted
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700/60 hover:bg-zinc-700'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-blue-400' : ''}`} />
              <span>{tool.upvotes} Upvotes</span>
            </button>

            <button
              onClick={() => onToggleBookmark(tool.id)}
              className={`p-2 rounded-xl transition-all border ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700/60 hover:text-zinc-200'
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save to Bookmarks"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 transition-colors"
              title="Copy share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-blue-600/20"
          >
            <span>Visit Application</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
