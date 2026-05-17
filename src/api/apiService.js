import apiUrl from './config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const apiService = {
    async get(endpoint) {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
        });
        return handleResponse(response);
    },

    async post(endpoint, data) {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint, data) {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async logout(endpoint) {
        const response = await fetch(`${apiUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
        });
        
        // Verificar si la respuesta es exitosa antes de eliminar el token
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Logout failed');
        }

        // Clear token on successful logout
        localStorage.removeItem('authToken');

        return { message: 'Logged out successfully' };
    }
};
