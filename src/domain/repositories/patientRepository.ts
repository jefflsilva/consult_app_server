import { Patient } from '../entities/patient';

export interface PatientRepository {
    save(patient: Patient): Promise<Patient>;
}