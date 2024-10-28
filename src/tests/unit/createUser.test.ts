import { CreateUser } from "../../application/use-cases/createUser"
import { User } from "../../domain/entities/user"
import { UserRepository } from "../../domain/repositories/userRepository"

describe('CreateUser', () => {
    it('should create a user', async () => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(new User("Jeff", 'Silva', 'testeemail@gmail.com', 'passowrd', 'patient'))
        } as UserRepository
        const useCase = new CreateUser(mockRepository);
        const result = await useCase.execute(new User("Jeff", 'Silva', 'testeemail@gmail.com', 'passowrd', 'patient'))
        expect(result).toBeInstanceOf(User)
        expect(mockRepository.save).toHaveBeenCalledWith(result)
    })
})