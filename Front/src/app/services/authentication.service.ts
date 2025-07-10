import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") !== null;
  }

  redirect(): void {
    const auth = JSON.parse(localStorage.getItem("user")!)?.role;

    if (auth === "Etudiant")
      this.router.navigate(['/workbench/student-dashboard']);
    else if (auth === "Professeur")
      this.router.navigate(['/teacher/professor-dashboard']);
  }

  getMemoires(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-memoires`);
  }

  submit(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(`${this.baseUrl}/theme/submit`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
