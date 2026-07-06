import { NewsCard } from './NewsCard';
import type { NewsItem } from '@/types/news';

type CardSize = 'sm' | 'md' | 'lg';
interface NewsHeroProps {
  news: NewsItem;
  size?: CardSize;
}

export function NewsHero({ news, size = 'md' }: NewsHeroProps) {
  return <NewsCard news={news} index={0} variant="hero" size={size} />;
}