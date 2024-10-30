import { User, UserInput } from "../types/user/userModel";
export interface UserRepository {
    save(user: UserInput): Promise<User>
}