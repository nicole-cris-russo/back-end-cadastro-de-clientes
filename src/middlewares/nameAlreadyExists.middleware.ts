import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { PostgresDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { CustomRequest } from "../interfaces";
import { User } from "../entities/user.entity";

export const nameAlreadyExistsMiddleware = async (request: CustomRequest, response: Response, next: NextFunction) => {
    const name = request.body.fullName
    const idToken = request.user.id
    const idClient = request.params.idClient

    const clientRepository = PostgresDataSource.getRepository(Client)
    const clients = await clientRepository.find({relations: {user: true}})
    const client = clients.find(client => client.fullName === name && client.user.id === idToken)

    if (client && client.id !== idClient) {
        throw new AppError("Nome já cadastrado")
    }

    next()
};