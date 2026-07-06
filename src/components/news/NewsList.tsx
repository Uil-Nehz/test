import { NewsCard } from './NewsCard';
import type { NewsItem } from '@/types/news';

interface NewsListProps {
  newsList: NewsItem[];
  variant?: 'default' | 'compact';
  startIndex?: number;
}

export function NewsList({ newsList, variant = 'default', startIndex = 0 }: NewsListProps) {
  return (
    <div className={variant === 'compact' ? 'space-y-0' : 'space-y-4'}>
      {newsList.map((news, i) => (
        <NewsCard
          key={news.id}
          news={news}
          index={startIndex + i}
          variant={variant}
        />
      ))}
    </div>
  );
}
