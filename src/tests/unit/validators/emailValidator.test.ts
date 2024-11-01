import { EmailValidator } from "../../../domain/validators/emailValidator";

describe("EmailValidator", () => {
    let emailValidator: EmailValidator;

    beforeEach(() => {
        emailValidator = new EmailValidator();
    });

    it("should return true for a valid email format", () => {
        expect(emailValidator.isValid("valid@email.com")).toBe(true);
    });

    it("should return false for an invalid email format", () => {
        expect(emailValidator.isValid("invalid-email")).toBe(false);
    });

    it("should return false for an empty email", () => {
        expect(emailValidator.isValid("")).toBe(false);
    });

});
