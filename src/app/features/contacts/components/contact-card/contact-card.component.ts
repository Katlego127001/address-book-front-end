import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../../../core/models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../../../core/services/contact.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { lastValueFrom } from 'rxjs';

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

  async downloadCv() {
    if (!this.contact || this.isDownloading) return;
  
    this.isDownloading = true;
    const snackbarRef = this.snackBar.open('Preparing CV download...');
  
    try {
      const pdfBlob = await lastValueFrom(
        this.contactService.downloadCv(this.contact.id)
      );
  
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.contact.firstName}_${this.contact.surname}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
  
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
        snackbarRef.dismiss();
        this.snackBar.open('CV downloaded successfully!', 'Close', { duration: 3000 });
      }, 100);
    } catch (error) {
      this.isDownloading = false;
      snackbarRef.dismiss();
      this.snackBar.open(
        error instanceof Error ? error.message : 'Failed to download CV',
        'Close', 
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      console.error('CV Download Error:', error);
    }
  }

  

}