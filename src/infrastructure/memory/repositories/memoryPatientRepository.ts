// src/infrastructure/repositories/memoryPatientRepository.ts

import { Patient } from "../../../domain/entities/patient";
import { PatientRepository } from "../../../domain/repositories/patientRepository";


export class MemoryPatientRepository implements PatientRepository {
    private patients: Patient[] = [];

    async save(patient: Patient): Promise<Patient> {
        this.patients.push(patient);
        return patient;
    }

    async findAll(): Promise<Patient[]> {
        return this.patients;
    }

}
