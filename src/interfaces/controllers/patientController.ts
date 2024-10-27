import { Request, Response } from 'express';
import { CreatePatient } from '../../application/use-cases/createPatient';

export class PatientController {
    constructor(private createPatient: CreatePatient) { }

    async create(req: Request, res: Response) {
        const patient = await this.createPatient.execute(req.body);
        res.status(201).json(patient);
    }
}