import { UserRepository } from "../../domain/repositories/userRepository"
import { User, UserInput } from "../../domain/types/user/userModel"
export class CreateUser {
    constructor(private userRepository: UserRepository) {

    }
    async execute(data: UserInput): Promise<User> {
        return this.userRepository.save(data)
    }
}