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

  // Señal con los datos directos de la empresa obtenidos de /api/company
  readonly company = this.companyService.company;

  readonly isMock = signal<boolean>(false).asReadonly();

  // Datos actuales del negocio calculados reactivamente desde /api/company
  readonly business = computed<BarberBusinessData>(() => {
    const c = this.company();
    const name = (c.name || 'HIS Barbería Urban 2').trim();
    const words = name.split(/\s+/);
    const brandName = words[0] || 'Barbería';
    const brandAccent = words.slice(1).join(' ') || 'Urban';

    const address = (c.address || 'C. de San Marcos, 1, Centro, 28004 Madrid').trim();
    const contactAddressHtml = address.includes(',')
      ? address.replace(/, /g, '<br>')
      : address;

    const contactScheduleHtml = c.business_hours
      ? c.business_hours.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>')
      : 'Lunes a Viernes de 09:00 a 14:00 y de 16:00 a 19:00<br>Sábados de 9:00 a 14:00';

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

    const cleanPhone = '612 345 678';
    const cleanPhoneNumeric = '612345678';
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('Hola ' + name + ', quiero reservar una cita')}`;
    const googleMapsIframeUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    const cityOrArea = address.split(',')[0] || 'Madrid';

    return {
      id: 'real-quarter',
      isMock: false,
      brandName,
      brandAccent,
      fullName: name,
      heroLabel: `Barbería · ${address}`,
      tagline: 'Cortes Urbanos, Fades & Estilo',
      heroDescription: `En ${name} destacamos por contar con los medios más profesionales del sector, adaptándonos siempre a las exigencias de cada cliente y asesorando la imagen. Te espera un ambiente moderno y amigable en ${address}.`,
      heroStats: [
        { num: cityOrArea, label: 'Madrid' },
        { num: '100%', label: 'Higiene & Estilo' },
        { num: 'Top', label: 'Profesionales' },
      ],
      whatsappNumber: cleanPhone,
      whatsappUrl,
      aboutLabel: 'Nuestra Esencia',
      aboutTitle: `Conoce ${name}`,
      aboutHighlight: name,
      aboutSubtitle: `Ubicados en ${address}. Un espacio diseñado para desconectar mientras profesionales cuidan cada detalle de tu corte y barba.`,
      aboutCards: [
        {
          title: 'Asesoramiento de Imagen',
          desc: 'Contamos con los medios más profesionales del sector. Nos adaptamos en cada visita a tus exigencias y estilo personal.',
          icon: 'image',
        },
        {
          title: 'Cortes Actuales & Fades',
          desc: 'Especialistas en degradados limpios, texturizados y cortes de tendencia con acabados de máxima precisión.',
          icon: 'cut',
        },
        {
          title: 'Pioneros en Calidad y Precio',
          desc: 'Creemos firmemente en democratizar el estilo: cortes de la más alta calidad a precios justos para que luzcas impecable.',
          icon: 'badge',
        },
        {
          title: 'Higiene y Cuidado Integral',
          desc: 'Protocolos de bioseguridad absolutos, desinfección meticulosa y productos profesionales de alta gama.',
          icon: 'paint',
        },
      ],
      servicesSectionSubtitle:
        'Desde degradados de tendencia hasta perfilado de barba y tratamientos con productos profesionales.',
      services: [
        {
          icon: 'scissors',
          name: 'Corte de Pelo',
          desc: 'Corte a tijera o máquina con degradado de precisión, lavado y peinado con producto premium.',
          duration: '30 min',
          price: 13,
        },
        {
          icon: 'barber',
          name: 'Arreglo de Barba',
          desc: 'Perfilado de barba con toalla caliente, navaja de un solo uso y aceites nutritivos.',
          duration: '20 min',
          price: 5,
        },
        {
          icon: 'bolt',
          name: 'Cejas',
          desc: 'Diseño y limpieza de cejas con navaja y tijera para una mirada definida.',
          duration: '10 min',
          price: 2,
        },
        {
          icon: 'crown',
          name: 'Servicio Completo VIP',
          desc: 'Corte de pelo, barba completa, lavado spa y peinado con fijación mate.',
          duration: '50 min',
          price: 20,
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
      pricingSubtitle: 'Tarifas transparentes sin sorpresas con la mejor atención profesional.',
      pricing: [
        { name: 'Corte de Pelo', price: 13 },
        { name: 'Arreglo de Barba', price: 5 },
        { name: 'Cejas', price: 2 },
        { name: 'Pack Corte + Barba', price: 18, popular: true },
      ],
      teamSubtitle: 'Profesionales apasionados por la barbería clásica y las últimas tendencias.',
      barbers: [
        {
          name: 'Jackson Echevarria',
          role: 'Barbero Especialista',
          img: '/barber-carlos.png',
          specialties: ['Cortes Actuales', 'Fades', 'Barba'],
          instagram: igHandle,
        },
        {
          name: 'Juan Ballesteros',
          role: 'Estilista & Barbero',
          img: '/barber-miguel.png',
          specialties: ['Degradados', 'Cortes Clásicos', 'Asesoría'],
          instagram: igHandle,
        },
      ],
      testimonials: [
        {
          name: 'Carlos M.',
          rating: 5,
          text: `Excelente trato en ${name}. El degradado quedó perfecto y el ambiente es genial. Muy recomendado en ${cityOrArea}.`,
          date: 'Hace 3 días',
          avatar: 'CM',
        },
        {
          name: 'David R.',
          rating: 5,
          text: `Gran profesionalidad y puntualidad. Jackson y el equipo de ${name} te asesoran genial sobre qué corte te favorece más.`,
          date: 'Hace 1 semana',
          avatar: 'DR',
        },
        {
          name: 'Álvaro S.',
          rating: 5,
          text: 'Llevo meses viniendo aquí. Los precios son súper honestos y la calidad del corte es de diez.',
          date: 'Hace 2 semanas',
          avatar: 'AS',
        },
      ],
      socialInstagramText: `Síguenos en ${igHandle} y Reserva tu Turno`,
      socialPhone: cleanPhone,
      contactAddressHtml,
      contactPhone: cleanPhone,
      contactPhoneClean: cleanPhoneNumeric,
      contactInstagramHandle: igHandle,
      contactInstagramUrl: igUrl,
      contactScheduleHtml,
      annualCalendar: c.annual_calendar || 'Todo el año salvo festivos',
      facebookUrl: c.facebook || 'https://facebook.com/hisbarberia',
      youtubeUrl: c.youtube || 'https://youtube.com/@canal',
      googleMapsUrl: c.google_maps_url,
      googleMapsIframeUrl,
      googleMapsTitle: `Ubicación de ${name} en ${address}`,
      footerTagline: `${address} · ${name}`,
      footerCopyText: `${name} · ${address} · Todos los derechos reservados`,
      floatingButtonAriaLabel: `Abrir asistente IA de ${name}`,
      chatInitialMessage: `¡Hola! Soy el asistente virtual de **${name}** en ${address}. Nuestro horario de atención es: ${c.business_hours || 'Lunes a Sábado'}. Puedo ayudarte a informarte sobre nuestros servicios, tarifas o reservar tu cita. ¿En qué te puedo asesorar hoy?`,
      chatAssistantName: `Asistente ${name}`,
      chatSidebarLocation: address,
      chatQuickReplies: [
        'Reservar Cita Rápida',
        'Servicios y Precios',
        'Horarios de Atención',
        `Dónde estáis (${cityOrArea})`,
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
          const area = c.address ? c.address.split(',')[0] : 'Madrid';
          this.titleService.setTitle(
            `${c.name} | Cortes Urbanos, Fades & Estilo en ${area}`
          );
        }
      });
    }
  }
}
