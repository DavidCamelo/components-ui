// API services for interacting with the backend
const createApiService = (resource) => {
    const API_URL = `https://spring-boot.davidcamelo.com/${resource}`;

    const handleResponse = async (response) => {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `Failed to perform operation on ${resource}`;
            throw new Error(errorMessage);
        }
        if (response.status === 204 || response.headers.get('Content-Length') === '0') {
            return;
        }
        return response.json();
    };

    return {
        getAll: async () => {
            const response = await fetch(API_URL);
            return handleResponse(response);
        },
    };
};

export const testService = createApiService('users');