import { Pet } from '../types/Pet';
import { api } from './index';

export const petService = {
  create: async (data: Pet) => {
    return await api.post(`/patients`, data);
  },
  getList: async () => {
    return await api.get(`/patients`);
  },
  getById: async (id: number) => {
    return await api.get(`/patients/${id}`);
  },
  update: async (data: Pet) => {
    return await api.patch(`/patients/${data.id}`, data);
  },
};
