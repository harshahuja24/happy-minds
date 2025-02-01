import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ViewAllTherapistsService } from 'src/app/shared/view-all-therapists.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BookSlotService } from 'src/app/shared/book-slot.service';
@Component({
  selector: 'app-view-all-therapists',
  templateUrl: './view-all-therapists.component.html',
  styleUrls: ['./view-all-therapists.component.css']
})

export class ViewAllTherapistsComponent implements OnInit, OnDestroy {
  @ViewChild('bookingSidebar') bookingSidebar!: TemplateRef<any>;

  allTherapists: any[] = [];
  private subscriptions: Subscription[] = [];

  filteredDoctors: any[] = [];
  filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
  noDoctorsMessage: string = "";

  // Search Bar Property
  searchQuery: string = "";

  // Booking Modal Properties
  selectedDoctor: any = null;
  availableDates: any[] = [];
  selectedDate: string | null = null;
  availableSlots: any[] = [];
  selectedSlot: string | null = null;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private viewAllTherapistsService: ViewAllTherapistsService,
    private router: Router,
    private bookAService: BookSlotService
  ) {}

  ngOnInit(): void {
    const subscription = this.viewAllTherapistsService.getAllTheripast()
      .subscribe({
        next: (therapists) => {
          this.allTherapists = therapists;
          this.filteredDoctors = [...this.allTherapists];
        },
        error: (error) => {
          console.error('Error fetching therapists:', error);
          this.noDoctorsMessage = "Error loading therapists";
        }
      });
    
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Apply Filters
  applyFilters(): void {
    this.filteredDoctors = this.allTherapists.filter((therapist: any) => {
      const matchesCity = this.filters.city === 'any' || therapist.city.toLowerCase() === this.filters.city.toLowerCase();
      const matchesSpeciality = this.filters.speciality === 'any' || therapist.speciality.toLowerCase() === this.filters.speciality.toLowerCase();
      const matchesLanguage = this.filters.language === 'any' || therapist.languages.toLowerCase().includes(this.filters.language.toLowerCase());
      const matchesGender = this.filters.gender === 'any' || therapist.gender.toLowerCase() === this.filters.gender.toLowerCase();

      return matchesCity && matchesSpeciality && matchesLanguage && matchesGender;
    });

    this.applySearch();
  }

  // Clear Filters
  clearFilters(): void {
    this.filters = { city: 'any', speciality: 'any', language: 'any', gender: 'any' };
    this.filteredDoctors = [...this.allTherapists];
    this.noDoctorsMessage = "";
    this.applySearch();
  }

  // Apply Search
  applySearch(): void {
    if (this.searchQuery.trim() === "") {
      this.filteredDoctors = [...this.allTherapists];
      this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists available" : "";
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredDoctors = this.allTherapists.filter((therapist) => {
      const matchesName = therapist.name.toLowerCase().includes(query);
      const matchesSpeciality = therapist.speciality.toLowerCase().includes(query);
      return matchesName || matchesSpeciality;
    });

    this.noDoctorsMessage = this.filteredDoctors.length === 0 ? "No therapists found" : "";
  }

  // Open Booking Modal
  // Open Booking Modal
  openBookingModal(therapist: any): void {
    // Create a copy of the therapist object and ensure name property exists
    this.selectedDoctor = {
      ...therapist,
      name: therapist.name || therapist.therapistName // Handle both possible property names
    };
    
    this.selectedDate = null;
    this.selectedSlot = null;
    this.availableDates = [];
    this.availableSlots = [];
    
    // Fetch available dates for the selected therapist
    const subscription = this.viewAllTherapistsService.getAvailableDates(therapist.therapistId)
      .subscribe({
        next: (dates) => {
          this.availableDates = dates;
          console.log('Available dates:', this.availableDates);
        },
        error: (error) => {
          console.error('Error fetching available dates:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load available dates. Please try again.',
          });
        }
      });
    
    this.subscriptions.push(subscription);
    
    // Open the offcanvas
    this.offcanvasService.open(this.bookingSidebar, { position: 'end' });
  }
  // Select a Date
  onDateSelect(date: string): void {
    this.selectedDate = date;
    this.selectedSlot = null; // Reset slot selection when date changes
    
    const subscription = this.viewAllTherapistsService.getAllAvailableSlots(date)
      .subscribe({
        next: (slots) => {
          this.availableSlots = slots;
          console.log('Available slots:', slots);
        },
        error: (error) => {
          console.error('Error fetching available slots:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load available time slots. Please try again.',
          });
        }
      });
    
    this.subscriptions.push(subscription);
  }

  // Select a Slot
  selectSlot(slot: string): void {
    this.selectedSlot = slot;
    console.log('Selected slot:', slot); // Debug log
  }
  proceedBooking(): void {
    if (this.selectedDoctor && this.selectedDate && this.selectedSlot) {
      const bookingData = {
        therapistId: this.selectedDoctor.therapistId, // Use therapist ID
        user_id: 3, // Replace with actual logged-in user ID
        dateTime: `${this.selectedDate}T${this.selectedSlot}`, // Format for LocalDateTime
        activityCompleted: false
      };
      

      console.log('Sending booking request:', bookingData);

      this.bookAService.addBooking(bookingData).subscribe({
        next: (response) => {
          console.log('Booking successful:', response);

          Swal.fire({
            icon: 'success',
            title: 'Booking Confirmed!',
            text: `Appointment booked with ${this.selectedDoctor.name} for ${this.selectedDate} at ${this.selectedSlot}`,
            showConfirmButton: false,
            timer: 2500
          }).then(() => {
            this.router.navigate(['/my-bookings']);
          });

          // Close the sidebar
          this.offcanvasService.dismiss('bookingSidebar');
        },
        error: (error) => {
          console.error('Booking failed:', error);

          Swal.fire({
            icon: 'error',
            title: 'Booking Failed',
            text: 'Could not book the appointment. Please try again.',
            showConfirmButton: true
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: 'Please select both date and slot before proceeding.',
        showConfirmButton: true
      });
    }
  }
}
