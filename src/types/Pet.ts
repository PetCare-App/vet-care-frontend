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
}

export const petInit = {
  id: 1,
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
};
