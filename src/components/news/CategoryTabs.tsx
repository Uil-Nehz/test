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

interface CategoryTabsProps {
  value: NewsCategory;
  onValueChange: (value: NewsCategory) => void;
}

export function CategoryTabs({ value, onValueChange }: CategoryTabsProps) {
  return (
    <nav className="mb-8 flex gap-2 overflow-x-auto scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onValueChange(cat)}
          className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors
            ${value === cat
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
