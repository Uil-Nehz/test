import { useNavigate } from "react-router-dom";
import type NewsItem from '@/types/news';
import { Flame, MessageCircle, Pin } from 'lucide-react';

type CardSize = 'sm' | 'md' | 'lg';
interface NewsCardProps {
  news: NewsItem;
  index?: number;
  variant?: 'default' | 'hero' | 'compact';
  size?: CardSize;
}

function padNum(n: number) {
  return String(n).padStart(2, '0');
}

export function NewsCard({ news, index = 0, variant = 'default', size = 'md' }: NewsCardProps) {
  const navigate = useNavigate();
  const num = padNum(index + 1);
  const handleClick = () => navigate(`/news/${news.id}`);

  const sizeClassMap = {
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6 md:p-7'
  };
  const titleSizeMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };
  const heroSizeClassMap = {
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8'
  };
  const heroTitleSizeMap = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl'
  };

  if (variant === 'hero') {
    return (
      <article className="group cursor-pointer" onClick={handleClick}>
        <div className={`relative overflow-hidden rounded-[1.75rem] border border-border bg-card ${heroSizeClassMap[size]} shadow-2xl shadow-primary/10 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/20 card-glass card-size-${size}`}>
          {news.coverImg && (
            <div className="absolute inset-0 opacity-28 transition-opacity group-hover:opacity-36">
              <img
                src={news.coverImg}
                alt={news.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/18" />
            </div>
          )}

          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-sm font-semibold text-primary">{num}</span>
              <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground card-glass">
                {news.category}
              </span>
              {news.isTop && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  <Pin className="h-3 w-3" /> 置顶
                </span>
              )}
              {news.isHot && (
                <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-200">
                  <Flame className="h-3 w-3" /> 热点
                </span>
              )}
            </div>
            <h2 className={`max-w-3xl font-black leading-tight text-foreground transition-colors group-hover:text-primary ${heroTitleSizeMap[size]}`}>
              {news.title}
            </h2>
            {news.summary && (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground line-clamp-3 md:text-base">
                {news.summary}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="cursor-pointer border-b border-border/70 last:border-0" onClick={handleClick}>
        <div className={`group flex items-start gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-muted/45 card-size-${size}`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/60 font-mono text-xs font-semibold text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary">
            {num}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className={`font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors ${titleSizeMap[size]}`}>
              {news.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
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
      <div className={`group overflow-hidden rounded-2xl border border-border bg-card ${sizeClassMap[size]} shadow-lg shadow-primary/5 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-primary/15 card-glass card-size-${size}`}>
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">{num}</span>
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-muted/55 px-3 py-1 text-xs font-medium text-muted-foreground">
                {news.category}
              </span>
              {news.isTop && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                  <Pin className="h-3 w-3" /> 置顶
                </span>
              )}
              {news.isHot && (
                <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs text-orange-200">
                  <Flame className="h-3 w-3" /> 热
                </span>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_180px] md:items-start">
              <div>
                <h3 className={`font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors ${titleSizeMap[size]}`}>
                  {news.title}
                </h3>
                {news.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {news.summary}
                  </p>
                )}
              </div>
              {news.coverImg && (
                <div className="hidden overflow-hidden rounded-xl border border-border bg-muted/40 md:block">
                  <img
                    src={news.coverImg}
                    alt={news.title}
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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