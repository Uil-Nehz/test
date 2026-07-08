import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockCommentList } from "@/data/mock-news";
import type { CommentItem } from "@/types/comment";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const COMMENT_STORAGE_KEY = "today-news-comments";

function getInitialComments() {
  if (typeof window === "undefined") return mockCommentList;

  try {
    const savedComments = window.localStorage.getItem(COMMENT_STORAGE_KEY);
    if (!savedComments) return mockCommentList;

    const parsedComments = JSON.parse(savedComments);
    return Array.isArray(parsedComments) ? parsedComments as CommentItem[] : mockCommentList;
  } catch {
    return mockCommentList;
  }
}

interface CommentSectionProps {
  newsId: string;
}

export function CommentSection({ newsId }: CommentSectionProps) {
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentItem[]>(getInitialComments);

  useEffect(() => {
    window.localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const targetComments = useMemo(() => {
    return comments.filter(item => item.newsId === newsId);
  }, [comments, newsId]);

  // 发布评论
  const handleSubmit = () => {
    const trimName = userName.trim();
    const trimContent = content.trim();
    if (!trimName) {
      toast({ title: "提示", description: "请输入昵称" });
      return;
    }
    if (!trimContent) {
      toast({ title: "提示", description: "请输入评论内容" });
      return;
    }
    const newComment: CommentItem = {
      commentId: `c${Date.now()}`,
      newsId,
      userName: trimName,
      content: trimContent,
      createTime: new Date().toLocaleString().replaceAll("/", "-")
    };
    setComments(prevComments => [newComment, ...prevComments]);
    setUserName("");
    setContent("");
    toast({ title: "成功", description: "评论发布完成" });
  };

  return (
    <div className="mt-8 border-t border-border pt-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">评论区</h3>
        <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          {targetComments.length} 条评论
        </span>
      </div>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border bg-background/30 p-4 card-glass">
        <Input
          placeholder="请输入你的昵称"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Textarea
          rows={3}
          placeholder="写下你的看法..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="w-fit gap-2 rounded-full" onClick={handleSubmit}>
          <Send className="h-4 w-4" />
          发布评论
        </Button>
      </div>
      <div className="space-y-4">
        {targetComments.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            暂无评论，快来抢沙发
          </p>
        ) : (
          targetComments.map((item) => (
            <div key={item.commentId} className="rounded-2xl border border-border bg-muted/20 p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{item.userName}</span>
                <span>{item.createTime}</span>
              </div>
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-foreground">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}