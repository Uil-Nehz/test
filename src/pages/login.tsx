import type { FormEvent } from 'react';
import { BookOpenText, CheckCircle2, Eye, LockKeyhole, Mail, Newspaper, Sparkles, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const highlights = [
  '智能推荐你的兴趣内容',
  '实时追踪热点新闻动态',
  '收藏与同步多端阅读记录',
];

const topicTags = ['热点', '财经', '科技', '本地', '深度'];

function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b16] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,_rgba(248,113,113,0.34),_transparent_30%),radial-gradient(circle_at_82%_12%,_rgba(251,146,60,0.24),_transparent_28%),radial-gradient(circle_at_50%_92%,_rgba(59,130,246,0.18),_transparent_34%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute -left-24 top-24 hidden h-72 w-72 rounded-full border border-white/10 lg:block" />
      <div className="absolute -right-20 bottom-10 hidden h-80 w-80 rounded-full border border-red-300/10 lg:block" />

      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <div className="hidden lg:block">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-13 w-13 items-center justify-center rounded-3xl bg-white/10 text-white shadow-2xl shadow-red-950/30 ring-1 ring-white/15 backdrop-blur">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">今日头条</p>
              <p className="text-sm text-white/55">精选资讯平台</p>
            </div>
          </div>

          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-red-100 shadow-lg shadow-black/10 backdrop-blur">
              <Sparkles className="h-4 w-4 text-red-300" />
              登录后解锁个性化资讯体验
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl font-black leading-[1.05] tracking-tight text-white">
                用更漂亮的方式，
                <span className="block bg-gradient-to-r from-red-200 via-red-400 to-orange-300 bg-clip-text text-transparent">
                  打开你的资讯世界。
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-white/68">
                聚合热点新闻、深度专题与本地资讯，让每一次登录都像进入一间为你准备好的智能编辑室。
              </p>
            </div>

            <div className="grid max-w-xl gap-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="group flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-black/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-400/15 text-red-200 ring-1 ring-red-200/20">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-white/78">{item}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-10 max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-400/20 blur-2xl" />
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/45">今日热度指数</p>
                  <p className="mt-1 text-3xl font-black">98.6</p>
                </div>
                <div className="rounded-2xl bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">+12.8%</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {topicTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/68 ring-1 ring-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white shadow-lg shadow-red-950/20 ring-1 ring-white/15 backdrop-blur">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">今日头条</p>
              <p className="text-xs text-white/55">精选资讯平台</p>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[2rem] border-white/15 bg-white/[0.92] text-slate-950 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-400 to-red-400" />
            <CardHeader className="space-y-4 px-7 pt-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 text-white shadow-xl shadow-red-500/25">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-black tracking-tight">欢迎回来</CardTitle>
                <CardDescription className="text-slate-500">登录账号，继续浏览你的专属资讯流</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-7 pb-7">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    邮箱 / 手机号
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="请输入邮箱或手机号"
                      autoComplete="username"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 shadow-inner shadow-slate-100 transition focus-visible:border-red-300 focus-visible:ring-red-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                      密码
                    </label>
                    <button type="button" className="text-sm font-semibold text-red-500 transition hover:text-red-600">
                      忘记密码？
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="请输入登录密码"
                      autoComplete="current-password"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-11 shadow-inner shadow-slate-100 transition focus-visible:border-red-300 focus-visible:ring-red-200"
                    />
                    <Eye className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <Checkbox id="remember" className="border-slate-300 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500" />
                    记住我
                  </label>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">安全加密登录</span>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 text-base font-bold shadow-xl shadow-red-500/25 transition hover:from-red-600 hover:to-orange-500"
                >
                  立即登录
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                其他方式登录
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="h-11 rounded-2xl border-slate-200 bg-white font-semibold hover:bg-red-50 hover:text-red-600">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  热点账号
                </Button>
                <Button type="button" variant="outline" className="h-11 rounded-2xl border-slate-200 bg-white font-semibold hover:bg-red-50 hover:text-red-600">
                  <BookOpenText className="h-4 w-4 text-red-500" />
                  阅读账号
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                还没有账号？
                <button type="button" className="ml-1 font-bold text-red-500 transition hover:text-red-600">
                  立即注册
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
