import { Request, Response } from "express";
import { UserService } from "../../application/services/userService";

export class UserController {
    constructor(private userService: UserService) {}

    async register(req: Request, res: Response) {
        const userInput = req.body;

        const user = await this.userService.registerUser(userInput);
        res.status(201).json(user);
    }
}
