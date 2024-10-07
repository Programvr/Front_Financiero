import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://192.168.0.4:8082/Back_Finan/api';

  constructor(private http: HttpClient) {}

  crearPerfil(nombre: string): Observable<any> {
    return this.http.post(this.apiUrl+"/perfiles/crearPerfil", { nombre });
  }

  getPerfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/perfiles/obtenerPerfiles");
  }

  getModulosxPerfil(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+`/modulos/modulosxperfil/${id}`);
  } 
  
  getModulosFaltantes(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+`/modulos/modulosFaltantes/${id}`);
  } 

  eliminarPerfil(id: number): Observable<string> {
    return this.http.delete(this.apiUrl+`/perfiles/${id}`,{responseType: 'text'});
  }

  // Agrega esto en tu PerfilService
  actualizarModulosPorPerfil(id: number, modulos: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/modulos/actualizar/${id}`, modulos);
  }

}
