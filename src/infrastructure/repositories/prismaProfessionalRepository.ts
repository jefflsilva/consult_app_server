import { ProfessionalRepository } from '../../domain/repositories/professionalRepository';
import { Professional } from '../../domain/entities/professional';

export class PrismaProfessionalRepository implements ProfessionalRepository {
    async save(professional: Professional): Promise<Professional> {
        return professional;
    }
}