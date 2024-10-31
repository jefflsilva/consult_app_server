import { User } from "../entities/User";
import {UserOutput} from "../../application/dtos/user.dto";

export interface UserRepository {
    create(user: User): Promise<UserOutput>;
}
