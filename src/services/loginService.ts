import { api } from './index';

export const loginService = {
  vetLogin: async (data: { email: string; password: string }) => {
    const response = await api.post(`/auth/login`, data);
    return response;
  },
  getUser: async (id: number) => {
    return await api.get(`/users/${id}`);
  },
};
