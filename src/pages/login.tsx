
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
  "ceshi pr"
];

function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.12),_transparent_32%)]" />

      <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="hidden lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
              <Newspaper className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">今日头条</p>
              <p className="text-sm text-slate-500">精选资讯平台</p>
            </div>
          </div>

          <div className="max-w-xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-sm font-medium text-red-600 shadow-sm">
              <Sparkles className="h-4 w-4" />
              登录后解锁个性化资讯体验
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-950">
                掌握每一个重要时刻，
                <span className="text-red-600">从登录开始。</span>
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                聚合热点新闻、深度专题与本地资讯，为你打造更高效、更可靠的阅读入口。
              </p>
            </div>

            <div className="grid max-w-lg gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white bg-white/75 p-4 shadow-sm backdrop-blur">
                  <CheckCircle2 className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/20">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">今日头条</p>
              <p className="text-xs text-slate-500">精选资讯平台</p>
            </div>
          </div>

          <Card className="border-white/80 bg-white/90 shadow-2xl shadow-slate-200/80 backdrop-blur">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
                <CardDescription>登录账号，继续浏览你的专属资讯流</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    邮箱 / 手机号
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="请输入邮箱或手机号"
                      autoComplete="username"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                      密码
                    </label>
                    <button type="button" className="text-sm font-medium text-red-600 hover:text-red-700">
                      忘记密码？
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="请输入登录密码"
                      autoComplete="current-password"
                      className="h-11 px-10"
                    />
                    <Eye className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="remember" className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <Checkbox id="remember" />
                    记住我
                  </label>
                  <span className="text-xs text-slate-400">安全加密登录</span>
                </div>

                <Button type="submit" className="h-11 w-full bg-red-600 text-base font-semibold hover:bg-red-700">
                  登录
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px flex-1 bg-slate-200" />
                其他方式登录
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="h-10 bg-white">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  热点账号
                </Button>
                <Button type="button" variant="outline" className="h-10 bg-white">
                  <BookOpenText className="h-4 w-4 text-red-600" />
                  阅读账号
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                还没有账号？
                <button type="button" className="ml-1 font-semibold text-red-600 hover:text-red-700">
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
