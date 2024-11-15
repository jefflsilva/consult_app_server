import { Profile } from "../entities/Profile";
import { User } from "../entities/User";

export interface UserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    createProfile(profile: Profile): Promise<Profile>;
}
