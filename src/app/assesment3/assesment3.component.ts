import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment3',
  templateUrl: './assesment3.component.html',
  styleUrls: ['./assesment3.component.css']
})
export class Assesment3Component {
  assessmentForm!: FormGroup;
  progress = 60; // Step 3 of 5 completed (60%)
  currentStep = 3;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const savedMovies = localStorage.getItem('favoriteMovies');
    const movieData = savedMovies ? JSON.parse(savedMovies) : [];

    // Initialize form with existing movies or an empty one
    this.assessmentForm = this.fb.group({
      movies: this.fb.array(
        movieData.length > 0 ? movieData.map((movie: any) => this.createMovieGroup(movie)) : [this.createMovieGroup()]
      )
    });

    // Auto-save to localStorage whenever the form changes
    this.assessmentForm.valueChanges.subscribe(() => {
      localStorage.setItem('favoriteMovies', JSON.stringify(this.movies.value));
    });
  }

  // Getter for movies FormArray
  get movies(): FormArray {
    return this.assessmentForm.get('movies') as FormArray;
  }

  // Create a new FormGroup for a movie entry
  createMovieGroup(movie: any = { title: '', year: '', isSaved: false, yearError: false }): FormGroup {
    return this.fb.group({
      title: [movie.title, Validators.required],
      year: [movie.year, Validators.required],
      isSaved: [movie.isSaved],
      yearError: [movie.yearError]
    });
  }

  // Add a new movie to the list
  addMovie() {
    this.movies.push(this.createMovieGroup());
  }

  // Validate year input
  validateYear(index: number) {
    const movieControl = this.movies.at(index);
    const yearValue = movieControl.get('year')?.value;

    if (!/^\d*$/.test(yearValue)) {
      movieControl.get('yearError')?.setValue(true);
    } else {
      movieControl.get('yearError')?.setValue(false);
    }

    // Remove non-numeric characters
    movieControl.get('year')?.setValue(yearValue.replace(/[^0-9]/g, ''), { emitEvent: false });
  }

  // Function to check if Next button should be enabled
  isNextEnabled(): boolean {
    return this.movies.controls.some(movie =>
      movie.get('title')?.value.trim() !== '' &&
      movie.get('year')?.value.trim() !== '' &&
      !movie.get('yearError')?.value
    );
  }

  // Save valid movies and navigate to the next page
  saveAndNext() {
    if (this.movies.controls.some(movie => movie.get('yearError')?.value)) {
      return;
    }

    const validMovies = this.movies.value.filter((movie: any) => movie.title.trim() !== '' && movie.year.trim() !== '');

    if (validMovies.length === 0) {
      return;
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(validMovies));
    localStorage.setItem('assessmentProgress', '60'); // Save progress

    this.router.navigate(['/assessment4']);
  }

  goBack() {
    this.router.navigate(['/assesment2']); // Navigate back to Assessment 2
  }

  getProgressSegments() {
    const totalSegments = 5;
    const completedSegments = Math.round((this.progress / 100) * totalSegments);

    return Array.from({ length: totalSegments }, (_, index) => ({
      completed: index < completedSegments
    }));
  }
}