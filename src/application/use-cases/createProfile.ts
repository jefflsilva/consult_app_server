import { Profile } from "../../domain/entities/Profile";
import { UserRole } from "../../domain/entities/userRole";
import { UserRepository } from "../../domain/repositories/userRepository";
import { AppError } from "../erros/AppError";
import { ProfileInputDTO } from "../dtos/profile/profileInput.dto";
import { ProfileOutputDTO } from "../dtos/profile/profileOutput.dto";
export class CreateProfile {
    constructor(private userRepository: UserRepository) {}
    async execute(profileInputDTO: ProfileInputDTO): Promise<ProfileOutputDTO> {
        let validRole = [UserRole.PATIENT, UserRole.PROFESSIONAL].includes(
            profileInputDTO.role as UserRole
        );
        if (!validRole) {
            throw new AppError("Invalid role");
        }
        const profile = new Profile(
            0,
            profileInputDTO.userId,
            profileInputDTO.role,
            profileInputDTO.bio,
            profileInputDTO.avatarUrl,
            profileInputDTO.birthDate,
            profileInputDTO.phoneNumber,
            profileInputDTO.gender,
            profileInputDTO.zipCode,
            profileInputDTO.country,
            profileInputDTO.state,
            profileInputDTO.city,
            new Date(),
            new Date()
        );
        let createProfile = await this.userRepository.createProfile(profile);
        return new ProfileOutputDTO(
            createProfile.id,
            createProfile.userId,
            createProfile.role,
            createProfile.bio,
            createProfile.avatarUrl,
            createProfile.birthDate,
            createProfile.phoneNumber,
            createProfile.gender,
            createProfile.zipCode,
            createProfile.country,
            createProfile.state,
            createProfile.city,
            createProfile.createdAt,
            createProfile.updatedAt
        );
    }
}
