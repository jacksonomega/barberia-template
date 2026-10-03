import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuickBookingModalComponent } from './components/quick-booking-modal/quick-booking-modal.component';
import { AppointmentBooking } from './models/appointment.model';
import { BusinessDataService } from '../services/business-data.service';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  isTyping?: boolean;
  requiresConfirmation?: boolean;
  confirmationHandled?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, QuickBookingModalComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  readonly businessService = inject(BusinessDataService);
  readonly b = this.businessService.business;

  isBookingModalOpen = signal(false);

  messages = signal<Message[]>([]);

  inputText = '';
  isTyping = signal(false);

  constructor() {
    this.messages.set([
      {
        role: 'assistant',
        text: this.b().chatInitialMessage,
        time: this.getTime(),
      },
    ]);
  }

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
      if (this.businessService.isMock()) {
        // En modo mock simulamos respuesta local contextual para no depender del backend
        await new Promise(resolve => setTimeout(resolve, 600));
        const mockResult = this.getMockBotReply(text);

        this.messages.update(msgs => [
          ...msgs,
          {
            role: 'assistant',
            text: mockResult.text,
            time: this.getTime(),
            requiresConfirmation: mockResult.requiresConfirmation,
            confirmationHandled: false,
          }
        ]);
        return;
      }

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

  private getMockBotReply(input: string): { text: string; requiresConfirmation?: boolean } {
    const lower = input.toLowerCase();
    const biz = this.b();

    if (
      lower.includes('con los siguientes datos') ||
      lower.includes('registrar mi cita') ||
      (lower.includes('fecha y hora') && lower.includes('teléfono'))
    ) {
      return {
        text: `¡Perfecto! Hemos recibido y registrado los datos de tu reserva en **${biz.fullName}**:\n\n` +
              `• **Cita registrada y confirmada** en nuestro calendario.\n` +
              `• Tu estilista y puesto estarán preparados a la hora indicada.\n\n` +
              `Te esperamos puntualmente. Si necesitas hacer cualquier modificación, puedes avisarnos por aquí o llamarnos al **${biz.contactPhone}**. ¡Muchas gracias!`
      };
    }

    if (lower.includes('hola') || lower.includes('buenas') || lower.includes('hey')) {
      return {
        text: `¡Hola! Bienvenido a **${biz.fullName}**. ¿En qué podemos asesorarte hoy? Puedes consultar nuestros cortes Signature, tarifas, o reservar tu cita directamente.`
      };
    }

    if (lower.includes('cita') || lower.includes('reservar') || lower.includes('turno') || lower.includes('agendar')) {
      return {
        text: `¡Estupendo! Puedes pulsar en el botón **"Reservar Cita"** para abrir el formulario y elegir tu servicio y estilista preferido en **${biz.brandName}**.`
      };
    }

    if (lower.includes('precio') || lower.includes('cuanto') || lower.includes('cuánto') || lower.includes('tarifa') || lower.includes('costo')) {
      return {
        text: `En **${biz.fullName}** nuestras tarifas son transparentes:\n• **Corte Signature & Fade**: 18€\n• **Pack Corte + Barba**: 26€\n• **Colorimetría & Matices**: 40€\n• **Afeitado Tradicional**: 16€\n¿Deseas que te reservemos turno para alguno de ellos?`
      };
    }

    if (lower.includes('dónde') || lower.includes('donde') || lower.includes('ubicacion') || lower.includes('ubicación') || lower.includes('direccion') || lower.includes('dirección')) {
      const cleanAddress = biz.contactAddressHtml.replace(/<br>/g, ', ');
      return {
        text: `Nos encontramos en **${cleanAddress}**. También puedes llamarnos o escribirnos al **${biz.contactPhone}**.`
      };
    }

    if (lower.includes('horario') || lower.includes('hora') || lower.includes('abierto')) {
      const cleanSchedule = biz.contactScheduleHtml.replace(/<br>/g, '. ');
      return {
        text: `Nuestro horario en **${biz.fullName}** es: **${cleanSchedule}**.`
      };
    }

    if (lower.includes('higiene') || lower.includes('seguridad') || lower.includes('desinfe')) {
      return {
        text: `En **${biz.fullName}** la higiene es absoluta: lamas monouso esterilizadas para cada cliente, desinfección por ultrasonido y toallas higienizadas al vapor.`
      };
    }

    if (lower.includes('gracias') || lower.includes('perfecto') || lower.includes('genial')) {
      return {
        text: `¡Un placer ayudarte! Te esperamos pronto en **${biz.fullName}**.`
      };
    }

    return {
      text: `Entendido. En **${biz.fullName}** estamos a tu disposición. Puedes consultarnos por nuestros servicios, horarios o agendar tu cita pulsando en **"Reservar Cita"**.`
    };
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
    return this.b().chatQuickReplies;
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

