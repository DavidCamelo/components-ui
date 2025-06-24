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

const handleSelectOption = (item) => {
    if (item.user) {
        item.user = { id: item.user };
    } else {
        delete item.user;
    }
}

const createApiService = (resource, isLocal) => {
    let API_URL = `${API_BASE_URL}/${resource}`;
    if (isLocal) {
        API_URL = `http://api-gateway:8080/${resource}`;
    }

    return {
        getAll: async ({ pageNumber = null, pageSize = null, sortBy = null, sortDirection = null }) => {
            let url = API_URL;
            if (pageNumber && pageSize) {
                url += `?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`;
                if (sortBy && sortDirection) {
                    url += `&sortBy=${sortBy}&sortDirection=${sortDirection}`;
                }
            }
            const response = await fetch(url, { headers: getAuthHeaders() });
            return handleResponse(response, resource);
        },
        create: async (item) => {
            handleSelectOption(item);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(item),
            });
            return handleResponse(response, resource);
        },
        update: async (id, item) => {
            handleSelectOption(item);
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
    refreshToken: async (token) => {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: token }),
        });
        const data = await handleResponse(response, 'refresh');
        return data.accessToken;
    },
};

export const userService  = (isLocal) => createApiService('users', isLocal);
export const productService = (isLocal) => createApiService('products', isLocal);
