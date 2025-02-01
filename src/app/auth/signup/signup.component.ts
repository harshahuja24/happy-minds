import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Input() toggleForm!: () => void; // Accept function from parent
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private sharedService:SharedService,private http:HttpClient) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      confirm_password1: ['', Validators.required]
    });
  }

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1')?.value;
    const confirm_password1 = form.get('confirm_password1')?.value;

    if (password1 !== confirm_password1) {
      form.get('confirm_password1')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirm_password1')?.setErrors(null);
    }
  }

  onSignUp() {
    if (this.signupForm.valid) {
      console.log('Sign-up successful!', this.signupForm.value);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  createUser(){
    this.sharedService.createUser(this.signupForm.value).subscribe(()=>console.log("inserted"));
  }

}