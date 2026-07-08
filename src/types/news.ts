/**
 * 今日头条 - 新闻类型定义
 */

export type NewsCategory = '推荐' | '热点' | '科技' | '财经' | '娱乐' | '体育' | '国际';

export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  source: string;
  publishTime: string;
  category: NewsCategory;
  coverImage?: string;
  commentCount?: number;
  isTop?: boolean;
  isHot?: boolean;
}

export interface NewsListResponse {
  list: NewsItem[];
  hasMore: boolean;
}