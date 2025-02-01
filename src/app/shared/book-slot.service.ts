import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
@Injectable({
  providedIn: 'root'
})
export class BookSlotService {
  constructor(private httpClient: HttpClient) { }
  
  createSlot(slot: any): Observable<any> {
    return this.httpClient.post("http://localhost:8080/createSlots", slot);
  }

  // Create multiple slots using forkJoin to handle multiple requests
  createMultipleSlots(slots: any[]): Observable<any[]> {
    const requests = slots.map(slot => this.createSlot(slot));
    return forkJoin(requests);
  }

  getAllMyBookings(id:number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/getAllMyBookings/${id}`);
  }

  updateActivityStatus(bookingId: number, completed: boolean) {
    return this.httpClient.put(`http://localhost:8080/updateActivityStatus/${bookingId}`, { completed });
  }
}