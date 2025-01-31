import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Booking {
  id: number;
  therapistName: string;
  dateTime: Date;
  slotTaken: boolean;
  activityCompleted: boolean;
  prescriptionUrl?: string;
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
  providers: [DatePipe]
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Initialize with mock data
    this.loadBookings();
  }

  loadBookings() {
    // Simulating API call with mock data
    this.bookings = [
      {
        id: 1,
        therapistName: 'Dr. Sarah Johnson',
        dateTime: new Date('2025-02-01T10:00:00'),
        slotTaken: true,
        activityCompleted: false,
        prescriptionUrl: 'assets/prescriptions/rx_123.pdf'
      },
      {
        id: 2,
        therapistName: 'Dr. Michael Chen',
        dateTime: new Date('2025-02-03T14:30:00'),
        slotTaken: true,
        activityCompleted: true,
        prescriptionUrl: 'assets/prescriptions/rx_124.pdf'
      }
    ];
    console.log('Bookings loaded:', this.bookings); // Debug log
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
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.activityCompleted = true;
    }
  }

  joinSession(bookingId: number): void {
    console.log(`Joining session for booking ${bookingId}`);
  }

  downloadPrescription(prescriptionUrl: string): void {
    console.log(`Downloading prescription from ${prescriptionUrl}`);
    // Implement download logic here
    window.open(prescriptionUrl, '_blank');
  }

  viewPrescription(prescriptionUrl: string): void {
    console.log(`Viewing prescription from ${prescriptionUrl}`);
    // Implement view logic here
    window.open(prescriptionUrl, '_blank');
  }
}