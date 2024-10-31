import { CreateUser } from "../use-cases/createUser";
import { UserInput } from "../dtos/user.dto";
import { UserOutput } from "../dtos/user.dto";

export class UserService {
    constructor(private createUser: CreateUser) {}

    async registerUser(userInput: UserInput): Promise<UserOutput> {
        return await this.createUser.execute(userInput);
    }
}
