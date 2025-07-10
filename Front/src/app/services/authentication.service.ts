import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }
  submit(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/workbench/student-submit`,
      data
    );
  }
}
