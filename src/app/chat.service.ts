import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Asegúrate de importar map

interface BotResponse {
  userMessage: string;
  botResponse: string;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private apiUrl = 'http://192.168.0.4:8082/Back_Finan/api'; // URL de tu API de Flask

  constructor(private http: HttpClient) {}

  getBotResponse(userMessageBack: string): Observable<BotResponse> {
    return this.http.post<BotResponse>(this.apiUrl+'/chatbot/message', { userMessage: userMessageBack });
  }
  
}
