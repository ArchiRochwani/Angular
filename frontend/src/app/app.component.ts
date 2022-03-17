import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { EventEmitter } from 'stream';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  showComponent: boolean=true;
  isregister:boolean=false;
  islogin:any=false;
  logout: boolean=true;
  navbar: boolean=false;

  //showMenu: boolean;
  constructor(private router:Router,private route:ActivatedRoute){
    console.log(this.router.url);
    if(this.router.url==='/login'){
      this.islogin=true;
      this.isregister=false;
    }

  }
   ngDoCheck():void{
    if(this.router.url==='/login'){
      this.islogin=true;
      this.isregister=false;
    this.logout=true;
  }
      if(this.router.url==='/register'){
        this.isregister=true;
        this.islogin=false;
        this.logout=true;
        this.navbar=false;
      }
      if(this.router.url==='/home')
      {
        this.isregister=true;
        this.islogin=true;
        this.logout=false;
        this.navbar=true;
      }
      if(this.router.url==='/')
      {
        this.isregister=false;
        this.islogin=false;
        this.logout=true; 
      }

   }
  ngOnInit(): void {
    this.isregister=false;
    this.islogin=false;
    this.logout=true;
    this.navbar=false;
  }
  
  public isMenuOpen: boolean = false;
  public onSidenavClick(): void {
    this.isMenuOpen = false; 
}

hideLogin(){
  console.log(this.router.url);

  if(this.router.url==='/login'){
    this.islogin=true;
    this.isregister=false;}
}
hideRegister(){
  console.log(this.router.url);

  if(this.router.url==='/register'){

    this.isregister=true;
    this.islogin=false;
  }
}

}
