import { Response, NextFunction } from "express";
import { AppError } from "../errors";
import { CustomRequest } from "../interfaces";

export const authTokenMiddleware = (request: CustomRequest, response: Response, next: NextFunction) => {

    next()
};