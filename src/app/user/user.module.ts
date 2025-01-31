import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ViewAllTherapistsComponent } from './view-all-therapists/view-all-therapists.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { CanvasTestComponent } from './canvas-test/canvas-test.component';
import { VideoCallComponent } from './video-call/video-call.component';



@NgModule({
  declarations: [
    CreateFeedbackComponent,
    MyBookingsComponent,
    ViewAllTherapistsComponent,
    BookAppointmentComponent,
    CanvasTestComponent,
    VideoCallComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
