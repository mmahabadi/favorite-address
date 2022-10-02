import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./components/profile/profile.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {MatDividerModule} from "@angular/material/divider";
import {ProfileDetailsComponent} from "./components/profile-details/profile-details.component";
import {EditProfileComponent} from "./components/profile-edit/edit-profile.component";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LayoutComponent,
    ProfileDetailsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class AuthModule { }
