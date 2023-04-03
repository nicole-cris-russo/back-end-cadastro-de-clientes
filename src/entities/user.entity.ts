import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"
import { Client } from "./client.entity";

@Entity()
export class User {
    @PrimaryColumn("uuid")
    id: string = uuidv4()

    @Column({length: 120})
    fullName: string

    @Column({length: 80})
    email: string

    @Column({length: 80})
    password: string

    @Column({default: false})
    isAdm: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(()=> Client, client => client.user, {cascade: true})
    clients: Client[]
}