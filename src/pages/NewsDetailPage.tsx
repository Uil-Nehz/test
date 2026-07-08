import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CommentSection } from '@/components/news';
import { mockNewsList } from '@/data/mock-news';
import { Flame, MessageCircle, Pin } from 'lucide-react';

export function NewsDetailPage() {
  const { id } = useParams();
  const [showSimilarNews, setShowSimilarNews] = useState(false);
  const news = mockNewsList.find((item) => item.id === id);

  const similarNews = news
    ? mockNewsList
        .filter((item) => item.id !== news.id)
        .sort((a, b) => {
          const aSameCategory = a.category === news.category ? 0 : 1;
          const bSameCategory = b.category === news.category ? 0 : 1;
          return aSameCategory - bSameCategory;
        })
        .slice(0, 6)
    : [];

  if (!news) {
    return (
      <div className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Card className="border-border bg-card/80 card-glass">
            <CardContent className="p-10 text-center">
              <p className="text-xl font-bold text-foreground">没有找到这条新闻</p>
              <p className="mt-2 text-sm text-muted-foreground">
                可能是内容已下线，或链接地址不正确。
              </p>
              <Button asChild className="mt-6 rounded-full">
                <Link to="/">返回首页</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-6 md:py-12">
      <main className="mx-auto max-w-4xl">
        <Button asChild variant="secondary" className="mb-6 rounded-full border border-border bg-secondary/70">
          <Link to="/">返回首页</Link>
        </Button>

        <article className="overflow-hidden rounded-[2rem] border border-border bg-card/80 shadow-2xl shadow-primary/10 card-glass">
          {news.coverImg && (
            <div className="relative h-64 overflow-hidden md:h-80">
              <img
                src={news.coverImg}
                alt={news.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-9">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
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

            <h1 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              {news.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{news.source}</span>
              <span>·</span>
              <span>{news.author}</span>
              <span>·</span>
              <span>{news.publishTime}</span>
              {news.commentCount != null && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {news.commentCount.toLocaleString()} 评论
                  </span>
                </>
              )}
            </div>

            {news.summary && (
              <p className="mt-7 rounded-2xl border border-border bg-muted/35 p-5 text-base leading-8 text-muted-foreground">
                {news.summary}
              </p>
            )}

            <div className="mt-8 space-y-5 text-base leading-9 text-muted-foreground">
              {news.content.split('\n').filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex justify-center border-t border-border/70 pt-7">
              <Button
                type="button"
                variant="secondary"
                className="rounded-full border border-border bg-secondary/70"
                onClick={() => setShowSimilarNews((visible) => !visible)}
              >
                {showSimilarNews ? '收起相似新闻' : '查看相似新闻'}
              </Button>
            </div>

            {showSimilarNews && (
              <section className="mt-7 border-t border-border/70 pt-7">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-foreground">相似新闻</h2>
                  <span className="text-sm text-muted-foreground">{similarNews.length} 条</span>
                </div>

                {similarNews.length > 0 ? (
                  <div className="-mx-6 overflow-x-auto px-6 pb-2 md:-mx-9 md:px-9">
                    <div className="flex min-w-full gap-4">
                      {similarNews.map((item) => (
                        <Link
                          key={item.id}
                          to={`/news/${item.id}`}
                          className="group w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/30 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:bg-muted/45"
                        >
                          {item.coverImg && (
                            <img
                              src={item.coverImg}
                              alt={item.title}
                              className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                          <div className="p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                                {item.category}
                              </span>
                              <span>{item.publishTime}</span>
                            </div>
                            <h3 className="line-clamp-2 text-sm font-bold leading-6 text-foreground transition-colors group-hover:text-primary">
                              {item.title}
                            </h3>
                            {item.summary && (
                              <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                {item.summary}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="rounded-2xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
                    暂无相似新闻
                  </p>
                )}
              </section>
            )}

            <CommentSection newsId={news.id} />
          </div>
        </article>
      </main>
    </div>
  );
}