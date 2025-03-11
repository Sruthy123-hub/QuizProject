import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment1',
  templateUrl: './assesment1.component.html',
  styleUrls: ['./assesment1.component.css']
})
export class Assesment1Component {
  progress = 0; // Initially, no progress
  selectedGenres: string[] = []; // Store selected genres
  progressUpdated = false; // Track if progress has been set

  genres = [
    'Action', 'Horror', 'Drama', 'Thriller', 'Science Fiction', 'Fantasy',
    'Western', 'Romantic', 'Comedy', 'Kevin Hart Buddy Comedy', 'Noir', 'None of the above'
  ];

  constructor(private router: Router) {
    // Retrieve saved progress
    const savedProgress = localStorage.getItem('assessmentProgress');
    if (savedProgress) {
      this.progress = parseInt(savedProgress, 10);
      this.progressUpdated = this.progress >= 20;
    }

    // Retrieve selected genres from localStorage
    const savedGenres = localStorage.getItem('selectedGenres');
    if (savedGenres) {
      this.selectedGenres = JSON.parse(savedGenres);
    }
  }

  // Handle checkbox selection and store it
  onCheckboxChange(event: any, genre: string) {
    if (event.target.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(item => item !== genre);
    }

    // Store updated selections in localStorage
    localStorage.setItem('selectedGenres', JSON.stringify(this.selectedGenres));

    // Set progress to 20% when the first selection is made
    if (!this.progressUpdated && this.selectedGenres.length > 0) {
      this.progress = 20;
      this.progressUpdated = true;
      localStorage.setItem('assessmentProgress', this.progress.toString());
    }
  }

  // Save selections and navigate to the next assessment
  saveSelections() {
    console.log('Selected Genres:', this.selectedGenres);
    localStorage.setItem('selectedGenres', JSON.stringify(this.selectedGenres));
    this.router.navigate(['/assesment2']);
  }

  // Check if a genre was previously selected
  isChecked(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }
}