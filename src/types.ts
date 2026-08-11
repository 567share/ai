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
