import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' }, // Redirigir a 'CreacionPerfil'
  { path: 'Login', component: LoginComponent },
  { path: 'CreacionPerfil', component: CrearPerfilComponent },
  { path: 'Chat', component: ChatbotComponent }
];
