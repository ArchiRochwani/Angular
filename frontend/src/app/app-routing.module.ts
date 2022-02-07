import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'login',component:LoginComponent,
  //loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {path:'register',component:RegisterComponent,
  
  },
  {
    path:'home',component:HomeComponent,
  },
  { path:'',redirectTo:'/home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }