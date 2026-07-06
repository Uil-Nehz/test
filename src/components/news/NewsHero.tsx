import { NewsCard } from './NewsCard';
import type { NewsItem } from '@/types/news';

interface NewsHeroProps {
  news: NewsItem;
}

export function NewsHero({ news }: NewsHeroProps) {
  return <NewsCard news={news} index={0} variant="hero" />;
}
