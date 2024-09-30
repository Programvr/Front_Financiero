import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-crear-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.css'],
  providers: [PerfilService]
})
export class CrearPerfilComponent implements OnInit {
  nombre: string = '';
  perfiles: any[] = [];
  searchTerm: string = '';
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';
  mostrarPopup: boolean = false;
  perfilEdicion: any = null;
  mostrarPopupConfirmacion: boolean = false; // Nueva variable para el popup de confirmación
  idPerfilAEliminar: number | null = null; // ID del perfil a eliminar

  constructor(private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.obtenerPerfiles();
  }

  obtenerPerfiles(): void {
    this.perfilService.getPerfiles().subscribe({
      next: (data) => {
        this.perfiles = data;
      },
      error: (error) => {
        console.error('Error al obtener perfiles', error);
      }
    });
  }

  crearPerfil(): void {
    if (this.perfilEdicion) {
      this.perfilService.editarPerfil(this.perfilEdicion.id_perfil, this.nombre).subscribe({
        next: (response) => {
          this.mensaje = 'Se editó correctamente el perfil';
          this.tipoMensaje = 'success';
          this.mostrarPopup = true;
          this.obtenerPerfiles();
          this.resetForm();
        },
        error: (error) => {
          this.mensaje = 'Error: No se pudo editar el perfil';
          this.tipoMensaje = 'error';
          this.mostrarPopup = true;
        }
      });
    } else {
      this.perfilService.crearPerfil(this.nombre).subscribe({
        next: (response) => {
          this.mensaje = 'Se creó correctamente el perfil';
          this.tipoMensaje = 'success';
          this.mostrarPopup = true;
          this.obtenerPerfiles();
          this.resetForm();
        },
        error: (error) => {
          this.mensaje = 'Error: Perfil inválido o ya existente';
          this.tipoMensaje = 'error';
          this.mostrarPopup = true;
        }
      });
    }
  }

  cerrarPopup(): void {
    this.mostrarPopup = false;
  }

  // Método para eliminar el perfil y mostrar el popup de confirmación
  eliminarPerfil(id: number): void {
    this.idPerfilAEliminar = id; // Guarda el ID del perfil a eliminar
    this.mostrarPopupConfirmacion = true; // Muestra el popup de confirmación
  }

  // Método para confirmar la eliminación
  confirmarEliminacion(): void {
    if (this.idPerfilAEliminar !== null) {
      this.perfilService.eliminarPerfil(this.idPerfilAEliminar).subscribe({
        next: (response) => {
          alert(response); // Muestra la respuesta del servidor
          this.obtenerPerfiles(); // Actualiza la lista de perfiles
        },
        error: (error) => {
          console.error('Error al eliminar perfil', error);
        }
      });
    }
    this.cerrarPopupConfirmacion(); // Cierra el popup
  }

  // Método para cerrar el popup de confirmación
  cerrarPopupConfirmacion(): void {
    this.mostrarPopupConfirmacion = false; // Cierra el popup
    this.idPerfilAEliminar = null; // Resetea el ID del perfil
  }

  editarPerfil(perfil: any): void {
    this.perfilEdicion = perfil;
    this.nombre = perfil.nombre; // Cargar el nombre en el campo de entrada
  }

  resetForm(): void {
    this.nombre = '';
    this.perfilEdicion = null; // Resetear la edición
  }

  get filteredPerfiles() {
    return this.perfiles.filter(perfil =>
      perfil.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
