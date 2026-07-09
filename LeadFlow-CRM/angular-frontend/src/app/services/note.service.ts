import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  // Change this if your backend mapping is different
  private apiUrl = 'http://localhost:8080/note';

  constructor(private http: HttpClient) { }

  // ===========================
  // Get All Notes
  // ===========================

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ===========================
  // Get Note By Id
  // ===========================

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ===========================
  // Save Note
  // ===========================

  save(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);
  }

  // ===========================
  // Update Note
  // ===========================

  update(id: number, note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, note);
  }

  // ===========================
  // Delete Note
  // ===========================

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}