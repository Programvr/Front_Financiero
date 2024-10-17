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
  modulos: any[] = [];
  modulosDisponibles: any[] = [];
  searchTerm: string = '';
  mensaje: string = '';
  tipoMensaje: 'success' | 'error' = 'success';
  mostrarPopup: boolean = false;
  perfilEdicion: any = null;
  perfil: string = '';
  mostrarPopupEdicion = false;
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
    if (!this.nombre || this.nombre.trim() === '' ||  this.nombre.includes(' ')) {
      this.mensaje = 'El nombre del perfil no puede estar vacío o contener solo espacios';
      this.tipoMensaje = 'error';
      this.mostrarPopup = true;
    } else{
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

  

  editarPerfil(perfilEdicion: any) {
    console.log('Editando perfil:', perfilEdicion);
    this.perfil = perfilEdicion.nombre;
    this.perfilEdicion = perfilEdicion; // Guarda el perfil a editar
    this.mostrarPopupEdicion = true; // Abre el popup de edición
    console.log('Mostrar Popup Edición:', this.mostrarPopupEdicion);
  
    // Obtiene los módulos asignados
    this.perfilService.getModulosxPerfil(perfilEdicion.id_perfil).subscribe({
      next: (data) => {
        this.modulos = data;
        console.log('Módulos asignados:', this.modulos);
      },
      error: (error) => {
        console.error('Error al obtener módulos por perfil', error);
      }
    });
  
    // Obtiene los módulos disponibles
    this.perfilService.getModulosFaltantes(perfilEdicion.id_perfil).subscribe({
      next: (data) => {
        this.modulosDisponibles = data;
        console.log('Módulos disponibles:', this.modulosDisponibles);
      },
      error: (error) => {
        console.error('Error al obtener módulos faltantes', error);
      }
    });
  }

  toggleLecturaEscritura(modulo: any, tipo: 'lectura' | 'escritura'): void {
    if (tipo === 'lectura') {
        // Si se activa lectura
        modulo.lectura = !modulo.lectura;
        modulo.escritura = !modulo.escritura;  // Cambia el estado de lectura
        if (modulo.lectura) {
            modulo.escritura = false; // Desactiva escritura si lectura se activa
        }
    } else {
        // Si se activa escritura
        modulo.escritura = !modulo.escritura; // Cambia el estado de escritura
        if (modulo.escritura) {
            modulo.lectura = false; // Desactiva lectura si escritura se activa
        }
    }

    // Asegúrate de que al menos uno esté seleccionado
    if (!modulo.lectura && !modulo.escritura) {
        modulo.lectura = true; // Activa lectura si ambos están desmarcados
    }

}





  quitarModulo(modulo: any): void {
    // Encuentra el índice del módulo en la lista de módulos asignados
    const index = this.modulos.findIndex(m => m.id_modulo === modulo.id_modulo);
    
    if (index > -1) {
      // Elimina el módulo de modulos
      this.modulos.splice(index, 1);
      
      // Agrega el módulo de nuevo a modulosDisponibles
      this.modulosDisponibles.push({
        id_modulo: modulo.id_modulo,
        nombre_modulo: modulo.nombreModulo
      });
    }
  }
  


  agregarModulo(moduloDisponible: any, event: MouseEvent): void {
    event.preventDefault(); // Previene el comportamiento predeterminado del botón
    event.stopPropagation(); // Detiene la propagación del evento

    // Verifica que el módulo no esté ya en la lista de módulos asignados
    const existe = this.modulos.some(modulo => modulo.id_modulo === moduloDisponible.id_modulo);

    if (!existe) {
        // Agrega el módulo disponible a la lista de módulos asignados
        this.modulos.push({
            id_modulo: moduloDisponible.id_modulo,
            nombreModulo: moduloDisponible.nombre_modulo,
            lectura: true, // Inicializa lectura como true
            escritura: false // Inicializa escritura como false
        });

        // Encuentra el índice del módulo en modulosDisponibles
        const index = this.modulosDisponibles.findIndex(modulo => modulo.id_modulo === moduloDisponible.id_modulo);

        if (index > -1) {
            // Elimina el módulo de modulosDisponibles
            this.modulosDisponibles.splice(index, 1);
        }
    }
}

  

  resetForm(): void {
    this.nombre = '';
    this.perfilEdicion = null; // Resetear la edición
  }
  cerrarPopupEdicion() {
    this.mostrarPopupEdicion = false;
  }

  actualizarPerfil() {
    const nuevosModulos = this.modulos.map(modulo => ({
      id_modulo: modulo.id_modulo,
      rol: modulo.lectura && modulo.escritura ? 'lectura-escritura' : 
           modulo.lectura ? 'L' : 'E'
    }));
  
    this.perfilService.actualizarModulosPorPerfil(this.perfilEdicion.id_perfil, nuevosModulos)
      .subscribe(
        response => {
          // Cierra el popup de edición
          this.mostrarPopupEdicion = false;
  
          // Muestra el mensaje devuelto por el API
          this.mensaje = response.respuesta;  // Asumiendo que el API devuelve el mensaje como string
          this.tipoMensaje = 'success';
          this.mostrarPopup = true; // Abre el popup de mensaje
        },
        error => {
          this.mostrarPopupEdicion = false;
          // En caso de error, muestra un mensaje genérico
          this.mensaje = 'Error al editar el perfil';
          this.tipoMensaje = 'error'; // Cambié esto a 'danger' para indicar un error
          this.mostrarPopup = true; // Abre el popup de mensaje
        }
      );
  }

  get filteredPerfiles() {
    return this.perfiles.filter(perfil =>
      perfil.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
