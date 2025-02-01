import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './user/my-bookings/my-bookings.component';
import { GenerateSlotsComponent } from './therapist/generate-slots/generate-slots.component';
import { MyAppointmentsComponent } from './therapist/my-appointments/my-appointments.component';
import { ViewAllTherapistsComponent } from './user/view-all-therapists/view-all-therapists.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminSignupComponent } from './auth/admin-signup/admin-signup.component';
import { QuizComponent } from './home/quiz/quiz.component';
import { BooksComponent } from './resources/books/books.component';


const routes: Routes = [{
  path:'my-bookings',
  component:MyBookingsComponent
},
{
  path:'generate-slots',
  component:GenerateSlotsComponent
},
{
  path:'my-appointments',
  component:MyAppointmentsComponent
},
{
  path:'quiz',
  component:QuizComponent
},
{
  path:'view-all-therapists',
  component:ViewAllTherapistsComponent
},
{
  path: '',
  component: AuthLayoutComponent,
  children: 
  [
    { path: '', redirectTo: 'user-login', pathMatch: 'full' },
    { path: 'user-login', component: LoginComponent },
    { path: 'user-signup', component: SignupComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-signup', component: AdminSignupComponent },
  ],
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
