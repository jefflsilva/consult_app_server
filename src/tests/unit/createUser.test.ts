import { CreateUser } from "../../application/use-cases/createUser";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserInput } from "../../domain/types/user/userModel";

describe('CreateUser', () => {
    it('should create a user', async () => {
        const userMockData: UserInput = {
            name: 'any_name',
            lastName: 'any_last_name',
            email: 'any@email.com',
            password: 'any_password',
            passwordConfirm: 'any_password'
        };

        const mockRepository = {
            save: jest.fn().mockResolvedValue({
                ...userMockData,
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        } as UserRepository;

        const useCase = new CreateUser(mockRepository);
        const result = await useCase.execute(userMockData);

        expect(mockRepository.save).toHaveBeenCalledWith({
            name: 'any_name',
            lastName: 'any_last_name',
            email: 'any@email.com',
            password: 'any_password',
            passwordConfirm: 'any_password'
        });

        expect(result).toEqual({
            ...userMockData,
            id: 1,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        });
    });

    // it('should throw an error if passwords do not match', async () => {
    //     const userMockData: UserInput = {
    //         name: 'any_name',
    //         lastName: 'any_last_name',
    //         email: 'any@email.com',
    //         password: 'any_password',
    //         passwordConfirm: 'different_password'
    //     };

    //     const mockRepository = {
    //         save: jest.fn()
    //     } as UserRepository;

    //     const useCase = new CreateUser(mockRepository);

    //     await expect(useCase.execute(userMockData)).rejects.toThrow('Passwords do not match');
    // });
});