export interface IContact {
  id?: string;
  firstName: string;
  lastName: string;
  country: string;
  nationality: string;
  birthday: string;
  gender: string;
  nationalId: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
