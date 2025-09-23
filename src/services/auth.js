import { httpClient, setToken, removeToken } from '@/libs/http-client';

export const authService = {
    async getMe() {
        const response = await httpClient.get('users/me');
        return response.data.data;
    },

    async login(email, password, otp) {
        const payload = { email, password };
        if (otp) payload.otp = otp;

        const response = await httpClient.post('auth/login', payload);
        setToken(response.data.data);
        return this.getMe();
    },

    async logout() {
        removeToken();
    },

    async refresh() {
        const response = await httpClient.post('auth/refresh');
        setToken(response.data.data);
        return this.getMe();
    }
};