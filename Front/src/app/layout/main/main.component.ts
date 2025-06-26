import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [TopBarComponent, SideBarComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
