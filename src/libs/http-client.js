import axios from 'axios';
import { settings } from '@/constants/config';

const httpClient = axios.create({
    baseURL: `${settings.directus_url}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const httpClientApi = axios.create({
    baseURL: `${settings.api_url}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token
httpClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para adicionar token
httpClientApi.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para lidar com refresh token
httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await refreshToken();
                const token = getToken();
                if (token) {
                    error.config.headers.Authorization = `Bearer ${token}`;
                    return httpClient.request(error.config);
                }
            } catch (refreshError) {
                removeToken();
                // Redirecionar para login se necessário
            }
        }
        return Promise.reject(error);
    }
);

function getToken() {
    if (typeof window === 'undefined') return null;
    try {
        const data = localStorage.getItem(settings.key_cookie);
        return data ? JSON.parse(data).access_token : null;
    } catch {
        return null;
    }
}

function setToken(tokenData) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(settings.key_cookie, JSON.stringify(tokenData));
    } catch { }
}

function removeToken() {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(settings.key_cookie);
    } catch { }
}

async function refreshToken() {
    const data = JSON.parse(localStorage.getItem(settings.key_cookie) || '{}');
    if (!data.refresh_token) throw new Error('No refresh token');

    const response = await axios.post(`${settings.directus_url}/auth/refresh`, {
        refresh_token: data.refresh_token
    });

    setToken(response.data.data);
    return response.data.data;
}

export { httpClient, httpClientApi, setToken, removeToken };