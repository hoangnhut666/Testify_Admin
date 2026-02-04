
import { LucideIcon } from 'lucide-react';

export interface Category {
  id: number;
  name: string;
  icon?: LucideIcon;
  subcategories: string[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface TemplateStats {
  stars: number;
  clones: number;
  views: number;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  categoryId: number;
  tags: string[];
  stats: TemplateStats;
  price: 'Free' | 'Premium';
  updatedAt: string;
  longDescription?: string;
}

export type SortOption = 'popular' | 'newest' | 'cloned';
