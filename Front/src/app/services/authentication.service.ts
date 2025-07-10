import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:8000/api';
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }

  submit(data: any): Observable<any> {
    const token = this.localStorage.getItem('token');
    this.httpHeaders.set('authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/theme/submit`, data, {
      headers: this.httpHeaders,
    });
  }
}
