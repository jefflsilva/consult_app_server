import { UseInputDTO } from "../dtos/users/userInput.dto";
import { UserOutputDTO } from "../dtos/users/userOutput";
import { CreateUser } from "../use-cases/createUser";
import { ListUsers } from "../use-cases/listUsers";

export class UserService {
    constructor(private createUser: CreateUser, private listUsers: ListUsers) {}

    async registerUser(dto: UseInputDTO): Promise<UserOutputDTO> {
        return await this.createUser.execute(dto);
    }
    async listAll(): Promise<Omit<UserOutputDTO, "password">[]> {
        let users = await this.listUsers.execute();
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });
    }
}
