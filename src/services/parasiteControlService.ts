import { ParasiteControl } from '../types/ParasiteControl';
import { api } from './index';

export const parasiteControlService = {
  create: async (data: ParasiteControl) => {
    return await api.post(`/parasite-controlls`, data);
  },
  getList: async () => {
    return await api.get(`/parasite-controlls`);
  },
  getById: async (id: number) => {
    return await api.get(`/parasite-controlls/${id}`);
  },
  update: async (data: ParasiteControl) => {
    return await api.patch(`/parasite-controlls/${data.id}`, data);
  },
  delete: async (data: ParasiteControl) => {
    return await api.delete(`/parasite-controlls/${data.id}`);
  },
};
