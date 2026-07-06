import { useState, useMemo } from 'react';
import { NewsHeader, NewsHero, NewsList } from '@/components/news';
import { mockNewsList } from '@/data/mock-news';
import type { NewsCategory } from '@/types/news';

export function HomePage() {
  const [category, setCategory] = useState<NewsCategory>('推荐');

  const filteredNews = useMemo(() => {
    if (category === '推荐') return mockNewsList;
    return mockNewsList.filter((n) => n.category === category);
  }, [category]);

  const [heroNews, ...restNews] = filteredNews;

  return (
    <div className="min-h-screen">
      <NewsHeader activeCategory={category} onCategoryChange={setCategory} />
      <main className="mx-auto max-w-4xl px-4 pb-20 md:px-6">
        {/* Hero / 欢迎区 - devportfolio 风格 */}
        <section className="py-12 md:py-16">
          <p className="text-muted-foreground">你好 👋</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            今日头条
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            精选资讯，一站获取。科技、财经、娱乐、体育——每日更新，深度解读。
          </p>
        </section>

        {/* 今日要闻 - 对应 Projects 区块 */}
        <section id="news" className="py-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            今日要闻
          </h2>
          <div className="space-y-6">
            {heroNews && (
              <NewsHero news={heroNews} />
            )}
            <NewsList newsList={restNews.slice(0, 4)} variant="default" startIndex={1} />
          </div>
        </section>

        {/* 最新动态 - 对应 Experience/Education 风格 */}
        <section className="py-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            最新动态
          </h2>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <NewsList newsList={restNews.slice(4)} variant="compact" startIndex={5} />
            {restNews.length <= 4 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                暂无更多
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 今日头条. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}