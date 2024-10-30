import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../../domain/repositories/userRepository';
import { User, UserInput } from '../../../domain/types/user/userModel';

const prisma = new PrismaClient()
export class prismaUserRepository implements UserRepository {
    async save(user: UserInput): Promise<User> {
        const { name, lastName, email, password } = user
        let createdUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password
            }
        })
        return createdUser;
    }
}