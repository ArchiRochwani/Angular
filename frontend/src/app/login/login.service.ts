import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
//import { stringify } from 'querystring';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class LoginService{
   // console.log('hello');
    
    constructor(private http: HttpClient){  
    }
    
        login(username:string,password:string){
            console.log('hello');
            return this.http.post<any>('http://localhost:3000/users/',{username,password}).pipe(
                map((token)=>{
                localStorage.setItem('blog-token',token.access_token);
                return token;
            })
           )
        }
    
}