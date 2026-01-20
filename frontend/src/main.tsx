import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainUserPage from './pages/MainUserPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainUserPage />
  </StrictMode>,
)
