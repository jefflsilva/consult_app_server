import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { emailValidatorProtocol } from "../../domain/validators/emailValidatorProtocol";
import { AppError } from "../../interfaces/erros/AppError";
import { InvalidParamError } from "../../interfaces/erros/invalid-param-error";
import { MissingParamError } from "../../interfaces/erros/missing-param-error";
import { ServerError } from "../../interfaces/erros/serverError";
import { UseInputDTO } from "../dtos/userInput.dto";
import { UserOutputDTO } from "../dtos/userOutput";

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private emailValidator: emailValidatorProtocol
    ) { }

    async execute(userInput: UseInputDTO): Promise<UserOutputDTO> {

        const existingUser = await this.userRepository.findByEmail(userInput.email);
        if (existingUser) {
            throw new AppError('User already exists');
        }

        if (!userInput.name) {
            throw new MissingParamError('name');
        }
        if (!userInput.lastName) {
            throw new MissingParamError('lastName');
        }
        if (!userInput.email) {
            throw new MissingParamError('email');
        }
        if (!userInput.password) {
            throw new MissingParamError('password');
        }
        if (!userInput.confirmPassword) {
            throw new MissingParamError('confirmPassword');
        }
        if (userInput.password !== userInput.confirmPassword) {
            throw new AppError('Passwords do not match');
        }

        if (!this.emailValidator.isValid(userInput.email)) {
            throw new InvalidParamError('email');
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
                createdUser.updatedAt,
            );
        } catch (error) {
            throw new ServerError('Error creating user',);
        }
    }


}