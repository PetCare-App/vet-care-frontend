export interface Hygiene {
  id?: number;
  serviceDate: string;
  notes?: string;
  patientId: number;
}

export const hygieneInit: Hygiene = {
  id: 1,
  serviceDate: '2023-10-31T00:00:00.000Z',
  notes: 'teste',
  patientId: 1,
};
