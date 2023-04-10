import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { PostgresDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { CustomRequest } from "../interfaces";

export const nameAlreadyExistsMiddleware = async (request: CustomRequest, response: Response, next: NextFunction) => {
    const name = request.body.fullName
    const idToken = request.user.id

    const clientRepository = PostgresDataSource.getRepository(Client)
    const nameAlreadyExists = await clientRepository.findOneBy({fullName: name})

    if (nameAlreadyExists && nameAlreadyExists.id !== idToken ) {
        throw new AppError("Nome já cadastrado")
    }

    next()
};