import { UserRepository } from "../../domain/repositories/userRepository"
import { User } from '../../domain/entities/user'
export class CreateUser {
    constructor(private userRepository: UserRepository) {

    }
    async execute(data: User): Promise<User> {
        return this.userRepository.save(data)
    }
}