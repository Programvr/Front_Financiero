import { Routes } from '@angular/router';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: '/CreacionPerfil', pathMatch: 'full' },
  { path: 'CreacionPerfil', component: CrearPerfilComponent }
];
