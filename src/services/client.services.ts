import { IClientPatch, IClientRequest } from "../interfaces";
import { PostgresDataSource } from "../data-source";
import { AppError } from "../errors";
import { Contact } from "../entities/contact.entity";
import { Client } from "../entities/client.entity";
import { User } from "../entities/user.entity";

export default class ClientService {
    static async post (clientRequest: IClientRequest, idUserToken: string): Promise<Client> {
        const userRepository = PostgresDataSource.getRepository(User)
        const clientRepository = PostgresDataSource.getRepository(Client)

        const user = await userRepository.findOneBy({id: idUserToken})

        const clientCreated = clientRepository.create({
            fullName: clientRequest.fullName,
            email: clientRequest.email,
            phone: clientRequest.phone,
            user: user
        })

        await clientRepository.save(clientCreated)

        return clientCreated
    }

    static async patch (clientRequest: IClientPatch, idClient: string): Promise<Client> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const client = await clientRepository.findOneBy({id: idClient})
        
        await clientRepository.update(idClient, {
            fullName: clientRequest.fullName ? clientRequest.fullName : client.fullName,
            email: clientRequest.email ? clientRequest.email : client.email,
            phone: clientRequest.phone ? clientRequest.phone : client.phone
        })

        const clientUpdated = await clientRepository.findOneBy({id: idClient})

        return clientUpdated
    }   

    static async clientId (idClient: string): Promise<Client> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const clients = await clientRepository.find({relations: {
            user: true, contacts: true
        }})
        const client = clients.find(client => client.id == idClient)
        return client
    }

    static async clientsAll (): Promise<Client[]> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const clients = await clientRepository.find()
        return clients
    }

    static async contactsByClient (idClient: string): Promise<Contact[]> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        const clients = await clientRepository.find({relations: {contacts: true}})
        const client = clients.find(client => client.id === idClient)

        return client.contacts
    }

    static async delete (idClient: string): Promise<void> {
        const clientRepository = PostgresDataSource.getRepository(Client)
        try {
            await clientRepository.delete({id: idClient})
        } catch (error) {
            throw new AppError("Erro ao deletar o cliente", 400)
        }
    }
}