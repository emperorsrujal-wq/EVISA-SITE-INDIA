
export interface VisaCategory {
  id: string;
  name: string;
}

export type ApplicationStep = 'personal' | 'passport' | 'visa-details' | 'review' | 'payment';

export interface ApplicationFormData {
  nationality: string;
  passportType: string;
  portOfArrival: string;
  email: string;
  visaType: string;
  surname: string;
  givenNames: string;
  passportNumber: string;
  dateOfBirth: string;
}
