import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const trimAccount = account.trim();
      const trimPwd = password.trim();
      // 表单非空校验
      if (!trimAccount) {
        toast({
          title: "输入错误",
          description: "请填写账号",
        });
        return;
      }
      if (!trimPwd) {
        toast({
          title: "输入错误",
          description: "请填写密码",
        });
        return;
      }
      console.log("登录表单数据：", { account: trimAccount, password: trimPwd });
      toast({
        title: "登录成功",
        description: "欢迎进入系统",
      });
      navigate("/");
    } catch (err) {
      console.error("登录执行异常：", err);
      toast({
        title: "登录失败",
        description: "操作出现异常，请稍后重试",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-lg border border-border bg-card shadow-lg card-glass">
        <h1 className="text-xl font-bold text-center mb-6 text-gradient">用户登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">账号</label>
            <input
              value={account}
              onChange={(ev) => setAccount(ev.target.value)}
              className="border border-border px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-ring bg-input text-foreground"
              placeholder="请输入账号"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">密码</label>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="border border-border px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-ring bg-input text-foreground"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:opacity-90 transition-colors btn-glow"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}