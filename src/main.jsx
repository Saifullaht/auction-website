import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { NextUIProvider } from '@nextui-org/react';
import AuthContextProvider from './Context/AuthContext.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NextUIProvider>
    </QueryClientProvider>
      </StrictMode>
);
