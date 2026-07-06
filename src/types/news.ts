export type NewsCategory = '推荐' | '热点' | '科技' | '财经' | '娱乐' | '体育' | '国际';

export interface NewsItem {
  id: string;
  title: string;
  coverImg: string;
  author: string;
  publishTime: string;
  category: NewsCategory;
  content: string;
  summary: string;
  source: string;
  isTop?: boolean;
  isHot?: boolean;
  commentCount?: number;
}