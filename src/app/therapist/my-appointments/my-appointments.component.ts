import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookSlotService } from '../../shared/book-slot.service';

interface Appointment {
  id: number;
  userName: string;
  dateTime: string;
  activityCompleted: boolean;
  sessionKey?: string;
}

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
  providers: [DatePipe]
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  private readonly THERAPIST_ID = 2;
  private readonly SESSION_KEY = '4jNlXfD4pxVc';
  sessionKeyVisible: boolean = false;
  constructor(
    private datePipe: DatePipe,
    private bookSlotService: BookSlotService
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    // First get all bookings
    this.bookSlotService.getAllBookings().subscribe(bookings => {
      console.log('Raw bookings:', bookings);
      
      // Filter bookings for current therapist
      const therapistBookings = bookings.filter(booking => 
        booking.therapistId === this.THERAPIST_ID
      );
      
      // Get all users
      this.bookSlotService.getAllUsers().subscribe(users => {
        console.log('Raw users:', users);
        
        // Map bookings to appointments with user names
        this.appointments = therapistBookings.map(booking => {
          const user = users.find(u => u.user_id === booking.user_id);
          return {
            id: booking.id,
            userName: user ? user.username : 'Unknown User',
            dateTime: booking.dateTime,
            activityCompleted: booking.activityCompleted === 1
          };
        });
        
        console.log('Final appointments:', this.appointments);
      });
    });
  }

  formatDate(dateStr: string): string {
    try {
      // First try parsing the date directly
      let date = new Date(dateStr);
      
      // If that doesn't work, try parsing the time range format
      if (isNaN(date.getTime()) && dateStr.includes('-')) {
        const startTime = dateStr.split('-')[0].trim();
        date = new Date(startTime);
      }
      
      return this.datePipe.transform(date, 'MMM d, y h:mm a') || dateStr;
    } catch (e) {
      console.error('Date parsing error:', e);
      return dateStr;
    }
  }

  startSession(appointmentId: number): void {
    window.location.href = 'http://localhost:50249';
    console.log('Starting session:', appointmentId);
  }


  generateKey(): void {
    console.log('Generating session key...');
    localStorage.setItem('sessionKey', this.SESSION_KEY);
    this.sessionKeyVisible = !this.sessionKeyVisible;
  }


  copyKey(): void {
    navigator.clipboard.writeText(this.SESSION_KEY).then(() => {
      alert('Session key copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy key:', err);
      alert('Failed to copy key. Please copy it manually.');
    });
  }


  // Call this method after creating a new booking
  refreshAppointments() {
    this.loadAppointments();
  }
}