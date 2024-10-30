import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/user/createUser';
import { ListUsers } from '../../application/use-cases/user/listUsers';

export class UserController {
    constructor(
        private createUser: CreateUser,
        private listUsers: ListUsers
    ) { }

    async create(req: Request, res: Response) {
        const professional = await this.createUser.execute(req.body);
        res.status(201).json(professional);
    }
    async listAll(req: Request, res: Response) {
        const users = await this.listUsers.execute()
        res.status(200).json(users)
    }
}