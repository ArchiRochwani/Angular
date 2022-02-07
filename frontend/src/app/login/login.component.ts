import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
//import { AuthService } from '../../service/auth-service/auth.service';
//import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(//private authService: AuthService
    //private loginService : LoginService, 
     private router: Router) { }

  login() {
   /*if (this.form.valid) {
      this.loginService.login(
        /*{
        email: this.email.value,
        password: this.password.value
      }).pipe(
        tap(() => this.router.navigate(['../../private/dashboard']))
      ).subscribe()
    }*/
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

}