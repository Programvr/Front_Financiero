import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { MenuService } from '../menu.service'; // Asegúrate de importar tu servicio de menú

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
  viewLogin: boolean = true;

  constructor(private loginService: LoginService, private menuService: MenuService) {} // Inyección del servicio de menú

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        const message: number = response.message; // Asegúrate de que `message` sea de tipo number
        if (message > 0) {
          // Llamada para obtener los módulos por usuario
          this.loginService.getModulosPorUsuario(message).subscribe(
            (modulos) => {
              console.log(modulos); // Mostrar los módulos obtenidos
              this.menuService.setMenuItems(modulos); // Actualiza el menú en el servicio
            },
            (error) => {
              console.error('Error al obtener los módulos:', error);
            }
          );
          this.viewLogin = false;
        } else {
          console.error('Error en el login:', message);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
