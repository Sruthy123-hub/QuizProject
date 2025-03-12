import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment5',
  templateUrl: './assesment5.component.html',
  styleUrls: ['./assesment5.component.css']
})
export class Assesment5Component {
  addressForm!: FormGroup;
  progress = 100; // Step 5 of 5 completed
  currentStep = 5;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Retrieve saved data if available
    this.addressForm = this.fb.group({
      address1: [localStorage.getItem('address1') || '', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      address2: [localStorage.getItem('address2') || '', [Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      city: [localStorage.getItem('city') || '', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      state: [localStorage.getItem('state') || '', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      zip: [localStorage.getItem('zip') || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    // Automatically save data to localStorage when form values change
    this.addressForm.valueChanges.subscribe(() => {
      localStorage.setItem('address1', this.addressForm.get('address1')?.value);
      localStorage.setItem('address2', this.addressForm.get('address2')?.value);
      localStorage.setItem('city', this.addressForm.get('city')?.value);
      localStorage.setItem('state', this.addressForm.get('state')?.value);
      localStorage.setItem('zip', this.addressForm.get('zip')?.value);
    });
  }

  goBack() {
    this.router.navigate(['/assessment4']);
  }

  saveAndNext() {
    if (this.addressForm.valid) {
      this.router.navigate(['/success']);
    }
  }

  getProgressSegments() {
    const totalSegments = 5;
    const completedSegments = Math.round((this.progress / 100) * totalSegments);

    return Array.from({ length: totalSegments }, (_, index) => ({
      completed: index < completedSegments
    }));
  }
}