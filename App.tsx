export type Language = 'en' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export const detectSystemLanguage = (): Language => {
  if (typeof window === 'undefined' || !navigator) return 'en';
  const lang = navigator.language || (navigator as any).userLanguage || 'en';
  const shortLang = lang.toLowerCase().slice(0, 2);

  switch (shortLang) {
    case 'zh': return 'zh';
    default: return 'en';
  }
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    heroTitle: "AI Tools Directory",
    heroSubtitle: "Discover, compare, and vote on the best AI tools, LLMs, and creative platforms.",
    searchPlaceholder: "Search AI tools, categories, or tags...",
    allCategories: "All Categories",
    allPricing: "Pricing",
    submitTool: "Submit Tool",
    bookmarks: "Saved",
    sortUpvotes: "Most Upvoted",
    sortName: "Alphabetical",
    sortNewest: "Newest Added",
    featured: "Featured",
    visitWebsite: "Visit Website",
    share: "Share",
    copied: "Link Copied!",
    upvote: "Upvote",
    upvoted: "Upvoted",
    submittedBy: "Submitted by",
    tagsFeatures: "Tags & Features",
    categoryAll: "All",
    categoryText: "Text & Coding",
    categoryImages: "Images & Creative",
    categoryDesign: "Design & UI",
    categoryDev: "Developer Tools",
    categoryProductivity: "Productivity & Audio",
    badgeFree: "Free",
    badgeFreemium: "Freemium",
    badgePaid: "Paid",
    noResults: "No AI tools match your filters",
    noResultsDesc: "Try adjusting your search terms, selecting a different category, or clearing filters.",
    clearFilters: "Clear Filters",
    modalSubmitTitle: "Submit a New AI Tool",
    modalToolName: "Tool Name",
    modalWebsiteUrl: "Website URL",
    modalCategory: "Category",
    modalPricing: "Pricing Model",
    modalDesc: "Brief Description",
    modalTags: "Tags (comma separated)",
    modalSubmitter: "Your Name / Handle",
    modalCancel: "Cancel",
    modalSubmitBtn: "Submit Tool",
    modalSubmitting: "Submitting...",
    toastSubmitted: "Tool submitted successfully!",
    footerRights: "All rights reserved. Built with React & Supabase.",
    toolsFound: "tools found",
    addTag: "Add Tag",
    addTagPlaceholder: "Enter tag name...",
    addTagBtn: "Add",
    savingTag: "Saving...",
    popularTags: "Popular Tags",
    allTags: "All Tags"
  },
  zh: {
    heroTitle: "AI 工具导航",
    heroSubtitle: "探索、对比并投选最优秀的 AI 模型、编程助手与创意平台。",
    searchPlaceholder: "搜索 AI 工具、分类或标签...",
    allCategories: "全部分类",
    allPricing: "运营模式",
    submitTool: "提交工具",
    bookmarks: "已收藏",
    sortUpvotes: "最多点赞",
    sortName: "按名称排序",
    sortNewest: "最新添加",
    featured: "精选推荐",
    visitWebsite: "访问官网",
    share: "分享",
    copied: "链接已复制！",
    upvote: "点赞",
    upvoted: "已赞",
    submittedBy: "提交者",
    tagsFeatures: "标签与功能",
    categoryAll: "全部",
    categoryText: "文本与编程",
    categoryImages: "图像与创意",
    categoryDesign: "设计与UI",
    categoryDev: "开发者工具",
    categoryProductivity: "效率与音频",
    badgeFree: "免费",
    badgeFreemium: "免费试用",
    badgePaid: "付费",
    noResults: "未找到匹配的 AI 工具",
    noResultsDesc: "请尝试调整搜索关键词、切换分类或清除筛选条件。",
    clearFilters: "清除筛选",
    modalSubmitTitle: "提交新 AI 工具",
    modalToolName: "工具名称",
    modalWebsiteUrl: "官网链接",
    modalCategory: "工具分类",
    modalPricing: "付费模式",
    modalDesc: "一句话简介",
    modalTags: "标签 (逗号分隔)",
    modalSubmitter: "您的昵称",
    modalCancel: "取消",
    modalSubmitBtn: "确认提交",
    modalSubmitting: "提交中...",
    toastSubmitted: "工具提交成功！",
    footerRights: "保留所有权利。基于 React 和 Supabase 构建。",
    toolsFound: "个工具",
    addTag: "添加标签",
    addTagPlaceholder: "输入新标签名称...",
    addTagBtn: "添加",
    savingTag: "保存中...",
    popularTags: "热门标签",
    allTags: "全部标签"
  },
};
