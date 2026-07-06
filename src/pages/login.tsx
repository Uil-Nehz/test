import { useState } from "react";

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("登录表单数据：", { account, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm p-6 rounded-lg border bg-white shadow-sm">
        <h1 className="text-xl font-bold text-center mb-6">用户登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">账号</label>
            <input
              value={account}
              onChange={(ev) => setAccount(ev.target.value)}
              className="border px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-slate-400"
              placeholder="请输入账号"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-600">密码</label>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="border px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-slate-400"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}