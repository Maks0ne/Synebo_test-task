import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';
import './style/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
