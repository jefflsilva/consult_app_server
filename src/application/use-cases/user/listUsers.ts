import { UserRepository } from "../../../domain/repositories/userRepository"
import { User } from "../../../domain/types/user/userModel"

export class ListUsers {
    constructor(private userRepository: UserRepository) { }

    async execute(): Promise<Omit<User, 'password'>[]> {
        return this.userRepository.findAll();
    }
}