import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propositions',
  imports: [
    CommonModule,
  ],
  templateUrl: './propositions.component.html',
  styleUrl: './propositions.component.scss',
})
export class PropositionsComponent implements OnInit{
  memoires: Array<any> = []
  constructor(private authService: AuthenticationService) {
    
  }

  ngOnInit(): void {
    this.authService.getMemoires().subscribe({
      next: (memoires) => this.memoires = memoires,
      error: (error) => console.error(),
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const formattedDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear();

    return formattedDate;
  }
}
