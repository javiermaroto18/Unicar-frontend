import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componente de ruta protegida y redireccion
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import GuestRoute from './components/common/GuestRoute.jsx';

// Cargamos cada página de forma diferida (code splitting): Vite genera un chunk
// por página, así la landing pública no descarga el código del resto de la app.
const DashboardPage  = lazy(() => import('./components/pages/DashboardPage.jsx'));
const TripPage       = lazy(() => import('./components/pages/TripPage.jsx'));
const ProfilePage    = lazy(() => import('./components/pages/ProfilePage.jsx'));
const ChatPage       = lazy(() => import('./components/pages/ChatPage.jsx'));
const AuthPage       = lazy(() => import('./components/pages/AuthPage.jsx'));
const TripDetailView = lazy(() => import('./components/pages/TripDetailView.jsx'));
const TicketView     = lazy(() => import('./components/pages/TicketView.jsx'));
const LandingPage    = lazy(() => import('./components/pages/LandingPage.jsx'));
// const PublicarPage = lazy(() => import('./components/pages/PublicarPage.jsx')); // TODO: descomentar al terminar el feature de publicar
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
            <Routes>
                {/*RUTAS PUBLICAS*/}
                <Route path='/' element={ <LandingPage />} />
                {/* <Route path='/publish' element={ <PublicarPage />} /> */}
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
            </Suspense>
        </BrowserRouter>
    );
}