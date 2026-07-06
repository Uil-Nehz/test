import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '@/pages';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;