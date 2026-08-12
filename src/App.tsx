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
  AlertCircle,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Tool, BadgeType, cleanTags } from './types';
import { INITIAL_TOOLS, CATEGORIES } from './data/tools';
import { getLocalizedTool, translateCategory, translateBadge, translateTag } from './data/toolTranslations';
import { ToolCard } from './components/ToolCard';
import { SubmitTool } from './components/SubmitTool';
import { ToolDetailModal } from './components/ToolDetailModal';
import { LanguageSelector } from './components/LanguageSelector';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Language, detectSystemLanguage, translations } from './lib/i18n';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ai_directory_lang_user_choice') as Language;
      if (saved && (saved === 'zh' || saved === 'en')) return saved;
    } catch {
      // fallback
    }
    return 'zh';
  });

  const t = translations[language] || translations.zh;

  useEffect(() => {
    try {
      localStorage.setItem('ai_directory_lang_user_choice', language);
    } catch {}
  }, [language]);

  // Domain text fade-away effect on app load (fading twice as slow)
  const [showDomainText, setShowDomainText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDomainText(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Splash Loading Screen State
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsSplashFading(true);
        const removeTimer = setTimeout(() => {
          setIsSplashVisible(false);
        }, 500);
        return () => clearTimeout(removeTimer);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
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

  const handleAddTag = async (id: number, newTag: string): Promise<boolean> => {
    const trimmed = newTag.trim();
    if (!trimmed) return false;

    const targetTool = tools.find(t => t.id === id);
    if (!targetTool) return false;

    const currentCleanTags = cleanTags(targetTool.tags);
    if (currentCleanTags.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      showToast(language === 'zh' ? '标签已存在' : 'Tag already exists');
      return false;
    }

    const updatedTags = [...currentCleanTags, trimmed];

    // Local UI State update
    setTools(prev => prev.map(t => t.id === id ? { ...t, tags: updatedTags } : t));
    if (selectedTool && selectedTool.id === id) {
      setSelectedTool(prev => prev ? { ...prev, tags: updatedTags } : null);
    }

    showToast(language === 'zh' ? `已添加标签 "${trimmed}"` : `Added tag "${trimmed}"`);

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: existing } = await supabase
          .from('tools')
          .select('id, tags')
          .eq('id', id)
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from('tools')
            .update({ tags: updatedTags })
            .eq('id', id);

          if (error) {
            console.warn('Failed to save tag to Supabase:', error.message);
          }
        } else {
          const { error } = await supabase
            .from('tools')
            .insert([{
              id: targetTool.id,
              name: targetTool.name,
              url: targetTool.url,
              badge: targetTool.badge,
              category: targetTool.category,
              desc: targetTool.desc,
              upvotes: targetTool.upvotes,
              tags: updatedTags,
              submitted_by: targetTool.submittedBy || 'Community',
              featured: targetTool.featured || false
            }]);

          if (error) {
            console.warn('Failed to insert tool with new tag to Supabase:', error.message);
          }
        }
      } catch (err) {
        console.warn('Supabase tag update exception:', err);
      }
    }

    return true;
  };

  // Localized tools based on selected language
  const localizedTools = useMemo(() => {
    return tools.map(tool => getLocalizedTool(tool, language));
  }, [tools, language]);

  // Extract all unique tags dynamically across all tools
  const allAvailableTags = useMemo(() => {
    const tagCountMap = new Map<string, number>();
    const tagRawMap = new Map<string, string>();

    tools.forEach(tool => {
      const cleaned = cleanTags(tool.tags);
      cleaned.forEach(rawTag => {
        const trimmed = rawTag.trim();
        if (trimmed) {
          const key = trimmed.toLowerCase();
          if (!tagCountMap.has(key)) {
            tagCountMap.set(key, 1);
            tagRawMap.set(key, trimmed);
          } else {
            tagCountMap.set(key, tagCountMap.get(key)! + 1);
          }
        }
      });
    });

    const result: { raw: string; count: number }[] = [];
    tagCountMap.forEach((count, key) => {
      result.push({
        raw: tagRawMap.get(key) || key,
        count
      });
    });

    return result.sort((a, b) => b.count - a.count || a.raw.localeCompare(b.raw));
  }, [tools]);

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return localizedTools.filter(tool => {
      const origTool = tools.find(t => t.id === tool.id);
      const origTags = origTool ? cleanTags(origTool.tags) : [];
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch = !searchTerm ||
        tool.name.toLowerCase().includes(searchLower) || 
        tool.desc.toLowerCase().includes(searchLower) ||
        (tool.tags && tool.tags.some(t => t.toLowerCase().includes(searchLower))) ||
        origTags.some(t => t.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesBadge = selectedBadge === 'All' || tool.badge === selectedBadge;
      const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(tool.id);

      let matchesTag = selectedTag === 'All';
      if (!matchesTag) {
        const selLower = selectedTag.toLowerCase();
        const locTags = cleanTags(tool.tags);

        const matchesOrig = origTags.some(t => {
          const rawLower = t.toLowerCase();
          const translatedLower = translateTag(t, language).toLowerCase();
          return rawLower === selLower || translatedLower === selLower;
        });

        const matchesLoc = locTags.some(t => t.toLowerCase() === selLower);

        matchesTag = matchesOrig || matchesLoc;
      }

      return matchesSearch && matchesCategory && matchesBadge && matchesTag && matchesBookmark;
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
  }, [localizedTools, tools, language, searchTerm, selectedCategory, selectedBadge, selectedTag, sortBy, showBookmarksOnly, bookmarkedIds]);

  const totalFreeCount = useMemo(() => tools.filter(t => t.badge === 'Free').length, [tools]);
  const totalFreemiumCount = useMemo(() => tools.filter(t => t.badge === 'Freemium').length, [tools]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500 selection:text-white antialiased flex flex-col justify-between">
      <div>
        {/* Structural Top Banner */}
        <header className="border-b border-zinc-900 bg-zinc-900/40 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 relative flex items-center justify-between gap-2 sm:gap-4 min-h-[56px]">
            {/* Left: AI Logo & Domain */}
            <div className="flex items-center space-x-2 sm:space-x-3 z-10 shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20 text-sm shrink-0">
                AI
              </div>
              <div 
                className={`flex flex-col overflow-hidden whitespace-nowrap transition-all ease-in-out ${
                  showDomainText 
                    ? 'max-w-xs opacity-100 translate-x-0' 
                    : 'max-w-0 opacity-0 -translate-x-2 pointer-events-none'
                }`}
                style={{ transitionDuration: '4000ms' }}
              >
                <span className="font-bold tracking-tight text-base sm:text-lg leading-tight">ai.56701234.xyz</span>
                <span className="text-[10px] text-zinc-500 font-mono hidden xs:inline">Live Supabase Directory</span>
              </div>
            </div>

            {/* Middle: Search Bar (Centered in the UI) */}
            <div className="flex-1 md:flex-none md:w-80 lg:w-96 max-w-md mx-2 md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2 z-10">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-9 pr-8 py-2 text-sm outline-none transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 z-10 shrink-0">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />

              <button
                onClick={() => setShowBookmarksOnly(prev => !prev)}
                className={`text-xs font-semibold px-2.5 py-2 rounded-lg transition-all flex items-center gap-1.5 border ${
                  showBookmarksOnly
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-amber-400' : ''}`} />
                <span className="hidden md:inline">{t.bookmarks}</span>
                {bookmarkedIds.length > 0 && (
                  <span className="bg-zinc-800 text-zinc-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {bookmarkedIds.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {/* Database Banner Note */}
          {dbError && (
            <div className="mb-8 max-w-3xl mx-auto p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{dbError}</span>
            </div>
          )}

          {/* Dynamic Controls Grid */}
          <section className="space-y-4 mb-10 pb-6 border-b border-zinc-900">
            {/* Filters & Sorting Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Pricing Filter */}
              <div className="flex flex-wrap items-center gap-1 bg-zinc-900 p-1 border border-zinc-800 rounded-xl">
                {[
                  { key: 'All', label: translateBadge('All', language) },
                  { key: 'Free', label: translateBadge('Free', language) },
                  { key: 'Freemium', label: translateBadge('Freemium', language) },
                  { key: 'Paid', label: translateBadge('Paid', language) },
                  { key: 'API', label: translateBadge('API', language) },
                  { key: 'Enterprise', label: translateBadge('Enterprise', language) }
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

              {/* Sorting & Refresh */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchTools(true)}
                  disabled={isRefreshing}
                  className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors shrink-0"
                  title="Refresh tools from Supabase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
                </button>

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

            {/* Category Filter Buttons - Max 1 line with dropdown button */}
            <div className="flex items-start justify-between gap-2 w-full pb-1">
              <div className={`flex flex-wrap gap-2 transition-all duration-300 overflow-hidden flex-1 ${
                isCategoriesExpanded ? 'max-h-none' : 'max-h-[40px]'
              }`}>
                {CATEGORIES.map(category => {
                  const catLabel = translateCategory(category, language);

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
              <button
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 shrink-0 px-2.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/50"
              >
                <span>{isCategoriesExpanded ? t.showLess : t.showMore}</span>
                {isCategoriesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Popular / Custom Tags Selection Bar */}
            {allAvailableTags.length > 0 && (
              <div className="pt-2 border-t border-zinc-900/60">
                <div className="flex items-start justify-between gap-2">
                  <div className={`flex flex-wrap items-center gap-1.5 transition-all duration-300 overflow-hidden flex-1 ${
                    isTagsExpanded ? 'max-h-none' : 'max-h-[60px]'
                  }`}>
                    <div className="flex items-center gap-1 text-xs font-semibold text-zinc-400 shrink-0 mr-1 my-0.5">
                      <Tag className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t.popularTags}:</span>
                    </div>

                    <button
                      onClick={() => setSelectedTag('All')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all border my-0.5 ${
                        selectedTag === 'All'
                          ? "bg-blue-600/20 border-blue-500/40 text-blue-300"
                          : "bg-zinc-900/80 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {t.allTags}
                    </button>

                    {allAvailableTags.map(({ raw, count }) => {
                      const translated = translateTag(raw, language);
                      const isSelected = selectedTag.toLowerCase() === raw.toLowerCase() || selectedTag.toLowerCase() === translated.toLowerCase();

                      return (
                        <button
                          key={raw}
                          onClick={() => setSelectedTag(isSelected ? 'All' : raw)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all border flex items-center gap-1 my-0.5 ${
                            isSelected
                              ? "bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-600/20"
                              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                          }`}
                        >
                          <span>#{translated}</span>
                          <span className={`text-[10px] px-1 py-0.2 rounded-full font-mono ${
                            isSelected ? 'bg-blue-700/80 text-white' : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {allAvailableTags.length > 8 && (
                    <button
                      onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/50"
                    >
                      <span>{isTagsExpanded ? t.showLessTags : t.showMoreTags}</span>
                      {isTagsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Active Filters Summary */}
            {(searchTerm || selectedCategory !== 'All' || selectedBadge !== 'All' || selectedTag !== 'All' || showBookmarksOnly) && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-zinc-400">
                <span>Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700/50 flex items-center gap-1">
                    {translateCategory(selectedCategory, language)}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('All')} />
                  </span>
                )}
                {selectedBadge !== 'All' && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded-md border border-zinc-700/50 flex items-center gap-1">
                    {translateBadge(selectedBadge, language)}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedBadge('All')} />
                  </span>
                )}
                {selectedTag !== 'All' && (
                  <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20 flex items-center gap-1">
                    #{translateTag(selectedTag, language)}
                    <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedTag('All')} />
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
                    setSelectedTag('All');
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
                    onAddTag={handleAddTag}
                    onSelectTag={(tag) => setSelectedTag(tag)}
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
                        setSelectedTag('All');
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
              <span>{tools.length} {t.toolsFound} ({t.badgeFree}: {totalFreeCount}, {t.badgeFreemium}: {totalFreemiumCount})</span>
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
        onAddTag={handleAddTag}
        onSelectTag={(tag) => setSelectedTag(tag)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom">
          <Database className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Full-Screen Splash Loading Screen */}
      {isSplashVisible && (
        <div 
          className={`fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-out ${
            isSplashFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="max-w-md w-full flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center font-bold text-white shadow-2xl shadow-blue-500/30 text-2xl border border-blue-400/30 animate-bounce">
              AI
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{tools.length > 0 ? `${tools.length} ${t.toolsFound}` : 'Loading Directory...'}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {t.heroTitle}
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                {t.heroSubtitle}
              </p>
            </div>

            <div className="pt-2 flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
