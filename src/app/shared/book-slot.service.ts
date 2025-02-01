import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookSlotService {

  constructor(private httpClient:HttpClient) { }

  createSlots(body:any):Observable<any>{
    return this.httpClient.post("http://localhost:8080/createSlots", body);
  }
}
