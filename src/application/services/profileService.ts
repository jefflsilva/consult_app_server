import { ProfileInputDTO } from "../dtos/profile/profileInput.dto";
import { ProfileOutputDTO } from "../dtos/profile/profileOutput.dto";
import { CreateProfile } from "../use-cases/createProfile";

export class ProfileService {
    constructor(private createProfile: CreateProfile) {}
    async register(dto: ProfileInputDTO): Promise<ProfileOutputDTO> {
        return await this.createProfile.execute(dto);
    }
}
