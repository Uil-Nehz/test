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
}

export function NewsHeader({ activeCategory, onCategoryChange }: NewsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="font-semibold text-foreground">
            今日头条
          </a>
          <div className="relative w-48 md:hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索..."
              className="h-9 rounded-md border-border bg-muted/50 pl-9 text-sm"
            />
          </div>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide md:gap-0">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              onClick={(e) => {
                e.preventDefault();
                onCategoryChange(cat);
              }}
              className={`shrink-0 px-4 py-2 text-sm font-medium transition-colors md:px-3
                ${activeCategory === cat
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {cat}
            </a>
          ))}
        </nav>
        <div className="relative hidden w-56 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索..."
            className="h-9 rounded-md border-border bg-muted/50 pl-9 text-sm"
          />
        </div>
      </div>
    </header>
  );
}
