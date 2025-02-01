import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ViewAllTherapistsService } from 'src/app/shared/view-all-therapists.service';
import { Subscription } from 'rxjs';

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
    private viewAllTherapistsService: ViewAllTherapistsService
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
  this.selectedDoctor = therapist;
  this.selectedDate = null;
  this.selectedSlot = null;
  this.availableDates = [];
  this.availableSlots = [];
  
  // Fetch available dates for the selected therapist
  const subscription = this.viewAllTherapistsService.getAvailableDates(therapist.therapistId)
    .subscribe({
      next: (dates) => {
        this.availableDates = dates;
        console.log('Available dates:', this.availableDates); // Debug log
      },
      error: (error) => {
        console.error('Error fetching available dates:', error);
      }
    });
  
  this.subscriptions.push(subscription);
  
  // Open the offcanvas with the template reference
  this.offcanvasService.open(this.bookingSidebar, { position: 'end' });
} 
  // Select a Date
  onDateSelect(date: string): void {
    this.selectedDate = date;
    this.selectedSlot = null;
    
    // Fetch available slots for the selected date
    const subscription = this.viewAllTherapistsService.getAllAvailableSlots(date)
      .subscribe({
        next: (slots) => {
          this.availableSlots = slots;
        },
        error: (error) => {
          console.error('Error fetching available slots:', error);
        }
      });
    
    this.subscriptions.push(subscription);
  }

  // Select a Slot
  selectSlot(slot: string): void {
    this.selectedSlot = slot;
  }

  // Proceed with Booking
  proceedBooking(): void {
    if (this.selectedDoctor && this.selectedDate && this.selectedSlot) {
      console.log('Booking confirmed for:', {
        therapist: this.selectedDoctor.name,
        date: this.selectedDate,
        slot: this.selectedSlot
      });
      this.offcanvasService.dismiss('bookingSidebar');
    } else {
      console.error('Please select both date and slot before proceeding.');
    }
  }
}