import { User, UserInput } from "../types/user/userModel";
export interface UserRepository {
    save(user: UserInput): Promise<User>
    findAll(): Promise<Omit<User, 'password'>[]>
}