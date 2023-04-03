import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { CustomRequest } from "../interfaces";
import { PostgresDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { User } from "../entities/user.entity";

export const notAdmMiddleware = async (request: CustomRequest, response: Response, next: NextFunction) => {
    const idUser = request.params.idUser
    const idClient = request.params.idClient
    const idContact = request.params.idContact
    const id = request.user.id
    const isAdm = request.user.isAdm
    if (idUser) {
        if (idUser !== id && !isAdm) {
            throw new AppError("Usuário não autorizado (notadm)", 401)
        }
    }
    if (idClient) {
        const userRepository = PostgresDataSource.getRepository(User)
        const users = await userRepository.find({relations: {
            clients: true
        }})
        const userFind = users.find(user => user.id === id)
        const validation = userFind.clients.some(client => client.id === idClient)
        if (!validation && !isAdm) {
            throw new AppError("Usuário não autorizado (notadm)", 401)
        }
    }
    if (idContact) {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const clients = await clientRepository.find({relations: {
            user: true, contacts: true
        }})
        const clientFind = clients.find(client => client.user.id === id)
        const validation = clientFind.contacts.some(contact => contact.id === idContact)
        if (!validation && !isAdm) {
            throw new AppError("Usuário não autorizado (notadm)", 401)
        }
    }
    next()
};