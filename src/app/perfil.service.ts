import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://192.168.0.4:8080/Back_Finan/api/perfiles';

  constructor(private http: HttpClient) {}

  crearPerfil(nombre: string): Observable<any> {
    return this.http.post(this.apiUrl+"/crearPerfil", { nombre });
  }

  getPerfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/obtenerPerfiles");
  }

  editarPerfil(id: number, nombre: string): Observable<any> {
    return this.http.put(`http://192.168.0.4:8080/Back_Finan/api/perfiles/${id}`, { nombre });
  }  

  eliminarPerfil(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`,{responseType: 'text'});
  }
}
