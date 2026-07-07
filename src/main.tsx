import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 初始化强制开启深色主题，同步本地存储
(function initDarkMode() {
  const html = document.documentElement;
  const savedDark = localStorage.getItem('theme-dark');
  if (savedDark !== 'false') {
    html.classList.add('dark');
    localStorage.setItem('theme-dark', 'true');
  } else {
    html.classList.remove('dark');
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)