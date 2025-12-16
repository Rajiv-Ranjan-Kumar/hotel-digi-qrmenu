import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import { AlertProvider } from './contexts/AlertProvider/AlertContext.tsx'
import { PersistGate } from 'redux-persist/integration/react'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider>
          <App />
        </AlertProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
