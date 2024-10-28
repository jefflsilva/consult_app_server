import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { CreateUser } from '../../application/use-cases/createUser';
import { UserRepository } from '../../domain/repositories/userRepository'
import { prismaUserRepository } from '../../infrastructure/prisma/repositories/prismaUserRepository'

const router = Router();
const userRepository: UserRepository = new prismaUserRepository()
const createUser = new CreateUser(userRepository)
const userController = new UserController(createUser);

router.post('/users', (req, res) => userController.create(req, res))

export default router;
