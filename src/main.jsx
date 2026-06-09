import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ConfirmProvider } from './context/ConfirmContext.jsx';
import { NotificationsProvider } from './context/NotificationsContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ToastProvider>
      <ConfirmProvider>
        <AuthProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </AuthProvider>
      </ConfirmProvider>
    </ToastProvider>
)
