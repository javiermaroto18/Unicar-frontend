import API_URL from './config';

async function apiClient(endpoint, { body, ...customConfig } = {}) {
    const token = localStorage.getItem('authToken');
    const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            return Promise.reject(errorData);
        }
        
        // For 204 No Content, response.json() will fail
        if (response.status === 204) {
            return Promise.resolve();
        }

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

apiClient.get = (endpoint, config) => apiClient(endpoint, { ...config, method: 'GET' });
apiClient.post = (endpoint, body, config) => apiClient(endpoint, { ...config, body, method: 'POST' });
apiClient.put = (endpoint, body, config) => apiClient(endpoint, { ...config, body, method: 'PUT' });
apiClient.delete = (endpoint, config) => apiClient(endpoint, { ...config, method: 'DELETE' });


export default apiClient;
