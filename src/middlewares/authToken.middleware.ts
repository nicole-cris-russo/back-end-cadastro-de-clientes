import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { CustomRequest } from "../interfaces";
import jwt, { VerifyErrors } from "jsonwebtoken"
import "dotenv/config"

export const authTokenMiddleware = (request: CustomRequest, response: Response, next: NextFunction) => {

    const token = request.headers.authorization

    if (!token) {
        throw new AppError("Token inválido", 401)
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
        if (error) {
            throw new AppError("Token inválido", 401)
        }
        request.user = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }
        next()
    })

};