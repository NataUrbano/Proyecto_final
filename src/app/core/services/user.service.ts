// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl + '/books';

  constructor(private http: HttpClient) {}

  getFeaturedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/featured`);
  }

  getBookAvailability(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookId}/availability`);
  }

  reserveBook(bookId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${bookId}/reserve`, {});
  }
}