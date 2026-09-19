import { Component, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuickBookingModalComponent } from './components/quick-booking-modal/quick-booking-modal.component';
import { AppointmentBooking } from './models/appointment.model';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  isTyping?: boolean;
}

const INITIAL_MESSAGE = '¡Hola! Soy el asistente virtual de **Quarter Barber** en Calle Abtao 4 (Barrio de Atocha - Pacífico). Puedo ayudarte a informarte sobre nuestros cortes actuales, propuestas alternativas, amplia gama de tintes, higiene innegociable o cómo reservar tu cita al 647 565 356. ¿En qué te puedo asesorar hoy?';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, QuickBookingModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  isBookingModalOpen = signal(false);

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

  private readonly chatApiUrl = 'https://barber-api.omega-studio.tech/api/chat/stream';
  sessionId = Math.random().toString(36).substring(2, 15);

  async sendMessage(customText?: string) {
    const text = (customText !== undefined ? customText : this.inputText).trim();
    if (!text || this.isTyping()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text, time: this.getTime() }]);
    if (customText === undefined) {
      this.inputText = '';
    }
    this.shouldScroll = true;
    this.isTyping.set(true);

    try {
      const response = await fetch(this.chatApiUrl, {
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
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Soporte para formato SSE (Server-Sent Events: data: {...})
          const cleanLine = trimmed.startsWith('data:') ? trimmed.replace(/^data:\s*/, '') : trimmed;
          if (cleanLine === '[DONE]') continue;

          console.log('[Stream chunk]:', cleanLine);

          try {
            const parsed = JSON.parse(cleanLine);

            // Formato streaming estándar de n8n AI Agent o proxies
            if (parsed.type === 'item' && typeof parsed.content === 'string') {
              botReply += parsed.content;
            } else if (typeof parsed.content === 'string') {
              botReply += parsed.content;
            } else if (typeof parsed.text === 'string') {
              botReply += parsed.text;
            } else if (typeof parsed.message === 'string') {
              botReply += parsed.message;
            } else if (typeof parsed.output === 'string') {
              botReply += parsed.output;
            } else if (typeof parsed === 'string') {
              botReply += parsed;
            }
          } catch (e) {
            // Si no es JSON y no parece un bloque JSON roto, acumular directamente (streaming de texto plano)
            if (!cleanLine.startsWith('{') && !cleanLine.startsWith('[')) {
              botReply += line + (lines.length > 1 ? '\n' : '');
            }
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
        const trimmed = buffer.trim();
        const cleanBuffer = trimmed.startsWith('data:') ? trimmed.replace(/^data:\s*/, '') : trimmed;
        if (cleanBuffer !== '[DONE]') {
          console.log('[Stream buffer final]:', cleanBuffer);
          try {
            const parsed = JSON.parse(cleanBuffer);
            if (parsed.type === 'item' && typeof parsed.content === 'string') {
              botReply += parsed.content;
            } else if (typeof parsed.content === 'string') {
              botReply += parsed.content;
            } else if (typeof parsed.text === 'string') {
              botReply += parsed.text;
            } else if (typeof parsed.message === 'string') {
              botReply += parsed.message;
            } else if (typeof parsed.output === 'string') {
              botReply += parsed.output;
            } else if (typeof parsed === 'string') {
              botReply = botReply ? botReply + parsed : parsed;
            } else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].output) {
              botReply = parsed[0].output;
            } else if (!botReply) {
              botReply = parsed.mensaje || parsed.output || parsed.text || parsed.message || parsed.response || JSON.stringify(parsed);
            }
          } catch (e) {
            // Si no es JSON y no hubo contenido previo, es texto plano
            if (!botReply) botReply = buffer;
          }
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

      // Imprimir por consola la respuesta final del asistente
      console.log('[Asistente]:', botReply);
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
    return ['Reservar Cita Rápida', 'Cortes y Tintes', 'Higiene y Seguridad', 'Dónde estáis (Abtao 4)', 'Horarios'];
  }

  sendQuick(text: string) {
    if (text.includes('Reservar')) {
      this.openBookingModal();
      return;
    }
    this.inputText = text;
    this.sendMessage();
  }

  openBookingModal() {
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal() {
    this.isBookingModalOpen.set(false);
  }

  onBookingConfirmed(booking: AppointmentBooking) {
    this.closeBookingModal();

    let formattedDate = booking.date;
    if (booking.date) {
      const [year, month, day] = booking.date.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const localized = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      formattedDate = localized.charAt(0).toUpperCase() + localized.slice(1);
    }

    const peopleText = booking.peopleCount === 1 ? '1 persona' : `${booking.peopleCount} personas`;
    const hasMultipleServices = !!(booking.services && booking.services.length > 1);
    const servicesLabel = hasMultipleServices ? 'Servicios' : 'Servicio';
    const serviceInfo = hasMultipleServices
      ? booking.services!.map(s => `${s.name} (${s.price}€)`).join(' + ') + ` (Total: ${booking.servicePrice}€)`
      : (booking.servicePrice ? `${booking.serviceName} (${booking.servicePrice}€)` : booking.serviceName);

    const barberInfo = booking.barberName && booking.barberName !== 'Cualquier barbero disponible'
      ? booking.barberName
      : 'Cualquier barbero disponible';

    const userPrompt =
`Hola, me gustaría reservar una cita en la barbería con los siguientes datos:

• Nombre: ${booking.name}
• Teléfono de contacto: ${booking.phone}
• Cantidad de personas: ${peopleText}
• ${servicesLabel}: ${serviceInfo}
• Barbero preferido: ${barberInfo}
• Fecha y hora: ${formattedDate} a las ${booking.time}h${booking.notes ? `\n• Comentarios adicionales: ${booking.notes}` : ''}

¿Podrías registrar mi cita y confirmarme la disponibilidad, por favor? ¡Muchas gracias!`;

    // Envía el mensaje con la IA como si lo hubiera escrito el usuario
    this.sendMessage(userPrompt);
  }
}

