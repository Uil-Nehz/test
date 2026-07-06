import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, NewsDetail } from '@/pages';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 动态新闻详情路由 */}
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;