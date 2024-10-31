
export interface IEncryptService {
    generateHash(str: string): Promise<string>;
    compare(str: string, hash: string): Promise<boolean>;
}
