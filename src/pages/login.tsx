import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// 模拟登录接口
const mockLoginApi = async (username: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  if (username === "admin" && password === "123456") {
    return { success: true, msg: "登录成功" };
  }
  return { success: false, msg: "账号或密码错误，请重新输入" };
};

export default function LoginPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;

    // 表单空值校验
    if (!username.trim() || !password.trim()) {
      toast({
        title: "输入有误",
        description: "账号和密码不能为空",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await mockLoginApi(username, password);
      if (res.success) {
        toast({
          title: "登录成功",
          description: "即将跳转首页",
        });
        // 此处可补充路由跳转逻辑
      } else {
        toast({
          title: "登录失败",
          description: res.msg,
        });
      }
    } catch (err) {
      toast({
        title: "请求异常",
        description: "网络错误，请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className={cn(
        "w-full max-w-md p-8 rounded-xl border border-border bg-card shadow-sm"
      )}>
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">账号登录</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">账号</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              )}
              placeholder="请输入账号"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={cn(
                "w-full px-4 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              )}
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-2.5 rounded-lg bg-foreground text-background font-medium transition-opacity",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
}