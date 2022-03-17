import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
//import { stringify } from 'querystring';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class RegisterService{
   // console.log('hello');
    
    constructor(private http: HttpClient){  
    }
    
        register(email:string,username:string,password:string){
            console.log('hello');
            return this.http.post<any>('http://localhost:3000/users',{email,username,password}).pipe(
                map((token)=>{
                localStorage.setItem('blog-token',token.access_token);
                return token;
            })
           )
        }
    
}