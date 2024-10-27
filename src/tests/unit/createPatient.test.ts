import { CreatePatient } from '../../application/use-cases/createPatient';
import { Patient } from '../../domain/entities/patient';
import { PatientRepository } from '../../domain/repositories/patientRepository';

describe('CreatePatient', () => {
    it('should create a patient', async () => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(new Patient('Jane Doe', 30)),
        } as PatientRepository;
        const useCase = new CreatePatient(mockRepository);
        const result = await useCase.execute(new Patient('Jane Doe', 30));
        expect(result).toBeInstanceOf(Patient);
        expect(mockRepository.save).toHaveBeenCalledWith(result);
    });
});