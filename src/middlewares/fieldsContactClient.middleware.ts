import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const fieldsContactClientMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const body = request.body


    const keyValid = ["fullName", "email", "phone"]

    const validation = Object.keys(body).some(key => keyValid.includes(key))

    if (!validation) {
        throw new AppError("Um ou mais campos informados são inválidos", 401)
    }

    next()
};