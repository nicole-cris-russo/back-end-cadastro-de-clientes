import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"
import { User } from "./user.entity";
import { Client } from "./client.entity";

@Entity()
export class Contact {
    @PrimaryColumn("uuid")
    id: string = uuidv4()

    @Column({length: 120})
    fullName: string

    @Column({length: 80})
    email: string

    @Column()
    phone: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => Client, (client) => client.contacts, {eager: true})
    client: Client
}