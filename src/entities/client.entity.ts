import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from "uuid"
import { User } from "./user.entity";
import { Contact } from "./contact.entity";

@Entity()
export class Client {
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

    @ManyToOne(() =>  User, {eager: true, cascade: true})
    user: User

    @OneToMany(() => Contact, (contact) => {contact.client}, {cascade: true})
    contacts: Contact[]
}