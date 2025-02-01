import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent {
  @Input() toggleForms!: () => void; // Accept function from parent
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private sharedService:SharedService,private http:HttpClient) {
    this.signupForm = this.fb.group({
      therapistName: ['', Validators.required],
      city: ['', Validators.required],
      speciality: ['', Validators.required],
      gender: ['', Validators.required],
      years_experience: ['', [Validators.required, Validators.min(0)]],
      qualifications: ['', Validators.required],
      workplace: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      password1:['', [Validators.required]]
    })
  }
  

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password1')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  createAdmin() {
    
      this.sharedService.createAdmin(this.signupForm.value).subscribe(()=>console.log("admin inserted"));
    
  }

  // createAdmin():Observable<any>{
  //     return this.http.post("http://localhost:8080/admin-signup",this.signupForm.value);
  //   }

  
  
}