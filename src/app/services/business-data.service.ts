import { Injectable, computed, inject, effect, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CompanyService } from './company.service';
import { BarberBusinessData } from '../mock/business-data.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly titleService = inject(Title);
  private readonly companyService = inject(CompanyService);

  readonly isBrowser = isPlatformBrowser(this.platformId);

  // Señal con los datos de la empresa
  readonly company = this.companyService.company;

  readonly isMock = signal<boolean>(false).asReadonly();

  // Datos actuales del negocio calculados reactivamente
  readonly business = computed<BarberBusinessData>(() => {
    const c = this.company();
    const name = (c.name || 'HIS Barbería Urban 2').trim();
    const words = name.split(/\s+/);
    const brandName = words[0] || 'HIS';
    const brandAccent = words.slice(1).join(' ') || 'Barbería Urban 2';

    const address = (c.address || 'C. de San Marcos, 1, Centro, 28004 Madrid').trim();
    const contactAddressHtml = address.includes(',')
      ? address.replace(/, /g, '<br>')
      : address;

    // Horario exacto solicitado: L: Cerrado | M->V: 9:30->14:00 y 16:30->20:30 | S: 9:00->14:00
    const contactScheduleHtml =
      '<strong>Lunes:</strong> Cerrado<br>' +
      '<strong>Martes a Viernes:</strong> 09:30 – 14:00 &nbsp;|&nbsp; 16:30 – 20:30<br>' +
      '<strong>Sábados:</strong> 09:00 – 14:00<br>' +
      '<strong>Domingos:</strong> Cerrado';

    const annualCalendar = 'Varones de cualquier edad · Martes a Sábado (Lunes y Domingos cerrado)';

    let igUrl = (c.instagram || 'www.instagram.com/hisbarberia/').trim();
    if (igUrl && !igUrl.startsWith('http://') && !igUrl.startsWith('https://')) {
      igUrl = 'https://' + igUrl;
    }

    let igHandle = (c.instagram || '').trim();
    igHandle = igHandle
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/^instagram\.com\//, '')
      .replace(/\/$/, '');
    if (igHandle && !igHandle.startsWith('@')) {
      igHandle = '@' + igHandle;
    }
    if (!igHandle) igHandle = '@hisbarberia';

    // Teléfono y WhatsApp oficial: +34 632 77 91 83
    const cleanPhone = '+34 632 77 91 83';
    const cleanPhoneNumeric = '34632779183';
    const whatsappUrl = `https://wa.me/34632779183?text=${encodeURIComponent('Hola ' + name + ', quiero reservar una cita')}`;
    const googleMapsIframeUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    const cityOrArea = address.split(',')[0] || 'Madrid Centro';

    return {
      id: 'real-quarter',
      isMock: false,
      brandName,
      brandAccent,
      fullName: name,
      heroLabel: `Barbería · Varones de cualquier edad · ${cityOrArea}`,
      tagline: 'Cortes, Barba & Estilo · Varones de cualquier edad',
      heroDescription: `Especialistas en cortes masculinos, degradados a navaja y a cero, diseño de barba y tratamientos capilares para varones de cualquier edad (niños, jóvenes y adultos). Te esperamos en ${address}.`,
      heroStats: [
        { num: 'Varones', label: 'Cualquier Edad' },
        { num: '14', label: 'Servicios de 20–30 min' },
        { num: 'M–V & S', label: 'M–V 9:30–20:30 · S 9:00–14:00' },
      ],
      whatsappNumber: cleanPhone,
      whatsappUrl,
      aboutLabel: 'Nuestra Filosofía',
      aboutTitle: `Conoce ${name}`,
      aboutHighlight: name,
      aboutSubtitle: `Ubicados en ${address}. Atención exclusiva y personalizada para varones de cualquier edad en un ambiente profesional y acogedor.`,
      aboutCards: [
        {
          title: 'Varones de Cualquier Edad',
          desc: 'Desde los más pequeños (cortes niños menores de 10 años) hasta jóvenes y adultos. Nos adaptamos a las necesidades de cada etapa con paciencia y máxima técnica.',
          icon: 'image',
        },
        {
          title: 'Degradados a Navaja & Cero',
          desc: 'Maestría en degradados rasurados a navaja clásica o al cero, con difuminados limpios, contornos milimétricos y acabados de gran durabilidad.',
          icon: 'cut',
        },
        {
          title: 'Arreglo & Formación de Barba',
          desc: 'Afeitado tradicional con toalla caliente, rasurado a máquina o diseño y formación de barba con perfilado simétrico de mejillas y cuello.',
          icon: 'badge',
        },
        {
          title: 'Tarifas Transparentes & Justas',
          desc: 'Catálogo de servicios completo y claro desde 2€ (lavar cabeza) hasta packs combinados de corte y barba por 15€, siempre con la mejor calidad.',
          icon: 'paint',
        },
      ],
      servicesSectionSubtitle:
        'Servicios con duración estimada de 20 a 30 minutos, ejecutados con instrumental esterilizado y atención al detalle.',
      services: [
        {
          icon: 'razor',
          name: 'Corte degradado a Navaja',
          desc: 'Degradado de alta precisión rasurado a navaja clásica para un acabado ultra apurado y pulcro.',
          duration: '20–30 min',
          price: 10,
        },
        {
          icon: 'scissors',
          name: 'Corte degradado a cero',
          desc: 'Skin fade impecable desde el cero con difuminado suave y transición perfecta.',
          duration: '20–30 min',
          price: 9,
        },
        {
          icon: 'barber',
          name: 'Corte de pelo con forma',
          desc: 'Corte estructurado y definición de contornos marcados adaptados a tu fisonomía.',
          duration: '20–30 min',
          price: 9,
        },
        {
          icon: 'cut',
          name: 'Corte rapado a maquina',
          desc: 'Corte homogéneo a máquina con longitud a medida y repaso nítido de cuello y patillas.',
          duration: '20–30 min',
          price: 6,
        },
        {
          icon: 'razor',
          name: 'Afeitar la barba',
          desc: 'Afeitado tradicional completo con toalla caliente, navaja higienizada y bálsamo suave.',
          duration: '20–30 min',
          price: 6,
        },
        {
          icon: 'barber',
          name: 'Formar la barba',
          desc: 'Recorte, simetría y perfilado de líneas de mejillas y cuello a navaja para máxima definición.',
          duration: '20–30 min',
          price: 7,
        },
        {
          icon: 'scissors',
          name: 'Corte degradado y afeitar barba',
          desc: 'Combo integral: corte degradado (a cero o navaja) y afeitado apurado con toalla caliente.',
          duration: '20–30 min',
          price: 15,
        },
        {
          icon: 'scissors',
          name: 'Corte degradado y formar barba',
          desc: 'El pack más demandado: degradado de tendencia más diseño y perfilado completo de barba.',
          duration: '20–30 min',
          price: 15,
        },
        {
          icon: 'crown',
          name: 'Solo peinar',
          desc: 'Arreglo, definición y fijación con productos profesionales de barbería (cera, pomada o mate).',
          duration: '20–30 min',
          price: 3,
        },
        {
          icon: 'cut',
          name: 'Afeitar la barba a maquina',
          desc: 'Rasurado rápido, uniforme y sin irritación con shaver y trimmer profesional.',
          duration: '20–30 min',
          price: 4,
        },
        {
          icon: 'bolt',
          name: 'Lavar cabeza',
          desc: 'Lavado higienizante con champú profesional y suave masaje capilar tonificante.',
          duration: '20–30 min',
          price: 2,
        },
        {
          icon: 'palette',
          name: 'Alisado de pelo',
          desc: 'Tratamiento alisador profesional para disciplinar el cabello y aportar soltura y brillo.',
          duration: '20–30 min',
          price: 12,
        },
        {
          icon: 'scissors',
          name: 'Corte de pelo a tijera',
          desc: 'Técnica artesanal 100% a tijera para cabellos medios o largos con control total de volumen.',
          duration: '20–30 min',
          price: 9,
        },
        {
          icon: 'crown',
          name: 'Niños menores de 10 años',
          desc: 'Corte especializado para los más pequeños con paciencia, delicadeza y el mejor estilo infantil.',
          duration: '20–30 min',
          price: 8,
        },
      ],
      videoTitle: `Vive la Experiencia en ${name}`,
      videoSubtitle: `Descubre el ambiente, la técnica y la pasión por el detalle en ${address}.`,
      videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2ouwxkl53T0?rel=0',
      videoWatchUrl: c.youtube || 'https://youtube.com/@canal',
      videoIframeTitle: `${name} - Vídeo Demostrativo`,
      videoFooterPrompt: '¿Preparado para un corte con identidad propia y asesoría profesional?',
      videoFooterPhone: cleanPhone,
      videoFooterInstagram: igHandle,
      hygieneSubtitle: `En ${name} aplicamos protocolos rigurosos de higiene y desinfección para tu total seguridad.`,
      pricingSubtitle: 'Tarifas claras y accesibles para todos los servicios (duración 20 a 30 min).',
      pricing: [
        { name: 'Corte degradado a Navaja', price: 10 },
        { name: 'Corte degradado a cero', price: 9 },
        { name: 'Corte de pelo con forma', price: 9 },
        { name: 'Corte rapado a maquina', price: 6 },
        { name: 'Afeitar la barba', price: 6 },
        { name: 'Formar la barba', price: 7 },
        { name: 'Corte degradado y afeitar barba', price: 15, popular: true },
        { name: 'Corte degradado y formar barba', price: 15, popular: true },
        { name: 'Solo peinar', price: 3 },
        { name: 'Afeitar la barba a maquina', price: 4 },
        { name: 'Lavar cabeza', price: 2 },
        { name: 'Alisado de pelo', price: 12 },
        { name: 'Corte de pelo a tijera', price: 9 },
        { name: 'Niños menores de 10 años', price: 8 },
      ],
      teamSubtitle: 'Profesionales apasionados por la barbería clásica y las últimas tendencias.',
      barbers: [
        {
          name: 'Jackson Echevarria',
          role: 'Barbero Especialista',
          img: '/barber-carlos.png',
          specialties: ['Degradado a Navaja', 'Fade a Cero', 'Formar Barba'],
          instagram: igHandle,
        },
        {
          name: 'Juan Ballesteros',
          role: 'Estilista & Barbero',
          img: '/barber-miguel.png',
          specialties: ['Corte a Tijera', 'Alisado de Pelo', 'Niños'],
          instagram: igHandle,
        },
      ],
      testimonials: [
        {
          name: 'Carlos M.',
          rating: 5,
          text: `El degradado a navaja y el perfilado de barba quedaron impecables. La atención para varones de todas las edades es de diez.`,
          date: 'Hace 3 días',
          avatar: 'CM',
        },
        {
          name: 'David R.',
          rating: 5,
          text: `Traje a mi hijo para el corte infantil y a mí me hicieron un fade a cero. Grandes profesionales, puntuales y precios muy honestos.`,
          date: 'Hace 1 semana',
          avatar: 'DR',
        },
        {
          name: 'Álvaro S.',
          rating: 5,
          text: `Llevo meses viniendo aquí. El pack de corte degradado y formar barba por 15€ es imbatible en calidad.`,
          date: 'Hace 2 semanas',
          avatar: 'AS',
        },
      ],
      socialInstagramText: `Síguenos en ${igHandle} y Reserva por WhatsApp`,
      socialPhone: cleanPhone,
      contactAddressHtml,
      contactPhone: cleanPhone,
      contactPhoneClean: cleanPhoneNumeric,
      contactInstagramHandle: igHandle,
      contactInstagramUrl: igUrl,
      contactScheduleHtml,
      annualCalendar,
      facebookUrl: c.facebook || 'https://facebook.com/hisbarberia',
      youtubeUrl: c.youtube || 'https://youtube.com/@canal',
      googleMapsUrl: c.google_maps_url,
      googleMapsIframeUrl,
      googleMapsTitle: `Ubicación de ${name} en ${address}`,
      footerTagline: `${address} · Horario: M–V 9:30–14:00 y 16:30–20:30, S 9:00–14:00 (Lunes Cerrado) · Tel: ${cleanPhone}`,
      footerCopyText: `${name} · Varones de cualquier edad · Todos los derechos reservados`,
      floatingButtonAriaLabel: `Abrir asistente IA de ${name}`,
      chatInitialMessage: `¡Hola! Soy el asistente virtual de **${name}** en ${address}. Atendemos a **varones de cualquier edad**.\n\n` +
        `• **Horario:** Martes a Viernes de 09:30 a 14:00 y de 16:30 a 20:30 | Sábados de 09:00 a 14:00 (Lunes y Domingos cerrado).\n` +
        `• **WhatsApp / Teléfono:** ${cleanPhone}.\n` +
        `• **Servicios:** 14 opciones profesionales de 20 a 30 min (desde 2€ hasta 15€).\n\n¿En qué te puedo asesorar o qué servicio deseas reservar?`,
      chatAssistantName: `Asistente ${name}`,
      chatSidebarLocation: address,
      chatQuickReplies: [
        'Reservar Cita',
        'Servicios y Precios',
        'Horarios (M–V y Sábados)',
        'Varones de cualquier edad',
        `WhatsApp (${cleanPhone})`,
      ],
      mockPublicServices: [],
      mockEmployees: [],
    };
  });

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const c = this.company();
        if (c && c.name) {
          const area = c.address ? c.address.split(',')[0] : 'Madrid Centro';
          this.titleService.setTitle(
            `${c.name} | Varones de Cualquier Edad · ${area}`
          );
        }
      });
    }
  }
}
