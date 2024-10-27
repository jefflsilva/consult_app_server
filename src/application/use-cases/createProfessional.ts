import { ProfessionalRepository } from '../../domain/repositories/professionalRepository';
import { Professional } from '../../domain/entities/professional';

export class CreateProfessional {
    constructor(private professionalRepository: ProfessionalRepository) { }

    async execute(data: Professional): Promise<Professional> {
        return this.professionalRepository.save(data);
    }
}