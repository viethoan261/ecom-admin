import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './pages/routers';
import store from './redux/store';
import customTheme from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

function App() {
  return (
    <React.StrictMode>
      <SocketProvider>
        <Provider store={store}>
          <CookiesProvider>
            <BrowserRouter>
              <MantineProvider theme={customTheme}>
                <ModalsProvider>
                  <Notifications position="top-right" />
                  <AuthProvider>
                    <AppRoutes />
                  </AuthProvider>
                </ModalsProvider>
              </MantineProvider>
            </BrowserRouter>
          </CookiesProvider>
        </Provider>
      </SocketProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
