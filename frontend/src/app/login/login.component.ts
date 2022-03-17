import { AfterViewInit, Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
//import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service/auth.service';
import { LoginService } from './login.service';
//import { EventEmitter } from 'stream';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})






export class LoginComponent implements OnInit,AfterViewInit {
  public screenWidth: any;  
  public screenHeight: any;  
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  l1: any;

  constructor( private http:HttpClient,
    private loginService: LoginService,private authService:AuthService,
    private router: Router,private elementRef:ElementRef) {
    
     }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  
    document.body.className="selector";
    localStorage.getItem('islogin')
     
    
 //   console.log(this.mail);
  }
 setData(){
  localStorage.setItem('email',this.email.value);

   
 }
  login() {
   
    if (this.form.valid) {
      this.authService.login({
        email: this.email.value,
        password: this.password.value
       } ).pipe(
        tap(() => this.router.navigate(['/home']))
      ).subscribe();
    }
    else{
      this.email.markAsTouched();
      this.password.markAsTouched();
    }

  }
  // nav(){
  //   this.router.navigate([register]);
  // }
hide=true;
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

}

