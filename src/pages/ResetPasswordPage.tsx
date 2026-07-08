import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function isStrongPassword(value: string) {
  return value.length >= 6 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

export default function ResetPasswordPage() {
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordHint = useMemo(() => {
    if (!password) return "至少 6 位，需包含字母和数字";
    if (isStrongPassword(password)) return "密码强度符合要求";
    return "密码需至少 6 位，并包含字母和数字";
  }, [password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const trimAccount = account.trim();
    const trimCode = code.trim();
    const trimPassword = password.trim();
    const trimConfirmPassword = confirmPassword.trim();

    if (!trimAccount) {
      toast({ title: "输入校验失败", description: "请填写账号或手机号" });
      return;
    }

    if (!trimCode) {
      toast({ title: "输入校验失败", description: "请填写验证码" });
      return;
    }

    if (!isStrongPassword(trimPassword)) {
      toast({ title: "输入校验失败", description: "新密码至少 6 位，并包含字母和数字" });
      return;
    }

    if (trimPassword !== trimConfirmPassword) {
      toast({ title: "输入校验失败", description: "两次输入的新密码不一致" });
      return;
    }

    setIsSubmitting(true);

    try {
      // 当前项目暂无重置密码接口，这里先完成前端流程和交互反馈。
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      toast({ title: "密码已重置", description: "请使用新密码重新登录" });
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-foreground">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg card-glass animate-dev-up">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm text-muted-foreground">账号安全</p>
          <h1 className="text-2xl font-bold text-gradient">重置密码</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            输入账号信息并设置新密码，完成后可返回登录页使用新密码登录。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="reset-account">
              账号或手机号
            </label>
            <input
              id="reset-account"
              value={account}
              onChange={(ev) => setAccount(ev.target.value)}
              className="rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none transition-all focus:ring-1 focus:ring-ring"
              placeholder="请输入账号或手机号"
              autoComplete="username"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="reset-code">
              验证码
            </label>
            <input
              id="reset-code"
              value={code}
              onChange={(ev) => setCode(ev.target.value)}
              className="rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none transition-all focus:ring-1 focus:ring-ring"
              placeholder="请输入验证码"
              inputMode="numeric"
              autoComplete="one-time-code"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="reset-password">
              新密码
            </label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none transition-all focus:ring-1 focus:ring-ring"
              placeholder="请输入新密码"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">{passwordHint}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="reset-confirm-password">
              确认新密码
            </label>
            <input
              id="reset-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className="rounded-lg border border-border bg-input px-4 py-2.5 text-foreground outline-none transition-all focus:ring-1 focus:ring-ring"
              placeholder="请再次输入新密码"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary py-3 text-white transition-all btn-glow hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "提交中..." : "确认重置"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          想起密码了？{" "}
          <Link to="/login" className="font-medium text-primary hover:opacity-80">
            返回登录
          </Link>
        </div>
      </div>
    </div>
  );
}
