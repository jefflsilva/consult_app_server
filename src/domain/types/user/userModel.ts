export enum UserRole {
    PROFESSIONAL = 'PROFESSIONAL',
    PATIENT = 'PATIENT'
}

export type UserInput = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export type User = {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    profileId?: (number | null);
    profile?: (Profile);
}

export type Profile = {
    id: number;
    role: UserRole;
    userId: number;
    specialty?: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    medicalHistory?: string;
    user: User;
}