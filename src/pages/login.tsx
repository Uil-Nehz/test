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
    const trimAccount = account.trim();
    const trimPwd = password.trim();

    // 表单非空校验
    if (!trimAccount) {
      toast({
        title: "输入校验失败",
        description: "请填写登录账号",
      });
      return;
    }
    if (!trimPwd) {
      toast({
        title: "输入校验失败",
        description: "请填写登录密码",
      });
      return;
    }

    try {
      console.log("登录表单提交数据：", { account: trimAccount, password: trimPwd });
      // 持久化登录状态，刷新页面不丢失登录标识
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginAccount", trimAccount);

      toast({
        title: "登录成功",
        description: "欢迎回到系统，即将跳转首页",
      });
      navigate("/");
    } catch (err) {
      console.error("登录执行异常：", err);
      // 细分异常提示，精准定位故障
      const errorMsg = err instanceof Error ? err.message : "未知操作异常";
      toast({
        title: "登录失败",
        description: `操作异常：${errorMsg}，请检查网络后重试`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 rounded-xl border border-border bg-card shadow-lg card-glass animate-dev-up">
        <h1 className="text-2xl font-bold text-center mb-8 text-gradient">系统用户登录</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">账号</label>
            <input
              value={account}
              onChange={(ev) => setAccount(ev.target.value)}
              className="border border-border px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-ring bg-input text-foreground transition-all"
              placeholder="请输入账号"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">密码</label>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="border border-border px-4 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-ring bg-input text-foreground transition-all"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-all btn-glow hover:-translate-y-0.5"
          >
            立即登录
          </button>
        </form>
      </div>
    </div>
  );
}