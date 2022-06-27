import { DateTime } from '@react-bombado-bucha/backend/node_modules/@types/luxon/index';

export default interface IUser {
  id: number;

  email: string;

  name: string;

  photoUrl?: string;

  rememberMeToken?: string;

  createdAt: DateTime;

  updatedAt: DateTime;
}
