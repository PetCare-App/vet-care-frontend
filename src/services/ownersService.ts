import { Owner } from '../types/Owner';
import { api } from './index';

export const ownersService = {
  createOwner: async (data: Owner) => {
    return await api.post(`/owners`, data);
  },
  getOwnersList: async () => {
    return await api.get(`/owners`);
  },
  getOwnerById: async (id: number) => {
    return await api.get(`/owners/${id}`);
  },
};
