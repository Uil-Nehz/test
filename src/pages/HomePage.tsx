import { useState, useMemo } from 'react';
import { NewsHeader, NewsHero, NewsList } from '@/components/news';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockNewsList } from '@/data/mock-news';
import type { NewsCategory } from '@/types/news';

export function HomePage() {
  const [category, setCategory] = useState<NewsCategory>('推荐');
  const [query, setQuery] = useState('');

  const filteredNews = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return mockNewsList.filter((news) => {
      const matchCategory = category === '推荐' || news.category === category;
      const matchKeyword =
        keyword.length === 0 ||
        news.title.toLowerCase().includes(keyword) ||
        news.summary?.toLowerCase().includes(keyword) ||
        news.source.toLowerCase().includes(keyword);

      return matchCategory && matchKeyword;
    });
  }, [category, query]);

  const [heroNews, ...restNews] = filteredNews;
  const hotNews = mockNewsList.filter((news) => news.isHot || news.isTop).slice(0, 4);

  return (
    <div className="min-h-screen overflow-hidden">
      <NewsHeader
        activeCategory={category}
        onCategoryChange={setCategory}
        searchValue={query}
        onSearchChange={setQuery}
      />

      <main className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <section className="grid gap-8 py-10 md:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch animate-dev-up">
          <div className="relative overflow-hidden rounded-[2rem] border border-border surface-aurora p-6 shadow-2xl shadow-primary/10 card-glass md:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 left-16 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative">
              <p className="inline-flex rounded-full border border-border bg-background/35 px-3 py-1 text-xs font-medium text-muted-foreground card-glass">
                你好 👋  今天为你精选 {mockNewsList.length} 条重点资讯
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-foreground md:text-6xl">
                读懂今天，
                <span className="text-gradient"> 从一条头条开始</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                聚合科技、财经、娱乐、体育与国际动态，用更清晰的层级、更沉浸的卡片和更快的筛选体验，帮你高效掌握重点。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  className="btn-glow rounded-full px-6"
                  onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  查看今日要闻
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full border border-border bg-secondary/70 px-6"
                  onClick={() => {
                    setCategory('热点');
                    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  只看热点
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['分类频道', '7 个'],
                  ['热点追踪', `${hotNews.length} 条`],
                  ['当前结果', `${filteredNews.length} 条`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-background/30 p-4 card-glass"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border-border bg-card/80 shadow-2xl shadow-primary/5 card-glass">
            <CardContent className="p-0">
              <div className="border-b border-border p-5">
                <p className="text-sm font-medium text-primary">实时热榜</p>
                <h2 className="mt-1 text-xl font-bold text-foreground">正在被关注</h2>
              </div>
              <div className="divide-y divide-border">
                {hotNews.map((news, index) => (
                  <button
                    key={news.id}
                    type="button"
                    onClick={() => {
                      setCategory(news.category);
                      setQuery('');
                      document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-muted/45"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-sm font-semibold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {news.title}
                      </span>
                      <span className="mt-2 block text-xs text-muted-foreground">
                        {news.category} · {news.source}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="news" className="py-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">TOP STORIES</p>
              <h2 className="mt-1 text-3xl font-bold text-foreground">
                今日要闻
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {query.trim() ? `搜索 “${query.trim()}” · ` : ''}
              当前频道：{category} · {filteredNews.length} 条结果
            </p>
          </div>

          {heroNews ? (
            <div className="space-y-5">
              <NewsHero news={heroNews} size="lg" />
              <NewsList newsList={restNews.slice(0, 4)} variant="default" startIndex={1} />
            </div>
          ) : (
            <Card className="border-border bg-card/80 card-glass">
              <CardContent className="p-10 text-center">
                <p className="text-lg font-semibold text-foreground">没有找到相关新闻</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  试试切换频道，或清空搜索关键词。
                </p>
                <Button
                  variant="secondary"
                  className="mt-5 rounded-full"
                  onClick={() => {
                    setCategory('推荐');
                    setQuery('');
                  }}
                >
                  重置筛选
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        <section className="py-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-primary">LATEST</p>
              <h2 className="mt-1 text-3xl font-bold text-foreground">
                最新动态
              </h2>
            </div>
          </div>
          <Card className="overflow-hidden border-border bg-card/75 shadow-xl shadow-primary/5 card-glass">
            <CardContent className="p-0 md:p-2">
              <NewsList newsList={restNews.slice(4)} variant="compact" startIndex={5} />
              {restNews.length <= 4 && (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  暂无更多
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 今日头条. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}