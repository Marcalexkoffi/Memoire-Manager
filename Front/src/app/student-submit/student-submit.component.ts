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

/* export interface StudentSubmission {
  domaine: string;
  themeTitle: string;
  problematic: string;
  generalObjective: string;
  specificObjectives: string;
  expectedResults: string;
  studentId: string; // 🆕 Ajout pour lier à l'étudiant
} */

@Component({
  selector: 'app-student-submit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './student-submit.component.html',
  styleUrl: './student-submit.component.scss',
})
export class StudentSubmitComponent implements OnInit {
  studentForm!: FormGroup;
  submittedData: any = null;
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
      domaine: ['', [Validators.required]],
      themeTitle: ['', [Validators.required]],
      problematic: ['', [Validators.required]],
      generalObjective: ['', [Validators.required]],
      specificObjectives: ['', [Validators.required]],
      expectedResults: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;

      const formValue = this.studentForm.value;

      // 🆕 Simulation d’un ID étudiant (à remplacer par auth réelle)

      this.submittedData = {
        domaine: formValue.domaine,
        libelle_theme: formValue.themeTitle,
        problematique: formValue.problematic,
        objectif_general: formValue.generalObjective,
        objectif_specifique: formValue.specificObjectives,
        resultat_attendu: formValue.expectedResults,
      };

      this.authService.submit(this.submittedData).subscribe({
        next: (data) => {
          console.log('✅ Soumission envoyée :', data);
          this.isSubmitting = false;
          alert('🎉 Votre proposition a été soumise avec succès !');
          this.resetForm();
        },
        error: (err) => {
          console.error('❌ Erreur lors de la soumission', err);
          this.isSubmitting = false;
          alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        },
      });
    } else {
      this.markFormGroupTouched();
      console.warn('Formulaire invalide');
    }
  }

  onCancel(): void {
    if (
      confirm(
        'Êtes-vous sûr de vouloir annuler ? Toutes les données saisies seront perdues.'
      )
    ) {
      this.resetForm();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.studentForm.reset();
    this.showValues = false;
    this.submittedData = null;
  }

  hideValues(): void {
    this.showValues = false;
    this.submittedData = null;
  }

  isFormValid(): boolean {
    return this.studentForm.valid;
  }

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
