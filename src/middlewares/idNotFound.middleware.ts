import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { PostgresDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";

export const idNotFoundMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const idUser = request.params.idUser
    const idClient = request.params.idClient
    const idContact = request.params.idContact

    if (idUser) {
        const userRepository = PostgresDataSource.getRepository(User)
        const userById = await userRepository.findOneBy({id: idUser})
        if (!userById) {
            throw new AppError("Usuário não encontrado", 404)
        } 
    }
    if (idClient) {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const clientById = await clientRepository.findOneBy({id: idClient})
        if (!clientById) {
            throw new AppError("Cliente não encontrado", 404)
        } 
    }
    if (idContact) {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        const contactById = await contactRepository.findOneBy({id: idContact})
        if (!contactById) {
            throw new AppError("Contato não encontrado", 404)
        } 
    }

    next()
};