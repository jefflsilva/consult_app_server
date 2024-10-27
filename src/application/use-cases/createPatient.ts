import { PatientRepository } from '../../domain/repositories/patientRepository';
import { Patient } from '../../domain/entities/patient';

export class CreatePatient {
    constructor(private patientRepository: PatientRepository) { }

    async execute(data: Patient): Promise<Patient> {
        return this.patientRepository.save(data);
    }
}