import { Request } from "express"

export interface IUserRequest {
    fullName: string
    email: string
    password: string
    isAdm: boolean
}

export interface IUserPatch {
    fullName?: string
    email?: string
    password?: string
}

export interface ISessionRequest {
    email: string
    password: string
}

export interface ITokenResponse {
    token: string
}

export interface IClientRequest {
    fullName: string
    email: string
    phone: string
}

export interface IClientPatch {
    fullName?: string
    email?: string
    phone?: string
}

export interface IContactRequest {
    fullName: string
    email: string
    phone: string
}

export interface IContactPatch {
    fullName?: string
    email?: string
    phone?: string
}

export interface CustomRequest extends Request {
    user?: {
        id?: string
        isAdm?: boolean
    }
}
