import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages';
import { Toaster } from '@/components/ui/toaster';

const LoginPage = lazy(() => import('@/pages/login'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail'));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-foreground">加载中...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;