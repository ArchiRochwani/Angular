import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {path:'login',component:LoginComponent,
  //loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {path:'register',component:RegisterComponent,
  
  },
   {
    path:'home',component:HomeComponent,
   },
  //  {
  //   path:'app',component:AppComponent,
  //  },
  //  { path: '', redirectTo: '/app', pathMatch: 'full' },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
