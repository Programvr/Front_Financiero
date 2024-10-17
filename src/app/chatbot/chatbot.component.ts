import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

interface Message {
  user: string;
  bot: string;
}

interface BotResponse {
  userMessage: string;
  botResponse: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  userMessageBack: string = ''; // Mensaje del usuario
  respuestaBot: string = '';
  messages: Message[] = []; // Almacenamiento de mensajes

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.userMessageBack = this.userMessage;
      this.addUserMessage(this.userMessage);
      this.getBotResponse(this.userMessageBack);
    }
  }

  private addUserMessage(message: string): void {
    this.messages.push({ user: message, bot: 'Cargando...' }); // Agregar mensaje del usuario
    this.userMessage = ''; // Limpiar el campo de entrada
  }

  private getBotResponse(userMessageBack: string): void {
    this.chatService.getBotResponse(userMessageBack).subscribe({
      next: (data: BotResponse ) => {
        this.updateBotMessage(data.botResponse);
      },
      error: (error) => {
        console.error('Error al obtener respuesta del bot:', error);
        this.updateBotMessage('Lo siento, ocurrió un error al procesar tu solicitud.');
      }
    });
  }

  private updateBotMessage(response: string): void {
    const lastMessageIndex = this.messages.length - 1;
    console.log(this.messages.length - 1);
    if (lastMessageIndex >= 0) {
      this.messages[lastMessageIndex].bot = response; // Actualizar respuesta del bot
    }
  }
}
