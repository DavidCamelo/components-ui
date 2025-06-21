const API_BASE_URL = 'https://spring-boot.davidcamelo.com';

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response, resource) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Failed to perform operation on ${resource}`;
        throw new Error(errorMessage);
    }
    if (response.status === 204 || response.headers.get('Content-Length') === '0') {
        return null;
    }
    return response.json();
};

const createApiService = (resource) => {
    const API_URL = `${API_BASE_URL}/${resource}`;

    return {
        getAll: async () => {
            const response = await fetch(API_URL, { headers: getAuthHeaders() });
            return handleResponse(response, resource);
        },
        create: async (item) => {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(item),
            });
            return handleResponse(response, resource);
        },
        update: async (id, item) => {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(item),
            });
            return handleResponse(response, resource);
        },
        delete: async (id) => {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            });
            return handleResponse(response, resource);
        },
    };
};

export const authService = {
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return handleResponse(response, 'login');
    },
};

export const userService = createApiService('users');
export const productService = createApiService('products');
