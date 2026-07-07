import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { NewsCategory } from '@/types/news';

const CATEGORIES: NewsCategory[] = [
  '推荐',
  '热点',
  '科技',
  '财经',
  '娱乐',
  '体育',
  '国际',
];

interface NewsHeaderProps {
  activeCategory: NewsCategory;
  onCategoryChange: (cat: NewsCategory) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function NewsHeader({
  activeCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
}: NewsHeaderProps) {
  const [focused, setFocused] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchInput = (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="搜索标题、来源..."
        className={`h-10 rounded-full border-border bg-muted/55 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all card-glass ${
          focused ? 'border-primary/70 shadow-lg shadow-primary/10' : ''
        }`}
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="group flex items-center gap-3 font-semibold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-lg shadow-primary/10 transition-transform group-hover:scale-105">
              头
            </span>
            <span className="text-base tracking-wide">今日头条</span>
          </a>
          <div className="w-52 md:hidden">
            {searchInput}
          </div>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'text-muted-foreground hover:bg-muted/55 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="hidden w-64 md:block">
          {searchInput}
        </div>
      </div>
    </header>
  );
}