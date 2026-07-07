import { lazy, Suspense, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages';
import { NewsDetailPage } from '@/pages/NewsDetailPage';
import { Toaster } from '@/components/ui/toaster';

// 全局错误边界组件：避免页面运行时报错后直接白屏
class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const LoginPage = lazy(() => import('@/pages/login'));

// 懒加载失败兜底页面，统一全站玻璃卡片视觉
const lazyErrorFallback = (
  <div className="flex min-h-screen items-center justify-center text-foreground animate-dev-up">
    <div className="p-8 rounded-xl border glass-primary shadow-lg">
      <h2 className="text-xl text-gradient mb-3">页面加载失败</h2>
      <p className="text-muted-foreground">请刷新页面重试</p>
    </div>
  </div>
);

// 全局渲染异常兜底页面，防止首页或组件报错后出现白屏
const appErrorFallback = (
  <div className="flex min-h-screen items-center justify-center px-4 text-foreground animate-dev-up">
    <div className="w-full max-w-md p-8 rounded-xl border glass-primary shadow-lg">
      <h2 className="text-xl text-gradient mb-3">页面渲染异常</h2>
      <p className="text-muted-foreground">
        页面没有成功显示，已阻止白屏。请刷新页面重试。
      </p>
    </div>
  </div>
);

// 全局加载兜底页面，统一视觉风格
const pageLoadingFallback = (
  <div className="flex min-h-screen items-center justify-center text-foreground animate-dev-up">
    <div className="p-8 rounded-xl border glass-primary shadow-lg animate-glow-pulse">
      <p className="text-gradient text-lg">页面加载中...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen text-foreground">
        <Toaster />
        <ErrorBoundary fallback={appErrorFallback}>
          <Suspense fallback={pageLoadingFallback}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route
                path="/login"
                element={
                  <ErrorBoundary fallback={lazyErrorFallback}>
                    <LoginPage />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;