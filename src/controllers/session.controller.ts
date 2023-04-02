import { Response } from 'express';
import { CustomRequest, ISessionRequest } from '../interfaces';
import SessionService from '../services/session.services';

export default class SessionController {
    static async post (request: CustomRequest, response: Response) {
        const sessionRequest: ISessionRequest = request.body
        const token = await SessionService.post(sessionRequest)
        return response.json(token).status(201)
    }
}