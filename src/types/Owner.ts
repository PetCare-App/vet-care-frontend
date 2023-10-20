export interface Owner {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string | Date;
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
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  occupation: '',
  preferredPaymentMethod: '',
  petInsuranceDetails: '',
  additionalNotes: '',
  registrationDate: new Date(),
};
