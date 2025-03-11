import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment2',
  templateUrl: './assesment2.component.html',
  styleUrls: ['./assesment2.component.css']
})
export class Assesment2Component {
  progress = 40; // Default value
  currentStep = 2;
  selectedOption: string | null = null;

  options = [
    '0-3 years',
    '4-6 years',
    '7 or more years'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load saved answer and progress from local storage
    const savedAnswer = localStorage.getItem('assessment2Answer');
    const savedProgress = localStorage.getItem('assessmentProgress');

    if (savedAnswer) {
      this.selectedOption = savedAnswer;
    }

    if (savedProgress) {
      this.progress = parseInt(savedProgress, 10);
    }
  }

  // Handle option selection and save to localStorage
  onOptionSelect(option: string) {
    this.selectedOption = option;
    localStorage.setItem('assessment2Answer', option);
  }

  // Navigate to previous question
  goBack() {
    this.router.navigate(['/assesment1']);
  }

  // Navigate to next question
  goToNext() {
    if (this.selectedOption) {
      localStorage.setItem('assessment2Answer', this.selectedOption);
      localStorage.setItem('assessmentProgress', '40'); // Step 2 of 5
      this.router.navigate(['/assesment3']);
    }
  }
}