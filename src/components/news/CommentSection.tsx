import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockCommentList } from "@/data/mock-news";
import type { CommentItem } from "@/types/comment";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface CommentSectionProps {
  newsId: string;
}

export function CommentSection({ newsId }: CommentSectionProps) {
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<CommentItem[]>(mockCommentList);

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
    mockCommentList.unshift(newComment);
    setUserName("");
    setContent("");
    toast({ title: "成功", description: "评论发布完成" });
  };

  return (
    <div className="mt-8 border-t border-border pt-8">
      <h3 className="text-lg font-semibold mb-6">评论区</h3>
      {/* 评论输入表单 */}
      <div className="flex flex-col gap-4 mb-6">
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
        <Button className="w-fit" onClick={handleSubmit}>发布评论</Button>
      </div>
      {/* 评论列表 */}
      <div className="space-y-4">
        {targetComments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">暂无评论，快来抢沙发</p>
        ) : (
          targetComments.map((item) => (
            <div key={item.commentId} className="border border-border rounded-md p-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{item.userName}</span>
                <span>{item.createTime}</span>
              </div>
              <p className="text-sm text-foreground">{item.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}