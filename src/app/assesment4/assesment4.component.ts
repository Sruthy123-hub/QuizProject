import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment4',
  templateUrl: './assesment4.component.html',
  styleUrls: ['./assesment4.component.css']
})
export class Assesment4Component {
  progress = 80; // 4 of 5 completed (80%)
  currentStep = 4;
  selectedSnack: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve the saved choice from localStorage if it exists
    const savedSnack = localStorage.getItem('favoriteSnack');
    if (savedSnack) {
      this.selectedSnack = savedSnack;
    }
  }

  goBack() {
    this.router.navigate(['/assesment3']);
  }

  saveAndNext() {
    if (this.selectedSnack) {
      localStorage.setItem('favoriteSnack', this.selectedSnack);
      this.router.navigate(['/assessment5']);
    }
  }
}