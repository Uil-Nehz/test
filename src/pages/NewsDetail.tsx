import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNewsList } from "@/data/mock-news";
import { NewsItem } from "@/types/news";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 根据路由id匹配mock新闻数据
  const currentNews: NewsItem | undefined = mockNewsList.find(item => item.id === id);

  // 无新闻数据兜底
  if (!currentNews) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 max-w-[900px] mx-auto">
        <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
          ← 返回首页
        </Button>
        <Card>
          <CardContent className="py-10 text-center text-slate-600">
            <p>未找到对应新闻</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 max-w-[900px] mx-auto">
      {/* 顶部导航操作栏 */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate("/news")}>
          ← 返回新闻列表
        </Button>
        <h2 className="text-xl font-semibold text-slate-800">新闻详情</h2>
      </div>

      <Card className="overflow-hidden border border-slate-200 rounded-xl">
        {/* 封面大图 */}
        <img
          src={currentNews.coverImg}
          alt={currentNews.title}
          className="w-full h-[320px] md:h-[320px] sm:h-[200px] object-cover block"
        />

        <CardContent className="p-6 md:p-8">
          {/* 标题 */}
          <h1 className="text-2xl md:text-2xl font-semibold text-slate-900 leading-relaxed mb-2">
            {currentNews.title}
          </h1>

          {/* 元信息：作者、时间、分类标签 */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 my-6">
            <span>作者：{currentNews.author}</span>
            <span>发布时间：{currentNews.publishTime}</span>
            <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-600">
              {currentNews.category}
            </span>
          </div>

          {/* 新闻正文 */}
          <div className="text-base text-slate-800 leading-relaxed space-y-4">
            {currentNews.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* 底部操作按钮 */}
          <div className="flex gap-4 mt-8">
            <Button variant="outline" onClick={() => navigate("/")}>
              返回首页
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              刷新内容
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}