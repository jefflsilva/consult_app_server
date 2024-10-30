import { hash, compare } from 'bcrypt';
import { IEncryptService } from '../../domain/services/encryptService';

export class EncryptService implements IEncryptService {
    async generateHash(str: string): Promise<string> {
        const saltOrRounds = 10;
        return await hash(str, saltOrRounds);
    }

    async compare(str: string, hash: string): Promise<boolean> {
        return compare(str, hash);
    }
}