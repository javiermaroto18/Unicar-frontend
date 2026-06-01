import apiClient from './apiClient';

const login = async credentials => {
    const response = await apiClient.post('/login', credentials);
    return response.data;
};

const register = async userData => {
    const response = await apiClient.post('/register', userData);
    return response.data;
};

const logout = async () => {
    const response = await apiClient.post('/logout');
    localStorage.removeItem('authToken');
    return response.data;
};

const logoutAllDevices = async () => {
    const response = await apiClient.post('/logout-all');
    localStorage.removeItem('authToken');
    return response.data;
};

export const authService = {
    login,
    register,
    logout,
    logoutAllDevices
};
