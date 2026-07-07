import { useState } from "react";
import type { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LOGIN_API_URL = "https://www.huibi.cm/api/login";

type LoginApiResponse = {
  success?: boolean;
  code?: number | string;
  status?: number | string;
  message?: string;
  msg?: string;
  error?: string;
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
    user?: unknown;
    [key: string]: unknown;
  };
  user?: unknown;
  [key: string]: unknown;
};

function getApiMessage(data: LoginApiResponse | null, fallback: string) {
  if (!data) return fallback;
  return data.message || data.msg || data.error || fallback;
}

function isLoginSuccess(response: Response, data: LoginApiResponse | null) {
  if (!response.ok) return false;
  if (!data) return true;

  if (typeof data.success === "boolean") {
    return data.success;
  }

  const code = String(data.code ?? "").toLowerCase();
  if (code === "0" || code === "200" || code === "success" || code === "ok") {
    return true;
  }

  const status = String(data.status ?? "").toLowerCase();
  if (status === "0" || status === "200" || status === "success" || status === "ok") {
    return true;
  }

  return data.code === undefined && data.status === undefined && data.error === undefined;
}

function getLoginToken(data: LoginApiResponse | null) {
  return data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken || "";
}

function getLoginUser(data: LoginApiResponse | null) {
  return data?.user || data?.data?.user || null;
}

async function parseLoginResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as LoginApiResponse;
  } catch {
    return {
      message: text,
    } satisfies LoginApiResponse;
  }
}

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

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

    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          account: trimAccount,
          password: trimPwd,
        }),
      });

      const data = await parseLoginResponse(response);

      if (!isLoginSuccess(response, data)) {
        toast({
          title: "登录失败",
          description: getApiMessage(data, response.status === 401 ? "账号或密码错误" : "登录接口返回失败，请稍后重试"),
        });
        return;
      }

      const token = getLoginToken(data);
      const user = getLoginUser(data);

      // 持久化登录状态，刷新页面不丢失登录标识
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginAccount", trimAccount);

      if (token) {
        localStorage.setItem("authToken", token);
      }

      if (user) {
        localStorage.setItem("loginUser", JSON.stringify(user));
      }

      toast({
        title: "登录成功",
        description: getApiMessage(data, "欢迎回到系统，即将跳转首页"),
      });

      navigate("/");
    } catch (err) {
      console.error("登录接口请求异常：", err);
      const errorMsg = err instanceof Error ? err.message : "未知网络异常";

      toast({
        title: "登录失败",
        description: `接口请求异常：${errorMsg}，请检查网络后重试`,
      });
    } finally {
      setIsSubmitting(false);
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
              autoComplete="username"
              disabled={isSubmitting}
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
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-all btn-glow hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "登录中..." : "立即登录"}
          </button>
        </form>
      </div>
    </div>
  );
}