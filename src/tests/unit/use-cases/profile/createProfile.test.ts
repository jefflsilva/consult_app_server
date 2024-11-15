import { ProfileInputDTO } from "../../../../application/dtos/profile/profileInput.dto";
import { CreateProfile } from "../../../../application/use-cases/createProfile";
import { Profile } from "../../../../domain/entities/Profile";
import { UserRole } from "../../../../domain/entities/userRole";
import { UserRepository } from "../../../../domain/repositories/userRepository";

describe("CreateProfile Use Case", () => {
    let createProfile: CreateProfile;
    let profileInput: ProfileInputDTO;
    let userRepositoryMock: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            createProfile: jest.fn(),
        } as jest.Mocked<UserRepository>;
        createProfile = new CreateProfile(userRepositoryMock);
    });

    it("should create a profile successfully", async () => {
        let profileInput: ProfileInputDTO = {
            avatarUrl: "https://example.com/avatar.jpg",
            createdAt: new Date(),
            birthDate: new Date("19/05/2000"),
            role: UserRole.PATIENT,
            updatedAt: new Date(),
            bio: "My bio",
            city: "New York",
            country: "USA",
            gender: "male",
            state: "New York",
            userId: 1,
            zipCode: "12345",
            phoneNumber: "1234567890",
        };
        let createdProfileMock = new Profile(
            1,
            1,
            profileInput.role,
            profileInput.bio,
            profileInput.avatarUrl,
            profileInput.birthDate,
            profileInput.phoneNumber,
            profileInput.gender,
            profileInput.zipCode,
            profileInput.country,
            profileInput.state,
            profileInput.city,
            new Date(),
            new Date()
        );
        userRepositoryMock.createProfile.mockResolvedValue(createdProfileMock);
        let result = await createProfile.execute(profileInput);
        expect(result).toBeDefined();
    });
});
