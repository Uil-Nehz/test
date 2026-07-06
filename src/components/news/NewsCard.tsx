import { useNavigate } from "react-router-dom";
import type { NewsItem } from '@/types/news';
import { Flame, MessageCircle, Pin } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  index?: number;
  variant?: 'default' | 'hero' | 'compact';
}

function padNum(n: number) {
  return String(n).padStart(2, '0');
}

export function NewsCard({ news, index = 0, variant = 'default' }: NewsCardProps) {
  const navigate = useNavigate();
  const num = padNum(index + 1);
  const handleClick = () => navigate(`/news/${news.id}`);

  if (variant === 'hero') {
    return (
      <article className="group cursor-pointer" onClick={handleClick}>
        <div className="block rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-primary">{num}</span>
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {news.category}
            </span>
            {news.isTop && (
              <span className="flex items-center gap-1 text-xs text-primary">
                <Pin className="h-3 w-3" /> 置顶
              </span>
            )}
            {news.isHot && (
              <span className="flex items-center gap-1 text-xs text-primary">
                <Flame className="h-3 w-3" /> 热点
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors md:text-2xl">
            {news.title}
          </h2>
          {news.summary && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {news.summary}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{news.source}</span>
            <span>·</span>
            <span>{news.publishTime}</span>
            {news.commentCount != null && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {news.commentCount.toLocaleString()} 评论
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="border-b border-border py-4 last:border-0 cursor-pointer" onClick={handleClick}>
        <div className="group flex items-start gap-4">
          <span className="shrink-0 font-mono text-sm font-medium text-muted-foreground">{num}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{news.source}</span>
              <span>·</span>
              <span>{news.publishTime}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="cursor-pointer" onClick={handleClick}>
      <div className="group block rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-start gap-4">
          <span className="shrink-0 font-mono text-sm font-medium text-primary">{num}</span>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {news.category}
              </span>
              {news.isTop && (
                <span className="flex items-center gap-1 text-xs text-primary">
                  <Pin className="h-3 w-3" /> 置顶
                </span>
              )}
              {news.isHot && (
                <span className="flex items-center gap-1 text-xs text-primary">
                  <Flame className="h-3 w-3" /> 热
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {news.title}
            </h3>
            {news.summary && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {news.summary}
              </p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{news.source}</span>
              <span>·</span>
              <span>{news.publishTime}</span>
              {news.commentCount != null && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {news.commentCount.toLocaleString()} 评论
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}