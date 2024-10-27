import { Request, Response } from 'express';
import { CreateProfessional } from '../../application/use-cases/createProfessional';

export class ProfessionalController {
    constructor(private createProfessional: CreateProfessional) { }

    async create(req: Request, res: Response) {
        const professional = await this.createProfessional.execute(req.body);
        res.status(201).json(professional);
    }
}