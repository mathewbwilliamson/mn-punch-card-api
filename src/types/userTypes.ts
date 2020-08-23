import { UserAttributes } from '../../models/User';

export type NewUser = Omit<UserAttributes, 'id'> & { password2: string };

export enum Role {
    STUDENT = 'user',
    INSTRUCTOR = 'instructor',
    ADMIN = 'admin',
}
