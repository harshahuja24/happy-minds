import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimeSlot } from 'src/app/shared/interfaces/timeslot.interface';

@Component({
  selector: 'app-generate-slots',
  templateUrl: './generate-slots.component.html',
  styleUrls: ['./generate-slots.component.css']
})
export class GenerateSlotsComponent {
  slotForm: FormGroup;
  generatedSlots: TimeSlot[] = [];
  showCustomizeModal = false;
  customSlot: TimeSlot = { startTime: '', endTime: '', isCustomized: false, isSelected: false };
  currentSlotIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.slotForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      breakTime: ['', [Validators.required, Validators.min(0)]],
    });
  }

  generateSlots() {
    if (this.slotForm.valid) {
      const formValue = this.slotForm.value;
      
      // Convert form values to Date objects
      const startDate = new Date(formValue.startDate);
      const endDate = new Date(formValue.endDate);
      
      // Generate slots for each day
      this.generatedSlots = [];
      
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const [startHour, startMinute] = formValue.startTime.split(':');
        const [endHour, endMinute] = formValue.endTime.split(':');
        
        let currentTime = new Date(date);
        currentTime.setHours(parseInt(startHour), parseInt(startMinute), 0);
        
        const dayEnd = new Date(date);
        dayEnd.setHours(parseInt(endHour), parseInt(endMinute), 0);
        
        while (currentTime < dayEnd) {
          const slotEnd = new Date(currentTime);
          slotEnd.setMinutes(slotEnd.getMinutes() + formValue.duration);
          
          if (slotEnd <= dayEnd) {
            this.generatedSlots.push({
              startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              endTime: slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isCustomized: false,
              isSelected: false
            });
          }
          
          // Add break time
          currentTime = new Date(slotEnd);
          currentTime.setMinutes(currentTime.getMinutes() + formValue.breakTime);
        }
      }
    }
  }

  toggleSlot(index: number) {
    this.generatedSlots[index].isSelected = !this.generatedSlots[index].isSelected;
  }

  customizeSlot(index: number) {
    this.currentSlotIndex = index;
    this.customSlot = { ...this.generatedSlots[index] };
    this.showCustomizeModal = true;
  }

  saveCustomization() {
    if (this.currentSlotIndex !== -1) {
      this.generatedSlots[this.currentSlotIndex] = {
        ...this.customSlot,
        isCustomized: true
      };
    }
    this.closeModal();
  }

  closeModal() {
    this.showCustomizeModal = false;
    this.currentSlotIndex = -1;
  }

  hasSelectedSlots(): boolean {
    return this.generatedSlots.some(slot => slot.isSelected);
  }

  confirmSlots() {
    const selectedSlots = this.generatedSlots.filter(slot => slot.isSelected);
    console.log('Confirmed slots:', selectedSlots);
    // Here you can add logic to save the selected slots to your backend
  }
}
