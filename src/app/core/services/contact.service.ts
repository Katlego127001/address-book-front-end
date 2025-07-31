import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

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
      responseType: 'blob'
    });
  }

}