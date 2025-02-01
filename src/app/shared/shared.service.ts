import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private http:HttpClient){}
  private emotionSource = new Subject<{ emotion: string, backgroundColor: string }>();
  emotionChanged = this.emotionSource.asObservable();

  changeEmotion(emotion: string, backgroundColor: string) {
    this.emotionSource.next({ emotion, backgroundColor });
  }

  createUser(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/createUser",body)
  }

  login(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/login",body);
  }

  createAdmin(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/admin-signup",body)
  }

  loginAdmin(body:any):Observable<any>{
    return this.http.post("http://localhost:8080/admin-login",body);
  }

}
