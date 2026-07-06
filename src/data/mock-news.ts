import type NewsItem from "@/types/news";
import type { CommentItem } from "@/types/comment";

export const mockNewsList: NewsItem[] = [
  {
    id: "news_1002",
    title: "2026年人工智能应用落地场景全面盘点",
    coverImg: "https://picsum.photos/id/28/900/320",
    author: "科技专栏编辑",
    publishTime: "2026-07-07 09:45",
    category: "科技",
    source: "科技观察周刊",
    summary: "轻量化AI工具落地各行各业，人机协同成为未来工作主流模式。",
    content: `人工智能技术经过多年迭代，已经从实验室走向各行各业落地场景，今年各类轻量化AI工具大幅降低中小企业使用门槛，生产、办公、服务领域均出现规模化应用案例。

办公场景中，AI文案生成、智能数据整理、自动图表绘制工具普及，有效减少重复性文案工作；工业领域智能质检、设备故障预测系统持续落地，提升生产线稳定性。

行业专家预测，未来一年AI人机协同模式会成为企业标配，从业者需要掌握基础AI工具使用能力，才能适配数字化工作环境。`,
    isHot: true,
    commentCount: 1286
  },
  {
    id: "news_1001",
    title: "2026数字媒体行业发展新趋势深度分析",
    coverImg: "https://picsum.photos/id/36/900/340",
    author: "行业观察记者",
    publishTime: "2026-07-07 14:20",
    category: "热点",
    source: "传媒行业资讯",
    summary: "AI生成内容重塑图文自媒体，轻量化资讯流量持续上涨。",
    content: `随着短视频、图文自媒体、AI生成内容快速普及，数字媒体行业正在迎来新一轮变革。各大平台持续优化内容分发机制，扶持优质原创图文内容创作者，降低内容发布门槛。

从上半年行业数据来看，轻量化图文资讯阅读量持续上涨，用户更偏好短平快、信息密度高的新闻内容，传统长视频资讯流量逐步分流。平台也推出更多适配移动端的阅读优化功能，提升用户浏览体验。

业内人士分析，未来AI辅助内容创作会成为标配，创作者可借助工具快速完成文案撰写、配图生成，大幅提升内容产出效率，媒体行业的生产模式将迎来全面升级。`,
    isTop: true,
    commentCount: 2041
  }
];

export let mockCommentList: CommentItem[] = [
  {
    commentId: "c001",
    newsId: "news_1002",
    userName: "AI爱好者",
    content: "轻量化AI工具确实大幅降低了使用门槛，普通从业者也能轻松上手。",
    createTime: "2026-07-07 10:12"
  },
  {
    commentId: "c002",
    newsId: "news_1002",
    userName: "产品从业者",
    content: "人机协同是必然趋势，企业需要提前做好员工技能培训。",
    createTime: "2026-07-07 10:35"
  },
  {
    commentId: "c003",
    newsId: "news_1001",
    userName: "传媒从业者",
    content: "AI生成内容会改变自媒体行业的生产节奏，机遇与挑战并存。",
    createTime: "2026-07-07 15:10"
  }
];