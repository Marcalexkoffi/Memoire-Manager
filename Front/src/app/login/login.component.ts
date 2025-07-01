import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private newRouter: Router) {}

  redirection() {
    this.newRouter.navigate(['/workbench/student-dashboard']);
  }
}
