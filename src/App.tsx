import { lazy, Suspense, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages';
import { Toaster } from '@/components/ui/toaster';

// 懒加载错误边界组件
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
  <div className="flex items-center justify-center min-h-screen text-foreground animate-dev-up">
    <div className="p-8 rounded-xl border glass-primary shadow-lg">
      <h2 className="text-xl text-gradient mb-3">页面加载失败</h2>
      <p className="text-muted-foreground">请刷新页面重试</p>
    </div>
  </div>
);

// 全局加载兜底页面，统一视觉风格
const pageLoadingFallback = (
  <div className="flex items-center justify-center min-h-screen text-foreground animate-dev-up">
    <div className="p-8 rounded-xl border glass-primary shadow-lg animate-glow-pulse">
      <p className="text-gradient text-lg">页面加载中...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={pageLoadingFallback}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            <ErrorBoundary fallback={lazyErrorFallback}>
              <LoginPage />
            </ErrorBoundary>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;