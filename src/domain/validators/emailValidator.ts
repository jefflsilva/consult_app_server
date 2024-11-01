import { emailValidatorProtocol } from "./emailValidatorProtocol";

export class EmailValidator implements emailValidatorProtocol {
    isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
