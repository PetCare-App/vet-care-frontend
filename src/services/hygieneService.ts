import { Hygiene } from '../types/Hygiene';
import { api } from './index';

export const hygieneService = {
  create: async (data: Hygiene) => {
    return await api.post(`/hygienes`, data);
  },
  getList: async () => {
    return await api.get(`/hygienes`);
  },
  getById: async (id: number) => {
    return await api.get(`/hygienes/${id}`);
  },
  update: async (data: Hygiene) => {
    return await api.patch(`/hygienes/${data.id}`, data);
  },
  delete: async (data: Hygiene) => {
    return await api.delete(`/hygienes/${data.id}`);
  },
};
