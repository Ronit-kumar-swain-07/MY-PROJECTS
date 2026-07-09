import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadTypeService {

  private apiUrl = 'http://localhost:8080/lead-types';

  constructor(private http: HttpClient) { }

  // ==========================
  // GET ALL
  // ==========================

  getAllLeadTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Alias
  getAll(): Observable<any[]> {
    return this.getAllLeadTypes();
  }

  // ==========================
  // GET BY ID
  // ==========================

  getLeadTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<any> {
    return this.getLeadTypeById(id);
  }

  // ==========================
  // SAVE
  // ==========================

  saveLeadType(type: any): Observable<any> {
    return this.http.post(this.apiUrl, type);
  }

  save(type: any): Observable<any> {
    return this.saveLeadType(type);
  }

  // ==========================
  // UPDATE
  // ==========================

  updateLeadType(id: number, type: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, type);
  }

  update(id: number, type: any): Observable<any> {
    return this.updateLeadType(id, type);
  }

  // ==========================
  // DELETE
  // ==========================

  deleteLeadType(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.deleteLeadType(id);
  }

}