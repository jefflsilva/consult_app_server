import { UserService } from "../../../application/services/userService";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { CreateUser } from "../../../application/use-cases/createUser";
import { UserInput, UserOutput } from "../../../application/dtos/user.dto";

describe("UserService", () => {
    let userService: UserService;
    let userRepositoryMock: jest.Mocked<PrismaUserRepository>;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(),
        } as unknown as jest.Mocked<PrismaUserRepository>;

        const createUserMock = new CreateUser(userRepositoryMock);
        userService = new UserService(createUserMock);
    });

    it("should create a user successfully", async () => {
        const userInput: UserInput = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        const now = new Date();

        const createdUser: UserOutput = {
            id: 1,
            name: userInput.name,
            lastName: userInput.lastName,
            email: userInput.email,
            createdAt: now,
            updatedAt: now,
        };

        userRepositoryMock.create.mockResolvedValue(createdUser);

        const result = await userService.registerUser(userInput);

        expect(result).toEqual(createdUser);

        expect(userRepositoryMock.create).toHaveBeenCalledWith({
            name: userInput.name,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
        });
        //
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when user creation fails", async () => {
        const userInput: UserInput = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        userRepositoryMock.create.mockRejectedValue(new Error("User already exists"));

        await expect(userService.registerUser(userInput)).rejects.toThrow("User already exists");

        expect(userRepositoryMock.create).toHaveBeenCalledWith({
            name: userInput.name,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
        });
        //
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    });
});
