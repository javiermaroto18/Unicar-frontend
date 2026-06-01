import apiClient from './apiClient';

const getProfile = async () => {
    const response = await apiClient.get('/me');
    return response;
};

const updateProfile = async (profileData) => {
    const response = await apiClient.post('/me', profileData);
    return response;
};

const updatePreferences = async (data) => {
    const response = await apiClient.put('/me/preferences', data);
    return response;
};

const changePassword = async (data) => {
    const response = await apiClient.put('/me/change-password', data);
    return response;
};

export const profileService = {
    getProfile,
    updateProfile,
    updatePreferences,
    changePassword
};