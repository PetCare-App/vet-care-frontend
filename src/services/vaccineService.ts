import { Vaccine } from '../types/Vaccine';
import { api } from './index';

export const vaccineService = {
  create: async (data: Vaccine) => {
    return await api.post(`/vaccines`, data);
  },
  getList: async () => {
    return await api.get(`/vaccines`);
  },
  getById: async (id: number) => {
    return await api.get(`/vaccines/${id}`);
  },
  update: async (data: Vaccine) => {
    return await api.patch(`/vaccines/${data.id}`, data);
  },
  delete: async (data: Vaccine) => {
    return await api.delete(`/vaccines/${data.id}`);
  },
};
