import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  recupData: any = null;
  loginForm!: FormGroup;
  constructor(
    private newRouter: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  redirection(): void {
    if (this.loginForm.valid) {
      const recupData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      console.log('Les données soumises :', recupData);
      this.authService.login(this.recupData).subscribe({
        next: (data) => {
          console.log(data);
          this.newRouter.navigate(['/workbench/student-dashboard']);
        },

        error: (err) => console.error(err),
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
