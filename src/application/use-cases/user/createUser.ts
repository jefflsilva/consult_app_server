import { UserRepository } from "../../../domain/repositories/userRepository"
import { IEncryptService } from "../../../domain/services/encryptService"
import { User, UserInput } from "../../../domain/types/user/userModel"

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private encryptService: IEncryptService
    ) { }

    async execute(data: UserInput): Promise<User> {
        const { password, passwordConfirm } = data
        if (password !== passwordConfirm) {
            throw new Error('Passwords do not match')
        }

        const hashedPassword = await this.encryptService.generateHash(password)

        const userData = { ...data, password: hashedPassword }

        return this.userRepository.save(userData)
    }
}