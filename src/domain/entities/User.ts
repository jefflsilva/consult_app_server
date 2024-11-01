export class User {
    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public profileId: number | null,
    ) { }
}
