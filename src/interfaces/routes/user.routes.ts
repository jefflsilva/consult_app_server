import { Router } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { CreateUser } from "../../application/use-cases/createUser";
import {UserController} from "../controllers/userController";
import {UserService} from "../../application/services/userService";

const router = Router();

const userRepository = new PrismaUserRepository();
const createUser = new CreateUser(userRepository);
const userService = new UserService(createUser);
const userController = new UserController(userService);

router.post("/users", (req, res) => userController.register(req, res));

export default router;
