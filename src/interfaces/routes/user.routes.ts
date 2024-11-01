import { Router } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { CreateUser } from "../../application/use-cases/createUser";
import { UserController } from "../controllers/userController";
import { UserService } from "../../application/services/userService";
import { EmailValidator } from "../../domain/validators/emailValidator";

const router = Router();

const userRepository = new PrismaUserRepository();
const emailValidator = new EmailValidator()
const createUser = new CreateUser(userRepository, emailValidator);
const userService = new UserService(createUser);
const userController = new UserController(userService);

router.post("/users", (req, res) => userController.register(req, res));


export default router;
