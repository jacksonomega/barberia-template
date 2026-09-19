import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
  requiresConfirmation?: boolean;
  confirmationHandled?: boolean;
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

  // Detecta si el último mensaje del asistente requiere confirmación y aún no fue respondido
  readonly pendingConfirmationMessage = computed(() => {
    const msgs = this.messages();
    if (msgs.length === 0) return null;
    const lastMsg = msgs[msgs.length - 1];
    if (lastMsg.role === 'assistant' && lastMsg.requiresConfirmation && !lastMsg.confirmationHandled) {
      return lastMsg;
    }
    return null;
  });

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

    // Marcar cualquier confirmación previa pendiente como gestionada
    this.messages.update(msgs =>
      msgs.map(m => (m.requiresConfirmation && !m.confirmationHandled ? { ...m, confirmationHandled: true } : m))
    );

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

      const textData = await response.text();
      let botReply = '';
      let requiresConfirmation = false;

      try {
        const parsed = JSON.parse(textData);
        // Soporta array [ { "output": { "mensaje": "...", "requiere_confirmacion": boolean } } ]
        // u objeto directo { "output": { "mensaje": "...", "requiere_confirmacion": boolean } }
        const item = Array.isArray(parsed) ? parsed[0] : parsed;

        if (item && typeof item === 'object') {
          const output = (typeof item.output === 'object' && item.output !== null) ? item.output : item;
          botReply = typeof item.output === 'string'
            ? item.output
            : (output.mensaje || output.message || output.text || output.output || '');
          requiresConfirmation = !!(output.requiere_confirmacion ?? output.requiereConfirmacion ?? item.requiere_confirmacion);
        } else if (typeof item === 'string') {
          botReply = item;
        }
      } catch (e) {
        botReply = textData;
      }

      if (!botReply) {
        botReply = 'Lo siento, no pude procesar la respuesta. Por favor intenta de nuevo.';
      }

      this.messages.update(msgs => [
        ...msgs,
        {
          role: 'assistant',
          text: botReply,
          time: this.getTime(),
          requiresConfirmation,
          confirmationHandled: false,
        }
      ]);

      console.log('[Asistente]:', botReply, '| Requiere confirmación:', requiresConfirmation);
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

  handleConfirmation(msg: Message, action: 'Aceptar' | 'Rechazar') {
    if (this.isTyping()) return;
    msg.confirmationHandled = true;
    this.messages.update(msgs => [...msgs]);
    this.sendMessage(action);
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

