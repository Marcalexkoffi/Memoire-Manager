import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

export interface StudentSubmission {
  contact: string;
  domaine: string;
  fullName: string;
  themeTitle: string;
  problematic: string;
  generalObjective: string;
  specificObjectives: string; // Changé de string[] à string
  expectedResults: string;
}

@Component({
  selector: 'app-student-submit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './student-submit.component.html',
  styleUrl: './student-submit.component.scss',
})
export class StudentSubmitComponent implements OnInit {
  studentForm!: FormGroup;
  submittedData: StudentSubmission | null = null;
  showValues: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.formBuilder.group({
      contact: ['', [Validators.required]], // Type text maintenant
      domaine: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      themeTitle: ['', [Validators.required]],
      problematic: ['', [Validators.required]],
      generalObjective: ['', [Validators.required]],
      specificObjectives: ['', [Validators.required]], // Simple FormControl maintenant
      expectedResults: ['', [Validators.required]],
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;

      // Simuler un délai de soumission
      setTimeout(() => {
        const formValue = this.studentForm.value;
        this.submittedData = {
          contact: formValue.contact,
          domaine: formValue.domaine,
          fullName: formValue.fullName,
          themeTitle: formValue.themeTitle,
          problematic: formValue.problematic,
          generalObjective: formValue.generalObjective,
          specificObjectives: formValue.specificObjectives, // Plus de filtrage nécessaire
          expectedResults: formValue.expectedResults,
        };
        this.authService.submit(this.submittedData).subscribe({
          next: (data) => console.log(data),
          error: (err) => console.error(err),
        });
        this.showValues = true;
        this.isSubmitting = false;
        console.log('Données soumises:', this.submittedData);
      }, 1500);
    } else {
      this.markFormGroupTouched();
      console.log('Formulaire invalide');
    }
  }

  // Annuler le formulaire
  onCancel(): void {
    if (
      confirm(
        'Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.'
      )
    ) {
      this.resetForm();
    }
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.studentForm.reset();
    this.showValues = false;
    this.submittedData = null;
  }

  // Masquer les valeurs affichées
  hideValues(): void {
    this.showValues = false;
    this.submittedData = null;
  }

  // Vérifier si le formulaire est valide
  isFormValid(): boolean {
    return this.studentForm.valid;
  }

  // Obtenir le pourcentage de completion
  getCompletionPercentage(): number {
    const totalFields = Object.keys(this.studentForm.controls).length;
    let completedFields = 0;

    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      if (control?.value && control.value.trim() !== '') {
        completedFields++;
      }
    });

    return Math.round((completedFields / totalFields) * 100);
  }
}
