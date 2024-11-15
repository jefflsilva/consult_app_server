import { UserRole } from "../../../domain/entities/userRole";

export class ProfileInputDTO {
    constructor(
        public userId: number,

        public role: UserRole,
        public bio: string,
        public avatarUrl: string,
        public birthDate: Date,

        public phoneNumber: string,
        public gender: string,
        public zipCode: string,
        public country: string,
        public state: string,
        public city: string,

        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
