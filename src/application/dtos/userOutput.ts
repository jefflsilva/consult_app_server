export class UserOutputDTO {
    constructor(
        public id: number,
        public name: string,
        public lastName: string,
        public email: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
