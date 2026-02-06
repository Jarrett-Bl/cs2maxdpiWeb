import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import 'mantine-react-table/styles.css'
import './index.css'
import MainUserPage from './pages/MainUserPage.tsx'
import StoreProvider from './mobxStore/StoreProvider.tsx'
import { MantineProvider } from '@mantine/core'
import { mantineTheme } from './theme/mantineTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
      <StoreProvider>
        <MainUserPage />
      </StoreProvider>
    </MantineProvider>
  </StrictMode>
);
