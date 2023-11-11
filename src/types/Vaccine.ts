export interface Vaccine {
  id?: number;
  name: string;
  dateAdministered: string;
  expiryDate: string;
  notes?: string;
  patient?: string;
  patientVaccine?: string;
}

export const vaccineInit: Vaccine = {
  id: 1,
  name: 'vacina teste',
  dateAdministered: '2023-10-31T00:00:00.000Z',
  expiryDate: '2023-10-31T00:00:00.000Z',
  notes: 'paciente nota 10',
  patient: '',
  patientVaccine: '',
};
