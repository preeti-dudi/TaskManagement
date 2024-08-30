import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Set up base Axios instance
const api: AxiosInstance = axios.create({
    baseURL: 'https://task-management-back-end-theta.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to refresh the token
const refreshToken = async () => {
    try {
        const response = await axios.post('https://task-management-back-end-theta.vercel.app/api/auth/refresh-token', {
            token: localStorage.getItem('refreshToken'),
        });
        localStorage.setItem('token', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
};


// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    // Ensure headers exist before assigning the Authorization header
    if (token) {
      config.headers = config.headers || {};  // Ensure headers object exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token errors, possibly redirect to login
                console.error('Refresh token failed', refreshError);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login on failure
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
