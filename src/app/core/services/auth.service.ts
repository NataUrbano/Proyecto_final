import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../enviroment/enviroment';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: 'USER' | 'ADMIN';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly APIURL = `${environment.apiurl}`
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<AuthResponse>(`${this.APIURL}/auth/login`, credentials)
      .pipe(
        map(response => {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
          return response.user;
        }),
        catchError(error => {
          if (error.status === 401) {
            return throwError(() => new Error('Invalid credentials'));
          }
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'ADMIN';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}