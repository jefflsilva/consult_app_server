import { User } from "../../domain/entities/User";
import { prisma } from "../database/prismaClient";
import {UserRepository} from "../../domain/repositories/userRepository";
import {UserOutput} from "../../application/dtos/user.dto";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<UserOutput> {
        return prisma.user.create({
            data: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            },
        });
    }
}
