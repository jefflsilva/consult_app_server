import { CreateUser } from "../../../../application/use-cases/createUser";
import { User } from "../../../../domain/entities/User";
import { UseInputDTO } from "../../../../application/dtos/users/userInput.dto";
import { UserOutputDTO } from "../../../../application/dtos/users/userOutput";
import { UserRepository } from "../../../../domain/repositories/userRepository";
import { emailValidatorProtocol } from "../../../../domain/validators/emailValidatorProtocol";
import { InvalidParamError } from "../../../../interfaces/erros/invalid-param-error";
import { MissingParamError } from "../../../../interfaces/erros/missing-param-error";
import { AppError } from "../../../../interfaces/erros/AppError";

describe("CreateUser Use Case", () => {
    let createUser: CreateUser;
    let userRepositoryMock: jest.Mocked<UserRepository>;
    let emailValidatorMock: jest.Mocked<emailValidatorProtocol>;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            createProfile: jest.fn(),
            findAll: jest.fn(),
        } as jest.Mocked<UserRepository>;

        emailValidatorMock = {
            isValid: jest.fn(),
        } as jest.Mocked<emailValidatorProtocol>;

        createUser = new CreateUser(userRepositoryMock, emailValidatorMock);
    });

    it("should successfully create a user", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        const now = new Date();

        const createdUser = new User(
            1,
            userInput.name,
            userInput.lastName,
            userInput.email,
            userInput.password,
            now,
            now,
            null
        );

        emailValidatorMock.isValid.mockReturnValue(true);
        userRepositoryMock.create.mockResolvedValue(createdUser);

        const result = await createUser.execute(userInput);

        expect(result).toEqual(
            new UserOutputDTO(
                createdUser.id,
                createdUser.name,
                createdUser.lastName,
                createdUser.email,
                createdUser.createdAt,
                createdUser.updatedAt
            )
        );

        expect(userRepositoryMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: userInput.name,
                lastName: userInput.lastName,
                email: userInput.email,
                password: userInput.password,
            })
        );
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when passwords do not match", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "differentpassword",
        };

        await expect(createUser.execute(userInput)).rejects.toThrow(AppError);
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new AppError("Passwords do not match")
        );
    });

    it("should throw an error when user creation fails", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        emailValidatorMock.isValid.mockReturnValue(true);
        userRepositoryMock.create.mockRejectedValue(
            new AppError("Error creating user")
        );

        await expect(createUser.execute(userInput)).rejects.toThrow(AppError);
        await expect(createUser.execute(userInput)).rejects.toThrow(
            "Error creating user"
        );
    });

    it("should throw an error for an invalid email format", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "invalid-email",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        emailValidatorMock.isValid.mockReturnValue(false);

        await expect(createUser.execute(userInput)).rejects.toThrow(
            InvalidParamError
        );
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new InvalidParamError("email")
        );
    });

    it("should throw an error when name is missing", async () => {
        const userInput: UseInputDTO = {
            name: "",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        await expect(createUser.execute(userInput)).rejects.toThrow(
            MissingParamError
        );
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new MissingParamError("name")
        );
    });

    it("should throw an error when last name is missing", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        await expect(createUser.execute(userInput)).rejects.toThrow(
            MissingParamError
        );
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new MissingParamError("lastName")
        );
    });

    it("should throw an error when email is missing", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        await expect(createUser.execute(userInput)).rejects.toThrow(
            MissingParamError
        );
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new MissingParamError("email")
        );
    });

    it("should throw an error when password is missing", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "",
            confirmPassword: "securepassword",
        };

        await expect(createUser.execute(userInput)).rejects.toThrow(
            MissingParamError
        );
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new MissingParamError("password")
        );
    });

    it("should throw an error when user already exists", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };
        const createdUserMock = new User(
            1,
            userInput.name,
            userInput.lastName,
            userInput.email,
            userInput.password,
            new Date(),
            new Date(),
            null
        );

        userRepositoryMock.findByEmail.mockResolvedValue(createdUserMock);
        await expect(createUser.execute(userInput)).rejects.toThrow(AppError);
        await expect(createUser.execute(userInput)).rejects.toThrow(
            new AppError("User already exists")
        );
    });
});
