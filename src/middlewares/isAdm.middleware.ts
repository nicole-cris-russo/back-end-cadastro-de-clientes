import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { CustomRequest } from "../interfaces";

export const isAdmMiddleware = (request: CustomRequest, response: Response, next: NextFunction) => {
    const isAdm = request.user
    if (!isAdm) {
        throw new AppError("Usuário não autorizado", 401)
    }
    next()
};