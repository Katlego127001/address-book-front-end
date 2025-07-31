import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contact.model';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactNavigationComponent } from './components/contact-navigation/contact-navigation.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactCardComponent, ContactNavigationComponent, MatProgressBarModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  currentContact: Contact | null = null;
  currentId = 1;
  maxId = 1;
  isLoading = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContact(this.currentId);
    this.loadContactsCount();
  }

  loadContact(id: number) {
    this.isLoading = true;
    this.contactService.getContact(id).subscribe({
      next: (contact) => {
        this.currentContact = contact;
        this.currentId = id;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadContactsCount() {
    this.contactService.getContactsCount().subscribe(count => {
      this.maxId = count;
    });
  }

  onNavigate(id: number) {
    this.loadContact(id);
  }
}