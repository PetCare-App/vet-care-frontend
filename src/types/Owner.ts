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
  patients: [
    {
      id: 1,
      name: 'Salem',
      species: 'Gato',
      breed: 'Perfeito',
      dateOfBirth: '2018-07-18T00:00:00.000Z',
      sex: 'male',
      color: 'Preto',
      weight: '6.3',
      allergies: 'não',
      medications: '',
      ownerId: 1,
      emergencyContact: '',
      photoUrl: '',
      currentStatus: 'n/a',
      additionalNotes: 'eu amo o salem',
    },
  ],
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
