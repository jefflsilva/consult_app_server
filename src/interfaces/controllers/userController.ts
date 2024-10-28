import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/createUser';

export class UserController {
    constructor(private createUser: CreateUser) { }

    async create(req: Request, res: Response) {
        const professional = await this.createUser.execute(req.body);
        res.status(201).json(professional);
    }
}