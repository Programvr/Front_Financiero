import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginResponse: string = '';

  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe((response) => {
      console.log(response.message); // Muestra la respuesta del servidor
    },
    (error) => {
        console.error('Error al iniciar sesión:', error);
    }
    );
  }
}
