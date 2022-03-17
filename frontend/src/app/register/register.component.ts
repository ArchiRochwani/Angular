import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CustomValidators } from '../_helpers/custom-validators';
import { UserService } from '../services/user-service/user.service';
//import { userInfo } from 'os';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //x:string | undefined;
  
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*].{8,}$')  ]),
    passwordConfirm: new FormControl(null, [Validators.required])
  }
  ,
    { validators: CustomValidators.passwordsMatching }
  );
  public screenWidth: any;  
  public screenHeight: any;  

//  username=this.user();
  constructor(
    private userService: UserService,
     private router: Router) {  }
    //@Input() islogin:boolean;
  ngOnInit(): void {
    // console.log(this.router.url);

    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  

    this.email.setValue( localStorage.getItem('email'));
    if(this.email.value=='null')
    {
      this.email.setValue('');
    }
    const getUsername = (email: string) => {
      return email.substring(0, email.lastIndexOf("@"));
   }
   const userEmail = this.email.value;
   const hello=getUsername(userEmail);
   this.username.setValue(hello);
   this.password.setValue("");
  
  }
 register() {
    if (this.form.valid) {
      this.userService.create({
        email: this.email.value,
        password: this.password.value,
        username: this.username.value
      }).pipe(
        tap(() => this.router.navigate(['/login']))
      ).subscribe();
      this.form.reset();

    }
    else{
      console.log("hello");
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.username.markAsTouched();
      this.passwordConfirm.markAsTouched();
      
    }
  
  }
  
  suggestPassword(){
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        capcharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        smalcharset ="abcdefghijklmnopqrstuvwxyz",
        speccharset = "~@#$%^&*",
        numcharset = "0123456789",
        strcap="",
        strsmal ="", strspec ="", strnum ="",
        randomstring = "";
       
        strcap= capcharset.charAt(Math.floor(Math.random()*26));
        strsmal= smalcharset.charAt(Math.floor(Math.random()*26));
        strspec= speccharset.charAt(Math.floor(Math.random()*8));
        strnum= numcharset.charAt(Math.floor(Math.random()*10));
      
    for (var i = 0, n = charset.length; i < length; ++i) {
        randomstring += charset.charAt(Math.floor(Math.random() * n));
    }
      //  return(strcap+strspec+randomstring+strsmal+strnum);
       this.password.setValue(strcap+strspec+randomstring+strsmal+strnum);
  }
  // suggestedPassword=this.suggestPassword();
  getData(){
    this.email.setValue( localStorage.getItem('email'));
    if(this.email.value=='null')
    {
      this.email.setValue('');
    }
    console.log("hello");
  //   data = localStorage.getItem('setEmail');
  //  this.email.setValue=data;
  }
  hide=true;
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
  user(){
    
    const getUsername = (email: string) => {
      return email.substring(0, email.lastIndexOf("@"));
   }
   const userEmail = this.email.value;
   const hello=getUsername(userEmail);
   this.username.setValue(hello);
   console.log( getUsername(userEmail));
  
   return getUsername(userEmail);
  
  }
  
//ar x=this.user();
// static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     if (!control.value) {
//       // if control is empty return no error
//       return null;
//     }

//     // test the value of the control against the regexp supplied
//     const valid = regex.test(control.value);

//     // if true, return no error (no error), else return error passed in the second parameter
//     return valid ? null : error;
//   };
// }

 
//  
}

