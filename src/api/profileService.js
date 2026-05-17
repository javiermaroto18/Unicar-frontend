import apiClient from './apiClient';

const getProfile = async () => {
    // El endpoint en nuestro backend de Laravel es /me, no /profile
    const response = await apiClient.get('/me');
    return response;
};

const updateProfile = async (profileData) => {
    // Cuando hagamos la edición del perfil en el backend, usaremos esta ruta
    const response = await apiClient.put('/me', profileData);
    return response;
};

export const profileService = {
    getProfile,
    updateProfile,
};