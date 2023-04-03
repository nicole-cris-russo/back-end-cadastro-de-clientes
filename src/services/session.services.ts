import { PostgresDataSource } from "../data-source";
import { AppError } from "../errors";
import { compare } from "bcrypt";
import { ISessionRequest, ITokenResponse } from "../interfaces";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken"

export default class SessionService {
    static async post (userRequest: ISessionRequest): Promise<ITokenResponse> {
        const userRepository = PostgresDataSource.getRepository(User)

        const keys = Object.keys(userRequest)
        
        if (!keys.includes("email" && "password")) {
            throw new AppError("Um ou mais campos inválidos", 401)
        }
        
        const user = await userRepository.findOneBy({email: userRequest.email})

        if (!user) {
            throw new AppError("Email ou senha inválidos", 401)
        }

        const passwordValid = await compare(userRequest.password, user.password)

        if (!passwordValid) {
            throw new AppError("Email ou senha inválidos", 401)
        }

        const tokenResponse = {
            token: jwt.sign(
                {
                    id: user.id,
                    isAdm: user.isAdm,
                },
                process.env.SECRET_KEY as string,
                {
                    expiresIn: "24h",
                    subject: user.id
                }
            )
        }

        return tokenResponse
    }
}