import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  @Input() toggleForms!: () => void; // Accept function from parent
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private sharedService:SharedService,private http:HttpClient) {
    this.loginForm = this.fb.group({
      therapistName: ['', [Validators.required]],
      password1: ['', [Validators.required]]
    });
  }

  loginAdmin() {
      return this.sharedService.loginAdmin(this.loginForm.value).subscribe(()=>console.log("admin logged in"))
    
  }

  
  
}