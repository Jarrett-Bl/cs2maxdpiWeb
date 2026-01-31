import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import './index.css'
import MainUserPage from './pages/MainUserPage.tsx'
import StoreProvider from './mobxStore/StoreProvider.tsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <StoreProvider>
        <MainUserPage />
      </StoreProvider>
    </MantineProvider>
  </StrictMode>
);
