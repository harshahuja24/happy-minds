import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { TherapistModule } from './therapist/therapist.module';
import { UserModule } from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HomeModule,
    AuthModule,
    TherapistModule,
    UserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    TherapistModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 


 
}
