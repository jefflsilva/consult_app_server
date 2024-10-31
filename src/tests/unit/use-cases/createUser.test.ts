import { CreateUser } from "../../../application/use-cases/createUser";
import { UserInput } from "../../../application/dtos/user.dto";
import {UserRepository} from "../../../domain/repositories/userRepository";

describe("CreateUser", () => {
    let createUser: CreateUser;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = {
            create: jest.fn(),
        };
        createUser = new CreateUser(userRepository);
    });

    it("should create a user and return user output", async () => {
        const input: UserInput = {
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password",
            confirmPassword: "password",
        };

        const userMock = {
            id: 1,
            ...input,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        userRepository.create = jest.fn().mockResolvedValue(userMock);

        const result = await createUser.execute(input);

        expect(result).toEqual({
            id: 1,
            name: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
        expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
    });
});
