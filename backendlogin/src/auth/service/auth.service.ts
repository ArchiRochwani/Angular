import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bycrypt=require('bycrypt')

@Injectable()
export class AuthService {
    constructor(private readonly jwtServices: JwtService){}

    generateJWT(user:User):Observable <string>{
        return from(this.jwtServices.signAsync({user}));
    }
    hashPassword(password:string):Observable<string>{
        return from<string>(bycrypt.hash(password,12));
    }
    comparePAsswords(newPassword:string,password:string):Observable<any>{
        return of<any | boolean>(bycrypt.compare(newPassword,password));
    }
    
}