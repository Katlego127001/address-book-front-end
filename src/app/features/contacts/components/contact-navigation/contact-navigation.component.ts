import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-navigation',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-navigation.component.html',
  styleUrls: ['./contact-navigation.component.scss']
})
export class ContactNavigationComponent {
  @Input() currentId = 1;
  @Input() maxId = 1;
  @Output() navigate = new EventEmitter<number>();

  onNavigate(direction: 'first' | 'previous' | 'next' | 'last') {
    let newId = this.currentId;
    
    switch (direction) {
      case 'first': newId = 1; break;
      case 'previous': newId = Math.max(1, this.currentId - 1); break;
      case 'next': newId = Math.min(this.maxId, this.currentId + 1); break;
      case 'last': newId = this.maxId; break;
    }
    
    if (newId !== this.currentId) {
      this.navigate.emit(newId);
    }
  }
}