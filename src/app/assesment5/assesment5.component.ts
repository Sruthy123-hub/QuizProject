import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment5',
  templateUrl: './assesment5.component.html',
  styleUrls: ['./assesment5.component.css']
})
export class Assesment5Component {
  progress = 100; // 5 of 5 completed (100%)
  currentStep = 5;
  address1 = '';
  address2 = '';
  city = '';
  state = '';
  zip = '';

  address1Error = false;
  address2Error = false;
  cityError = false;
  stateError = false;
  zipError = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve saved data if available
    this.address1 = localStorage.getItem('address1') || '';
    this.address2 = localStorage.getItem('address2') || '';
    this.city = localStorage.getItem('city') || '';
    this.state = localStorage.getItem('state') || '';
    this.zip = localStorage.getItem('zip') || '';
  }

  goBack() {
    this.router.navigate(['/assessment4']);
  }

  saveAndNext() {
    if (!this.hasErrors()) {
      localStorage.setItem('address1', this.address1);
      localStorage.setItem('address2', this.address2);
      localStorage.setItem('city', this.city);
      localStorage.setItem('state', this.state);
      localStorage.setItem('zip', this.zip);
      // Navigate to next step (if applicable)
      this.router.navigate(['/success'])
    }
  }

  validateAddress() {
    const addressRegex = /^[A-Za-z0-9\s]+$/; // Letters and numbers allowed
    this.address1Error = !addressRegex.test(this.address1);
    this.address2Error = !addressRegex.test(this.address2);
  }

  validateCityState(field: string) {
    const textRegex = /^[A-Za-z\s]+$/; // Only letters allowed
    if (field === 'city') {
      this.cityError = !textRegex.test(this.city);
    } else if (field === 'state') {
      this.stateError = !textRegex.test(this.state);
    }
  }

  validateZip() {
    const zipRegex = /^[0-9]+$/; // Only numbers allowed
    this.zipError = !zipRegex.test(this.zip);
  }

  hasErrors(): boolean {
    return this.address1Error || this.address2Error || this.cityError || this.stateError || this.zipError ||
           !this.address1 || !this.city || !this.state || !this.zip;
  }
}
