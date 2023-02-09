export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: string;
  isDisabled: boolean;
  isExpanded: boolean;
}
