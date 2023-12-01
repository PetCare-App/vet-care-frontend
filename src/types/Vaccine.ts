export interface Vaccine {
  id?: number;
  name: string;
  dateAdministered: string;
  notes?: string;
  patientId?: string;
}

export const vaccineInit: Vaccine = {
  id: 1,
  name: '',
  dateAdministered: '',
  notes: '',
  patientId: '',
};
