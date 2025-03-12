import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment2',
  templateUrl: './assesment2.component.html',
  styleUrls: ['./assesment2.component.css']
})
export class Assesment2Component {
  assessmentForm!: FormGroup;
  progress = 40; // Default value
  currentStep = 2;

  options = [
    '0-3 years',
    '4-6 years',
    '7 or more years'
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Load saved answer and progress from localStorage
    const savedAnswer = localStorage.getItem('assessment2Answer');
    const savedProgress = localStorage.getItem('assessmentProgress');

    if (savedProgress) {
      this.progress = parseInt(savedProgress, 10);
    }

    // Initialize the form
    this.assessmentForm = this.fb.group({
      experience: [savedAnswer || ''] // Load saved value if available
    });

    // Update localStorage when form value changes
    this.assessmentForm.valueChanges.subscribe(value => {
      if (value.experience) {
        localStorage.setItem('assessment2Answer', value.experience);
      }
    });
  }

  // Navigate to previous question
  goBack() {
    this.router.navigate(['/assesment1']);
  }

  // Navigate to next question
  goToNext() {
    if (this.assessmentForm.value.experience) {
      localStorage.setItem('assessmentProgress', '40'); // Step 2 of 5
      this.router.navigate(['/assesment3']);
    }
  }

  getProgressSegments() {
    const totalSegments = 5; // Total number of segments
    const completedSegments = Math.round((this.progress / 100) * totalSegments);

    return Array.from({ length: totalSegments }, (_, index) => ({
      completed: index < completedSegments
    }));
  }
}