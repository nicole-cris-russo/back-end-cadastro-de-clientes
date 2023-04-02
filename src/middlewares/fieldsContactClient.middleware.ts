import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const fieldsContactClientMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const body = request.body

    const keys = Object.keys(body)

    if (!keys.includes("fullName" || "email" || "phone")) {
        throw new AppError("Um ou mais campos informados são inválidos", 401)
    }

    next()
};