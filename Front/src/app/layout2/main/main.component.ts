import { Component } from '@angular/core';
import { TopBarrComponent } from '../top-bar/top-bar.component';
import { SideBarrComponent } from '../side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-main',
  imports: [TopBarrComponent, SideBarrComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class Main_Component {}
