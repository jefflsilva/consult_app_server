import { Router } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { CreateUser } from "../../application/use-cases/createUser";
import { UserController } from "../controllers/userController";
import { UserService } from "../../application/services/userService";
import { EmailValidator } from "../../domain/validators/emailValidator";
import { ErrorHandler } from "../middlewares/errorHandler";
import { ListUsers } from "../../application/use-cases/listUsers";

const router = Router();

const userRepository = new PrismaUserRepository();
const emailValidator = new EmailValidator();
const createUser = new CreateUser(userRepository, emailValidator);
const listUser = new ListUsers(userRepository);
const userService = new UserService(createUser, listUser);
const errorHandler = new ErrorHandler();
const userController = new UserController(userService, errorHandler);
router.post("/users", async (req, res) => {
    await userController.register(req, res);
});

router.get("/users", async (req, res) => {
    await userController.list(req, res);
});

export default router;
