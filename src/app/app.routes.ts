import { Routes } from '@angular/router';
export const routes: Routes = [
    { 
      path: 'contacts',
      loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent)
    },
    { path: '', redirectTo: 'contacts', pathMatch: 'full' }, // Add this line
    { path: '**', redirectTo: 'contacts' } // Optional catch-all
  ];