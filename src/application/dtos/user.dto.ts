export interface UserInput {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserOutput {
    id: number;
    name: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
