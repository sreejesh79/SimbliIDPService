import {Entity, PrimaryColumn, Column } from "typeorm";

@Entity('roles')
export class Roles {
    @PrimaryColumn('int')
    id: number;

    @Column('varchar')
    machine_name: string;

    @Column('varchar')
    name: string;

}