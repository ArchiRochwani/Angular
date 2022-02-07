import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @ObjectIdColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    username:string
}