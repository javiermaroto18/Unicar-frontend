import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/pages/DashboardPage.jsx';
import TripPage from './components/pages/TripPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import ChatPage from './components/pages/ChatPage.jsx';
import './App.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/trips" element={<TripPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}