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

   
    if (this.movies.length === 0) {
      this.movies.push({ title: '', year: '', isSaved: false, yearError: false });
    }
  }

  // Function to check if Next button should be enabled
  isNextEnabled(): boolean {
    return this.movies.some(movie => 
      movie.title.trim() !== '' && 
      movie.year.trim() !== '' && 
      !movie.yearError
    );
  }

// Modify addMovie() to disable Next button when a new movie is added
addMovie() {
  this.movies.push({ title: '', year: '', isSaved: false, yearError: false });
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
    // Prevent navigation if any movie has a validation error
    if (this.movies.some(movie => movie.yearError)) {
      return;
    }
  
    // Filter out movies that have no title and year
    const validMovies = this.movies.filter(movie => movie.title.trim() !== '' && movie.year.trim() !== '');
  
    if (validMovies.length === 0) {
      return; // If no valid movies exist, do nothing
    }
  
    // Save only valid movies to local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(validMovies));
    localStorage.setItem('assessmentProgress', '60'); // Save progress
  
    // Navigate to the next assessment
    this.router.navigate(['/assessment4']);
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