import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from 'src/app/model/login-response.interface';
import { User } from 'src/app/model/user.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar
    , private jwtService: JwtHelperService
    ) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/users/login', user).pipe(
      tap(() => this.snackbar.open('Login Successful', 'Close', {
        duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom'
      })),
      catchError(e => {
        this.snackbar.open(`Login Unsuccessful`, 'Close', {
          duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom'
        })
        return throwError(e);
      })
    )
  }

  getLoggedInUser() {

    const decodedToken = this.jwtService.decodeToken();
    return decodedToken.user;
  }
}
