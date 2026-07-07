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
const NewsDetail = lazy(() => import('@/pages/NewsDetail'));

// 懒加载失败兜底页面
const lazyErrorFallback = (
  <div className="flex items-center justify-center min-h-screen text-foreground">
    页面加载失败，请刷新重试
  </div>
);

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-foreground">加载中...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            <ErrorBoundary fallback={lazyErrorFallback}>
              <LoginPage />
            </ErrorBoundary>
          } />
          <Route path="/news/:id" element={
            <ErrorBoundary fallback={lazyErrorFallback}>
              <NewsDetail />
            </ErrorBoundary>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;