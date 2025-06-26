import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  selectedUserType: string = 'Étudiant';
  submittedData: any = null;
  showValues: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Méthode pour sélectionner le type d'utilisateur
  selectUserType(userType: string): void {
    this.selectedUserType = userType;
  }

  // Méthode pour vérifier si un type d'utilisateur est sélectionné
  isUserTypeSelected(userType: string): boolean {
    return this.selectedUserType === userType;
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submittedData = {
        userType: this.selectedUserType,
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.showValues = true;
      console.log('Données soumises:', this.submittedData);
    } else {
      this.markFormGroupTouched();
    }
  }

  // Méthode pour marquer tous les champs comme touchés (pour afficher les erreurs)
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Méthodes pour vérifier les erreurs
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${
        fieldName === 'email' ? "L'adresse email" : 'Le mot de passe'
      } est requis`;
    }
    if (field?.hasError('email')) {
      return 'Veuillez saisir une adresse email valide';
    }
    if (field?.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return '';
  }

  // Méthode pour masquer les valeurs affichées
  hideValues(): void {
    this.showValues = false;
    this.submittedData = null;
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.loginForm.reset();
    this.selectedUserType = 'Étudiant';
    this.hideValues();
  }
}
