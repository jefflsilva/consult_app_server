import { UseInputDTO } from "../dtos/userInput.dto";
import { UserOutputDTO } from "../dtos/userOutput";
import { UserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/User";
import { emailValidatorProtocol } from "../../domain/validators/emailValidatorProtocol";

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private emailValidator: emailValidatorProtocol
    ) { }

    async execute(dto: UseInputDTO): Promise<UserOutputDTO> {
        if (dto.password !== dto.confirmPassword) {
            throw new Error("Passwords do not match");
        }
        if (!this.emailValidator.isValid(dto.email)) {
            throw new Error("Invalid email format");
        }

        const now = new Date();
        const user = new User(
            0,
            dto.name,
            dto.lastName,
            dto.email,
            dto.password,
            now,
            now,
            null
        );

        const createdUser = await this.userRepository.create(user);
        return new UserOutputDTO(
            createdUser.id,
            createdUser.name,
            createdUser.lastName,
            createdUser.email,
            createdUser.createdAt,
            createdUser.updatedAt,
        );
    }
}
