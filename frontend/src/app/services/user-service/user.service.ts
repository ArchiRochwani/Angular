import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/model/user.interface';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private https: HttpClient, private snackbar: MatSnackBar) { }


  create(user: User): Observable<User> {
    return this.https.post<User>('http://localhost:3000/users', user).pipe(
      tap((createdUser: User) => this.snackbar.open(`User with email ${createdUser.email} is created successfully`, 'Close', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
          duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom'
        })
        return throwError(e);
      })
    )
  }
//   async main(){
//   let datasource:any;
//   return this.https.get('http://localhost:3000/users').subscribe(data=>{datasource=data;
// console.log(datasource)})
 

main() {
   return this.https.get('http://localhost:3000/users').toPromise().then(response=>response as any);
  //  .subscribe(data=>{
  //   var datasource=data;
  // console.log(datasource);}
  //    )
  //.pipe(tap(
  //   data => {
  //      var datasource = data 
  //      console.log(data);
  //   }) )
}

// main(){
//   this.getData2()
// }
}
