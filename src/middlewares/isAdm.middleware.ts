import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { CustomRequest } from "../interfaces";

export const isAdmMiddleware = (request: CustomRequest, response: Response, next: NextFunction) => {
    if (request.user && request.user.isAdm) {
        next()
    } else {
        throw new AppError("Usuário não autorizado", 401)
    }
};