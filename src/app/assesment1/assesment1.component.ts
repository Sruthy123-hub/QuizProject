import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assesment1',
  templateUrl: './assesment1.component.html',
  styleUrls: ['./assesment1.component.css']
})
export class Assesment1Component {
  assessmentForm!: FormGroup;
  progress = 0;

  genres: string[] = [
    'Action', 'Horror', 'Drama', 'Thriller', 'Science Fiction', 'Fantasy',
    'Western', 'Romantic', 'Comedy', 'Kevin Hart Buddy Comedy', 'Noir', 'None of the above'
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const savedGenres = JSON.parse(localStorage.getItem('selectedGenres') || '[]');

    // Initialize FormArray with checkboxes correctly
    this.assessmentForm = this.fb.group({
      selectedGenres: this.fb.array(
        this.genres.map(genre => new FormControl(savedGenres.includes(genre))) // Bind with saved selections
      )
    });

    // Update progress if there are saved selections
    this.updateProgress();

    // Listen for changes in checkboxes
    this.selectedGenresArray.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  // Get FormArray
  get selectedGenresArray(): FormArray {
    return this.assessmentForm.get('selectedGenres') as FormArray;
  }

  // Check if any selection is made
  isSelectionMade(): boolean {
    return this.selectedGenresArray.value.includes(true);
  }

  // Update progress dynamically when a checkbox is selected
  updateProgress() {
    const selectedGenres = this.selectedGenresArray.value.filter((checked: boolean) => checked);
    this.progress = selectedGenres.length > 0 ? 20 : 0;
  }

  // Save selections and navigate
  saveSelections() {
    const selectedGenres = this.genres.filter((_, i) => this.selectedGenresArray.value[i]);
    localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));

    if (selectedGenres.length > 0) {
      this.progress = 20;
      localStorage.setItem('assessmentProgress', this.progress.toString());
    }

    this.router.navigate(['/assesment2']);
  }

  // Get progress segments for UI
  getProgressSegments() {
    const totalSegments = 5;
    const completedSegments = Math.round((this.progress / 100) * totalSegments);
    return Array.from({ length: totalSegments }, (_, index) => ({
      completed: index < completedSegments
    }));
  }
}
