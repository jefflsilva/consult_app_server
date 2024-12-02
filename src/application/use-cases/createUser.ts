import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { emailValidatorProtocol } from "../../domain/validators/emailValidatorProtocol";
import { AppError } from "../erros/AppError";
import { InvalidParamError } from "../erros/invalid-param-error";
import { MissingParamError } from "../erros/missing-param-error";
import { ServerError } from "../erros/serverError";
import { UseInputDTO } from "../dtos/users/userInput.dto";
import { UserOutputDTO } from "../dtos/users/userOutput";

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private emailValidator: emailValidatorProtocol
    ) {}

    async execute(userInput: UseInputDTO): Promise<UserOutputDTO> {
        const existingUser = await this.userRepository.findByEmail(
            userInput.email
        );
        for (const key in userInput) {
            if (!userInput[key as keyof UseInputDTO]) {
                throw new MissingParamError(key);
            }
        }
        if (existingUser) {
            throw new AppError("User already exists");
        }

        if (userInput.password !== userInput.confirmPassword) {
            throw new AppError("Passwords do not match");
        }

        if (!this.emailValidator.isValid(userInput.email)) {
            throw new InvalidParamError("email");
        }

        const now = new Date();
        const user = new User(
            0,
            userInput.name,
            userInput.lastName,
            userInput.email,
            userInput.password,
            now,
            now,
            null
        );
        try {
            const createdUser = await this.userRepository.create(user);
            return new UserOutputDTO(
                createdUser.id,
                createdUser.name,
                createdUser.lastName,
                createdUser.email,
                createdUser.createdAt,
                createdUser.updatedAt
            );
        } catch (error) {
            throw new ServerError("Error creating user");
        }
    }
}
