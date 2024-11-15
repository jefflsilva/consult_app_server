import { UserService } from "../../../application/services/userService";
import { CreateUser } from "../../../application/use-cases/createUser";
import { UseInputDTO } from "../../../application/dtos/users/userInput.dto";
import { UserOutputDTO } from "../../../application/dtos/users/userOutput";

describe("UserService", () => {
    let userService: UserService;
    let createUserMock: jest.Mocked<CreateUser>;

    beforeEach(() => {
        createUserMock = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<CreateUser>;

        userService = new UserService(createUserMock);
    });

    it("should create a user successfully", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        const expectedOutput = new UserOutputDTO(
            1,
            userInput.name,
            userInput.lastName,
            userInput.email,
            new Date(),
            new Date(),
        );

        createUserMock.execute.mockResolvedValue(expectedOutput);

        const result = await userService.registerUser(userInput);

        expect(result).toEqual(expectedOutput);
        expect(createUserMock.execute).toHaveBeenCalledWith(userInput);
        expect(createUserMock.execute).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when user creation fails", async () => {
        const userInput: UseInputDTO = {
            name: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "securepassword",
            confirmPassword: "securepassword",
        };

        createUserMock.execute.mockRejectedValue(new Error("User already exists"));

        await expect(userService.registerUser(userInput)).rejects.toThrow("User already exists");

        expect(createUserMock.execute).toHaveBeenCalledWith(userInput);
        expect(createUserMock.execute).toHaveBeenCalledTimes(1);
    });
});
