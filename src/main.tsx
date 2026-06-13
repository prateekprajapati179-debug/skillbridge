import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
    else if (saved === 'light') document.documentElement.classList.remove('dark');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.add('dark');
  } catch (e) {
    // ignore
  }
}

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
