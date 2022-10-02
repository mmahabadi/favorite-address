import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {AuthGuard} from "../core/services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'login', component: LoginComponent, data: {title: 'Sign In'}},
      {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    ]
  },
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
