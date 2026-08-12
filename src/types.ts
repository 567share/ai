export type BadgeType = 'Free' | 'Freemium' | 'Paid';

export interface Tool {
  id: number;
  name: string;
  url: string;
  badge: BadgeType;
  desc: string;
  category: string;
  upvotes: number;
  tags?: string[];
  submittedBy?: string;
  featured?: boolean;
}

export type Category = 'All' | 'Text & Coding' | 'Images & Creative' | 'Design & UI' | 'Developer Tools' | 'Productivity & Audio';

export function cleanTag(tag: any): string {
  if (!tag) return '';
  let str = String(tag);
  // Remove brackets, braces, backslashes, double/single quotes
  str = str.replace(/[\[\]{}"'\\]/g, '');
  // Remove leading hashtags
  str = str.replace(/^#+/, '');
  return str.trim();
}

export function cleanTags(tags?: any): string[] {
  if (!tags) return [];
  let rawList: string[] = [];
  if (Array.isArray(tags)) {
    rawList = tags;
  } else if (typeof tags === 'string' && tags.trim()) {
    const str = tags.trim();
    if (str.startsWith('[') && str.endsWith(']')) {
      try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) rawList = parsed;
        else rawList = str.split(',');
      } catch {
        rawList = str.split(',');
      }
    } else {
      rawList = str.split(',');
    }
  }
  return rawList
    .map(cleanTag)
    .filter(t => t.length > 0);
}
