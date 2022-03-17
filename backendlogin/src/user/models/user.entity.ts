
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn} from "typeorm";

@Entity()
export class UserEntity {

  @ObjectIdColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }

}
