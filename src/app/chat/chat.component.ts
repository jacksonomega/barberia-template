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

const BOT_RESPONSES: Record<string, string> = {
  default: 'Hola 👋 Soy el asistente virtual de **Barbería El Clásico**. Puedo ayudarte a reservar una cita, informarte sobre nuestros servicios, precios y horarios. ¿En qué te puedo ayudar?',
  reserva: '¡Perfecto! Para reservar tu cita necesito algunos datos:\n\n1️⃣ **¿Qué servicio deseas?** (Corte, Corte + Barba, Afeitado, Fade, VIP…)\n2️⃣ **¿Con qué barbero?** (Carlos, Miguel o Roberto)\n3️⃣ **¿Qué día y hora prefieres?**\n\nEscríbeme y te confirmo la disponibilidad 🗓️',
  precio: 'Aquí tienes nuestra **lista de precios** 💈:\n\n• Corte Clásico — **18€**\n• Corte + Barba — **28€** ⭐\n• Afeitado Real — **22€**\n• Fade Premium — **25€**\n• Diseño de Barba — **15€**\n• Color & Mechas — **45€**\n• Tratamiento Capilar — **20€**\n• Servicio VIP — **55€**\n\n¿Quieres reservar alguno? 😊',
  horario: '⏰ Nuestros **horarios** son:\n\n• **Lunes a Viernes:** 9:00 – 20:00\n• **Sábado:** 9:00 – 18:00\n• **Domingo:** Cerrado\n\nTe recomendamos reservar con antelación para asegurarte tu hueco preferido.',
  ubicacion: '📍 Estamos en **Calle Gran Vía 42, Planta Baja, 28013 Madrid**.\n\nNos puedes encontrar fácilmente en el corazón de Madrid, a 2 minutos de la estación de metro Gran Vía (Líneas 1 y 5).',
  equipo: '👨‍✂️ Nuestro **equipo de expertos**:\n\n• **Carlos Mendoza** — Maestro Barbero (15 años). Especialista en Fade y Clásico.\n• **Miguel Torres** — Barbero Senior (8 años). Especialista en Color y Diseño.\n• **Roberto Silva** — Especialista en Afeitado (12 años). Maestro de la navaja.\n\n¿Con quién quieres reservar?',
  gracias: '¡De nada! Ha sido un placer atenderte 😊 Si necesitas algo más o quieres modificar tu cita, aquí estaré. ¡Nos vemos en la barbería! 💈',
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/reserv|cit|agendar|book/.test(lower)) return BOT_RESPONSES['reserva'];
  if (/precio|cost|cuesta|cobr|tarifa/.test(lower)) return BOT_RESPONSES['precio'];
  if (/horario|hora|abre|cierra|cuando/.test(lower)) return BOT_RESPONSES['horario'];
  if (/d[oó]nde|ubicaci[oó]n|direcci[oó]n|mapa|llegar/.test(lower)) return BOT_RESPONSES['ubicacion'];
  if (/equipo|barbero|quien|carlos|miguel|roberto/.test(lower)) return BOT_RESPONSES['equipo'];
  if (/gracias|thank|perfecto|genial|ok|excelente/.test(lower)) return BOT_RESPONSES['gracias'];
  return 'Entiendo tu consulta. Para darte la mejor respuesta, ¿podrías indicarme si quieres **reservar una cita**, conocer nuestros **precios**, **horarios** o **ubicación**? Estoy aquí para ayudarte 💈';
}

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
      text: BOT_RESPONSES['default'],
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

  sendMessage() {
    const text = this.inputText.trim();
    if (!text || this.isTyping()) return;

    this.messages.update(msgs => [...msgs, { role: 'user', text, time: this.getTime() }]);
    this.inputText = '';
    this.shouldScroll = true;
    this.isTyping.set(true);

    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const response = getBotResponse(text);
      this.messages.update(msgs => [...msgs, { role: 'assistant', text: response, time: this.getTime() }]);
      this.isTyping.set(false);
      this.shouldScroll = true;
    }, delay);
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
    } catch {}
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
