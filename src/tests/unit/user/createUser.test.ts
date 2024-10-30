import { CreateUser } from "../../../application/use-cases/user/createUser";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { IEncryptService } from "../../../domain/services/encryptService";
import { UserInput } from "../../../domain/types/user/userModel";

describe('CreateUser', () => {
    it('should create a user', async () => {
        const userMockData: UserInput = {
            name: 'any_name',
            lastName: 'any_last_name',
            email: 'any@email.com',
            password: 'any_password',
            passwordConfirm: 'any_password'
        };


        const mockEncryptService: IEncryptService = {
            generateHash: jest.fn().mockResolvedValue("any_encode"),
            compare: jest.fn()
        };

        const mockRepository = {
            save: jest.fn().mockResolvedValue({
                ...userMockData,
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }),
            findAll: jest.fn()
        } as UserRepository;

        const useCase = new CreateUser(mockRepository, mockEncryptService);
        const result = await useCase.execute(userMockData);

        expect(mockRepository.save).toHaveBeenCalledWith({
            name: 'any_name',
            lastName: 'any_last_name',
            email: 'any@email.com',
            password: 'any_encode',
            passwordConfirm: 'any_password'
        });

        expect(result).toEqual({
            ...userMockData,
            id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    });

    it('should throw an error if passwords do not match', async () => {
        const userMockData: UserInput = {
            name: 'any_name',
            lastName: 'any_last_name',
            email: 'any@email.com',
            password: 'any_password',
            passwordConfirm: 'different_password'
        };
        const mockEncryptService: IEncryptService = {
            generateHash: jest.fn(),
            compare: jest.fn()
        };

        const mockRepository = {
            save: jest.fn(),
            findAll: jest.fn()
        } as UserRepository;

        const useCase = new CreateUser(mockRepository, mockEncryptService);

        await expect(useCase.execute(userMockData)).rejects.toThrow('Passwords do not match');
    });
});