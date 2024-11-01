import { UseInputDTO } from "../dtos/userInput.dto";
import { UserOutputDTO } from "../dtos/userOutput";
import { CreateUser } from "../use-cases/createUser";

export class UserService {
    constructor(private createUser: CreateUser) { }

    async registerUser(dto: UseInputDTO): Promise<UserOutputDTO> {
        return await this.createUser.execute(dto);
    }
}
