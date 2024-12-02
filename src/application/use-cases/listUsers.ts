import { UserRepository } from "../../domain/repositories/userRepository";
import { UserOutputDTO } from "../dtos/users/userOutput";

export class ListUsers {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<UserOutputDTO[]> {
        return await this.userRepository.findAll();
    }
}
