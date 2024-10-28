
import { Router } from 'express';
import { PatientController } from '../controllers/patientController';
import { CreatePatient } from '../../application/use-cases/createPatient';
import { PatientRepository } from '../../domain/repositories/patientRepository';
import { PrismaPatientRepository } from '../../infrastructure/prisma/repositories/prismaPatientRepository';


const router = Router();

const patientRepository: PatientRepository = new PrismaPatientRepository();
const createPatient = new CreatePatient(patientRepository);
const patientController = new PatientController(createPatient);

router.post('/patients', (req, res) => patientController.create(req, res));

export default router;
