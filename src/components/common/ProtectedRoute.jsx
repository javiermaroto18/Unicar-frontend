import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('authToken'); 
    if (!token) {
        return <Navigate to="/auth" replace={true} />;
    }
   
    return children;    // Si hay token, renderizamos la página que estaba intentando ver
}