import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { CreateUser } from '../../application/use-cases/createUser';
import { UserRepository } from '../../domain/repositories/userRepository'
import { prismaUserRepository } from '../../infrastructure/prisma/repositories/prismaUserRepository'
import { IEncryptService } from '../../domain/services/encryptService';
import { EncryptService } from '../../infrastructure/services/encryptService';

const router = Router();
const userRepository: UserRepository = new prismaUserRepository()
const encrypterService: IEncryptService = new EncryptService()
const createUser = new CreateUser(userRepository, encrypterService)
const userController = new UserController(createUser);

router.post('/users', (req, res) => userController.create(req, res))

export default router;
