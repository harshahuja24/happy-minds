import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BookSlotService } from "src/app/shared/book-slot.service";

// Updated interfaces to match the database structure
interface BookingResponse {
  id: number;
  therapistId: number;
  dateTime: string;
  activityCompleted: number;
  therapistName?: string; // Will be included after joining with Therapists table
}

interface Booking {
  id: number;
  therapistName: string;
  dateTime: Date;
  slotTaken: boolean;
  activityCompleted: boolean;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [DatePipe]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private datePipe: DatePipe,
    private getBookings: BookSlotService
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    // Assuming you're passing the user_id
    this.getBookings.getAllMyBookings(3).subscribe((data: BookingResponse[]) => {
      this.bookings = data.map(booking => ({
        id: booking.id,
        therapistName: booking.therapistName || `Therapist ${booking.therapistId}`,
        dateTime: new Date(booking.dateTime),
        slotTaken: true, // All bookings in the table are confirmed
        activityCompleted: booking.activityCompleted === 1
      }));
      
      console.log('Bookings loaded:', this.bookings);
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'EEEE, MMMM d, y, h:mm a') || '';
  }

  isBookingTime(dateTime: Date): boolean {
    const now = new Date();
    const bookingTime = new Date(dateTime);
    return now >= new Date(bookingTime.getTime() - 5 * 60000);
  }

  completeActivity(bookingId: number): void {
    // Update to make an API call to your backend
    this.getBookings.updateActivityStatus(bookingId, true).subscribe(
      (response: any) => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.activityCompleted = true;
        }
      },
      (error: any) => {
        console.error('Error updating activity status:', error);
      }
    );
  }

  joinSession(bookingId: number): void {
    console.log(`Joining session for booking ${bookingId}`);
    // Implement your session joining logic here
  }
}