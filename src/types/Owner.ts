export interface Owner {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  photoUrl?: string | null;
  preferredPaymentMethod?: string;
  petInsuranceDetails?: string;
  additionalNotes?: string;
  registrationDate: string | Date;
}

export const ownerInit = {
  id: 1,
  name: 'Nadine Baptista Zingano',
  address: 'Rua Duque de Caxias',
  phoneNumber: '(51) 994051771',
  email: 'nadine.zingano@gmail.com',
  dateOfBirth: '1993-06-06T00:00:00.000Z',
  gender: 'female',
  maritalStatus: 'married',
  occupation: 'Engenheira de Software',
  photoUrl: null,
  preferredPaymentMethod: 'pix',
  petInsuranceDetails: 'não possui',
  additionalNotes: 'teste',
  registrationDate: '2023-10-11T23:40:06.487Z',
  patients: [],
};

// {
//   name: '',
//   address: '',
//   phoneNumber: '',
//   email: '',
//   dateOfBirth: '',
//   gender: '',
//   maritalStatus: '',
//   occupation: '',
//   preferredPaymentMethod: '',
//   petInsuranceDetails: '',
//   additionalNotes: '',
//   registrationDate: new Date(),
// };
