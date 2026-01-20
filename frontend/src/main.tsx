import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainUserPage from './pages/MainUserPage.tsx'
import StoreProvider from './mobxStore/StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <MainUserPage />
    </StoreProvider>
  </StrictMode>
);
