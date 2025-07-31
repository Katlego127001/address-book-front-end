import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../../../core/models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../../../core/services/contact.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,MatProgressSpinnerModule],
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Input() contact: Contact | null = null;

  isDownloading = false;

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  downloadCv(): void {
    if (!this.contact || this.isDownloading) return;

    this.isDownloading = true;
    this.contactService.downloadCv(this.contact.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.contact?.firstName}_${this.contact?.surname}_CV.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      },
      error: () => {
        this.isDownloading = false;
        this.snackBar.open('Failed to download CV', 'Close', { duration: 3000 });
      }
    });
  }

}