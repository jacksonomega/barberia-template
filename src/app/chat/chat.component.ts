import { Component, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  isTyping?: boolean;
}

const INITIAL_MESSAGE = 'Hola 👋 Soy el asistente virtual de **Barbería El Clásico**. Puedo ayudarte a reservar una cita, informarte sobre nuestros servicios, precios y horarios. ¿En qué te puedo ayudar?';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  messages = signal<Message[]>([
    {
      role: 'assistant',
      text: INITIAL_MESSAGE,
      time: this.getTime(),
    },
  ]);

  inputText = '';
  isTyping = signal(false);

  private shouldScroll = false;

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  sessionId = Math.random().toString(36).substring(2, 15);

  async sendMessage() {
    const text = this.inputText.trim();
    if (!text || this.isTyping()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text, time: this.getTime() }]);
    this.inputText = '';
    this.shouldScroll = true;
    this.isTyping.set(true);

    try {
      const response = await fetch('https://n8n.omega-studio.tech/webhook/brutal-art-web/messages-upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          chatInput: text,
          message: text
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let botReply = 'No se recibió respuesta';
      if (data) {
        if (typeof data === 'string') {
          botReply = data;
        } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
          botReply = data[0].output;
        } else {
          botReply = data.mensaje || data.output || data.text || data.message || data.response || JSON.stringify(data);
        }
      }

      this.messages.update(msgs => [...msgs, { role: 'assistant', text: botReply, time: this.getTime() }]);
    } catch (error) {
      console.error('Error al contactar con el agente AI:', error);
      this.messages.update(msgs => [...msgs, {
        role: 'assistant',
        text: 'Lo siento, hay problemas de conexión con el servidor. Inténtalo de nuevo más tarde.',
        time: this.getTime()
      }]);
    } finally {
      this.isTyping.set(false);
      this.shouldScroll = true;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    try {
      this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch { }
  }

  private getTime(): string {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  get quickReplies() {
    return ['Reservar cita', 'Ver precios', 'Horarios', 'Dónde estáis', 'El equipo'];
  }

  sendQuick(text: string) {
    this.inputText = text;
    this.sendMessage();
  }
}
