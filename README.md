# 今日头条 - 新闻应用

基于 React + TypeScript + Vite + Tailwind CSS + shadcn/ui 构建的新闻资讯应用。

## 项目结构

```
todays-news/
├── src/
│   ├── components/
│   │   ├── news/          # 新闻相关组件
│   │   │   ├── CategoryTabs.tsx   # 分类标签页
│   │   │   ├── NewsCard.tsx       # 新闻卡片
│   │   │   ├── NewsHeader.tsx     # 顶部导航与搜索
│   │   │   └── NewsList.tsx       # 新闻列表
│   │   └── ui/            # shadcn/ui 基础组件
│   ├── data/
│   │   └── mock-news.ts   # 模拟新闻数据
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具函数
│   ├── pages/
│   │   └── HomePage.tsx   # 首页
│   ├── types/
│   │   └── news.ts        # 新闻类型定义
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── bundle-artifact.sh # 打包为单 HTML 文件
├── index.html
└── package.json
```

## 开发

```bash
pnpm dev
```

## 打包为单文件

```bash
bash scripts/bundle-artifact.sh
```

生成 `bundle.html`，可直接在浏览器打开或作为 Claude 对话中的 artifact 分享。

## 技术栈

- React 18+
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
