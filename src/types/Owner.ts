export interface Owner {
  id?: number;
  name: string; //
  address: string; //
  phoneNumber: string; //
  email: string; //
  dateOfBirth?: string; //
  gender: string; //
  maritalStatus: string; //
  occupation: string; //
  photoUrl?: string | null;
  preferredPaymentMethod?: string; //
  petInsuranceDetails?: string;
  additionalNotes?: string;
  registrationDate: string | Date;
  password?: string;
  patients?: [];
}

export const ownerInit: Owner = {
  id: 1,
  name: 'Teste 123',
  address: 'Rua Duque de Caxias',
  phoneNumber: '(51) 994051771',
  email: 'teste@gmail.com',
  dateOfBirth: '1979-06-22T00:00:00.000Z',
  gender: 'male',
  maritalStatus: 'married',
  occupation: 'Professor de Inglês',
  photoUrl:
    'https://upload.wikimedia.org/wikipedia/commons/6/68/Solid_black.png',
  preferredPaymentMethod: 'pix',
  petInsuranceDetails: 'não possui',
  additionalNotes: 'teste',
  registrationDate: '2023-10-11T23:40:06.487Z',
  password: 'senha123',
  patients: [
    // {
    //   id: 1,
    //   name: 'Salem',
    //   species: 'Gato',
    //   breed: 'Perfeito',
    //   dateOfBirth: '2018-07-18T00:00:00.000Z',
    //   sex: 'male',
    //   color: 'Preto',
    //   weight: '6.3',
    //   allergies: 'não',
    //   medications: '',
    //   ownerId: 1,
    //   emergencyContact: '',
    //   photoUrl: '',
    //   currentStatus: 'n/a',
    //   additionalNotes: 'eu amo o salem',
    // },
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
