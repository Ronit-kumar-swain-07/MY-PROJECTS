import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService {

  private apiUrl = 'http://localhost:8080/followup';

  constructor(private http: HttpClient) { }

  // Get all follow ups
  getAllFollowUps(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get follow ups by customer id
  getByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  // Save follow up
  saveFollowUp(followUp: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, followUp);
  }

  // Update follow up
  updateFollowUp(id: number, followUp: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, followUp);
  }

  // Delete follow up
  deleteFollowUp(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}