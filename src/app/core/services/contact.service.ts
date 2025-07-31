import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/contact.model';

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
}