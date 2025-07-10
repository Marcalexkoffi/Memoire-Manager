import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  userType: string = '';
  registerForm!: FormGroup;
  selectedUserType: string = '';
  submittedData: any = null;

  // showValues: boolean = false;

  // Statistiques pour l'affichage
  stats = {
    users: 1247,
    memoires: 892,
    validated: 634,
  };
  fb: any;

  constructor(
    private newRouter: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        matricule: ['', [Validators.required, Validators.minLength(5)]],
        domaine: ['', [Validators.required, Validators.minLength(5)]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Méthode pour sélectionner le type d'utilisateur
  selectUserType(type: string): void {
    this.userType = type;
    this.selectedUserType = type;
    this.registerForm.get('userType')?.setValue(type);

    if (type === 'Professeur') {
      if (!this.registerForm.get('domaine')) {
        this.registerForm.addControl(
          'domaine',
          this.fb.control('', Validators.required)
        );
      }

      if (!this.registerForm.get('matricule')) {
        this.registerForm.addControl(
          'matricule',
          this.fb.control('', Validators.required)
        );
      }
    } else {
      if (this.registerForm.get('domaine')) {
        this.registerForm.removeControl('domaine');
      }

      if (this.registerForm.get('matricule')) {
        this.registerForm.removeControl('matricule');
      }
    }
  }

  // Méthode pour vérifier si un type d'utilisateur est sélectionné
  isUserTypeSelected(userType: string): boolean {
    return this.selectedUserType === userType;
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.registerForm.valid && this.selectedUserType) {
      // this.submittedData = this.registerForm.getRawValue()
      this.submittedData = {
        nom_complet: this.registerForm.get('fullName')?.value,
        email: this.registerForm.get('email')?.value,
        contact: this.registerForm.get('contact')?.value,
        password: this.registerForm.get('password')?.value,
        confirmPassword: this.registerForm.get('confirmPassword')?.value,
        matricule: this.registerForm.get('matricule')?.value,
        domaine: this.registerForm.get('domaine')?.value,
        role: this.selectedUserType,
        acceptTerms: this.registerForm.get('acceptTerms')?.value,
      };
      // this.showValues = true;
      console.log("Données d'inscription soumises:", this.submittedData);
      //Service authentification
      this.authService.register(this.submittedData).subscribe({
        next: (data) => {
          console.log(data);
          this.newRouter.navigate(['/login']);
        },
        error: (err) => console.error(err),
      });
    } else {
      this.markFormGroupTouched();
      if (!this.selectedUserType) {
        alert("Veuillez sélectionner votre type d'utilisateur");
      }
    }
  }

  // Méthode pour marquer tous les champs comme touchés
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Méthodes pour vérifier les erreurs
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }

  hasFormError(errorType: string): boolean {
    return !!(
      this.registerForm.hasError(errorType) &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (field?.hasError('required')) {
      const fieldNames: { [key: string]: string } = {
        fullName: 'Le nom complet',
        email: "L'adresse email",
        password: 'Le mot de passe',
        confirmPassword: 'La confirmation du mot de passe',
      };
      return `${fieldNames[fieldName]} est requis`;
    }

    if (field?.hasError('email')) {
      return 'Veuillez saisir une adresse email valide';
    }

    if (field?.hasError('minlength')) {
      if (fieldName === 'fullName') {
        return 'Le nom doit contenir au moins 2 caractères';
      }
      if (fieldName === 'password') {
        return 'Le mot de passe doit contenir au moins 8 caractères';
      }
    }

    if (
      fieldName === 'confirmPassword' &&
      this.hasFormError('passwordMismatch')
    ) {
      return 'Les mots de passe ne correspondent pas';
    }

    return '';
  }

  // Méthode pour vérifier la force du mot de passe
  getPasswordStrength(): string {
    const password = this.registerForm.get('password')?.value || '';
    if (password.length === 0) return '';
    if (password.length < 6) return 'Faible';
    if (password.length < 10) return 'Moyen';
    return 'Fort';
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    switch (strength) {
      case 'Faible':
        return 'weak';
      case 'Moyen':
        return 'medium';
      case 'Fort':
        return 'strong';
      default:
        return '';
    }
  }

  // Méthode pour masquer les valeurs affichées
  hideValues(): void {
    // this.showValues = false;
    this.submittedData = null;
  }

  // Méthode pour réinitialiser le formulaire
  resetForm(): void {
    this.registerForm.reset();
    this.selectedUserType = '';
    this.hideValues();
  }

  // Méthode pour formater les nombres avec des espaces
  formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Méthode pour vérifier si le formulaire est valide pour la soumission
  isFormValid(): boolean {
    return this.registerForm.valid && this.selectedUserType !== '';
  }
}
