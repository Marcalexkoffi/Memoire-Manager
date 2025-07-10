import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-side-barr',
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarrComponent implements OnInit {
  user_string: string  = "";
  user: any;

  constructor(private authService: AuthenticationService, private localService: LocalStorageService) {}

  ngOnInit(): void {
    this.user_string = this.localService.getItem('user') ?? "";
    this.user = JSON.parse(this.user_string);
  }

  deconnexion(): void {
    this.authService.logout();
  }
}
