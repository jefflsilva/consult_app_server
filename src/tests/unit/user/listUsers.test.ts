import { ListUsers } from "../../../application/use-cases/user/listUsers"
import { UserRepository } from "../../../domain/repositories/userRepository"

describe("ListUsers Use Case", () => {
    it("should return a list of users", async () => {
        const mockUserRepository: UserRepository = {
            save: jest.fn(),
            findAll: jest.fn().mockResolvedValue([
                { id: 1, name: "John", lastName: "Doe", email: "john@example.com", password: "hashedpassword" },
                { id: 2, name: "Jane", lastName: "Doe", email: "jane@example.com", password: "hashedpassword" }
            ]),
        }

        const listUsers = new ListUsers(mockUserRepository)

        const users = await listUsers.execute()

        expect(users).toHaveLength(2)
        expect(users[0].name).toBe("John")
        expect(users[1].name).toBe("Jane")
        expect(mockUserRepository.findAll).toHaveBeenCalled()
    })
})