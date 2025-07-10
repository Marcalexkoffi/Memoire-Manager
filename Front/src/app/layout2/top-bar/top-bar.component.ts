import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-top-barr',
  imports: [RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarrComponent {
  constructor(private authService: AuthenticationService) {}

  deconnexion(): void {
    this.authService.logout();
  }
}
