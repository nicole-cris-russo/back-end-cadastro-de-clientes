import { Response } from 'express';
import { CustomRequest, IUserPatch, IUserRequest } from '../interfaces';
import UserService from '../services/user.services';
export default class UserController {
    static async post (request: CustomRequest, response: Response) {
        const userRequest: IUserRequest = request.body
        const userResponse = await UserService.post(userRequest)
        return response.json(userResponse).status(201)
    }

    static async patch (request: CustomRequest, response: Response) {
        const userRequest: IUserPatch = request.body
        const idUser: string = request.params.idUser
        const userUpdated = await UserService.patch(userRequest, idUser)
        return response.json(userUpdated).status(200)
    }

    static async userProfile (request: CustomRequest, response: Response) {
        const idToken: string = request.user.id
        const userProfile = await UserService.getProfile(idToken)
        return response.json(userProfile).status(200) 
    }

    static async userId (request: CustomRequest, response: Response) {
        const idUser: string = request.params.idUser
        const user = await UserService.userId(idUser)
        return response.json(user).status(200)
    }

    static async userAll (request: CustomRequest, response: Response) {
        const users = await UserService.userAll()
        return response.json(users).status(200)
    }

    static async userClients (request: CustomRequest, response: Response) {
        const idToken: string = request.user.id
        const userClients = await UserService.userClients(idToken)
        return response.json(userClients).status(200) 
    }

    static async clientsByUser (request: CustomRequest, response: Response) {
        const idUser: string = request.params.idUser
        const clientsByUser = await UserService.clientsByUser(idUser)
        return response.json(clientsByUser).status(200)
    }

    static async delete (request: CustomRequest, response: Response) {
        const idUser: string = request.params.idUser
        await UserService.delete(idUser)
        return response.json().status(204)
    }
}