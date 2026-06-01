import API_URL from './config';

// Funcion para hacer peticiones a la API, manejando autenticación y errores de forma centralizada
async function apiClient(endpoint, { body, ...customConfig } = {}) {
    const token = localStorage.getItem('authToken');
    const isFormData = body instanceof FormData;
    
    const headers = { 
        'Accept': 'application/json',
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

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
        config.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            return Promise.reject(errorData);
        }
        
        if (response.status === 204) {
            return Promise.resolve();
        }

        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
}

// Metodos para cada tipo de peticion
apiClient.get = (endpoint, config) => apiClient(endpoint, { ...config, method: 'GET' });
apiClient.post = (endpoint, body, config) => apiClient(endpoint, { ...config, body, method: 'POST' });
apiClient.put = (endpoint, body, config) => apiClient(endpoint, { ...config, body, method: 'PUT' });
apiClient.delete = (endpoint, config) => apiClient(endpoint, { ...config, method: 'DELETE' });

export default apiClient;