import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProposalPayload {
  domaine: string;
  themeTitle: string;
  problematic: string;
  generalObjective: string;
  specificObjectives: string;
  expectedResults: string;
  status?: 'pending' | 'validated' | 'rejected';
  comment?: string;
  studentId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllProposals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proposals`);
  }

  validateProposal(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/proposals/${id}/validate`, {});
  }

  rejectProposal(id: string, comment: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/proposals/${id}/reject`, { comment });
  }
}
