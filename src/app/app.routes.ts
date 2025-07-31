import { Routes } from '@angular/router';
export const routes: Routes = [
    { 
      path: 'contacts',
      loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent)
    },
    { path: '', redirectTo: 'contacts', pathMatch: 'full' }, 
    { path: '**', redirectTo: 'contacts' } 
  ];