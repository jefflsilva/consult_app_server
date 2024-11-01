import { CreateUser } from "../../../application/use-cases/createUser";
import { User } from "../../../domain/entities/User";
import { UseInputDTO } from "../../../application/dtos/userInput.dto";
import { UserOutputDTO } from "../../../application/dtos/userOutput";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { emailValidatorProtocol } from "../../../domain/validators/emailValidatorProtocol";

describe("CreateUser Use Case", () => {
    let createUser: CreateUser;
    let userRepositoryMock: jest.Mocked<UserRepository>;
    let emailValidatorMock: jest.Mocked<emailValidatorProtocol>;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(),
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

        expect(result).toEqual(new UserOutputDTO(
            createdUser.id,
            createdUser.name,
            createdUser.lastName,
            createdUser.email,
            createdUser.createdAt,
            createdUser.updatedAt,
        ));

        expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.objectContaining({
            name: userInput.name,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
        }));
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

        await expect(createUser.execute(userInput)).rejects.toThrow("Passwords do not match");
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
        userRepositoryMock.create.mockRejectedValue(new Error("User already exists"));

        await expect(createUser.execute(userInput)).rejects.toThrow("User already exists");

        expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.any(User));
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
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

        await expect(createUser.execute(userInput)).rejects.toThrow("Invalid email format");

        expect(emailValidatorMock.isValid).toHaveBeenCalledWith("invalid-email");
        expect(emailValidatorMock.isValid).toHaveBeenCalledTimes(1);
    });
});
