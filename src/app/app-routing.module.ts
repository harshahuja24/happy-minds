import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './user/my-bookings/my-bookings.component';
import { GenerateSlotsComponent } from './therapist/generate-slots/generate-slots.component';
import { MyAppointmentsComponent } from './therapist/my-appointments/my-appointments.component';


const routes: Routes = [
  {
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
