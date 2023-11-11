export interface ParasiteControl {
  id?: number;
  controlDate: string;
  controlType: string;
  patientId: number;
}

export const parasiteControlInit: ParasiteControl = {
  id: 1,
  controlDate: '2023-10-31T00:00:00.000Z',
  controlType: 'teste',
  patientId: 1,
};
