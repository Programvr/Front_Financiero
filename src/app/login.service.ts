import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://192.168.0.4:8082/api'; // URL del servicio de backend para el login

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    const id_usuario = 1;
    const user = { id_usuario,login, password };
    return this.http.post<any>(this.apiUrl+'/usuarios/login', user);
  }

  getModulosPorUsuario(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfiles/modulosPorUsuario/${userId}`);
  }
  
}
