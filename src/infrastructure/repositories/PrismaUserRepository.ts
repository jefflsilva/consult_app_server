import { Profile } from "../../domain/entities/Profile";
import { User } from "../../domain/entities/User";
import { UserRole } from "../../domain/entities/userRole";
import { UserRepository } from "../../domain/repositories/userRepository";
import { prisma } from "../database/prismaClient";

export class PrismaUserRepository implements UserRepository {
    async createProfile(profile: Profile): Promise<Profile> {
        const profileCreated = await prisma.profile.create({
            data: {
                userId: profile.userId,
                role: profile.role,
                bio: profile.bio,
                avatarUrl: profile.avatarUrl,
                birthDate: profile.birthDate,
                phoneNumber: profile.phoneNumber,
                gender: profile.gender,
                zipCode: profile.zipCode,
                country: profile.country,
                state: profile.state,
                city: profile.city,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
            },
        });
        return new Profile(
            profileCreated.id,
            profileCreated.userId,
            profileCreated.role as UserRole,
            profileCreated.bio,
            profileCreated.avatarUrl,
            profileCreated.birthDate,
            profileCreated.phoneNumber,
            profileCreated.gender,
            profileCreated.zipCode,
            profileCreated.country,
            profileCreated.state,
            profileCreated.city,
            profileCreated.createdAt,
            profileCreated.updatedAt
        );
    }
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

    async findAll(): Promise<User[]> {
        const foundUsers = await prisma.user.findMany({});
        console.log(foundUsers);
        return foundUsers.map((user) => {
            return new User(
                user.id,
                user.name,
                user.lastName,
                user.email,
                user.password,
                user.createdAt,
                user.updatedAt,
                user.profileId
            );
        });
    }
}
