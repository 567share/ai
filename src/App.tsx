import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Search, 
  Sparkles, 
  Plus, 
  Bookmark, 
  ThumbsUp, 
  X,
  ExternalLink,
  Database,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Tool, BadgeType, cleanTags } from './types';
import { INITIAL_TOOLS, CATEGORIES } from './data/tools';
import { getLocalizedTool } from './data/toolTranslations';
import { ToolCard } from './components/ToolCard';
import { SubmitTool } from './components/SubmitTool';
import { ToolDetailModal } from './components/ToolDetailModal';
import { LanguageSelector } from './components/LanguageSelector';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Language, detectSystemLanguage, translations } from './lib/i18n';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_lang') as Language;
      if (saved && translations[saved]) return saved;
    } catch {
      // fallback
    }
    return detectSystemLanguage();
  });

  const t = translations[language] || translations.en;

  useEffect(() => {
    try {
      localStorage.setItem('ai_directory_lang', language);
    } catch {}
  }, [language]);

  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'upvotes' | 'name' | 'newest'>('upvotes');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Saved bookmarks & upvotes in localStorage
  const [upvotedIds, setUpvotedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_upvotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Toast State
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  // Fetch tools from Supabase database table 'tools'
  const fetchTools = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);
    else setIsLoading(true);
    
    setDbError(null);

    if (!isSupabaseConfigured()) {
      setTools(INITIAL_TOOLS);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*');

      if (error) {
        console.warn('Supabase fetch returned error or table not initialized:', error.message);
        setDbError(`Supabase connection note: ${error.message}`);
        setTools(INITIAL_TOOLS);
      } else if (data && data.length > 0) {
        const mappedTools: Tool[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          url: row.url,
          badge: (row.badge || 'Freemium') as BadgeType,
          category: row.category || 'Developer Tools',
          desc: row.desc || row.description || '',
          upvotes: row.upvotes ?? 0,
          tags: cleanTags(row.tags),
          submittedBy: row.submitted_by || row.submittedBy || 'Community',
          featured: row.featured ?? false
        }));

        // Merge fetched tools with INITIAL_TOOLS so all 36 tools plus any custom DB tools are present
        const dbNames = new Set(mappedTools.map(t => t.name.toLowerCase()));
        const unseeded = INITIAL_TOOLS.filter(t => !dbNames.has(t.name.toLowerCase()));
        setTools([...mappedTools, ...unseeded]);
      } else {
        setTools(INITIAL_TOOLS);
      }
    } catch (err: any) {
      console.error('Failed to fetch tools from Supabase:', err);
      setDbError(err.message || 'Error connecting to Supabase');
      setTools(INITIAL_TOOLS);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  // Persist upvotes
  useEffect(() => {
    try {
      localStorage.setItem('ai_directory_upvotes', JSON.stringify(upvotedIds));
    } catch (e) {
      console.error('Failed to save upvotes:', e);
    }
  }, [upvotedIds]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('ai_directory_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarkedIds]);

  // Handle URL tool query string parameter (e.g. ?tool=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toolParam = params.get('tool');
    if (toolParam && tools.length > 0) {
      const found = tools.find(t => t.id === Number(toolParam));
      if (found) {
        setSelectedTool(found);
      }
    }
  }, [tools]);

  const handleUpvote = async (e: React.MouseEvent | null, id: number) => {
    if (e) e.stopPropagation();

    const isCurrentlyUpvoted = upvotedIds.includes(id);
    const targetTool = tools.find(t => t.id === id);
    if (!targetTool) return;

    const newUpvotes = isCurrentlyUpvoted 
      ? Math.max(0, targetTool.upvotes - 1) 
      : targetTool.upvotes + 1;

    // Local UI State Update
    if (isCurrentlyUpvoted) {
      setUpvotedIds(prev => prev.filter(i => i !== id));
      showToast('Upvote removed.');
    } else {
      setUpvotedIds(prev => [...prev, id]);
      showToast('Upvoted successfully!');
    }

    setTools(prev => prev.map(t => t.id === id ? { ...t, upvotes: newUpvotes } : t));

    if (selectedTool && selectedTool.id === id) {
      setSelectedTool(prev => prev ? { ...prev, upvotes: newUpvotes } : null);
    }

    // Attempt Supabase DB update if connected
    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('tools')
          .update({ upvotes: newUpvotes })
          .eq('id', id);
      } catch (err) {
        console.warn('Failed to update upvotes in Supabase:', err);
      }
    }
  };

  const handleToggleBookmark = (e: React.MouseEvent | null, id: number) => {
    if (e) e.stopPropagation();

    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(i => i !== id));
      showToast('Tool removed from saved bookmarks.');
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      showToast('Tool saved to bookmarks!');
    }
  };

  const handleToolSubmitted = (newTool: Tool) => {
    setTools(prev => [newTool, ...prev]);
    setUpvotedIds(prev => [...prev, newTool.id]);
    showToast(`"${newTool.name}" inserted into Supabase table!`);
  };

  // Localized tools based on selected language
  const localizedTools = useMemo(() => {
    return tools.map(tool => getLocalizedTool(tool, language));
  }, [tools, language]);

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return localizedTools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.tags && tool.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesBadge = selectedBadge === 'All' || tool.badge === selectedBadge;
      const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(tool.id);

      return matchesSearch && matchesCategory && matchesBadge && matchesBookmark;
    }).sort((a, b) => {
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      if (sortBy === 'newest') {
        return b.id - a.id;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [localizedTools, searchTerm, selectedCategory, selectedBadge, sortBy, showBookmarksOnly, bookmarkedIds]);

  const totalFreeCount = useMemo(() => tools.filter(t => t.badge === 'Free').length, [tools]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500 selection:text-white antialiased flex flex-col justify-between">
      <div>
        {/* Structural Top Banner */}
        <header className="border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20 text-sm">
                AI
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-lg leading-tight">ai.56701234.xyz</span>
                <span className="text-[10px] text-zinc-500 font-mono">Live Supabase Directory</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />

              <button
                onClick={() => setShowBookmarksOnly(prev => !prev)}
                className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 border ${
                  showBookmarksOnly
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-amber-400' : ''}`} />
                <span className="hidden sm:inline">{t.bookmarks}</span>
                {bookmarkedIds.length > 0 && (
                  <span className="ml-0.5 bg-zinc-800 text-zinc-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {bookmarkedIds.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsSubmitOpen(true)}
                className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors border border-blue-500 flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{t.submitTool}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Value Proposition Hero Section */}
          <section className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tools.length} {t.toolsFound}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              {t.heroTitle}
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              {t.heroSubtitle}
            </p>
          </section>

          {/* Database Banner Note */}
          {dbError && (
            <div className="mb-8 max-w-3xl mx-auto p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{dbError}</span>
            </div>
          )}

          {/* Dynamic Controls Grid */}
          <section className="space-y-4 mb-10 pb-6 border-b border-zinc-900">
            {/* Search + Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              {/* Search Field */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-10 pr-8 py-2.5 text-sm outline-none transition-all placeholder:text-zinc-500 text-white"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters & Sorting & Refresh */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar justify-start sm:justify-end">
                <button
                  onClick={() => fetchTools(true)}
                  disabled={isRefreshing}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors shrink-0"
                  title="Refresh tools from Supabase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
                </button>

                {/* Pricing Filter */}
                <div className="flex items-center gap-1 bg-zinc-900 p-1 border border-zinc-800 rounded-xl shrink-0">
                  {[
                    { key: 'All', label: t.allPricing },
                    { key: 'Free', label: t.badgeFree },
                    { key: 'Freemium', label: t.badgeFreemium },
                    { key: 'Paid', label: t.badgePaid }
                  ].map(p => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedBadge(p.key)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                        selectedBadge === p.key
                          ? 'bg-zinc-800 text-white shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-zinc-700"
                  >
                    <option value="upvotes">{t.sortUpvotes}</option>
                    <option value="newest">{t.sortNewest}</option>
                    <option value="name">{t.sortName}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inline Category Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto w-full pb-1 no-scrollbar">
              {CATEGORIES.map(category => {
                let catLabel = category;
                if (category === 'All') catLabel = t.categoryAll;
                else if (category === 'Text & Coding') catLabel = t.categoryText;
                else if (category === 'Images & Creative') catLabel = t.categoryImages;
                else if (category === 'Design & UI') catLabel = t.categoryDesign;
                else if (category === 'Developer Tools') catLabel = t.categoryDev;
                else if (category === 'Productivity & Audio') catLabel = t.categoryProductivity;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap border ${
                      selectedCategory === category 
                        ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/10" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    {catLabel}
                  </button>
                );
              })}
            </div>

            {/* Active Filters Summary */}
            {(searchTerm || selectedCategory !== 'All' || selectedBadge !== 'All' || showBookmarksOnly) && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-zinc-400">
                <span>Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700/50 flex items-center gap-1">
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('All')} />
                  </span>
                )}
                {selectedBadge !== 'All' && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700/50 flex items-center gap-1">
                    {selectedBadge}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedBadge('All')} />
                  </span>
                )}
                {showBookmarksOnly && (
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
                    {t.bookmarks}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setShowBookmarksOnly(false)} />
                  </span>
                )}
                {searchTerm && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700/50 flex items-center gap-1">
                    "{searchTerm}"
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchTerm('')} />
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedBadge('All');
                    setShowBookmarksOnly(false);
                  }}
                  className="text-blue-400 hover:underline ml-auto font-medium"
                >
                  {t.clearFilters}
                </button>
              </div>
            )}
          </section>

          {/* Primary Layout Engine */}
          {isLoading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
              <p className="text-sm text-zinc-400 font-medium">Fetching tools from Supabase backend...</p>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.length > 0 ? (
                filteredTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onSelect={(t) => setSelectedTool(t)}
                    onUpvote={handleUpvote}
                    isUpvoted={upvotedIds.includes(tool.id)}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={bookmarkedIds.includes(tool.id)}
                    language={language}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 px-4">
                  <Database className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <h3 className="text-zinc-200 font-bold text-base mb-1">{t.noResults}</h3>
                  <p className="text-zinc-500 text-sm max-w-md mx-auto mb-6">
                    {t.noResultsDesc}
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setSelectedBadge('All');
                        setShowBookmarksOnly(false);
                      }}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      {t.clearFilters}
                    </button>
                    <button
                      onClick={() => setIsSubmitOpen(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      {t.submitTool}
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Callout */}
          <section id="submit" className="mt-20 p-8 border border-zinc-900 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 rounded-2xl max-w-xl mx-auto text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full filter blur-2xl pointer-events-none" />
            <h2 className="text-xl font-bold mb-2 text-white">{t.submitTool}</h2>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              {t.heroSubtitle}
            </p>
            <button 
              onClick={() => setIsSubmitOpen(true)} 
              className="w-full sm:w-auto bg-white text-zinc-950 font-semibold text-xs px-6 py-2.5 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              {t.submitTool}
            </button>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-16 py-8 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">ai.56701234.xyz</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>{tools.length} {t.toolsFound} ({totalFreeCount} {t.badgeFree})</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSubmitOpen(true)}
              className="hover:text-zinc-300 transition-colors"
            >
              {t.submitTool}
            </button>
            <a 
              href="https://aistudio.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <span>Powered by Gemini</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Toast */}
      <SubmitTool
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onToolSubmitted={handleToolSubmitted}
        language={language}
      />

      <ToolDetailModal
        tool={selectedTool ? getLocalizedTool(selectedTool, language) : null}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        onUpvote={(id) => handleUpvote(null, id)}
        isUpvoted={selectedTool ? upvotedIds.includes(selectedTool.id) : false}
        onToggleBookmark={(id) => handleToggleBookmark(null, id)}
        isBookmarked={selectedTool ? bookmarkedIds.includes(selectedTool.id) : false}
        onShowToast={showToast}
        language={language}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
