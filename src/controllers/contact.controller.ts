import { Response } from 'express';
import { CustomRequest, IContactPatch, IContactRequest} from '../interfaces';
import ContactService from '../services/contact.services';

export default class ContactController {
    static async post (request: CustomRequest, response: Response) {
        const contactRequest: IContactRequest = request.body
        const idClient: string = request.params.idClient
        const contactResponse = await ContactService.post(contactRequest, idClient)
        return response.json(contactResponse).status(201)
    }

    static async patch (request: CustomRequest, response: Response) {
        const contactBody: IContactPatch = request.body
        const idContact: string = request.params.idContact
        const contactUpdated = await ContactService.patch(contactBody, idContact)
        return response.json(contactUpdated).status(200)
    }

    static async contactId (request: CustomRequest, response: Response) {
        const idContact: string = request.params.idContact
        const contact = await ContactService.contactId(idContact)
        return response.json(contact).status(200)
    }

    static async contactAll (request: CustomRequest, response: Response) {
        const contacts = await ContactService.contactsAll()
        return response.json(contacts).status(200)
    }

    static async clientByContact (request: CustomRequest, response: Response) {
        const idContact: string = request.params.idContact
        const contactsBycontact = await ContactService.clientByContact(idContact)
        return response.json(contactsBycontact).status(200)
    }

    static async delete (request: CustomRequest, response: Response) {
        const idContact: string = request.params.idContact
        await ContactService.delete(idContact)
        return response.json().status(204)
    }
}