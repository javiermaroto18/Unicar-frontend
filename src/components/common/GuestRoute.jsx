import { Navigate } from 'react-router-dom';

export default function GuestRoute({ children }) {
    const token = localStorage.getItem('authToken');
    if (token) {
        return <Navigate to="/dashboard" replace={true} />;
    }
        
    return children;    // Si NO tiene token, le dejamos ver la página solicitada (el AuthPage)
}