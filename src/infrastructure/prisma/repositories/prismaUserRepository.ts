import { UserRepository } from '../../../domain/repositories/userRepository';
import { User } from '../../../domain/entities/user';

export class prismaUserRepository implements UserRepository {
    async save(professional: User): Promise<User> {
        return professional;
    }
}