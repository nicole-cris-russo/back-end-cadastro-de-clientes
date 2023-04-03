import { PostgresDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors";
import { IContactPatch, IContactRequest } from "../interfaces";

export default class ContactService {
    static async post (contactRequest: IContactRequest, idClient: string): Promise<Contact> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const contactRepository = PostgresDataSource.getRepository(Contact)

        const client = await clientRepository.findOneBy({id: idClient})

        const contactCreated = contactRepository.create({
            fullName: contactRequest.fullName,
            email: contactRequest.email,
            phone: contactRequest.phone,
            client: client
        })

        await contactRepository.save(contactCreated)

        return contactCreated
    }

    static async patch (contactRequest: IContactPatch, idContact: string): Promise<Contact> {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        const contact = await contactRepository.findOneBy({id: idContact})
        
        await contactRepository.update(idContact, {
            fullName: contactRequest.fullName ? contactRequest.fullName : contact.fullName,
            email: contactRequest.email ? contactRequest.email : contact.email,
            phone: contactRequest.phone ? contactRequest.phone : contact.phone
        })

        const contactUpdated = await contactRepository.findOneBy({id: idContact})

        return contactUpdated
    }   

    static async contactId (idContact: string): Promise<Contact> {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        const contacts = await contactRepository.find({relations: {
            client: true
        }})
        const contact = contacts.find(contact => contact.id == idContact)
        return contact
    }

    static async contactsAll (): Promise<Contact[]> {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        const contacts = await contactRepository.find()
        return contacts
    }

    static async clientByContact (idContact: string): Promise<Client> {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        const contacts = await contactRepository.find({relations: {client: true}})
        const contact = contacts.find(contact => contact.id === idContact)

        return contact.client
    }

    static async delete (idContact: string): Promise<void> {
        const contactRepository = PostgresDataSource.getRepository(Contact)
        try {
            await contactRepository.delete({id: idContact})
        } catch (error) {
            throw new AppError("Erro ao deletar o Contacte", 400)
        }
    }
}