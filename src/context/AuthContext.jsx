import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../api/authService';
import { profileService } from '../api/profileService';
import { limpiarCache } from '../utils/cacheListados';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await profileService.getProfile();
                    setUser(response.data); 
                } catch (error) {
                    console.error("Failed to fetch profile, token might be invalid.", error);
                    localStorage.removeItem('authToken');
                    limpiarCache();
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        verifyUser();
    }, []);

    const login = async (credentials) => {
        // Extraemos el token y el user directamente de la respuesta del login
        const { token, user: loggedInUser } = await authService.login(credentials);

        limpiarCache(); // Por si quedaban datos cacheados de una sesión anterior
        localStorage.setItem('authToken', token);
        setUser(loggedInUser); // Aplicamos el user directamente desde la respuesta del login y ahorrar peticiones a la API
    };

    const register = async (userData) => {
        const { token, user: registeredUser } = await authService.register(userData);

        limpiarCache();
        localStorage.setItem('authToken', token);
        setUser(registeredUser);
    };

    const logout = async () => {
        await authService.logout();
        localStorage.removeItem('authToken');
        limpiarCache();
        setUser(null);
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Renderizamos siempre: las rutas comprueban el token por su cuenta y
                los componentes que usan `user` ya lo protegen con `user && ...`.
                Así la landing pública no espera al cold-start del backend. */}
            {children}
        </AuthContext.Provider>
    );
}