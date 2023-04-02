import { Response } from 'express';
import { CustomRequest, IClientRequest } from '../interfaces';
import ClientService from '../services/session.services';
export default class ClientController {
    static async post (request: CustomRequest, response: Response) {
        const clientRequest: IClientRequest = request.body
        const clientResponse = await ClientService.post(clientRequest)
        return response.json(clientResponse).status(201)
    }

    static async patch (request: CustomRequest, response: Response) {
        const userRequest: IUserPatch = request.body
        const idUser: string = request.params.idUser
        const userUpdated = await UserService.patch(userRequest, idUser)
        return response.json(userUpdated).status(200)
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