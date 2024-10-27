import { Professional } from '../entities/professional';

export interface ProfessionalRepository {
    save(professional: Professional): Promise<Professional>;
}