import { DateTime } from "luxon";

export default interface IUser {

  id: number;

  email: string;

  name: string;

  photoUrl?: string;

  rememberMeToken?: string;

  createdAt: DateTime;

  updatedAt: DateTime;
}
