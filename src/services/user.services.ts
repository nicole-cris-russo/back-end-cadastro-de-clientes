import { hash } from "bcrypt";
import { PostgresDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserPatch, IUserRequest } from "../interfaces";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors";

export default class UserService {
    static async post (userRequest: IUserRequest): Promise<User> {
        const userRepository = PostgresDataSource.getRepository(User)

        const userCreated = userRepository.create({
            fullName: userRequest.fullName,
            email: userRequest.email,
            password: await hash(userRequest.password, 15)
        })

        await userRepository.save(userCreated)

        return userCreated
    }

    static async patch (userRequest: IUserPatch, idUser: string): Promise<User> {
        const userRepository = PostgresDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: idUser})
        
        await userRepository.update(idUser, {
            fullName: userRequest.fullName ? userRequest.fullName : user.fullName,
            email: userRequest.email ? userRequest.email : user.email,
            password: userRequest.password ? await hash(userRequest.password, 15) : user.password
        })

        const userUpdated = await userRepository.findOneBy({id: idUser})
        return userUpdated
    }   

    static async userId (idUser: string): Promise<User> {
        const userRepository = PostgresDataSource.getRepository(User)
        const users = await userRepository.find({relations: {
            clients: true
        }})
        const user = users.find(user => user.id == idUser)
        return user
    }

    static async userAll (): Promise<User[]> {
        const userRepository = PostgresDataSource.getRepository(User)
        const users = await userRepository.find()
        return users
    }

    static async clientsByUser (idUser: string): Promise<Client[]> {
        const userRepository = PostgresDataSource.getRepository(User)
        const users = await userRepository.find({relations: {
            clients: true
        }})
        const user = users.find(user => user.id == idUser)
        return user.clients
    }

    static async delete (idUser: string): Promise<void> {
        const userRepository = PostgresDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: idUser})
        try {
            await userRepository.delete(user)
        } catch (error) {
            throw new AppError("Erro ao deletar o usuário", 400)
        }
    }
}