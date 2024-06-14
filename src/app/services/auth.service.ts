import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    console.log('Sending registration request:', user); // Debugging-Ausgabe
    return this.http.post(`${this.baseUrl}/signup/`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
