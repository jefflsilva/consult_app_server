import { Request, Response } from "express";
import { UserService } from "../../application/services/userService";
import { ErrorHandler } from "../middlewares/errorHandler";

export class UserController {
    constructor(private userService: UserService, private errorHandler: ErrorHandler) { }

    async register(req: Request, res: Response) {
        try {
            const userInput = req.body;
            const user = await this.userService.registerUser(userInput);
            return res.status(201).json(user);
        } catch (error) {
            return this.errorHandler.handle(error, res);
        }
    }
}
