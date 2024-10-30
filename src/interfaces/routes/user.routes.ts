import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { CreateUser } from '../../application/use-cases/user/createUser';
import { UserRepository } from '../../domain/repositories/userRepository'
import { prismaUserRepository } from '../../infrastructure/prisma/repositories/prismaUserRepository'
import { IEncryptService } from '../../domain/services/encryptService';
import { EncryptService } from '../../infrastructure/services/encryptService';
import { ListUsers } from '../../application/use-cases/user/listUsers';

const router = Router();
const userRepository: UserRepository = new prismaUserRepository()
const encrypterService: IEncryptService = new EncryptService()
const createUser = new CreateUser(userRepository, encrypterService)
const listUsers = new ListUsers(userRepository)
const userController = new UserController(createUser, listUsers);

router.post('/users', (req, res) => userController.create(req, res))
router.get('/users', (req, res) => userController.listAll(req, res))

export default router;
