import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FaceApiComponent } from './face-api/face-api.component';



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    FaceApiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
