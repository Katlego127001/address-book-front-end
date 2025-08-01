import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:5008/api/contacts';

  constructor(private http: HttpClient) {}

  getContact(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  getContactsCount() {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  downloadCv(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/cv`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      })
    }).pipe(
      catchError(error => {
        console.error('CV Download Error:', error);
        let errorMsg = 'Failed to download CV';
        if (error.error instanceof Blob) {
          return throwError(() => new Error(errorMsg));
        }
        return throwError(() => error);
      })
    );
  }

//   downloadCv(id: number): Observable<Blob> {
//     return this.http.get(`${this.apiUrl}/${id}/cv`, {
//       responseType: 'blob'
//     });
//   }

// downloadCv(id: number): Observable<Blob> {
//     return this.http.get(`${this.apiUrl}/${id}/cv`, {
//       responseType: 'blob',
//       headers: new HttpHeaders({
//         'Accept': 'application/pdf'
//       })
//     }).pipe(
//       catchError(error => {
//         console.error('CV download failed:', error);
//         return throwError(() => new Error('Failed to download CV. Please try again.'));
//       })
//     );
//   }

}