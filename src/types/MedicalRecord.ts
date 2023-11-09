export interface MedicalRecord {
  id?: number;
  consultationDate: string;
  diagnosis: string;
  treatment: string;
  prescription?: string;
  notes?: string;
  patientId: number;
}

export const medicalRecordInit: MedicalRecord = {
  id: 1,
  consultationDate: '',
  diagnosis: '',
  treatment: '',
  prescription: '',
  notes: '',
  patientId: 1,
};
