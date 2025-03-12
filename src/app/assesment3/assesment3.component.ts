import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment3',
  templateUrl: './assesment3.component.html',
  styleUrls: ['./assesment3.component.css']
})
export class Assesment3Component {
  progress = 60; // 3 of 5 completed (60%)
  currentStep = 3;
  showFields = false;
  
  movies: { title: string; year: string; isSaved: boolean; yearError: boolean }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const savedMovies = localStorage.getItem('favoriteMovies');
    if (savedMovies) {
      this.showFields = false;
      this.movies = JSON.parse(savedMovies).map((movie: any) => ({
        title: movie.title,
        year: movie.year,
        isSaved: true, // Mark previously saved movies as read-only
        yearError: false // No error initially
      }));
    }

    // If no saved movies exist, start with one empty input field
    if (this.movies.length === 0) {
      this.movies.push({ title: '', year: '', isSaved: false, yearError: false });
    }
  }

  addMovie() {
    this.showFields = true;
    this.movies.push({ title: '', year: '', isSaved: false, yearError: false }); // Immediately show new input fields
  }

  validateYear(index: number) {
    const yearValue = this.movies[index].year;
    
    if (!/^\d*$/.test(yearValue)) {
      this.movies[index].yearError = true; // Show error if non-numeric characters are entered
    } else {
      this.movies[index].yearError = false; // Hide error if valid
    }

    // Remove non-numeric characters
    this.movies[index].year = yearValue.replace(/[^0-9]/g, '');
  }

  saveAndNext() {
    if (this.movies.some(movie => movie.yearError)) {
      return; // Prevent navigation if there are validation errors
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(this.movies));
    localStorage.setItem('assessmentProgress', '60'); // Save progress
    this.router.navigate(['/assessment4']); // Navigate to next assessment
  }

  goBack() {
    this.router.navigate(['/assesment2']); // Navigate back to Assessment 2
  }

  getProgressSegments() {
    const totalSegments = 5; // Example: Total number of segments
    const completedSegments = Math.round((this.progress / 100) * totalSegments);
  
    return Array.from({ length: totalSegments }, (_, index) => ({
      completed: index < completedSegments
    }));
  }
}