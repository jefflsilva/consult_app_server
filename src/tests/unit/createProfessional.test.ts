import { CreateProfessional } from '../../application/use-cases/createProfessional';
import { Professional } from '../../domain/entities/professional';
import { ProfessionalRepository } from '../../domain/repositories/professionalRepository';

describe('CreateProfessional', () => {
    it('should create a professional', async () => {
        const mockRepository = {
            save: jest.fn().mockResolvedValue(new Professional('John Doe', 'Doctor')),
        } as ProfessionalRepository;
        const useCase = new CreateProfessional(mockRepository);
        const result = await useCase.execute(new Professional('John Doe', 'Doctor'));
        expect(result).toBeInstanceOf(Professional);
        expect(mockRepository.save).toHaveBeenCalledWith(result);
    });
});