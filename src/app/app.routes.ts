import { Routes } from '@angular/router';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', redirectTo: 'CreacionPerfil', pathMatch: 'full' }, // Redirigir a 'CreacionPerfil'
  { path: 'CreacionPerfil', component: CrearPerfilComponent },
  { path: 'Chat', component: ChatbotComponent }
];
