import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewAllTherapistsService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  
  getAllTheripast(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllTheripast`);
  }

  getAvailableDates(therapistId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllAvailableDates/${therapistId}`);
  }

  getAllAvailableSlots(date: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/getAllAvailableSlots/${date}`);
  }
}