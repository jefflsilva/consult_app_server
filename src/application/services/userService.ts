import { UseInputDTO } from "../dtos/users/userInput.dto";
import { UserOutputDTO } from "../dtos/users/userOutput";
import { CreateUser } from "../use-cases/createUser";
import { ListUsers } from "../use-cases/listUsers";

export class UserService {
    constructor(private createUser: CreateUser, private listUsers: ListUsers) {}

    async registerUser(dto: UseInputDTO): Promise<UserOutputDTO> {
        return await this.createUser.execute(dto);
    }
    async listAll(): Promise<UserOutputDTO[]> {
        return await this.listUsers.execute();
    }
}
