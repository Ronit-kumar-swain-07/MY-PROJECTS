import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerLeadService {

  private apiUrl = 'http://localhost:8080/customer-leads';

  constructor(private http: HttpClient) { }

  // ===============================
  // Get All Leads
  // ===============================

  getAllLeads(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

  // ===============================
  // Get Lead By Id
  // ===============================

  getLeadById(id: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/${id}`);

  }

  // ===============================
  // Save Lead
  // ===============================

  saveLead(lead: any): Observable<any> {

    return this.http.post(this.apiUrl, lead);

  }

  // ===============================
  // Update Lead
  // ===============================

  updateLead(id: number, lead: any): Observable<any> {

    return this.http.put(`${this.apiUrl}/${id}`, lead);

  }

  // ===============================
  // Delete Lead
  // ===============================

  deleteLead(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${id}`);

  }

  // ===============================
  // Search By Customer Name
  // ===============================

  searchByName(name: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/search/${name}`);

  }

  // ===============================
  // Search By Mobile
  // ===============================

  searchByMobile(mobile: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/mobile/${mobile}`);

  }

  // ===============================
  // Filter By Status
  // ===============================

  filterByStatus(status: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/status/${status}`);

  }

}