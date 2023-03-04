export interface ContactDetails {
  id: number;
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumbers: string[];
  address: string;
  photoUrl?: string;
}

export interface ContactFormDetails {
  id?: number;
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumbers: string;
  address: string;
  photoUrl?: string;
}
