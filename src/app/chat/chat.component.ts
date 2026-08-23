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
      const response = await fetch('https://n8n.omega-studio.tech/webhook/barber-chat', {
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

      this.isTyping.set(false); // Ocultar el indicador de "escribiendo" porque ya vamos a empezar a mostrar la respuesta
      this.messages.update(msgs => [...msgs, { role: 'assistant', text: '', time: this.getTime() }]);
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No se pudo iniciar el stream');
      
      const decoder = new TextDecoder('utf-8');
      let botReply = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // El último elemento podría ser una línea incompleta, lo dejamos en el buffer
        buffer = lines.pop() || ''; 
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line);
            
            // Si es formato JSONL (streaming de AI Agent)
            if (parsed.type === 'item' && typeof parsed.content === 'string') {
              botReply += parsed.content;
            } 
          } catch (e) {
            // Ignoramos errores de parseo por si hay líneas extrañas
          }
        }
        
        // Actualizamos la UI inmediatamente si hay texto nuevo
        if (botReply) {
          this.messages.update(msgs => {
             const newMsgs = [...msgs];
             newMsgs[newMsgs.length - 1].text = botReply;
             return newMsgs;
          });
          this.shouldScroll = true;
        }
      }
      
      // Procesar cualquier resto en el buffer al terminar el stream
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer);
          if (parsed.type === 'item' && typeof parsed.content === 'string') {
             botReply += parsed.content;
          } else if (!botReply && parsed) {
             // Si al final no era streaming y era un solo objeto JSON
             if (typeof parsed === 'string') botReply = parsed;
             else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].output) botReply = parsed[0].output;
             else botReply = parsed.mensaje || parsed.output || parsed.text || parsed.message || parsed.response || JSON.stringify(parsed);
          }
        } catch (e) {
          // Si no es JSON y no hubo streaming previo, es texto plano
          if (!botReply) botReply = buffer;
        }
        
        if (botReply) {
          this.messages.update(msgs => {
             const newMsgs = [...msgs];
             newMsgs[newMsgs.length - 1].text = botReply;
             return newMsgs;
          });
          this.shouldScroll = true;
        }
      }
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
