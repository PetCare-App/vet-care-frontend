/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  dateOfBirth?: string;
  sex: string;
  color: string;
  weight: number;
  allergies?: string;
  medications?: string;
  emergencyContact?: string;
  photoUrl?: string;
  currentStatus: string;
  additionalNotes?: string;
  ownerId: number;
  owner?: any;
  parasiteControl?: [];
  vaccines?: [];
  patientMedicalRecord?: [];
  hygiene?: [];
}

export const petInit = {
  id: 6,
  name: '',
  species: '',
  breed: '',
  dateOfBirth: '',
  sex: '',
  color: '',
  weight: '',
  allergies: '',
  medications: '',
  emergencyContact: '',
  photoUrl: '',
  currentStatus: 'n/a',
  additionalNotes: '',
  ownerId: 1,
  owner: {},
  parasiteControl: [],
  vaccines: [],
  patientMedicalRecord: [],
};
