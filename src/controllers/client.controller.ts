import { Response } from 'express';
import { CustomRequest, IClientPatch, IClientRequest } from '../interfaces';
import ClientService from '../services/client.services';

export default class ClientController {
    static async post (request: CustomRequest, response: Response) {
        const clientRequest: IClientRequest = request.body
        const idUserToken: string = request.user.id
        const clientResponse = await ClientService.post(clientRequest, idUserToken)
        return response.json(clientResponse).status(201)
    }

    static async patch (request: CustomRequest, response: Response) {
        const clientBody: IClientPatch = request.body
        const idClient: string = request.params.idClient
        const clientUpdated = await ClientService.patch(clientBody, idClient)
        return response.json(clientUpdated).status(200)
    }

    static async clientId (request: CustomRequest, response: Response) {
        const idClient: string = request.params.idClient
        const client = await ClientService.clientId(idClient)
        return response.json(client).status(200)
    }

    static async clientAll (request: CustomRequest, response: Response) {
        const clients = await ClientService.clientsAll()
        return response.json(clients).status(200)
    }

    static async contactsByClient (request: CustomRequest, response: Response) {
        const idClient: string = request.params.idClient
        const contactsByClient = await ClientService.contactsByClient(idClient)
        return response.json(contactsByClient).status(200)
    }

    static async delete (request: CustomRequest, response: Response) {
        const idClient: string = request.params.idClient
        await ClientService.delete(idClient)
        return response.json().status(204)
    }
}