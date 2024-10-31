import { UserInput, UserOutput } from "../dtos/user.dto";
import { User } from "../../domain/entities/User";
import {UserRepository} from "../../domain/repositories/userRepository";

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(data: UserInput): Promise<UserOutput> {
        const { confirmPassword, ...userData } = data; // Não precisa do confirmPassword

        const user = new User(
            userData.name,
            userData.lastName,
            userData.email,
            userData.password,
        );

        const createdUser = await this.userRepository.create(user);
        return {
            id: createdUser.id,
            name: createdUser.name,
            lastName: createdUser.lastName,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };
    }
}
