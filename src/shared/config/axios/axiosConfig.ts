import axios from 'axios';
import { backendURL } from 'shared/const/backendURL';

const token = localStorage.getItem('user');

export const instance = axios.create({
    baseURL: `${backendURL}`,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${token}`,
    },
});

interface refreshToken {
    token : string;
}

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('user')}`;
    return config;
});

instance.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<refreshToken>(`${backendURL}/auth/refresh`, {
                withCredentials: true,
            });
            localStorage.setItem('user', response.data.token);
            return instance.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован');
        }
    }
    throw error;
});
