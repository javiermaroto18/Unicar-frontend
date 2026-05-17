import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/pages/DashboardPage.jsx';
import TripPage from './components/pages/TripPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import AuthPage from './components/pages/AuthPage.jsx';
import TripDetailView from './components/pages/TripDetailView.jsx';
import TicketView from './components/pages/TicketView.jsx';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trips" element={<TripPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/checkout/:id" element={<TripDetailView />} />
                <Route path="/ticket/:id" element={<TicketView />} />
            </Routes>
        </BrowserRouter>
    );
}