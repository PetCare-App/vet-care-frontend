import { MedicalRecord } from '../types/MedicalRecord';
import { api } from './index';

export const medicalRecordService = {
  create: async (data: MedicalRecord) => {
    return await api.post(`/patients-medical-records`, data);
  },
  getList: async () => {
    return await api.get(`/patients-medical-records`);
  },
  getById: async (id: number) => {
    return await api.get(`/patients-medical-records/${id}`);
  },
  update: async (data: MedicalRecord) => {
    return await api.patch(`/patients-medical-records/${data.id}`, data);
  },
  delete: async (data: MedicalRecord) => {
    return await api.delete(`/patients-medical-records/${data.id}`);
  },
};
