import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Appointment {
  id: number;
  therapistName: string;
  dateTime: Date;
  slotTaken: boolean;
  sessionLink?: string;
}

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
  providers: [DatePipe]
})
export class MyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    // Simulating API call with mock data
    this.appointments = [
      {
        id: 1,
        therapistName: 'Dr. Sarah Johnson',
        dateTime: new Date('2025-02-01T10:00:00'),
        slotTaken: true,
        sessionLink: 'https://meet.example.com/session1'
      },
      {
        id: 2,
        therapistName: 'Dr. Michael Chen',
        dateTime: new Date('2025-02-03T14:30:00'),
        slotTaken: true,
        sessionLink: 'https://meet.example.com/session2'
      },
      {
        id: 3,
        therapistName: 'Dr. Michael Chen',
        dateTime: new Date('2025-01-31T20:27:00'),
        slotTaken: true,
        sessionLink: 'https://meet.example.com/session2'
      },
    ];
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'EEEE, MMMM d, y, h:mm a') || '';
  }

  isSessionTime(dateTime: Date): boolean {
    const now = new Date();
    const sessionTime = new Date(dateTime);
    // Enable 15 minutes before session time
    return now >= new Date(sessionTime.getTime() - 15 * 60000);
  }

  startSession(appointmentId: number): void {
    const appointment = this.appointments.find(a => a.id === appointmentId);
    if (appointment?.sessionLink) {
      window.open(appointment.sessionLink, '_blank');
    }
  }
}