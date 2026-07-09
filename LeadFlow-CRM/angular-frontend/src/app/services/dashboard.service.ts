import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardData {
  totalLeads: number;
  newLeads: number;
  interestedLeads: number;
  closedWon: number;
  closedLost: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Spring Boot Backend URL
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  // Main method
  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl);
  }

  // Compatibility alias
  getDashboardData(): Observable<DashboardData> {
    return this.getDashboard();
  }

}