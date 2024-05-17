import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl = 'http://localhost:8000/api/contacts/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, contact);
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${contact.id}/`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${id}/`);
  }
}
