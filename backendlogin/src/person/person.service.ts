import { Injectable } from "@nestjs/common";
import { Person } from './person.model';


@Injectable()
export class PersonService{
    person:Person[]=[];
    insertPerson(username:string,password:string)
    {
        const user=username;
        const newPerson = new Person(username,password);
        this.person.push(newPerson);
        return user;
    }
    getPerson(){
        return [...this.person];
    }
}