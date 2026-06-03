import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componente de ruta protegida y redireccion
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import GuestRoute from './components/common/GuestRoute.jsx';

import DashboardPage from './components/pages/DashboardPage.jsx';
import TripPage from './components/pages/TripPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import AuthPage from './components/pages/AuthPage.jsx';
import TripDetailView from './components/pages/TripDetailView.jsx';
import TicketView from './components/pages/TicketView.jsx';
import LandingPage from './components/pages/LandingPage.jsx';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*RUTAS PUBLICAS*/}
                <Route path='/' element={ <LandingPage />} />
                {/* Ruta de redirección para usuarios autenticados */}
                <Route 
                    path="/auth" 
                    element={
                        <GuestRoute>
                            <AuthPage />
                        </GuestRoute>
                    } 
                />

                {/*RUTAS PROTEGIDAS*/}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/trips" 
                    element={
                        <ProtectedRoute>
                            <TripPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/chat" 
                    element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/checkout/:id" 
                    element={
                        <ProtectedRoute>
                            <TripDetailView />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/manage-trip/:id" 
                    element={
                        <ProtectedRoute>
                            <TripDetailView />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/trip-details/:id" 
                    element={
                        <ProtectedRoute>
                            <TripDetailView />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/ticket/:id" 
                    element={
                        <ProtectedRoute>
                            <TicketView />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}