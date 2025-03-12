import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment4',
  templateUrl: './assesment4.component.html',
  styleUrls: ['./assesment4.component.css']
})
export class Assesment4Component {
  assessmentForm!: FormGroup;
  progress = 80; // Step 4 of 5 completed (80%)
  currentStep = 4;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Retrieve the saved choice from localStorage if it exists
    const savedSnack = localStorage.getItem('favoriteSnack');

    // Initialize the form with the saved value (if any)
    this.assessmentForm = this.fb.group({
      selectedSnack: new FormControl(savedSnack || '', Validators.required)
    });

    // Auto-save to localStorage when the form value changes
    this.assessmentForm.valueChanges.subscribe(() => {
      localStorage.setItem('favoriteSnack', this.assessmentForm.get('selectedSnack')?.value);
    });
  }

  goBack() {
    this.router.navigate(['/assesment3']);
  }

  saveAndNext() {
    if (this.assessmentForm.valid) {
      localStorage.setItem('favoriteSnack', this.assessmentForm.get('selectedSnack')?.value);
      this.router.navigate(['/assessment5']);
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