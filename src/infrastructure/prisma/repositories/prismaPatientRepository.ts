import { PatientRepository } from '../../../domain/repositories/patientRepository';
import { Patient } from '../../../domain/entities/patient';


export class PrismaPatientRepository implements PatientRepository {
    async save(patient: Patient): Promise<Patient> {
        return patient;
    }
}