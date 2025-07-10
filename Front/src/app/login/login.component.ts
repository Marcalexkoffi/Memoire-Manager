import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private newRouter: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  redirection(): void {
    const recupData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    console.log('Les données soumises :', recupData);
    this.authService.login(recupData).subscribe({
      next: (data) => {
        this.localStorage.setItem('token', data?.token);

        if (data?.user?.role == 'Etudiant') {
          this.newRouter.navigate(['/workbench/student-dashboard']);
        } else {
          this.newRouter.navigate(['/teacher/professor-dashboard']);
        }
        console.log(data);
      },

      error: (err) => console.error(err),
    });
  }
}
