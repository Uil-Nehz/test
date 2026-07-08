import type { FormEvent } from "react";
import { useState } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");

  const handleDouyinLogin = () => {
    console.log("发起抖音授权登录");
  };

  const handlePhoneLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("手机号快捷登录：", { phone });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080c] text-white">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#25f4ee]/30 blur-3xl" />
      <div className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-[#fe2c55]/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_36%)]" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between bg-black/30 p-10 md:flex">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-2xl bg-white">
                  <div className="absolute left-4 top-2 h-7 w-3 rounded-full bg-black" />
                  <div className="absolute left-5 top-7 h-3 w-5 rounded-full border-4 border-black" />
                  <div className="absolute left-6 top-1 h-7 w-3 rounded-full bg-[#25f4ee] mix-blend-multiply" />
                  <div className="absolute left-2 top-3 h-7 w-3 rounded-full bg-[#fe2c55] mix-blend-multiply" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Douyin Login</p>
                  <h1 className="text-2xl font-black tracking-wide">抖音登录</h1>
                </div>
              </div>
              <h2 className="text-4xl font-black leading-tight">
                用抖音账号，
                <br />
                快速进入今日头条。
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
                支持授权登录、扫码登录和手机号快捷登录，登录体验更轻、更快、更安全。
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs text-white/60">
              <div className="rounded-2xl bg-white/10 p-4">一键授权</div>
              <div className="rounded-2xl bg-white/10 p-4">扫码确认</div>
              <div className="rounded-2xl bg-white/10 p-4">安全可信</div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto max-w-sm">
              <div className="mb-8 text-center md:hidden">
                <p className="text-sm text-white/50">Douyin Login</p>
                <h1 className="mt-1 text-3xl font-black">抖音登录</h1>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="mx-auto mb-5 grid h-44 w-44 grid-cols-5 gap-2 rounded-3xl bg-white p-4 shadow-lg shadow-[#25f4ee]/10">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span
                      key={index}
                      className={`rounded-sm ${
                        [0, 1, 2, 5, 7, 10, 11, 12, 14, 16, 18, 19, 20, 22, 24].includes(index)
                          ? "bg-black"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm font-medium">打开抖音扫一扫登录</p>
                <p className="mt-2 text-center text-xs text-white/45">
                  扫码后请在抖音 App 内确认授权
                </p>
              </div>

              <button
                type="button"
                onClick={handleDouyinLogin}
                className="mt-5 w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-black transition hover:scale-[1.01] hover:bg-white/90"
              >
                使用抖音账号一键登录
              </button>

              <div className="my-6 flex items-center gap-3 text-xs text-white/35">
                <span className="h-px flex-1 bg-white/10" />
                <span>或使用手机号</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <form onSubmit={handlePhoneLogin} className="space-y-3">
                <label className="block text-sm text-white/70">手机号</label>
                <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/10 focus-within:border-[#25f4ee]/70">
                  <span className="border-r border-white/10 px-4 py-3 text-sm text-white/60">+86</span>
                  <input
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/30"
                    placeholder="请输入手机号"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-[#25f4ee] via-white to-[#fe2c55] px-4 py-3 text-sm font-bold text-black transition hover:opacity-90"
                >
                  获取验证码并登录
                </button>
              </form>

              <p className="mt-6 text-center text-xs leading-5 text-white/35">
                登录即代表同意《用户协议》《隐私政策》以及抖音授权服务协议
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}