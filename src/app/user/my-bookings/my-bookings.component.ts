import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BookSlotService } from "src/app/shared/book-slot.service";

interface BookingResponse {
  id: number;
  therapistId: number;
  dateTime: string;
  activityCompleted: number;
  therapistName?: string;
}

interface Booking {
  id: number;
  therapistName: string;
  dateTime: string;
  slotTaken: boolean;
  activityCompleted: number;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [DatePipe]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  sessionKey = localStorage.getItem('SESSION_KEY') || '';

  constructor(
    private datePipe: DatePipe,
    private getBookings: BookSlotService
  ) { }

  ngOnInit(): void {
    this.loadBookings();
    this.sessionKey = localStorage.getItem('sessionKey') || '';
  }

  loadBookings() {
    this.getBookings.getAllMyBookings(3).subscribe((data: BookingResponse[]) => {
      this.bookings = data.map(booking => ({
        id: booking.id,
        therapistName: booking.therapistName || `Therapist ${booking.therapistId}`,
        dateTime: booking.dateTime,
        slotTaken: true,
        activityCompleted: booking.activityCompleted === 1 ? 1 : 0
      }));
      console.log('Mapped bookings:', this.bookings);
    });

    this.sessionKey = localStorage.getItem('sessionKey') || '';

  }

 hasSpecialKey():boolean{
  this.sessionKey = localStorage.getItem('sessionKey') || '';
  if(this.sessionKey != ''){
    return true;
  }
  return false;
 }

  formatDateTime(dateTimeStr: string): string {
    // First, extract the date and time from the string
    // Example input: "2024-02-01T09:00 AM - 10:00 AM"
    const parts = dateTimeStr.split('T');
    if (parts.length !== 2) return dateTimeStr;

    const date = new Date(parts[0]);
    const timeRange = parts[1];

    // Format the date
    const formattedDate = this.datePipe.transform(date, 'EEEE, MMMM d, y');
    
    // Return combined date and time
    return `${formattedDate}, ${timeRange}`;
  }

  isBookingTime(dateTimeStr: string): boolean {
    try {
      // Extract just the date and start time
      const [dateStr, timeRange] = dateTimeStr.split('T');
      const startTime = timeRange.split(' - ')[0];
      
      // Combine date and start time
      const bookingDateTime = new Date(`${dateStr} ${startTime}`);
      const now = new Date();

      // Check if current time is within 5 minutes of booking time
      return now >= new Date(bookingDateTime.getTime() - 5 * 60000);
    } catch (error) {
      console.error('Error parsing datetime:', error);
      return false;
    }
  }

  completeActivity(bookingId: number): void {
    this.getBookings.updateActivityStatus(bookingId, true).subscribe(
      (response: any) => {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
          booking.activityCompleted = 1;
        }
      },
      (error: any) => {
        console.error('Error updating activity status:', error);
      }
    );

    this.loadBookings();
  }

  joinSession(bookingId: number): void {
    window.location.href = 'http://localhost:50249';
  }
}