import { Controller, Post, Body,Get} from '@nestjs/common';
import { get } from 'mongoose';
import { PersonService } from './person.service';

@Controller('persons')
export class PersonController{
    constructor(private readonly personService:PersonService){

    }
    @Post()
    addPerson(
        @Body('username') username:string,
        @Body('password') password:string
    ){
      //  console.log("hello");
        const name=this.personService.insertPerson(username,password);
        return{ username: name};
    }
    @Get()
    getAllPerson(){
        return this.personService.getPerson();
    }
}