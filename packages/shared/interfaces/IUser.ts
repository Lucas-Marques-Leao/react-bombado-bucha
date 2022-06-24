export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    createdAt: Date;
    updatedAt: Date;
}