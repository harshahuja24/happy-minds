import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() toggleForm!: () => void; // Accept function from parent
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private sharedService:SharedService,private http:HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required]]
    });
  }

 login() {

    console.log(this.loginForm.value)
    this.sharedService.login(this.loginForm.value).subscribe(()=>console.log("login data inserted"))
  }

  
  
}