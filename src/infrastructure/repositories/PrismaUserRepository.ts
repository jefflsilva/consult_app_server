import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { prisma } from "../database/prismaClient";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
        return new User(
            createdUser.id,
            createdUser.name,
            createdUser.lastName,
            createdUser.email,
            createdUser.password,
            createdUser.createdAt,
            createdUser.updatedAt,
            createdUser.profileId
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const foundUser = await prisma.user.findFirst({
            where: { email: email },
        });

        if (!foundUser) {
            return null;
        }

        return new User(
            foundUser.id,
            foundUser.name,
            foundUser.lastName,
            foundUser.email,
            foundUser.password,
            foundUser.createdAt,
            foundUser.updatedAt,
            foundUser.profileId
        );
    }
}